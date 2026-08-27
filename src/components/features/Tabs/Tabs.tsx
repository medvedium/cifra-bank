'use client'

import React, { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './Tabs.module.scss'
import { TabItem } from '@/lib/content/types'

interface TabsProps {
    items: TabItem[]
    defaultId?: string
    children: (activeId: string) => React.ReactNode
    syncWithUrl?: boolean
}

interface TabsViewProps {
    items: TabItem[]
    activeId: string
    onTabClick: (id: string) => void
    children: (activeId: string) => React.ReactNode
}

function TabsView({ items, activeId, onTabClick, children }: TabsViewProps) {
    return (
        <div className={styles.root}>
            <div role="tablist" className={styles.list}>
                {items.map((item) => (
                    <button
                        key={item.id}
                        role="tab"
                        type="button"
                        aria-selected={activeId === item.id}
                        className={activeId === item.id ? styles.tabActive : styles.tab}
                        onClick={() => onTabClick(item.id)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div role="tabpanel" className={styles.panel}>
                {children(activeId)}
            </div>
        </div>
    )
}

function TabsWithUrlSync({ items, defaultId, children }: Omit<TabsProps, 'syncWithUrl'>) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const urlTab = searchParams.get('tab')

    const [selectedId, setSelectedId] = useState(urlTab || defaultId || items[0]?.id || '')
    const activeId = urlTab || selectedId

    const handleTabClick = (id: string) => {
        setSelectedId(id)
        const params = new URLSearchParams(searchParams.toString())
        params.set('tab', id)
        router.push(`?${params.toString()}`, { scroll: false })
    }

    return (
        <TabsView items={items} activeId={activeId} onTabClick={handleTabClick}>
            {children}
        </TabsView>
    )
}

function TabsStatic({ items, defaultId, children }: Omit<TabsProps, 'syncWithUrl'>) {
    const [selectedId, setSelectedId] = useState(defaultId || items[0]?.id || '')

    return (
        <TabsView items={items} activeId={selectedId} onTabClick={setSelectedId}>
            {children}
        </TabsView>
    )
}

export default function Tabs({ items, defaultId, children, syncWithUrl = false }: TabsProps) {
    if (!syncWithUrl) {
        return (
            <TabsStatic items={items} defaultId={defaultId}>
                {children}
            </TabsStatic>
        )
    }

    return (
        <Suspense fallback={<TabsStatic items={items} defaultId={defaultId}>{children}</TabsStatic>}>
            <TabsWithUrlSync items={items} defaultId={defaultId}>
                {children}
            </TabsWithUrlSync>
        </Suspense>
    )
}