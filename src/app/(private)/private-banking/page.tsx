import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { getPrivateBankingPage, getSiteInfo } from '@/lib/content/loader'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPrivateBankingPage()
    return buildPageMetadata(page.seo, page.slug)
}

export default async function Home() {
    const [site, page] = await Promise.all([getSiteInfo(), getPrivateBankingPage()])

    return (
        <div className="container" data-header="overlay">
            <h1>{page.seo.title}</h1>
            <p>{page.seo.description}</p>

            <p>{site.name}</p>

            <ul>
                {page.partners.map((partner) => (
                    <li key={partner.slug}>
                        <Link style={{color: "var(--color-foreground)"}} href={`/partners/${partner.slug}`}>{partner.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
