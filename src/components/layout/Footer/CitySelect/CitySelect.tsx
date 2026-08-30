'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { ChevronIcon, SearchIcon } from '@/components/ui/Icons'
import styles from './CitySelect.module.scss'

interface CitySelectProps {
    current: string
    items: string[]
    searchPlaceholder: string
}

export default function CitySelect({ current, items, searchPlaceholder }: CitySelectProps) {
    const listId = useId()
    const rootRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState(current)

    const filtered = useMemo(() => {
        const needle = query.trim().toLowerCase()

        if (!needle) {
            return items
        }

        return items.filter((city) => city.toLowerCase().includes(needle))
    }, [items, query])

    useEffect(() => {
        if (!open) {
            return
        }

        function onPointerDown(event: PointerEvent) {
            if (!rootRef.current?.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setOpen(false)
            }
        }

        document.addEventListener('pointerdown', onPointerDown)
        document.addEventListener('keydown', onKeyDown)

        return () => {
            document.removeEventListener('pointerdown', onPointerDown)
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [open])

    return (
        <div className={`${styles.city} ${open ? styles.cityOpen : ''}`} ref={rootRef}>
            {open ? <div className={styles.cityOverlay} /> : null}
            <button
                type="button"
                className={styles.cityToggle}
                aria-expanded={open}
                aria-controls={listId}
                onClick={() => setOpen((value) => !value)}
            >
                <span>{selected}</span>
                <ChevronIcon />
            </button>
            <div className={styles.cityPanel} id={listId} hidden={!open}>
                <form className={styles.citySearch} onSubmit={(event) => event.preventDefault()}>
                    <input
                        className={styles.citySearchInput}
                        type="search"
                        value={query}
                        placeholder={searchPlaceholder}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <span className={styles.citySearchIcon}>
                        <SearchIcon />
                    </span>
                </form>
                <ul className={styles.cityMenu}>
                    {filtered.map((city) => (
                        <li key={city}>
                            <button
                                type="button"
                                className={`${styles.cityLink} ${city === selected ? styles.cityLinkActive : ''}`}
                                onClick={() => {
                                    setSelected(city)
                                    setQuery('')
                                    setOpen(false)
                                }}
                            >
                                {city}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
