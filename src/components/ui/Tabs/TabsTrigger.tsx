'use client'

import { useTabsContext } from './TabsContext'
import type { ReactNode } from 'react'
import styles from './Tabs.module.scss'

type TabsTriggerProps = {
    value: string
    children: ReactNode
}

const triggerVariantClass = {
    segment: styles.triggerSegment,
    underline: styles.triggerUnderline,
    pills: styles.trigger
} as const

const triggerActiveClass = {
    segment: styles.triggerSegmentActive,
    underline: styles.triggerUnderlineActive,
    pills: styles.trigger
} as const

export default function TabsTrigger({ value, children }: TabsTriggerProps) {
    const { activeTab, setActiveTab, baseId, variant } = useTabsContext()
    const isActive = activeTab === value

    return (
        <button
            type={'button'}
            role={'tab'}
            id={`${baseId}-trigger-${value}`}
            aria-selected={isActive}
            aria-controls={`${baseId}-panel-${value}`}
            tabIndex={isActive ? -1 : 0}
            className={[styles.trigger, triggerVariantClass[variant], isActive && triggerActiveClass[variant]]
                .filter(Boolean)
                .join(' ')}
            onClick={() => setActiveTab(value)}
        >
            {children}
        </button>
    )
}
