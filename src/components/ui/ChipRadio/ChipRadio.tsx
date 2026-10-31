'use client'

import styles from './ChipRadio.module.scss'
import { useRef } from 'react'

interface ChipRadioProps {
    options: { label: string; value: string }[]
    value: string
    onChange: (value: string) => void
    isWrap?: boolean
    ariaLabel?: string
    className?: string
}

export default function ChipRadio({ options, value, onChange, ariaLabel, className, isWrap }: ChipRadioProps) {
    const itemRefs = useRef<Array<HTMLButtonElement | null>>([])

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
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

        itemRefs.current[next]?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    }


    return (
        <div
            className={`${styles.chipRadio} ${isWrap ? styles.wrap : ''} ${className || ''}`}
            role="radiogroup"
            aria-label={ariaLabel}
        >
            {options.map((option, index) => (
                <button
                    className={`${styles.chipRadioButton} ${option.value === value ? styles.chipRadioButtonActive : ''}`}
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={option.value === value}
                    tabIndex={option.value === value ? 0 : -1}
                    onClick={() => onChange(option.value)}
                    ref={(node) => {
                        itemRefs.current[index] = node
                    }}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    )
}
