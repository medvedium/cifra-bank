import type { ReactNode } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getNavigation, getSiteInfo } from '@/lib/content/loader'

interface SiteShellProps {
    children: ReactNode
    audience: string
}

export default async function SiteShell ({ audience, children }: SiteShellProps) {
    const altAudience = audience === 'retail' ? 'corporate' : 'retail'
    const [site, navigation, altNavigation] = await Promise.all([
        getSiteInfo(),
        getNavigation(audience),
        getNavigation(altAudience)
    ])
    return (
        <>
            <Header navigation={navigation} altNavigation={altNavigation} site={site} audience={audience} />
            <main className={"main"}>
                {children}
            </main>
            <Footer navigation={navigation} site={site} audience={audience} />
        </>

    )
}