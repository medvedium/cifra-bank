import { getDepo } from '@/lib/content/loader'
import type { DepositCalculatorContent } from '@/lib/content/types'
import { todayDateOnlyMoscow } from '@/lib/helpers/depositCalc'
import DepositCalculatorView from './DepositCalculatorView'

type Props = {
    content: DepositCalculatorContent
}

/** Server-entry: тарифы из common/depo.json, тексты UI — из props страницы. */
export default async function DepositCalculator({ content }: Props) {
    const data = await getDepo()
    const dateStart = todayDateOnlyMoscow()
    return <DepositCalculatorView data={data} content={content} dateStart={dateStart} />
}
