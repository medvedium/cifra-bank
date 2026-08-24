'use client'
import Tabs from '@/components/features/Tabs'
import CardList from '@/components/features/CardList'
import type { ServicePackagesCard, TabItem } from '@/lib/content/types'

interface CardTabsSectionProps {
    tabs: TabItem[]
    cards: ServicePackagesCard[]
    defaultId?: string
}

export default function CardTabsSection({ tabs, cards, defaultId = 'digital' }: CardTabsSectionProps) {
    return (
        <Tabs items={tabs} defaultId={defaultId} syncWithUrl>
            {(activeId) => <CardList cards={cards.filter((card) => card.type === activeId)} />}
        </Tabs>
    )
}

