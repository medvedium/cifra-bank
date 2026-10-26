'use client';

import styles from './Switch.module.scss'
import { useRef } from 'react'

interface SwitchOption {
    label: string
    value: string
}

interface SwitchProps {
    options: SwitchOption[]
    value: string
    onChange: (value: string) => void
    ariaLabel?: string
    className?: string
}

export default function Switch({ options, value, onChange, ariaLabel, className }: SwitchProps) {
    const itemRefs = useRef<Array<HTMLButtonElement | null>>([])

    function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
        const last = options.length - 1
        let next = index

        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            next = index === last ? 0 : index + 1
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            next = index === 0 ? last : index - 1
        } else {
            return
        }

        event.preventDefault()
        onChange(options[next].value)
        itemRefs.current[next]?.focus()
    }

    return (
        <div
            className={`${styles.switch} ${className || ''}`}
            role="radiogroup"
            aria-label={ariaLabel}
        >
            {options.map((option, index) => (
                <button
                    className={`${styles.switch__item} ${option.value === value ? styles.active : ''}`}
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={option.value === value}
                    tabIndex={option.value === value ? 0 : -1}
                    onClick={() => onChange(option.value)}
                    ref={(node) => { itemRefs.current[index] = node }}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    )
}
