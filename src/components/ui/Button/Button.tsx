'use client'

import styles from './Button.module.scss'
import React from 'react'
import Link from 'next/link'

type ButtonColor = 'primary' | 'secondary' | 'white' | 'dark' | 'error'
type ButtonVariant = 'contained' | 'text'
type ButtonSize = 'large' | 'medium' | 'small'

interface ButtonProps {
    children: React.ReactNode
    color?: ButtonColor // default: 'primary'
    variant?: ButtonVariant // default: 'contained'
    size?: ButtonSize // default: 'large'
    disabled?: boolean
    loading?: boolean
    href?: string
    mobileHref?: string
    target?: '_self' | '_blank'
    type?: 'button' | 'submit'
    className?: string
    onClick?: () => void
    'aria-label'?: string
}

function ButtonSpinner({ compact = false }: { compact?: boolean }) {
    if (compact) {
        return (
            <svg
                className={styles.spinner}
                width={16}
                height={16}
                viewBox="0 0 16 16"
                overflow="visible"
                aria-hidden="true"
                focusable="false"
            >
                <circle
                    cx="8"
                    cy="8"
                    r="7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    opacity="0.3"
                />
                <path
                    d="M8 1C9.1977 1 10.3754 1.30731 11.4203 1.89253C12.4653 2.47775 13.3427 3.32131 13.9685 4.34251C14.5943 5.36371 14.9476 6.52841 14.9946 7.72518C15.0416 8.92195 14.7808 10.1108 14.237 11.1779C13.6933 12.2451 12.8848 13.1549 11.889 13.8203C10.8931 14.4857 9.74322 14.8845 8.54921 14.9784C7.35521 15.0724 6.15706 14.8584 5.06938 14.357C3.9817 13.8556 3.04087 13.0835 2.33688 12.1145"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                />
            </svg>
        )
    }

    return (
        <svg
            className={styles.spinner}
            width={24}
            height={24}
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
        >
            <circle
                cx="12"
                cy="12"
                r="9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                opacity="0.3"
            />
            <path
                d="M12 3C13.5055 3 14.9869 3.37766 16.3087 4.09841C17.6304 4.81915 18.7503 5.85995 19.5657 7.12552C20.3811 8.39108 20.866 9.84097 20.9759 11.3424C21.0859 12.8439 20.8175 14.349 20.1953 15.7199C19.573 17.0908 18.6168 18.2836 17.4142 19.1893C16.2116 20.095 14.801 20.6845 13.3116 20.9039C11.8222 21.1233 10.3015 20.9656 8.88884 20.4452C7.47616 19.9247 6.2166 19.0582 5.22548 17.925"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            />
        </svg>
    )
}

function ButtonContent({ loading, children }: { loading: boolean; children: React.ReactNode }) {
    if (!loading) return children

    return (
        <>
            <span
                className={styles.faceHidden}
                aria-hidden="true"
            >
                {children}
            </span>
            <span className="visually-hidden">{children}</span>
            <span className={styles.spinnerSlot}>
                <span className={styles.spinnerLarge}>
                    <ButtonSpinner />
                </span>
                <span className={styles.spinnerCompact}>
                    <ButtonSpinner compact />
                </span>
            </span>
        </>
    )
}

function ButtonLink({
    href,
    className,
    children,
    ariaLabel,
    ariaBusy,
    target,
    onClick
}: {
    href: string
    className: string
    children: React.ReactNode
    ariaLabel?: string
    ariaBusy?: boolean
    target?: '_self' | '_blank'
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
}) {
    const openInNewTab = target === '_blank' || (!target && href.startsWith('http'))

    if (openInNewTab || href.startsWith('http') || href.startsWith('#')) {
        return (
            <a
                className={className}
                href={href}
                target={openInNewTab ? '_blank' : undefined}
                rel={openInNewTab ? 'noopener noreferrer' : undefined}
                aria-label={ariaLabel}
                aria-busy={ariaBusy}
                onClick={onClick}
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
            aria-busy={ariaBusy}
            onClick={onClick}
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
        target,
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
        loading && styles.loading,
        className
    ]
        .filter(Boolean)
        .join(' ')
    const content = (
        <ButtonContent loading={loading}>
            {children}
        </ButtonContent>
    )
    const responsiveHref = href && mobileHref && mobileHref !== href ? mobileHref : undefined

    function handleClick(event: React.MouseEvent<HTMLElement>) {
        if (loading) {
            event.preventDefault()
            return
        }

        onClick?.()
    }

    if (!href || disabled) {
        return (
            <button
                className={buttonClassNames}
                disabled={disabled}
                onClick={handleClick}
                type={type}
                aria-disabled={disabled || undefined}
                aria-busy={loading || undefined}
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
                        ariaBusy={loading || undefined}
                        target={target}
                        onClick={handleClick}
                    >
                        {content}
                    </ButtonLink>
                </span>
                <span className={styles.mobileOnly}>
                    <ButtonLink
                        href={responsiveHref}
                        className={buttonClassNames}
                        ariaLabel={ariaLabel}
                        ariaBusy={loading || undefined}
                        target={target}
                        onClick={handleClick}
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
            ariaBusy={loading || undefined}
            target={target}
            onClick={handleClick}
        >
            {content}
        </ButtonLink>
    )
}
