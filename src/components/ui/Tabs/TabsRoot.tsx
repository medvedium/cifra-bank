'use client'

import { type ReactNode, useId, useState } from 'react'
import { TabsContext, TabsVariant } from './TabsContext'

type TabsRootProps = {
    defaultValue: string
    variant?: TabsVariant
    children: ReactNode
}

export default function TabsRoot({ defaultValue, variant = 'underline', children }: TabsRootProps) {
    const [activeTab, setActiveTab] = useState(defaultValue)
    const baseId = useId()

    return <TabsContext.Provider value={{ activeTab, setActiveTab, baseId, variant }}>{children}</TabsContext.Provider>
}
