import type { ReactNode } from 'react'
import HeaderPrivate from '@/components/layout/HeaderPrivate'
import FooterPrivate from '@/components/layout/FooterPrivate'
import { getPrivateBankingPage } from '@/lib/content/loader'

const page = await getPrivateBankingPage()

export default function PrivateLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <HeaderPrivate menuItems={page.anchors} />
            <main
                className="main"
                data-palette="private"
            >
                {children}
            </main>
            <FooterPrivate />
        </>
    )
}
