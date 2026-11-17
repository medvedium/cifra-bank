'use client'

import { useEffect, useId, useState } from 'react'
import Link from 'next/link'
import LogoPrivate from '@/components/ui/LogoPrivate'
import Button from '@/components/ui/Button'
import TextLink from '@/components/ui/TextLink'
import styles from './HeaderPrivate.module.scss'

interface HeaderPrivateProps {
    menuItems: { id: string; label: string }[]
}

const topLinks = [
    { label: 'Инвестиции', href: 'https://cifra-broker.ru' },
    { label: 'банк', href: '/' },
    { label: 'Private Banking', href: '/private-banking' }
]

export default function HeaderPrivate({ menuItems }: HeaderPrivateProps) {
    const panelId = useId()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        document.documentElement.classList.toggle('is-mobile-open', open)
        return () => document.documentElement.classList.remove('is-mobile-open')
    }, [open])

    useEffect(() => {
        if (!open) return

        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') setOpen(false)
        }

        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [open])

    function closeMenu() {
        setOpen(false)
    }

    return (
        <header className={styles.header}>
            <div className={styles.topbar}>
                <div className={`container ${styles.barInner}`}>
                    <Link
                        href="/private-banking"
                        className={styles.logo}
                        aria-label="Цифра private"
                        onClick={closeMenu}
                    >
                        <LogoPrivate />
                    </Link>

                    <nav
                        className={`${styles.topNavigation} ${styles.desktopOnly}`}
                        aria-label="Разделы группы"
                    >
                        {topLinks.map((link) => (
                            <TextLink
                                key={link.href}
                                href={link.href}
                                className={`${styles.topLink} ${link.href === '/private-banking' ? styles.active : ''}`}
                            >
                                {link.label}
                            </TextLink>
                        ))}
                    </nav>

                    <Button
                        color="primary"
                        variant="outline"
                        size="medium"
                        className={`${styles.cta} ${styles.desktopOnly}`}
                    >
                        Получить консультацию
                    </Button>

                    <button
                        type="button"
                        className={styles.menuToggle}
                        aria-expanded={open}
                        aria-controls={panelId}
                        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
                        onClick={() => setOpen((value) => !value)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </div>

            <div className={styles.subbar}>
                <div className={`container ${styles.barInner}`}>
                    <nav
                        className={`${styles.topNavigation} ${styles.mobileOnly}`}
                        aria-label="Разделы группы"
                    >
                        {topLinks.map((link) => (
                            <TextLink
                                key={link.href}
                                href={link.href}
                                className={`${styles.topLink} ${link.href === '/private-banking' ? styles.active : ''}`}
                            >
                                {link.label}
                            </TextLink>
                        ))}
                    </nav>

                    <nav
                        className={`${styles.mainNavigation} ${styles.desktopOnly}`}
                        aria-label="Разделы Private Banking"
                    >
                        {menuItems.map((item) => (
                            <Link
                                key={item.id}
                                href={`/private-banking#${item.id}`}
                                className={styles.mainLink}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            <div
                id={panelId}
                className={styles.panel}
                hidden={!open}
            >
                <nav
                    className={styles.panelNav}
                    aria-label="Разделы Private Banking"
                >
                    {menuItems.map((item) => (
                        <Link
                            key={item.id}
                            href={`/private-banking#${item.id}`}
                            className={styles.panelLink}
                            onClick={closeMenu}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <Button
                    color="primary"
                    variant="outline"
                    size="medium"
                    className={styles.cta}
                    onClick={closeMenu}
                >
                    Получить консультацию
                </Button>
            </div>
        </header>
    )
}
