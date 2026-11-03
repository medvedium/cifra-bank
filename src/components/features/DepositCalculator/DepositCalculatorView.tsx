'use client'

import styles from './DepositCalculator.module.scss'
import type { DepositCalculatorContent, DepositsConfig } from '@/lib/content/types'
import { useDepositCalculator } from './useDepositCalculator'
import DepositCalculatorControls from './DepositCalculatorControls'
import DepositCalculatorSummary from './DepositCalculatorSummary'

type Props = {
    data: DepositsConfig
    content: DepositCalculatorContent
    /** YYYY-MM-DD с сервера (Europe/Moscow), чтобы SSR и клиент считали один день. */
    dateStart: string
}

export default function DepositCalculatorView({ data, content, dateStart }: Props) {
    const calc = useDepositCalculator(data, dateStart)

    if (!calc.product) return (
        <div className={styles.unavailable}>
            Извините, произошла ошибка. Попробуйте позже.
        </div>
    )

    return (
        <div className={styles.depositCalculator}>
            <DepositCalculatorControls {...calc.controls} />
            <DepositCalculatorSummary
                {...calc.summary}
                disclaimer={content.disclaimer}
                footerText={content.footerText}
                buttonLabel={content.buttonLabel}
                buttonHref={content.buttonHref}
            />
        </div>
    )
}
