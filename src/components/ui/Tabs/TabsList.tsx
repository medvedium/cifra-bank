'use client'

import type { ReactNode } from 'react'
import styles from './Tabs.module.scss'
import { useTabsContext } from '@/components/ui/Tabs/TabsContext'

type TabsListProps = {
    children: ReactNode
    'aria-label': string
}

const listVariantClass = {
    segment: styles.listSegment,
    underline: styles.listUnderline,
    pills: styles.list,
} as const

export default function TabsList({ children, 'aria-label': ariaLabel }: TabsListProps) {
    const {variant} = useTabsContext()
    return (
        <div
            role={'tablist'}
            aria-label={ariaLabel}
            className={`${styles.list} ${listVariantClass[variant]}`}
        >
            {children}
        </div>
    )
}
