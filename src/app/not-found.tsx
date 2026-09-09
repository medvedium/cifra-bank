import NotFound from '@/components/features/NotFound'
import SiteShell from '@/components/layout/SiteShell'
import { getNotFoundPage } from '@/lib/content/loader'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
    const page = await getNotFoundPage()

    return buildPageMetadata(page.seo, page.slug)
}

export default async function NotFoundRoute() {
    const page = await getNotFoundPage()

    return (
        <SiteShell audience="retail">
            <NotFound page={page} />
        </SiteShell>
    )
}
