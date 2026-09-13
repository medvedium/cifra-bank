'use client'

import { createContext, useContext } from 'react'

export type TabsVariant = 'segment' | 'underline' | 'pills'

export type TabsContextValue = {
    activeTab: string
    setActiveTab: (id: string) => void
    baseId: string
    variant: TabsVariant
}

export const TabsContext = createContext<TabsContextValue | null>(null)

export function useTabsContext() {
    const context = useContext(TabsContext)
    if (!context) {
        throw new Error('Tabs.* must be used inside Tabs.Root')
    }
    return context
}
