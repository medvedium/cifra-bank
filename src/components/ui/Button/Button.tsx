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
    mobileHref?: string
    type?: 'button' | 'submit'
    className?: string
    onClick?: () => void
    'aria-label'?: string
}

function ButtonLink({
    href,
    className,
    children,
    ariaLabel
}: {
    href: string
    className: string
    children: React.ReactNode
    ariaLabel?: string
}) {
    if (href.startsWith('http')) {
        return (
            <a
                className={className}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ariaLabel}
            >
                {children}
            </a>
        )
    }

    return (
        <Link
            className={className}
            href={href}
            aria-label={ariaLabel}
        >
            {children}
        </Link>
    )
}

export default function Button(props: ButtonProps) {
    const {
        children,
        color = 'primary',
        variant = 'contained',
        size = 'large',
        disabled = false,
        loading = false,
        href,
        mobileHref,
        type = 'button',
        className = '',
        onClick,
        'aria-label': ariaLabel
    } = props

    const buttonClassNames = [
        styles.button,
        styles[size],
        styles[variant],
        styles[color],
        disabled && styles.disabled,
        className
    ]
        .filter(Boolean)
        .join(' ')
    const content = loading ? '...' : children
    const responsiveHref = href && mobileHref && mobileHref !== href ? mobileHref : undefined

    if (!href || disabled) {
        return (
            <button
                className={buttonClassNames}
                disabled={disabled}
                onClick={onClick}
                type={type}
                aria-disabled={disabled}
                aria-label={ariaLabel}
            >
                {content}
            </button>
        )
    }

    if (responsiveHref) {
        return (
            <span className={styles.hrefSwitch}>
                <span className={styles.desktopOnly}>
                    <ButtonLink
                        href={href}
                        className={buttonClassNames}
                        ariaLabel={ariaLabel}
                    >
                        {content}
                    </ButtonLink>
                </span>
                <span className={styles.mobileOnly}>
                    <ButtonLink
                        href={responsiveHref}
                        className={buttonClassNames}
                        ariaLabel={ariaLabel}
                    >
                        {content}
                    </ButtonLink>
                </span>
            </span>
        )
    }

    return (
        <ButtonLink
            href={href}
            className={buttonClassNames}
            ariaLabel={ariaLabel}
        >
            {content}
        </ButtonLink>
    )
}
