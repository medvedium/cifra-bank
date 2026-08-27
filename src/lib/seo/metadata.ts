import type { Seo } from '@/lib/content/types'
import { Metadata } from 'next'
import { getSiteInfo } from '@/lib/content/loader'

export async function buildPageMetadata(seo: Seo, slug: string): Promise<Metadata> {
    const site = await getSiteInfo()
    const url = `${site.baseUrl}${slug}`

    return {
        title: seo.title,
        description: seo.description,
        alternates: {
            canonical: url
        },
        openGraph: {
            title: seo.title,
            description: seo.description,
            url,
            siteName: site.name,
            locale: 'ru_RU',
            type: 'website'
        }
    }
}
