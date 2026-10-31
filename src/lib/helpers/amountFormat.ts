export type AmountCurrency = 'rub' | 'usd' | 'eur' | 'cny'

const CURRENCY_SYMBOL: Record<AmountCurrency, string> = {
    rub: '₽',
    usd: '$',
    eur: '€',
    cny: '¥'
}

const PREFIX_CURRENCIES = new Set<AmountCurrency>(['usd', 'eur'])

export function getCurrencySymbol(currency: AmountCurrency): string {
    return CURRENCY_SYMBOL[currency]
}

export function isPrefixCurrency(currency: AmountCurrency): boolean {
    return PREFIX_CURRENCIES.has(currency)
}

/** Groups integer digits with spaces: 12500 → "12 500". */
export function formatGroupedDigits(digits: string): string {
    if (!digits) return ''
    return digits
        .split('')
        .reverse()
        .join('')
        .replace(/(\d{3})/g, '$1 ')
        .split('')
        .reverse()
        .join('')
        .replace(/^ /, '')
}

export function formatAmount(value: number, currency?: AmountCurrency): string {
    if (!Number.isFinite(value)) return ''
    const grouped = formatGroupedDigits(String(Math.trunc(Math.abs(value))))
    if (!currency) return grouped

    const symbol = getCurrencySymbol(currency)
    return isPrefixCurrency(currency) ? `${symbol}${grouped}` : `${grouped} ${symbol}`
}

/** Digits only from a display string (spaces and currency stripped). */
export function extractDigits(raw: string): string {
    return raw.replace(/\D/g, '')
}

export function parseAmount(raw: string): number | null {
    const digits = extractDigits(raw)
    if (!digits) return null
    const parsed = Number(digits)
    return Number.isFinite(parsed) ? parsed : null
}

export function clampAmount(value: number, min?: number, max?: number): number {
    let next = value
    if (typeof min === 'number' && next < min) next = min
    if (typeof max === 'number' && next > max) next = max
    return next
}

/**
 * After a keystroke: if the user deleted only a space/currency (digit count
 * unchanged), treat it as deleting the digit left of the caret.
 */
export function reconcileAmountDigits(
    previousFormatted: string,
    nextRaw: string,
    caret: number
): { digits: string; digitCaret: number } {
    const prevDigits = extractDigits(previousFormatted)
    const nextDigits = extractDigits(nextRaw)
    const digitsBeforeCaret = extractDigits(nextRaw.slice(0, caret)).length

    if (nextDigits.length < prevDigits.length) {
        return { digits: nextDigits, digitCaret: digitsBeforeCaret }
    }

    if (nextDigits.length === prevDigits.length && nextRaw.length < previousFormatted.length) {
        if (digitsBeforeCaret <= 0) {
            return { digits: prevDigits, digitCaret: 0 }
        }
        const removeAt = digitsBeforeCaret - 1
        const digits = prevDigits.slice(0, removeAt) + prevDigits.slice(removeAt + 1)
        return { digits, digitCaret: removeAt }
    }

    return { digits: nextDigits, digitCaret: digitsBeforeCaret }
}

/** Restore caret after reformat: keep the same count of digits left of the caret. */
export function caretIndexAfterFormat(
    formatted: string,
    digitsBeforeCaret: number,
    currency?: AmountCurrency
): number {
    if (digitsBeforeCaret <= 0) {
        if (currency && isPrefixCurrency(currency)) {
            return getCurrencySymbol(currency).length
        }
        return 0
    }

    let seen = 0
    for (let i = 0; i < formatted.length; i += 1) {
        if (/\d/.test(formatted[i]!)) {
            seen += 1
            if (seen === digitsBeforeCaret) return i + 1
        }
    }

    // Prefer sitting after the last digit (before suffix " ₽"), not after currency.
    return caretAfterLastDigit(formatted)
}

/** Caret after the last digit (before suffix currency / after prefix + digits). */
export function caretAfterLastDigit(formatted: string): number {
    let lastDigitIndex = -1
    for (let i = 0; i < formatted.length; i += 1) {
        if (/\d/.test(formatted[i]!)) lastDigitIndex = i
    }
    return lastDigitIndex >= 0 ? lastDigitIndex + 1 : formatted.length
}
