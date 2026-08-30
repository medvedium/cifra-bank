import type { ReactNode } from 'react'
import Link from 'next/link'

interface TextLinkProps {
    href: string
    className?: string
    children: ReactNode
    'aria-label'?: string
}

export default function TextLink({ href, className, children, 'aria-label': ariaLabel }: TextLinkProps) {
    if (href.startsWith('http')) {
        return (
            <a className={className} href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
                {children}
            </a>
        )
    }

    if (href.startsWith('mailto:') || href.startsWith('tel:')) {
        return (
            <a className={className} href={href} aria-label={ariaLabel}>
                {children}
            </a>
        )
    }

    return (
        <Link className={className} href={href} aria-label={ariaLabel}>
            {children}
        </Link>
    )
}
