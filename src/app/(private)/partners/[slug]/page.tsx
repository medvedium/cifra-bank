import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { getPrivateBankingPage } from '@/lib/content/loader'
import { buildPageMetadata } from '@/lib/seo/metadata'
import type { PrivatePartner } from '@/lib/content/types'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type PartnerPageProps = {
    params: Promise<{ slug: string }>
}

export const dynamicParams = false

async function findPartner(slug: string): Promise<PrivatePartner | undefined> {
    const page = await getPrivateBankingPage()
    return page.partners.find((partner) => partner.slug === slug)
}

export async function generateStaticParams() {
    const page = await getPrivateBankingPage()
    return page.partners.map((partner) => ({ slug: partner.slug }))
}

export async function generateMetadata({ params }: PartnerPageProps): Promise<Metadata> {
    const { slug } = await params
    const partner = await findPartner(slug)

    if (!partner) {
        notFound()
    }

    return buildPageMetadata(
        {
            title: `${partner.title} | «Цифра банк»`,
            description: `${partner.title}. ${partner.partnerName}.`
        },
        `/partners/${partner.slug}`
    )
}

export default async function PartnerPage({ params }: PartnerPageProps) {
    const { slug } = await params
    const partner = await findPartner(slug)

    if (!partner) {
        notFound()
    }

    return (
        <>
            <Breadcrumbs
                wide={false}
                items={[
                    { label: 'Главная', href: '/private-banking' },
                    { label: 'Партнеры', href: '/private-banking#partnery' },
                    { label: partner.title }
                ]}
            />
            <div className="container">
                <h1>{partner.title}</h1>
                <p>{partner.partnerName}</p>
            </div>
        </>
    )
}
