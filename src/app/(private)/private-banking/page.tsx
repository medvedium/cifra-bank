import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { getPrivateBankingPage } from '@/lib/content/loader'
import Link from 'next/link'
import HeroPrivate from '@/components/features/HeroPrivate'

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPrivateBankingPage()
    return buildPageMetadata(page.seo, page.slug)
}

export default async function Home() {
    const page = await getPrivateBankingPage()

    return (
        <>
            <HeroPrivate
                data-header="overlay"
                heroItem={page.hero}
            />
            <div className="container">
                <ul>
                    {page.partners.map((partner) => (
                        <li key={partner.slug}>
                            <Link
                                style={{ color: 'var(--color-foreground)' }}
                                href={`/partners/${partner.slug}`}
                            >
                                {partner.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
