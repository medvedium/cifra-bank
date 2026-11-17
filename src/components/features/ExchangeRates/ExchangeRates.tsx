import { getRates } from '@/lib/content/loader'
import type { ExchangeRatesContent } from '@/lib/content/types'
import ExchangeRatesView from './ExchangeRatesView'

type Props = {
    content: ExchangeRatesContent
}

export default async function ExchangeRates({ content }: Props) {
    const data = await getRates()
    return <ExchangeRatesView data={data} content={content} />
}
