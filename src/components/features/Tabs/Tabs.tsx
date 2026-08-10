'use client'

import { useState } from 'react'
import styles from './Tabs.module.scss'
import { TabItem } from '@/lib/content/types'

interface TabsProps {
    items: TabItem[]
    defaultId?: string
    children: (activeId: string) => React.ReactNode
}

export default function Tabs({ items, defaultId, children }: TabsProps) {
    const [activeId, setActiveId] = useState(defaultId ?? items[0]?.id ?? '')

    return (
        <div className={styles.root}>
            <div role="tablist" className={styles.list}>
                {items.map((item) => (
                    <button key={item.id} role="tab" type="button" aria-selected={activeId === item.id} className={activeId == item.id ? styles.tabActive : styles.tab} onClick={() => setActiveId(item.id)}>
                        {item.label} вариант
                    </button>
                ))}
            </div>

            <div role="tabpanel" className={styles.panel}>
                {children(activeId)}
            </div>
        </div>
    )
}

//'use client'
// function AboutTabsSection({ tabs, panels }: {
//   tabs: TabItem[]
//   panels: Record<string, React.ReactNode>
// }) {
//   return (
//     <Tabs items={tabs}>
//       {(activeId) => panels[activeId]}
//     </Tabs>
//   )
// }

// <Tabs items={tabs} defaultId="about">
//     {(activeId) => {
//         if (activeId === 'about') return <AboutBlock />
//         if (activeId === 'faq') return <FaqBlock />
//         return null
//     }}
// </Tabs>