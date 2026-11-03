import type { DepoCapitalizationMode, DepoProduct } from '@/lib/content/types'
import { formatPeriod } from '@/lib/helpers/formatPeriod'
import type { AmountCurrency } from '@/lib/helpers/amountFormat'
import { formatAmount } from '@/lib/helpers/amountFormat'

export const CURRENCY_LABELS: Record<string, string> = {
    rub: 'Рубли',
    usd: 'Доллары',
    eur: 'Евро',
    cny: 'Юани'
}

/**
 * Тарифы, у которых показывается тогглер капитализации.
 * Ключ: `${currency}:${tariffId}`. Позже приедет из json/бэка.
 * На проде тогглер был у «Цифра вклад».
 */
export const CAPITALIZATION_TOGGLE_TARIFFS = ['rub:cifra'] as const

export type CapitalizationToggleTariff = (typeof CAPITALIZATION_TOGGLE_TARIFFS)[number]

export function tariffKey(currency: string, tariffId: string): string {
    return `${currency}:${tariffId}`
}

export function showCapitalizationToggle(currency: string, tariffId: string): boolean {
    return (CAPITALIZATION_TOGGLE_TARIFFS as readonly string[]).includes(
        tariffKey(currency, tariffId)
    )
}

/** Дефолт тогглера: капитализация включена, если в json задан непустой режим. */
export function defaultCapitalizationEnabled(product: DepoProduct): boolean {
    return Boolean(product.capitalization)
}

/**
 * Режим для расчёта: при выключенном тогглере — как на проде (пустая строка),
 * иначе режим из json (или LWD как безопасный fallback).
 */
export function resolveCapitalizationMode(
    product: DepoProduct,
    isCapitalization: boolean
): DepoCapitalizationMode | string {
    if (!isCapitalization) return ''
    return product.capitalization || 'LWD'
}

export type PeriodOption = {
    value: string
    label: string
}

export type SelectOption = {
    value: string
    label: string
}

export function resolveProduct(
    products: Record<string, DepoProduct>,
    preferredId?: string
): { id: string; product: DepoProduct } | null {
    if (preferredId && products[preferredId]) {
        return { id: preferredId, product: products[preferredId] }
    }
    const id = Object.keys(products)[0]
    if (!id) return null
    return { id, product: products[id]! }
}

export function buildPeriodOptions(product: DepoProduct): PeriodOption[] {
    if (product.rateMap?.length) {
        return product.rateMap.map((item) => {
            const days = Number(item.period)
            return {
                value: String(days),
                label: formatPeriod(days, 'day')
            }
        })
    }

    return [
        {
            value: String(product.periodInDays),
            label: formatPeriod(product.periodInDays, 'day')
        }
    ]
}

export function resolvePeriod(product: DepoProduct): number {
    const options = buildPeriodOptions(product)
    const preferred = String(product.periodInDays)
    if (options.some((option) => option.value === preferred)) {
        return product.periodInDays
    }
    return Number(options[0]?.value ?? product.periodInDays)
}

export function buildCurrencyOptions(currencyCodes: string[]): SelectOption[] {
    return currencyCodes.map((code) => ({
        value: code,
        label: CURRENCY_LABELS[code] ?? code
    }))
}

export function buildTariffOptions(products: Record<string, DepoProduct>): SelectOption[] {
    return Object.entries(products).map(([id, item]) => ({
        value: id,
        label: item.title
    }))
}

export function formatMoney(value: number, currency: AmountCurrency): string {
    return formatAmount(Math.round(value), currency)
}

export function resolveInitialCurrency(dataKeys: string[]): string {
    if (dataKeys.includes('rub')) return 'rub'
    return dataKeys[0] ?? 'rub'
}
