'use client'

import Tabs from '@/components/ui/Tabs'
import CardList from '@/components/features/CardList'
import ServicePackagesTabBlocks from '@/components/features/ServicePackages/ServicePackagesTabBlocks/ServicePackagesTabBlocks'
import type { ServicePackagesCard, TabItem, TabBlock } from '@/lib/content/types'

interface ServicePackagesTabsSectionProps {
    tabs: TabItem[]
    cards: ServicePackagesCard[]
    tabContent: Record<string, { blocks: TabBlock[] }>
    defaultId?: string
}

export default function ServicePackagesTabsSection({
    tabs,
    cards,
    tabContent,
    defaultId = 'digital'
}: ServicePackagesTabsSectionProps) {
    return (
        <Tabs.Root defaultValue={defaultId} variant={'segment'}>
            <Tabs.List aria-label={'Тип карты'}>
                {tabs.map((tab) => (
                    <Tabs.Trigger
                        value={tab.id}
                        key={tab.id}
                    >
                        {tab.label}
                    </Tabs.Trigger>
                ))}
            </Tabs.List>

            {tabs.map((tab) => (
                <Tabs.Panel
                    key={tab.id}
                    value={tab.id}
                >
                    <CardList cards={cards.filter((card) => card.type === tab.id)} />
                    {tabContent[tab.id]?.blocks && <ServicePackagesTabBlocks blocks={tabContent[tab.id].blocks} />}
                </Tabs.Panel>
            ))}
        </Tabs.Root>
    )
}
