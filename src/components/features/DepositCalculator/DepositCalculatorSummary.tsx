'use client'

import styles from './DepositCalculator.module.scss'
import Button from '@/components/ui/Button'
import type { DepositCalculatorSummaryState } from './useDepositCalculator'
import { CalculatorFooterIcon } from '@/components/ui/Icons'

type Props = DepositCalculatorSummaryState & {
    disclaimer: string
    footerText: string
    buttonLabel: string
    buttonHref: string
}

export default function DepositCalculatorSummary({
    rateLabel,
    incomeLabel,
    totalLabel,
    secondaryMetric,
    disclaimer,
    footerText,
    buttonLabel,
    buttonHref
}: Props) {
    return (
        <div className={styles.summary}>
            <div className={styles.summaryList}>
                <div className={styles.summaryItem}>
                    <span className={styles.summaryItemTitle}>Доход</span>
                    <span className={`${styles.summaryItemValue} ${styles.profit}`}>{incomeLabel}</span>
                </div>
                <div className={styles.summaryItem}>
                    <span className={styles.summaryItemTitle}>Ставка</span>
                    <span className={styles.summaryItemValue}>{rateLabel}</span>
                </div>
                <div className={styles.summaryItem}>
                    <span className={styles.summaryItemTitle}>{secondaryMetric.title}</span>
                    <span className={styles.summaryItemValue}>{secondaryMetric.value}</span>
                </div>
                <div className={`${styles.summaryItem} ${styles.total}`}>
                    <span className={styles.summaryItemTitle}>Сумма в конце срока</span>
                    <span className={styles.summaryItemValue}>{totalLabel}</span>
                </div>
            </div>
            <p className={styles.disclaimer}>{disclaimer}</p>
            <Button
                href={buttonHref}
                className={styles.summaryCta}
            >
                {buttonLabel}
            </Button>
            <div className={styles.footer}>
                <CalculatorFooterIcon className={styles.footerIcon} />
                <p>{footerText}</p>
            </div>
        </div>
    )
}
