import { describe, expect, it } from 'vitest'
import {
    caretAfterLastDigit,
    caretIndexAfterFormat,
    formatAmount,
    reconcileAmountDigits
} from './amountFormat'

describe('formatAmount', () => {
    it('ставит ₽ и ¥ после суммы', () => {
        expect(formatAmount(100000, 'rub')).toBe('100 000 ₽')
        expect(formatAmount(10000, 'cny')).toBe('10 000 ¥')
    })

    it('ставит $ и € перед суммой', () => {
        expect(formatAmount(100000, 'usd')).toBe('$100 000')
        expect(formatAmount(50, 'eur')).toBe('€50')
    })
})

describe('reconcileAmountDigits', () => {
    it('Backspace по ₽ удаляет последнюю цифру', () => {
        const prev = '100 000 ₽'
        const raw = '100 000 '
        const caret = raw.length
        expect(reconcileAmountDigits(prev, raw, caret)).toEqual({
            digits: '10000',
            digitCaret: 5
        })
    })

    it('Backspace по пробелу между разрядами удаляет цифру слева', () => {
        const prev = '100 000 ₽'
        const raw = '100000 ₽'
        const caret = 3
        expect(reconcileAmountDigits(prev, raw, caret)).toEqual({
            digits: '10000',
            digitCaret: 2
        })
    })

    it('обычное удаление цифры не трогает лишнее', () => {
        const prev = '100 000 ₽'
        const raw = '10 000 ₽'
        const caret = 2
        expect(reconcileAmountDigits(prev, raw, caret)).toEqual({
            digits: '10000',
            digitCaret: 2
        })
    })

    it('Backspace сразу после $ не удаляет цифру', () => {
        const prev = '$100 000'
        const raw = '100 000'
        const caret = 0
        expect(reconcileAmountDigits(prev, raw, caret)).toEqual({
            digits: '100000',
            digitCaret: 0
        })
    })
})

describe('caret helpers', () => {
    it('ставит каретку после последней цифры, до ₽', () => {
        expect(caretAfterLastDigit('100 000 ₽')).toBe(7)
        expect(caretIndexAfterFormat('100 000 ₽', 6, 'rub')).toBe(7)
    })

    it('при digitCaret 0 для $ ставит каретку после символа', () => {
        expect(caretIndexAfterFormat('$100 000', 0, 'usd')).toBe(1)
    })
})
