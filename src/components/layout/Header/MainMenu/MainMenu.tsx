'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import type { MainMenuItem } from '@/lib/content/types'
import TextLink from '@/components/ui/TextLink'
import styles from './MainMenu.module.scss'

const HOVER_QUERY = '(hover: hover) and (pointer: fine)'
const CLOSE_DELAY_MS = 200

interface MainMenuProps {
    items: MainMenuItem[]
}

function canHover() {
    return window.matchMedia(HOVER_QUERY).matches
}

export default function MainMenu({ items }: MainMenuProps) {
    const baseId = useId()
    const pathname = usePathname()
    const rootRef = useRef<HTMLUListElement>(null)
    const closeTimeoutRef = useRef<number | null>(null)
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const [menuPathname, setMenuPathname] = useState(pathname)

    function cancelClose() {
        if (closeTimeoutRef.current !== null) {
            window.clearTimeout(closeTimeoutRef.current)
            closeTimeoutRef.current = null
        }
    }

    function openAt(index: number) {
        cancelClose()
        setOpenIndex(index)
    }

    function scheduleClose() {
        cancelClose()
        closeTimeoutRef.current = window.setTimeout(() => {
            setOpenIndex(null)
            closeTimeoutRef.current = null
        }, CLOSE_DELAY_MS)
    }

    if (pathname !== menuPathname) {
        setMenuPathname(pathname)
        setOpenIndex(null)
    }

    useEffect(() => {
        return () => cancelClose()
    }, [pathname])

    useEffect(() => {
        if (openIndex === null) {
            return
        }

        function onPointerDown(event: globalThis.PointerEvent) {
            if (!rootRef.current?.contains(event.target as Node)) {
                cancelClose()
                setOpenIndex(null)
            }
        }

        function onKeyDown(event: KeyboardEvent) {
            if (event.key !== 'Escape') {
                return
            }

            const trigger = rootRef.current?.querySelector<HTMLButtonElement>(`button[data-menu-index="${openIndex}"]`)
            cancelClose()
            setOpenIndex(null)
            trigger?.focus()
        }

        document.addEventListener('pointerdown', onPointerDown)
        document.addEventListener('keydown', onKeyDown)

        return () => {
            document.removeEventListener('pointerdown', onPointerDown)
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [openIndex])

    return (
        <ul className={styles.menuList} ref={rootRef}>
            {items.map((item, index) => {
                const isOpen = openIndex === index
                const triggerId = `${baseId}-trigger-${index}`
                const panelId = `${baseId}-panel-${index}`

                return (
                    <li
                        className={styles.menuItem}
                        key={item.label}
                        onMouseEnter={() => {
                            if (!canHover()) {
                                return
                            }

                            if (item.dropdown) {
                                openAt(index)
                                return
                            }

                            cancelClose()
                            setOpenIndex(null)
                        }}
                        onMouseLeave={() => {
                            if (!canHover()) {
                                return
                            }

                            scheduleClose()
                        }}
                        onBlur={(event) => {
                            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                                cancelClose()
                                setOpenIndex(null)
                            }
                        }}
                    >
                        {item.dropdown ? (
                            <>
                                <button
                                    type="button"
                                    className={styles.menuTrigger}
                                    id={triggerId}
                                    data-menu-index={index}
                                    aria-expanded={isOpen}
                                    aria-controls={panelId}
                                    onClick={() => {
                                        if (canHover()) {
                                            openAt(index)
                                            return
                                        }

                                        setOpenIndex(isOpen ? null : index)
                                    }}
                                >
                                    {item.label}
                                </button>
                                <div className={styles.dropdown} id={panelId} hidden={!isOpen}>
                                    <div className={`container ${styles.dropdownInner}`}>
                                        <div className={styles.dropdownMain}>
                                            <span className={styles.dropdownTitle}>{item.label}</span>
                                            <div className={styles.dropdownColumns}>
                                                {item.dropdown.columns.map((column, columnIndex) => (
                                                    <ul className={styles.dropdownColumn} key={columnIndex}>
                                                        {column.map((link) => (
                                                            <li key={link.href}>
                                                                <TextLink className={styles.dropdownLink} href={link.href}>
                                                                    {link.label}
                                                                </TextLink>
                                                                {link.mark ? <span className={styles.menuMark}>{link.mark}</span> : null}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ))}
                                            </div>
                                        </div>
                                        {item.dropdown.aside ? (
                                            <div className={styles.dropdownAside}>
                                                <span className={styles.dropdownTitle}>{item.dropdown.aside.title}</span>
                                                <ul className={styles.dropdownColumn}>
                                                    {item.dropdown.aside.links.map((link) => (
                                                        <li key={link.href}>
                                                            <TextLink className={styles.dropdownLink} href={link.href}>
                                                                {link.label}
                                                            </TextLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </>
                        ) : item.href ? (
                            <TextLink className={styles.menuLink} href={item.href}>
                                {item.label}
                            </TextLink>
                        ) : (
                            <span className={styles.menuLink}>{item.label}</span>
                        )}
                    </li>
                )
            })}
        </ul>
    )
}
