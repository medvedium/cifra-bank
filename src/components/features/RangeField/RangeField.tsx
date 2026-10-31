'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './RangeField.module.scss'
import Field from '@/components/ui/Field'
import RangeSlider from '@/components/ui/RangeSlider'
import {
    type AmountCurrency,
    caretAfterLastDigit,
    caretIndexAfterFormat,
    clampAmount,
    formatAmount,
    parseAmount,
    reconcileAmountDigits
} from '@/lib/helpers/amountFormat'

interface RangeMark {
    value: number
    label: string
}

interface RangeFieldProps {
    label: string
    value: number
    name: string
    onChange: (value: number) => void
    min?: number
    max?: number
    step?: number
    ariaLabel?: string
    className?: string
    minLabel?: string
    maxLabel?: string
    marks?: RangeMark[]
    isDisabled?: boolean
    isReadOnly?: boolean
    currency?: AmountCurrency
}

export default function RangeField({
    label,
    value,
    name,
    onChange,
    min,
    max,
    step,
    className,
    minLabel,
    maxLabel,
    marks,
    isDisabled,
    isReadOnly,
    ariaLabel,
    currency
}: RangeFieldProps) {
    const isMarksMode = Boolean(marks && marks.length > 0)
    const fieldRef = useRef<HTMLInputElement>(null)
    const isFocusedRef = useRef(false)
    const draftRef = useRef(formatAmount(value, currency))
    const [draft, setDraft] = useState(() => formatAmount(value, currency))

    const setDraftValue = (next: string) => {
        draftRef.current = next
        setDraft(next)
    }

    useEffect(() => {
        if (isMarksMode || isFocusedRef.current) return
        setDraftValue(formatAmount(value, currency))
    }, [value, currency, isMarksMode])

    const fieldValue = isMarksMode
        ? (marks!.find((mark) => mark.value === value)?.label ?? '')
        : draft

    const commitAmount = (next: number) => {
        const clamped = clampAmount(next, min, max)
        setDraftValue(formatAmount(clamped, currency))
        if (clamped !== value) onChange(clamped)
    }

    const placeCaret = (formatted: string, digitCaret: number) => {
        requestAnimationFrame(() => {
            const el = fieldRef.current
            if (!el) return
            const nextCaret = caretIndexAfterFormat(formatted, digitCaret, currency)
            el.setSelectionRange(nextCaret, nextCaret)
        })
    }

    const handleAmountChange = (raw: string) => {
        const input = fieldRef.current
        const caret = input?.selectionStart ?? raw.length
        const { digits, digitCaret } = reconcileAmountDigits(draftRef.current, raw, caret)

        if (!digits) {
            setDraftValue('')
            return
        }

        const parsed = Number(digits)
        if (!Number.isFinite(parsed)) return

        const formatted = formatAmount(parsed, currency)
        setDraftValue(formatted)

        const inRange =
            (typeof min !== 'number' || parsed >= min) &&
            (typeof max !== 'number' || parsed <= max)

        if (inRange && parsed !== value) onChange(parsed)

        placeCaret(formatted, digitCaret)
    }

    const handleAmountFocus = () => {
        isFocusedRef.current = true
        requestAnimationFrame(() => {
            const el = fieldRef.current
            if (!el) return
            const pos = caretAfterLastDigit(el.value)
            el.setSelectionRange(pos, pos)
        })
    }

    const handleAmountBlur = () => {
        isFocusedRef.current = false
        const parsed = parseAmount(draftRef.current)
        const fallback = typeof min === 'number' ? min : value
        commitAmount(parsed ?? fallback)
    }

    return (
        <div className={`${styles.rangeField}${className ? ` ${className}` : ''}`}>
            <Field
                ref={fieldRef}
                label={label}
                value={fieldValue}
                name={name}
                inputMode={isMarksMode ? undefined : 'numeric'}
                onChange={isMarksMode ? () => {} : handleAmountChange}
                onFocus={isMarksMode ? undefined : handleAmountFocus}
                onBlur={isMarksMode ? undefined : handleAmountBlur}
                className={styles.rangeSliderInput}
                isReadOnly={isReadOnly ?? isMarksMode}
                isDisabled={isDisabled}
            />
            <RangeSlider
                value={value}
                onChange={onChange}
                className={styles.rangeSlider}
                min={min}
                max={max}
                step={step}
                ariaLabel={ariaLabel}
                minLabel={minLabel}
                maxLabel={maxLabel}
                marks={marks}
            />
        </div>
    )
}
