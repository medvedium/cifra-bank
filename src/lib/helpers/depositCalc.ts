import type { DepoProduct } from '@/lib/content/types'

export type RateScheduleItem = {
    /** День от даты открытия, с которого действует ставка (0 — с начала). */
    day: number
    rate: number
}

/** Годовая ставка продукта для выбранного срока (дни). */
export function resolveRate(product: DepoProduct, periodDays: number): number {
    const fromMap = product.rateMap?.find((item) => Number(item.period) === periodDays)?.rate
    if (typeof fromMap === 'number') return fromMap

    if (typeof product.rate === 'number') return product.rate

    if (Array.isArray(product.rate)) {
        const fromDays = product.rate.find((item) => Number(item.day) === periodDays)?.rate
        if (typeof fromDays === 'number') return fromDays
    }

    return 0
}

/**
 * Расписание ставок для calcDohod-совместимого расчёта.
 * Пока — одна ставка на выбранный срок (как rateMap на проде).
 * Ступенчатый `rate[]` с day можно подключить позже.
 */
export function buildRateSchedule(product: DepoProduct, periodDays: number): RateScheduleItem[] {
    return [{ day: 0, rate: resolveRate(product, periodDays) }]
}

export type DepositCalcInput = {
    amount: number
    periodDays: number
    rate: number
    /** Пользовательский тогглер / дефолт тарифа. */
    capitalization: boolean
    /** Режим из json: LWD, ED, …; пустая строка — без промежуточной капитализации. */
    capitalizationMode?: string
    capPeriod?: number
    /** Дата открытия (календарный день). По умолчанию — сегодня (UTC date-only). */
    dateStart?: Date
    /** Готовое расписание; если нет — [{ day: 0, rate }]. */
    rateSchedule?: RateScheduleItem[]
}

export type DepositCalcResult = {
    income: number
    total: number
}

function toUtcDateOnly(date: Date): Date {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
}

function utcYmd(year: number, monthIndex: number, day: number): Date {
    return new Date(Date.UTC(year, monthIndex, day))
}

function addUtcDays(date: Date, days: number): Date {
    const next = new Date(date.getTime())
    next.setUTCDate(next.getUTCDate() + days)
    return next
}

function diffUtcDays(from: Date, to: Date): number {
    return Math.round((to.getTime() - from.getTime()) / 86_400_000)
}

function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

function daysInYear(year: number): number {
    return isLeapYear(year) ? 366 : 365
}

/** Последний календарный день месяца → сдвиг сб/вс назад (как в calcDohod). */
function toLastWorkingDay(date: Date): Date {
    const day = date.getUTCDay()
    if (day === 0) return addUtcDays(date, -2)
    if (day === 6) return addUtcDays(date, -1)
    return date
}

function endOfMonthUtc(year: number, monthIndex: number): Date {
    // day 0 следующего месяца = последний день текущего
    return utcYmd(year, monthIndex + 1, 0)
}

const QUARTER_MONTH_ENDS = [2, 5, 8, 11] as const // мар, июн, сен, дек (0-based)

/**
 * Нарезка срока на куски дней между датами капитализации.
 * Порт bank_source/calcDohod.js с фиксом: dateCap двигаем на фактический dayPeriod.
 */
export function buildCapitalizationChunks(
    dateStart: Date,
    periodDays: number,
    capType: string,
    capPeriod: number
): number[] {
    if (periodDays <= 0) return []

    if (capType === 'ED') {
        return Array.from({ length: periodDays }, () => 1)
    }

    if (capType === 'LWD' && (capPeriod === 1 || capPeriod === 3)) {
        return buildLwdChunks(dateStart, periodDays, capPeriod)
    }

    // '' / BFRP / неизвестный режим — один кусок на весь срок
    return [periodDays]
}

function buildLwdChunks(dateStart: Date, periodDays: number, capPeriod: 1 | 3): number[] {
    const start = toUtcDateOnly(dateStart)
    const dateEnd = addUtcDays(start, periodDays)
    const chunks: number[] = []
    let dateCap = start
    let day2finish = 0

    const monthEnds = capPeriod === 3 ? QUARTER_MONTH_ENDS : ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const)

    let year = start.getUTCFullYear()
    let index = 0
    while (index < monthEnds.length) {
        const candidate = toLastWorkingDay(endOfMonthUtc(year, monthEnds[index]!))
        if (diffUtcDays(start, candidate) > 0) break
        index += 1
        if (index === monthEnds.length) {
            index = 0
            year += 1
        }
    }

    let guard = 0
    while (dateCap < dateEnd && day2finish < periodDays && guard < periodDays + 24) {
        guard += 1

        const dateMoveCap = toLastWorkingDay(endOfMonthUtc(year, monthEnds[index]!))
        let dayPeriod = diffUtcDays(dateCap, dateMoveCap)

        if (dayPeriod <= 0) {
            index += 1
            if (index === monthEnds.length) {
                index = 0
                year += 1
            }
            continue
        }

        if (day2finish + dayPeriod > periodDays) {
            dayPeriod = periodDays - day2finish
        }

        if (dayPeriod <= 0) break

        chunks.push(dayPeriod)
        day2finish += dayPeriod
        // Фикс бага оригинала: двигаемся на фактически учтённые дни, не на полную dateMoveCap
        dateCap = addUtcDays(dateCap, dayPeriod)

        index += 1
        if (index === monthEnds.length) {
            index = 0
            year += 1
        }
    }

    if (day2finish < periodDays) {
        chunks.push(periodDays - day2finish)
    }

    return chunks.filter((days) => days > 0)
}

/**
 * Сложные проценты по кускам капитализации + дневная доля ставки / дней в году.
 * Совместимо с ядром calcDohod (без moment).
 */
export function compoundByChunks(
    amount: number,
    dateStart: Date,
    periodDays: number,
    chunks: number[],
    rateSchedule: RateScheduleItem[]
): number {
    const start = toUtcDateOnly(dateStart)
    const rateFrame = rateSchedule.map((item) => ({
        day: item.day || 0,
        rate: item.rate
    }))

    let dayCap = 0
    let newBase = amount

    for (const chunkDays of chunks) {
        const dayStart = dayCap
        dayCap += chunkDays

        const rateFrameC = rateFrame.filter((r) => r.day < Math.min(dayCap, periodDays))
        const rateFrameD = rateFrameC.filter((r) => r.day <= dayStart)
        const periodRateStart =
            rateFrameD.length > 0 ? rateFrameD[rateFrameD.length - 1]!.day : 0
        const rateFrameB = rateFrameC.filter((r) => r.day >= periodRateStart)

        let rateSum = 0
        for (let k = 0; k < rateFrameB.length; k += 1) {
            const segmentStart = Math.max(rateFrameB[k]!.day, dayStart)
            const segmentEnd = Math.min(rateFrameB[k + 1]?.day ?? dayCap, dayCap)

            let currentStart = segmentStart
            while (currentStart < segmentEnd) {
                if (currentStart >= periodDays) break

                const cursor = addUtcDays(start, currentStart)
                const year = cursor.getUTCFullYear()
                const yearEndExclusive = Math.min(
                    segmentEnd,
                    diffUtcDays(start, utcYmd(year, 11, 31)) + 1
                )
                const daysInPeriod = yearEndExclusive - currentStart
                if (daysInPeriod <= 0) break

                rateSum += (daysInPeriod * rateFrameB[k]!.rate) / daysInYear(year) / 100
                currentStart = yearEndExclusive
            }
        }

        newBase = Number((newBase * (1 + rateSum)).toFixed(10))
    }

    return Math.ceil(newBase)
}

/**
 * Расчёт вклада по подходу calcDohod:
 * нарезка LWD/ED/однократно → compound по кускам → ceil итога.
 */
export function calcDeposit({
    amount,
    periodDays,
    rate,
    capitalization,
    capitalizationMode = '',
    capPeriod = 1,
    dateStart = new Date(),
    rateSchedule
}: DepositCalcInput): DepositCalcResult {
    if (!(amount > 0) || !(periodDays > 0) || !(rate >= 0)) {
        return { income: 0, total: amount > 0 ? amount : 0 }
    }

    const mode = capitalization ? capitalizationMode || 'LWD' : ''
    const schedule = rateSchedule?.length ? rateSchedule : [{ day: 0, rate }]
    const chunks = buildCapitalizationChunks(dateStart, periodDays, mode, capPeriod)
    const total = compoundByChunks(amount, dateStart, periodDays, chunks, schedule)

    return {
        total,
        income: total - amount
    }
}

/** Доходность за срок в % от суммы (не годовая). */
export function termYieldPercent(income: number, amount: number): number {
    if (!(amount > 0)) return 0
    return (income / amount) * 100
}

/** Число месяцев для «ежемесячного дохода» (карта с прода + fallback). */
const MONTHS_BY_PERIOD_DAYS: Record<number, number> = {
    91: 3,
    180: 6,
    395: 13,
    730: 24,
    1095: 36
}

export function monthsForPeriod(periodDays: number): number {
    const mapped = MONTHS_BY_PERIOD_DAYS[periodDays]
    if (mapped) return mapped
    return Math.max(1, Math.round(periodDays / 30))
}

export function calcMonthlyIncome(income: number, periodDays: number): number {
    return Math.floor(income / monthsForPeriod(periodDays))
}

/**
 * Доходность (% годовых) из фактического дохода за срок.
 * Согласована с calcDeposit: те же income/amount/period, без отдельной «рекламной» формулы.
 */
export function calcEffectiveRate(input: {
    amount: number
    periodDays: number
    rate: number
    income: number
    capitalization: boolean
}): number {
    const { amount, periodDays, rate, income, capitalization } = input

    if (!(amount > 0) || !(periodDays > 0)) return 0

    if (!capitalization) {
        return Math.floor(rate * 100) / 100
    }

    const annualized = (income / amount) * (365 / periodDays) * 100
    return Math.floor(annualized * 100) / 100
}

/** Календарная дата YYYY-MM-DD в Europe/Moscow (для SSR/клиента один день). */
export function todayDateOnlyMoscow(now: Date = new Date()): string {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Europe/Moscow',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(now)
}

/** Парсит YYYY-MM-DD в UTC date-only для расчётов. */
export function parseDateOnly(isoDate: string): Date {
    const [year, month, day] = isoDate.split('-').map(Number)
    return new Date(Date.UTC(year!, (month ?? 1) - 1, day ?? 1))
}

export function formatRate(rate: number): string {
    return `${rate.toLocaleString('ru-RU', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    })}%`
}
