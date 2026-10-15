'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import type { SearchPage as SearchPageContent, SiteSearch } from '@/lib/content/types'
import { SEARCH_PAGE_SIZE, filterSearchHits, type SearchIndexEntry } from '@/lib/search/helpers'
import SearchPage from './SearchPage'

interface SearchPageLoaderProps {
    index: SearchIndexEntry[]
    copy: SearchPageContent
    search: SiteSearch
    baseUrl: string
}

export default function SearchPageLoader({ index, copy, search, baseUrl }: SearchPageLoaderProps) {
    const searchParams = useSearchParams()
    const query = (searchParams.get('q') ?? '').trim()
    const requestedPage = Number.parseInt(searchParams.get('page') ?? '1', 10)

    const hits = useMemo(() => filterSearchHits(index, query), [index, query])
    const totalPages =  Math.max(1, Math.ceil(hits.length / SEARCH_PAGE_SIZE))
    const page =
        Number.isFinite(requestedPage) && requestedPage > 0 ? Math.min(requestedPage, hits.length ? totalPages : 1) : 1

    return (
        <SearchPage
            query={query}
            page={page}
            hits={hits}
            copy={copy}
            search={search}
            baseUrl={baseUrl}
        />
    )
}
