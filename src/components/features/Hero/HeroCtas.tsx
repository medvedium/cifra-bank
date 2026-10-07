'use client'

import Button from '@/components/ui/Button'
import type { HeroCta } from '@/lib/content/types'
import { mapCtaAppearance, resolveCtaAction } from './heroUtils'
import styles from './Hero.module.scss'

interface HeroCtasProps {
    items?: HeroCta[]
}

function handleScroll(selector: string) {
    const target = document.querySelector(selector)
    if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}

export default function HeroCtas({ items }: HeroCtasProps) {
    if (!items?.length) {
        return null
    }

    return (
        <div className={styles.action}>
            {items.slice(0, 2).map((cta, index) => {
                const action = resolveCtaAction(cta)
                const appearance = mapCtaAppearance(cta.className)
                const key = `${cta.label}-${index}`

                if (action === 'none') {
                    return (
                        <Button
                            key={key}
                            className={styles.cta}
                            color={appearance.color}
                            variant={appearance.variant}
                        >
                            {cta.label}
                        </Button>
                    )
                }

                if (action === 'scroll' && cta.href) {
                    return (
                        <Button
                            key={key}
                            className={styles.cta}
                            color={appearance.color}
                            variant={appearance.variant}
                            onClick={() => handleScroll(cta.href!)}
                        >
                            {cta.label}
                        </Button>
                    )
                }

                if (action === 'modal') {
                    return (
                        <Button
                            key={key}
                            className={styles.cta}
                            color={appearance.color}
                            variant={appearance.variant}
                            onClick={() => {
                                // Модальные окна подключим отдельным слоем.
                            }}
                            aria-label={`${cta.label} (модальное окно)`}
                        >
                            {cta.label}
                        </Button>
                    )
                }

                if ((action === 'link' || action === 'blank') && cta.href) {
                    return (
                        <Button
                            key={key}
                            className={styles.cta}
                            color={appearance.color}
                            variant={appearance.variant}
                            href={cta.href}
                            target={action === 'blank' ? '_blank' : '_self'}
                        >
                            {cta.label}
                        </Button>
                    )
                }

                return null
            })}
        </div>
    )
}
