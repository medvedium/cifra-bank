import { Metadata } from 'next'
import { getServicePackagesPage, getSiteInfo } from '@/lib/content/loader'
import { buildPageMetadata } from '@/lib/seo/metadata'
import Hero from '@/components/features/Hero'
import SiteShell from '@/components/layout/SiteShell'
import CardTabsSection from '@/components/features/CardTabsSection'

export async function generateMetadata(): Promise<Metadata> {
    const page = await getServicePackagesPage()
    return buildPageMetadata(page.seo, page.slug)
}

export default async function ServicePackagesPage() {
    const [site, page] = await Promise.all([getSiteInfo(), getServicePackagesPage()])
    console.log('Generated page', page)

    return (
        <SiteShell audience="retail">
            <h1 className="visually-hidden">{site.name}</h1>

            <Hero slides={page.hero.items} />

            <section className="section">
                <div className="container">
                    <CardTabsSection tabs={page.cards.tabs} cards={page.cards.items} defaultId={'digital'} />
                </div>
            </section>
        </SiteShell>
    )
}
