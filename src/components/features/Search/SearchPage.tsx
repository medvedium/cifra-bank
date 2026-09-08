'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import TextLink from '@/components/ui/TextLink'
import { ArrowRightIcon, CloseIcon, SearchIcon } from '@/components/ui/Icons'
import type { SearchHit, SearchPage as SearchPageContent, SiteSearch } from '@/lib/content/types'
import { SEARCH_PAGE_SIZE, displaySearchUrl, formatSearchCount, getPageTokens } from '@/lib/search/helpers'
import styles from './SearchPage.module.scss'

interface SearchPageProps {
    query: string
    page: number
    hits: SearchHit[]
    copy: SearchPageContent
    search: SiteSearch
    baseUrl: string
}

function searchHref(action: string, query: string, page?: number) {
    const params = new URLSearchParams()

    if (query) {
        params.set('q', query)
    }

    if (page && page > 1) {
        params.set('page', String(page))
    }

    const search = params.toString()

    return search ? `${action}?${search}` : action
}

export default function SearchPage({ query, page, hits, copy, search, baseUrl }: SearchPageProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState(query)
    const [extra, setExtra] = useState(0)

    useEffect(() => {
        setValue(query)
        setExtra(0)
    }, [query, page])

    const total = hits.length
    const start = (page - 1) * SEARCH_PAGE_SIZE
    const visible = hits.slice(start, start + SEARCH_PAGE_SIZE + extra)
    const totalPages = Math.max(1, Math.ceil(total / SEARCH_PAGE_SIZE))
    const canLoadMore = total > SEARCH_PAGE_SIZE && start + visible.length < total
    const showResults = Boolean(query)
    const isEmpty = showResults && total === 0
    const showPagination = showResults && total > 0

    return (
        <section className={`${styles.page} ${isEmpty ? styles.pageEmpty : ''}`}>
            <div className="container container--wide">
                <h1 className="visually-hidden">{copy.heading}</h1>

                <form className={styles.form} action={search.action} method="get">
                    <div className={styles.field}>
                        <input
                            ref={inputRef}
                            className={styles.input}
                            type="search"
                            name="q"
                            value={value}
                            placeholder={search.placeholder}
                            aria-label={copy.heading}
                            autoComplete="off"
                            onChange={(event) => setValue(event.target.value)}
                        />
                        <button
                            type="button"
                            className={`${styles.clear} ${value ? styles.clearVisible : ''}`}
                            aria-label={search.clearLabel}
                            tabIndex={value ? undefined : -1}
                            onClick={() => {
                                setValue('')
                                inputRef.current?.focus()
                            }}
                        >
                            <CloseIcon />
                        </button>
                    </div>
                    <Button type="submit" className={styles.submit}>
                        {copy.submitLabel}
                    </Button>
                </form>

                {showResults && total > 0 ? <p className={styles.count}>{formatSearchCount(total, copy.countPrefix, copy.variants)}</p> : null}

                {isEmpty ? (
                    <div className={styles.empty} role="status">
                        <span className={styles.emptyIcon}>
                            <SearchIcon />
                        </span>
                        <p className={styles.emptyText}>{copy.empty}</p>
                    </div>
                ) : null}

                {visible.length > 0 ? (
                    <ul className={styles.list}>
                        {visible.map((hit) => (
                            <li key={`${hit.href}-${hit.title}`} className={styles.item}>
                                <div className={styles.text}>
                                    <h2 className={styles.title}>
                                        <TextLink href={hit.href} className={styles.titleLink}>
                                            {hit.title}
                                        </TextLink>
                                    </h2>
                                    <p className={styles.category}>{hit.category}</p>
                                </div>
                                <TextLink href={hit.href} className={styles.url}>
                                    {displaySearchUrl(baseUrl, hit.href)}
                                </TextLink>
                            </li>
                        ))}
                    </ul>
                ) : null}

                {showPagination ? (
                    <div className={`${styles.footer} ${canLoadMore ? '' : styles.footerCompact}`}>
                        {canLoadMore ? (
                            <Button type="button" className={styles.loadMore} onClick={() => setExtra((current) => current + SEARCH_PAGE_SIZE)}>
                                {copy.loadMore}
                            </Button>
                        ) : null}

                        <nav className={styles.pagination} aria-label="Страницы результатов">
                            {page > 1 ? (
                                <Link className={styles.pageArrow} href={searchHref(search.action, query, page - 1)} aria-label={copy.prevPageLabel}>
                                    <ArrowRightIcon />
                                </Link>
                            ) : (
                                <span className={`${styles.pageArrow} ${styles.pageArrowDisabled}`} aria-disabled="true">
                                    <ArrowRightIcon />
                                </span>
                            )}

                            {getPageTokens(page, totalPages).map((token, index) =>
                                token === 'ellipsis' ? (
                                    <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                                        …
                                    </span>
                                ) : (
                                    <Link
                                        key={token}
                                        className={`${styles.pageNumber} ${token === page ? styles.pageNumberActive : ''}`}
                                        href={searchHref(search.action, query, token)}
                                        aria-current={token === page ? 'page' : undefined}
                                    >
                                        {token}
                                    </Link>
                                )
                            )}

                            {page < totalPages ? (
                                <Link className={`${styles.pageArrow} ${styles.pageArrowNext}`} href={searchHref(search.action, query, page + 1)} aria-label={copy.nextPageLabel}>
                                    <ArrowRightIcon />
                                </Link>
                            ) : (
                                <span className={`${styles.pageArrow} ${styles.pageArrowNext} ${styles.pageArrowDisabled}`} aria-disabled="true">
                                    <ArrowRightIcon />
                                </span>
                            )}
                        </nav>
                    </div>
                ) : null}
            </div>
        </section>
    )
}
