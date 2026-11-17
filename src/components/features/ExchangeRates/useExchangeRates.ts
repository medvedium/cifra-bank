import { ExchangeRatesTabId, RatesConfig } from '@/lib/content/types'

export function getRatesMap(
    data: RatesConfig,
    tabId: ExchangeRatesTabId,
    officeCode: string
): Record<string, {buy: number, sell: number}> {
    if (tabId === 'online') return data.online
    if (tabId === 'cards') return data.cards

    const office =
        data.offices.find((o) => o.code === officeCode) ??
        data.offices.find((o) => o.code === data.defaultOfficeCode)

    return office?.rates ?? {}
}