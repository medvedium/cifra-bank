'use client'

import { forwardRef, type FocusEventHandler } from 'react'
import styles from './Field.module.scss'

interface FieldProps {
    label: string
    value: string
    name: string
    type?: string
    inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
    onChange: (value: string) => void
    onBlur?: FocusEventHandler<HTMLInputElement>
    onFocus?: FocusEventHandler<HTMLInputElement>
    isDisabled?: boolean
    isReadOnly?: boolean
    className?: string
}

const Field = forwardRef<HTMLInputElement, FieldProps>(function Field(
    {
        label,
        value,
        name,
        type,
        inputMode,
        onChange,
        onBlur,
        onFocus,
        isDisabled,
        isReadOnly,
        className
    },
    ref
) {
    return (
        <label className={`${styles.input} ${className ? className : ''}`}>
            <input
                ref={ref}
                type={type ? type : 'text'}
                inputMode={inputMode}
                disabled={!!isDisabled}
                readOnly={!!isReadOnly}
                value={value}
                name={name}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                onFocus={onFocus}
                className={styles.inputField}
                placeholder={label}
            />
            <span className={styles.inputLabel}>{label}</span>
        </label>
    )
})

export default Field
