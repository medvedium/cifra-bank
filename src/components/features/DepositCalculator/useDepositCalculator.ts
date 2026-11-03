'use client'

import { useState } from 'react'
import type { DepoProduct, DepositsConfig } from '@/lib/content/types'
import type { AmountCurrency } from '@/lib/helpers/amountFormat'
import { formatAmount } from '@/lib/helpers/amountFormat'
import { formatPeriod } from '@/lib/helpers/formatPeriod'
import {
    buildRateSchedule,
    calcDeposit,
    calcEffectiveRate,
    calcMonthlyIncome,
    formatRate,
    parseDateOnly,
    resolveRate
} from '@/lib/helpers/depositCalc'
import {
    buildCurrencyOptions,
    buildPeriodOptions,
    buildTariffOptions,
    defaultCapitalizationEnabled,
    formatMoney,
    resolveCapitalizationMode,
    resolveInitialCurrency,
    resolvePeriod,
    resolveProduct,
    showCapitalizationToggle
} from './depositCalculatorModel'

export function useDepositCalculator(data: DepositsConfig, dateStartIso: string) {
    const dateStart = parseDateOnly(dateStartIso)
    const initialCurrency = resolveInitialCurrency(Object.keys(data))
    const initialResolved = resolveProduct(data[initialCurrency] ?? {}, 'cifra')

    const [currency, setCurrency] = useState<AmountCurrency>(initialCurrency as AmountCurrency)
    const [tariff, setTariff] = useState(initialResolved?.id ?? '')
    const [tariffByCurrency, setTariffByCurrency] = useState<Record<string, string>>(() =>
        initialResolved ? { [initialCurrency]: initialResolved.id } : {}
    )
    const [amount, setAmount] = useState(initialResolved?.product.summa ?? 0)
    const [period, setPeriod] = useState(
        initialResolved ? resolvePeriod(initialResolved.product) : 0
    )
    const [isCapitalization, setIsCapitalization] = useState(
        initialResolved ? defaultCapitalizationEnabled(initialResolved.product) : false
    )

    const products = data[currency] ?? {}
    const product = products[tariff]

    const applyProduct = (nextTariff: string, nextProduct: DepoProduct) => {
        setTariff(nextTariff)
        setAmount(nextProduct.summa)
        setPeriod(resolvePeriod(nextProduct))
        setIsCapitalization(defaultCapitalizationEnabled(nextProduct))
    }

    const rememberTariff = (currencyCode: string, tariffId: string) => {
        setTariffByCurrency((prev) => ({ ...prev, [currencyCode]: tariffId }))
    }

    const handleCurrencyChange = (next: string) => {
        const nextProducts = data[next] ?? {}
        const resolved = resolveProduct(nextProducts, tariffByCurrency[next])

        setCurrency(next as AmountCurrency)
        if (resolved) {
            applyProduct(resolved.id, resolved.product)
            rememberTariff(next, resolved.id)
        } else {
            setTariff('')
        }
    }

    const handleTariffChange = (next: string) => {
        const nextProduct = products[next]
        if (!nextProduct) return
        applyProduct(next, nextProduct)
        rememberTariff(currency, next)
    }

    if (!product) {
        return { product: null } as const
    }

    const periodOptions = buildPeriodOptions(product)
    const rate = resolveRate(product, period)
    const rateSchedule = buildRateSchedule(product, period)
    const capitalizationMode = resolveCapitalizationMode(product, isCapitalization)
    const canToggleCapitalization = showCapitalizationToggle(currency, tariff)

    const result = calcDeposit({
        amount,
        periodDays: period,
        rate,
        rateSchedule,
        capitalization: isCapitalization,
        capitalizationMode,
        capPeriod: product.capPeriod,
        dateStart
    })

    const resultWithCap = isCapitalization
        ? result
        : calcDeposit({
              amount,
              periodDays: period,
              rate,
              rateSchedule,
              capitalization: true,
              capitalizationMode: product.capitalization || 'LWD',
              capPeriod: product.capPeriod,
              dateStart
          })

    const effectiveRate = calcEffectiveRate({
        amount,
        periodDays: period,
        rate,
        income: result.income,
        capitalization: isCapitalization
    })
    const effectiveWithCap = calcEffectiveRate({
        amount,
        periodDays: period,
        rate,
        income: resultWithCap.income,
        capitalization: true
    })
    const capBonus = Math.max(0, effectiveWithCap - rate)

    // С капитализацией — «Доходность», без — «Ежемесячный доход» (как на проде).
    const secondaryMetric = isCapitalization
        ? {
              title: 'Доходность',
              value: formatRate(effectiveRate)
          }
        : {
              title: 'Ежемесячный доход',
              value: formatMoney(calcMonthlyIncome(result.income, period), currency)
          }

    return {
        product,
        controls: {
            currencies: buildCurrencyOptions(Object.keys(data)),
            currency,
            onCurrencyChange: handleCurrencyChange,
            tariff,
            tariffOptions: buildTariffOptions(products),
            onTariffChange: handleTariffChange,
            period,
            periodOptions,
            hasMultiplePeriods: periodOptions.length > 1,
            periodLabel: formatPeriod(period, 'day'),
            onPeriodChange: (next: string) => setPeriod(Number(next)),
            amount,
            onAmountChange: setAmount,
            amountMin: product.min,
            amountMax: product.max,
            amountStep: product.step,
            amountMinLabel: formatAmount(product.min, currency),
            amountMaxLabel: formatAmount(product.max, currency),
            showCapitalizationToggle: canToggleCapitalization,
            isCapitalization,
            onCapitalizationChange: setIsCapitalization,
            capBonusLabel:
                canToggleCapitalization && capBonus > 0.005
                    ? `+${formatRate(capBonus)}`
                    : undefined
        },
        summary: {
            rateLabel: formatRate(rate),
            incomeLabel: formatMoney(result.income, currency),
            totalLabel: formatMoney(result.total, currency),
            secondaryMetric
        }
    } as const
}

export type DepositCalculatorControlsState = Exclude<
    ReturnType<typeof useDepositCalculator>,
    { product: null }
>['controls']

export type DepositCalculatorSummaryState = Exclude<
    ReturnType<typeof useDepositCalculator>,
    { product: null }
>['summary']
