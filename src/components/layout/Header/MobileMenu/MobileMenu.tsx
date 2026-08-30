'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import type { AudienceItem, MainMenuItem, MenuItem } from '@/lib/content/types'
import TextLink from '@/components/ui/TextLink'
import Button from '@/components/ui/Button'
import { ChevronIcon, InternetBankIcon, PinIcon } from '@/components/ui/Icons'
import styles from './MobileMenu.module.scss'

interface MobileMenuProps {
    audience: string
    audienceItems: AudienceItem[]
    menus: Record<string, MainMenuItem[]>
    offices?: MenuItem
    internet?: MenuItem
    openAccount?: MenuItem
}

function flattenColumns(item: MainMenuItem) {
    return item.dropdown?.columns.flat() ?? []
}

export default function MobileMenu({ audience, audienceItems, menus, offices, internet, openAccount }: MobileMenuProps) {
    const panelId = useId()
    const pathname = usePathname()
    const panelRef = useRef<HTMLDivElement>(null)
    const [menuPathname, setMenuPathname] = useState(pathname)
    const [open, setOpen] = useState(false)
    const [tab, setTab] = useState(audience)
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    if (pathname !== menuPathname) {
        setMenuPathname(pathname)
        setOpen(false)
        setOpenIndex(null)
        setTab(audience)
    }

    useEffect(() => {
        document.documentElement.classList.toggle('is-mobile-open', open)

        if (open) {
            panelRef.current?.scrollTo(0, 0)
        }

        return () => {
            document.documentElement.classList.remove('is-mobile-open')
        }
    }, [open])

    useEffect(() => {
        if (!open) {
            return
        }

        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setOpen(false)
                setOpenIndex(null)
            }
        }

        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [open])

    const items = menus[tab] ?? []

    return (
        <div className={styles.root}>
            <button
                type="button"
                className={styles.toggle}
                aria-expanded={open}
                aria-controls={panelId}
                aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
                onClick={() => {
                    setOpen((current) => !current)
                    setOpenIndex(null)
                }}
            >
                <span />
                <span />
                <span />
            </button>

            <div className={styles.panel} id={panelId} ref={panelRef} hidden={!open}>
                <div className={styles.switch} role="tablist" aria-label="Тип клиента">
                    {audienceItems.map((item) => (
                        <button
                            type="button"
                            role="tab"
                            key={item.id}
                            className={`${styles.switchBtn} ${tab === item.id ? styles.switchBtnActive : ''}`}
                            aria-selected={tab === item.id}
                            onClick={() => {
                                setTab(item.id)
                                setOpenIndex(null)
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <ul className={styles.nav}>
                    {items.map((item, index) => {
                        const links = flattenColumns(item)
                        const isOpen = openIndex === index

                        if (links.length === 0) {
                            return (
                                <li key={item.label}>
                                    {item.href ? (
                                        <TextLink className={styles.navLink} href={item.href}>
                                            {item.label}
                                        </TextLink>
                                    ) : (
                                        <span className={styles.navLink}>{item.label}</span>
                                    )}
                                </li>
                            )
                        }

                        return (
                            <li key={item.label} className={isOpen ? styles.navItemOpen : undefined}>
                                <button
                                    type="button"
                                    className={styles.navLink}
                                    aria-expanded={isOpen}
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                >
                                    {item.label}
                                    <ChevronIcon />
                                </button>
                                <ul className={styles.dropdown} hidden={!isOpen}>
                                    {links.map((link) => (
                                        <li key={link.href}>
                                            <TextLink className={styles.dropdownLink} href={link.href}>
                                                {link.label}
                                                {link.mark ? <span className={styles.mark}>{link.mark}</span> : null}
                                            </TextLink>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        )
                    })}
                </ul>

                {offices ? (
                    <TextLink className={styles.location} href={offices.href}>
                        <PinIcon />
                        {offices.label}
                    </TextLink>
                ) : null}

                <div className={styles.additional}>
                    {openAccount ? (
                        <div className={styles.action}>
                            <Button href={openAccount.href || undefined} color="primary" size="xs">
                                {openAccount.label}
                            </Button>
                        </div>
                    ) : null}

                    {internet ? (
                        <div className={styles.online}>
                            <Button href={internet.href} color="secondary" size="xs">
                                <InternetBankIcon />
                                {internet.label}
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
