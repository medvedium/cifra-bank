import styles from './ExchangeRates.module.scss'
import type { ExchangeRatesContent, ExchangeRatesTabId, RatesConfig } from '@/lib/content/types'
import { getRatesMap } from '@/components/features/ExchangeRates/useExchangeRates'

type Props = {
    data: RatesConfig
    content: ExchangeRatesContent
    tabId: ExchangeRatesTabId
}

export default function ExchangeRatesInner({ data, content, tabId }: Props) {
    const ratesMap = getRatesMap(data, tabId, data.defaultOfficeCode)
    const rows = Object.entries(ratesMap)

    return (
        <div className={styles.wrapper}>
            <div className={styles.item}>
                <h2 className={styles.itemTitle}>{content.titles[tabId]}</h2>
                <table style={{ width: '100%' }}>
                    <tbody>
                    {rows.map(([currency, pair]) => (
                        <tr key={currency}>
                            <td>{currency}</td>
                            <td>{pair.buy}</td>
                            <td>{pair.sell}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div>{content.titles.calc}</div>
        </div>
    )
}
