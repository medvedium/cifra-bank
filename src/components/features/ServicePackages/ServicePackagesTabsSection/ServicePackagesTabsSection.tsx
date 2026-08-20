'use client'

import Tabs from '@/components/features/Tabs'
import CardList from '@/components/features/CardList'
import type { ServicePackagesCard, TabItem, TabBlock } from '@/lib/content/types'
import ServicePackagesTabBlocks
    from '@/components/features/ServicePackages/ServicePackagesTabBlocks/ServicePackagesTabBlocks'

interface ServicePackagesTabsSectionProps {
    tabs: TabItem[]
    cards: ServicePackagesCard[]
    tabContent: Record<string, { blocks: TabBlock[] }>
    defaultId?: string
}

export default function ServicePackagesTabsSection({ tabs, cards, tabContent, defaultId = 'digital' }: ServicePackagesTabsSectionProps) {
    return (
        <Tabs items={tabs} defaultId={defaultId}>
            {(activeId) => {
                const content = tabContent[activeId]

                return (
                    <>
                        <CardList cards={cards.filter((card) => card.type === activeId)} />
                        {content?.blocks && <ServicePackagesTabBlocks blocks={content.blocks} />}
                    </>
                )
            }}
        </Tabs>
    )
}
