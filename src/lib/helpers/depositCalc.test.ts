import { describe, expect, it } from 'vitest'
import {
    buildCapitalizationChunks,
    buildRateSchedule,
    calcDeposit,
    calcEffectiveRate,
    calcMonthlyIncome,
    compoundByChunks,
    monthsForPeriod,
    resolveRate
} from './depositCalc'
import type { DepoProduct } from '@/lib/content/types'

const fixedStart = new Date(Date.UTC(2026, 0, 15)) // 15.01.2026, четверг

describe('resolveRate / buildRateSchedule', () => {
    it('берёт ставку из rateMap по сроку', () => {
        const product = {
            rate: 12.6,
            rateMap: [
                { period: '91', rate: 12.6 },
                { period: '180', rate: 12.7 }
            ]
        } as DepoProduct

        expect(resolveRate(product, 180)).toBe(12.7)
        expect(buildRateSchedule(product, 180)).toEqual([{ day: 0, rate: 12.7 }])
    })
})

describe('buildCapitalizationChunks', () => {
    it('без режима — один кусок на весь срок', () => {
        expect(buildCapitalizationChunks(fixedStart, 60, '', 1)).toEqual([60])
    })

    it('ED — по одному дню', () => {
        expect(buildCapitalizationChunks(fixedStart, 5, 'ED', 1)).toEqual([1, 1, 1, 1, 1])
    })

    it('LWD monthly — сумма кусков равна сроку', () => {
        const chunks = buildCapitalizationChunks(fixedStart, 60, 'LWD', 1)
        expect(chunks.reduce((sum, days) => sum + days, 0)).toBe(60)
        expect(chunks.length).toBeGreaterThan(1)
    })

    it('LWD quarterly — сумма кусков равна сроку', () => {
        const chunks = buildCapitalizationChunks(fixedStart, 200, 'LWD', 3)
        expect(chunks.reduce((sum, days) => sum + days, 0)).toBe(200)
    })
})

describe('calcDeposit', () => {
    it('без капитализации: один кусок и ceil', () => {
        // 60/365 * 12.9% → rateSum; total = ceil(100000 * (1 + rateSum))
        const rateSum = (60 * 12.9) / 365 / 100
        const expected = Math.ceil(Number((100000 * (1 + rateSum)).toFixed(10)))

        const result = calcDeposit({
            amount: 100000,
            periodDays: 60,
            rate: 12.9,
            capitalization: false,
            capitalizationMode: 'LWD',
            capPeriod: 1,
            dateStart: fixedStart
        })

        expect(result.total).toBe(expected)
        expect(result.income).toBe(expected - 100000)
    })

    it('LWD даёт не меньше дохода, чем без капитализации (типичный случай)', () => {
        const plain = calcDeposit({
            amount: 1_000_000,
            periodDays: 395,
            rate: 12.6,
            capitalization: false,
            dateStart: fixedStart
        })
        const withCap = calcDeposit({
            amount: 1_000_000,
            periodDays: 395,
            rate: 12.6,
            capitalization: true,
            capitalizationMode: 'LWD',
            capPeriod: 1,
            dateStart: fixedStart
        })

        expect(withCap.income).toBeGreaterThanOrEqual(plain.income)
    })

    it('compoundByChunks на одном куске совпадает с calcDeposit без капитализации', () => {
        const amount = 500000
        const periodDays = 91
        const rate = 12.6
        const chunks = [periodDays]
        const total = compoundByChunks(amount, fixedStart, periodDays, chunks, [
            { day: 0, rate }
        ])
        const viaApi = calcDeposit({
            amount,
            periodDays,
            rate,
            capitalization: false,
            dateStart: fixedStart
        })
        expect(total).toBe(viaApi.total)
    })
})

describe('monthly income / effective rate', () => {
    it('monthsForPeriod использует карту с прода', () => {
        expect(monthsForPeriod(91)).toBe(3)
        expect(monthsForPeriod(395)).toBe(13)
    })

    it('calcMonthlyIncome делит доход на месяцы', () => {
        expect(calcMonthlyIncome(13000, 395)).toBe(Math.floor(13000 / 13))
    })

    it('calcEffectiveRate считается из фактического дохода', () => {
        const amount = 1_000_000
        const periodDays = 395
        const rate = 12.6
        const income = 140_000
        const expected = Math.floor((income / amount) * (365 / periodDays) * 100 * 100) / 100

        const effective = calcEffectiveRate({
            amount,
            periodDays,
            rate,
            income,
            capitalization: true
        })

        expect(effective).toBe(expected)
        expect(effective).toBeGreaterThan(rate)
    })

    it('без капитализации calcEffectiveRate = номинал', () => {
        expect(
            calcEffectiveRate({
                amount: 1_000_000,
                periodDays: 395,
                rate: 12.6,
                income: 100_000,
                capitalization: false
            })
        ).toBe(12.6)
    })
})

