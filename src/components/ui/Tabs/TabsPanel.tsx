'use client'

import type {ReactNode} from 'react'
import {useTabsContext} from './TabsContext'

type TabsPanelProps = {
    value: string
    children: ReactNode
}

export default function TabsPanel({value, children}: TabsPanelProps) {
    const {activeTab, baseId} = useTabsContext()
    const isActive = activeTab === value

    return (
        <div
            role={"tabpanel"}
            id={`${baseId}-panel-${value}`}
            aria-labelledby={`${baseId}-trigger-${value}`}
            hidden={!isActive}
        >
            {children}
        </div>
    )
}