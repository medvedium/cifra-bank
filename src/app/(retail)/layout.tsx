import type { ReactNode } from 'react'
import SiteShell from '@/components/layout/SiteShell'

export default function RetailLayout({ children }: { children: ReactNode }) {
    return <SiteShell audience="retail">{children}</SiteShell>
}
