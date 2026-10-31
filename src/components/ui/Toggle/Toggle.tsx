'use client'

import styles from './Toggle.module.scss'

interface ToggleProps {
    checked?: boolean
    onChange: (checked: boolean) => void
    label: string
    extra?: string
    className?: string
}

export default function Toggle({ checked, onChange, label, extra, className }: ToggleProps) {
    return (
        <button
            className={`${styles.toggle} ${checked ? styles.checked : ''} ${className || ''}`}
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onChange(!checked)}
        >
            <span className={styles.toggleVisual}></span>
            <span className={styles.toggleLabel}>{label}</span>
            {extra && <span className={styles.toggleExtra}>{extra}</span>}
        </button>
    )
}
