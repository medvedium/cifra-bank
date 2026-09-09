import type { ReactNode } from 'react'
import SiteShell from '@/components/layout/SiteShell'

export default function CorporateLayout({ children }: { children: ReactNode }) {
    return <SiteShell audience="corporate">{children}</SiteShell>
}
