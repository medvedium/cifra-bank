import styles from './Button.module.scss'
import React from 'react'
import Link from 'next/link'

type ButtonColor = 'primary' | 'secondary' | 'white'
type ButtonVariant = 'contained' | 'text'
type ButtonSize = 'large' | 'small' | 'xs'

interface ButtonProps {
    children: React.ReactNode
    color?: ButtonColor // default: 'primary'
    variant?: ButtonVariant // default: 'contained'
    size?: ButtonSize // default: 'large'
    disabled?: boolean
    loading?: boolean // бонус, если успеешь
    href?: string
    type?: 'button' | 'submit'
    className?: string
    onClick?: () => void
    'aria-label'?: string
}

export default function Button(props: ButtonProps) {
    const { children, color = 'primary', variant = 'contained', size = 'large', disabled = false, loading = false, href, type = 'button', className = '', onClick, 'aria-label': ariaLabel } = props

    const buttonClassNames = [styles.button, styles[size], styles[variant], styles[color], disabled && styles.disabled, className].filter(Boolean).join(' ')

    return (!href || disabled) ? (
        <button className={buttonClassNames} disabled={disabled} onClick={onClick} type={type} aria-disabled={disabled} aria-label={ariaLabel}>
            {loading ? '...' : children}
        </button>
    ) : href.startsWith('http') ? (
        <a className={buttonClassNames} href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
            {loading ? '...' : children}
        </a>
    ) : (
        <Link className={buttonClassNames} href={href} aria-label={ariaLabel}>
            {loading ? '...' : children}
        </Link>
    )
}
