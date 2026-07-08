import type { ReactNode } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getNavigation, getSiteInfo } from '@/lib/content/loader'

interface SiteShellProps {
    children: ReactNode
    audience: "retail"
}

export default async function SiteShell ({ audience, children }: SiteShellProps) {
    const [site, navigation] = await Promise.all([
        getSiteInfo(),
        getNavigation(audience)
    ])
    return (
        <>
            <Header navigation={navigation} site={site} />
            <main className={"main"}>
                {children}
            </main>
            <Footer navigation={navigation} site={site} />
        </>

    )
}