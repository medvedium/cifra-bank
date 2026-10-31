export type PeriodUnit = 'day' | 'month'

const PERIOD_FORMS: Record<PeriodUnit, [string, string, string]> = {
    day: ['день', 'дня', 'дней'],
    month: ['месяц', 'месяца', 'месяцев']
}

/** Russian plural form index: 0 — один, 1 — несколько (2–4), 2 — много. */
export function pluralFormIndex(count: number): 0 | 1 | 2 {
    const abs = Math.abs(Math.trunc(count)) % 100
    if (abs >= 11 && abs <= 14) return 2
    const last = abs % 10
    if (last === 1) return 0
    if (last >= 2 && last <= 4) return 1
    return 2
}

export function pluralizeRu(count: number, forms: [string, string, string]): string {
    return forms[pluralFormIndex(count)]
}

/** `formatPeriod(91, 'day')` → `"91 день"`; `formatPeriod(12, 'month')` → `"12 месяцев"`. */
export function formatPeriod(count: number, unit: PeriodUnit): string {
    const value = Math.trunc(count)
    return `${value} ${pluralizeRu(value, PERIOD_FORMS[unit])}`
}
