import { getSearchPage, getSiteInfo } from '@/lib/content/loader'
import { getSearchHits, SEARCH_PAGE_SIZE } from '@/lib/search/search'
import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'
import SearchPage from '@/components/features/Search'

interface SearchRouteProps {
    searchParams: Promise<{
        q?: string | string[]
        page?: string | string[]
    }>
}

function firstParam(value?: string | string[]) {
    return (Array.isArray(value) ? value[0] : value)?.trim() ?? ''
}

export async function generateMetadata({ searchParams }: SearchRouteProps): Promise<Metadata> {
    const [params, page] = await Promise.all([searchParams, getSearchPage()])
    const query = firstParam(params.q)
    const title = query ? `${page.seo.title}: ${query}` : page.seo.title

    return buildPageMetadata(
        {
            title,
            description: page.seo.description
        },
        page.slug
    )
}

export default async function SearchRoute({ searchParams }: SearchRouteProps) {
    const [params, site, copy] = await Promise.all([searchParams, getSiteInfo(), getSearchPage()])
    const query = firstParam(params.q)
    const requestedPage = Number.parseInt(firstParam(params.page), 10)
    //TODO заменить локальный моковый эндпоинт на боевой
    const hits = await getSearchHits(query)
    const totalPages = Math.max(1, Math.ceil(hits.length / SEARCH_PAGE_SIZE))
    const page = Number.isFinite(requestedPage) && requestedPage > 0 ? Math.min(requestedPage, hits.length ? totalPages : 1) : 1

    return <SearchPage query={query} page={page} hits={hits} copy={copy} search={site.search} baseUrl={site.baseUrl} />
}
