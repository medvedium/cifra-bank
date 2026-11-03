'use client'

import styles from './DepositCalculator.module.scss'
import Switch from '@/components/ui/Switch'
import Select from '@/components/ui/Select'
import ChipRadio from '@/components/ui/ChipRadio'
import Field from '@/components/ui/Field'
import RangeField from '@/components/features/RangeField'
import Toggle from '@/components/ui/Toggle'
import type { DepositCalculatorControlsState } from './useDepositCalculator'

type Props = DepositCalculatorControlsState

export default function DepositCalculatorControls({
    currencies,
    currency,
    onCurrencyChange,
    tariff,
    tariffOptions,
    onTariffChange,
    period,
    periodOptions,
    hasMultiplePeriods,
    periodLabel,
    onPeriodChange,
    amount,
    onAmountChange,
    amountMin,
    amountMax,
    amountStep,
    amountMinLabel,
    amountMaxLabel,
    showCapitalizationToggle,
    isCapitalization,
    onCapitalizationChange,
    capBonusLabel
}: Props) {
    return (
        <div className={styles.controls}>
            <Switch
                options={currencies}
                value={currency}
                onChange={onCurrencyChange}
                className={styles.switch}
            />
            <Select
                label={'Тип вклада'}
                name={'tariff'}
                value={tariff}
                onChange={onTariffChange}
                options={tariffOptions}
                isSearchable={false}
                className={styles.select}
            />
            {hasMultiplePeriods ? (
                <div className={styles.period}>
                    <div className="ui-legend">Срок</div>
                    <ChipRadio
                        options={periodOptions}
                        value={String(period)}
                        onChange={onPeriodChange}
                        ariaLabel={'Срок'}
                    />
                </div>
            ) : (
                <Field
                    label={'Срок'}
                    name={'period'}
                    value={periodLabel}
                    onChange={() => {}}
                    isDisabled
                    className={styles.periodField}
                />
            )}
            <RangeField
                label={'Сумма'}
                value={amount}
                name={'sum'}
                onChange={onAmountChange}
                currency={currency}
                min={amountMin}
                max={amountMax}
                step={amountStep}
                minLabel={amountMinLabel}
                maxLabel={amountMaxLabel}
            />
            {showCapitalizationToggle ? (
                <Toggle
                    onChange={onCapitalizationChange}
                    label={'Оставлять проценты на счёте (с капитализацией)'}
                    extra={capBonusLabel}
                    checked={isCapitalization}
                    className={styles.toggle}
                />
            ) : null}
        </div>
    )
}
