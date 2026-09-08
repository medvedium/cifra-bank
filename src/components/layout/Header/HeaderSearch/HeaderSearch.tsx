'use client'

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import type { SiteSearch } from '@/lib/content/types'
import { CloseIcon, SearchIcon } from '@/components/ui/Icons'
import styles from './HeaderSearch.module.scss'

interface HeaderSearchProps {
    search: SiteSearch
}

export default function HeaderSearch({ search }: HeaderSearchProps) {
    const panelId = useId()
    const inputRef = useRef<HTMLInputElement>(null)
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')

    function close() {
        setOpen(false)
        setQuery('')
    }

    useEffect(() => {
        document.documentElement.classList.toggle('is-search-open', open)

        return () => {
            document.documentElement.classList.remove('is-search-open')
        }
    }, [open])

    useLayoutEffect(() => {
        if (!open) {
            return
        }

        const input = inputRef.current

        if (!input) {
            return
        }

        input.focus()

        if (document.activeElement === input) {
            return
        }

        const frame = window.requestAnimationFrame(() => {
            input.focus()
        })

        return () => window.cancelAnimationFrame(frame)
    }, [open])

    useEffect(() => {
        if (!open) {
            return
        }

        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                close()
            }
        }

        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [open])

    return (
        <div className={`${styles.search} ${open ? styles.searchOpen : ''}`}>
            <form action={search.action} method="get">
                <button
                    type="button"
                    className={styles.toggle}
                    aria-expanded={open}
                    aria-controls={panelId}
                    aria-label={search.toggleLabel}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => setOpen(true)}
                >
                    <SearchIcon />
                </button>

                <div className={styles.overlay} onClick={close} />

                <div className={styles.offcanvas} id={panelId}>
                    <div className={`container container--wide ${styles.offcanvasInner}`}>
                        <button type="submit" className={styles.submit} aria-label={search.submitLabel}>
                            <SearchIcon />
                        </button>
                        <input
                            ref={inputRef}
                            className={styles.input}
                            type="search"
                            name="q"
                            value={query}
                            placeholder={search.placeholder}
                            aria-label={search.toggleLabel}
                            autoComplete="off"
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <button
                            type="button"
                            className={`${styles.cancel} ${query ? styles.cancelVisible : ''}`}
                            aria-label={search.clearLabel}
                            tabIndex={query ? undefined : -1}
                            onClick={() => {
                                setQuery('')
                                inputRef.current?.focus()
                            }}
                        >
                            <CloseIcon />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
