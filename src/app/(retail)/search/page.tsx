import { Suspense } from 'react'
import { Metadata } from 'next'
import { getSearchPage, getSiteInfo } from '@/lib/content/loader'
import { getSearchIndex } from '@/lib/search/search'
import { buildPageMetadata } from '@/lib/seo/metadata'
import SearchPageLoader from '@/components/features/Search/SearchPageLoader'

export async function generateMetadata(): Promise<Metadata> {
    const page = await getSearchPage()
    return buildPageMetadata(page.seo, page.slug)
}

export default async function SearchRoute() {
    const [site, copy, index] = await Promise.all([getSiteInfo(), getSearchPage(), getSearchIndex()])

    return (
        <Suspense fallback={null}>
            <SearchPageLoader
                index={index}
                copy={copy}
                search={site.search}
                baseUrl={site.baseUrl}
            />
        </Suspense>
    )
}
