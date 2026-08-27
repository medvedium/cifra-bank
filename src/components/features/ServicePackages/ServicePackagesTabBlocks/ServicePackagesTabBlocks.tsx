import type { TabBlock } from '@/lib/content/types'
import ServicePackagesAdvantagesBlock from '@/components/features/ServicePackages/ServicePackagesAdvantagesBlock'
import ServicePackagesComboBanner from '@/components/features/ServicePackages/ServicePackagesComboBanner'

interface TabBlocksProps {
    blocks: TabBlock[]
}

export default function ServicePackagesTabBlocks({ blocks }: TabBlocksProps) {
    return (
        <>
            {blocks.map((block, index) => {
                switch (block.type) {
                    case 'advantages':
                        return <ServicePackagesAdvantagesBlock key={`advantages-${index}`} {...block} />
                    case 'comboBanner':
                        return <ServicePackagesComboBanner key={`combo-${index}`} {...block} />
                    default:
                        return null
                }
            })}
        </>
    )
}
