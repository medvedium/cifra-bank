import { Metadata } from 'next'
import { getServicePackagesPage, getSiteInfo } from '@/lib/content/loader'
import { buildPageMetadata } from '@/lib/seo/metadata'
import Hero from '@/components/features/Hero'
import SiteShell from '@/components/layout/SiteShell'
import ServicePackagesTabsSection from '@/components/features/ServicePackages/ServicePackagesTabsSection'

export async function generateMetadata(): Promise<Metadata> {
    const page = await getServicePackagesPage()
    return buildPageMetadata(page.seo, page.slug)
}

export default async function ServicePackagesPage() {
    const [site, page] = await Promise.all([getSiteInfo(), getServicePackagesPage()])

    return (
        <SiteShell audience="retail">
            <h1 className="visually-hidden">{site.name}</h1>

            <Hero slides={page.hero.items} />

            <section className="section">
                <div className="container">
                    <ServicePackagesTabsSection tabs={page.tabs} cards={page.cards.items} defaultId={'digital'} tabContent={page.tabContent} />
                </div>
            </section>
        </SiteShell>
    )
}
