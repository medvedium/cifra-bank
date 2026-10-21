import styles from './HeroBanner.module.scss'
import { HeroCta, HeroItem } from '@/lib/content/types'
import Button from '@/components/ui/Button'
import Image from 'next/image'

const CTA_COLORS = ['primary', 'secondary', 'white', 'dark', 'error'] as const

type CtaColor = (typeof CTA_COLORS)[number]

function isCtaColor(value: string | undefined): value is CtaColor {
    return !!value && (CTA_COLORS as readonly string[]).includes(value)
}

function ctaAppearance(item: HeroCta) {
    return {
        color: item.color ?? (isCtaColor(item.className) ? item.className : undefined),
        variant: item.variant ?? (item.className === 'text' ? ('text' as const) : undefined),
        target: item.action === 'blank' ? ('_blank' as const) : undefined
    }
}

export interface HeroBannerProps {
    slide: HeroItem
}

export default function HeroBanner({ slide }: HeroBannerProps) {
    return (
        <div
            className={styles.heroBanner}
            style={{
                background: Array.isArray(slide.background)
                    ? `linear-gradient(135deg, ${slide.background[0]}, ${slide.background[1]})`
                    : slide.background
            }}
        >
            <div className={styles.heroBannerContent}>
                {slide.mark && (
                    <mark
                        className={styles.heroBannerMark}
                        style={{ color: slide.markColor }}
                    >
                        {slide.mark}
                    </mark>
                )}
                <h2
                    className={styles.heroBannerTitle}
                    style={{ color: slide.titleColor }}
                    dangerouslySetInnerHTML={{ __html: slide.title }}
                />
                {slide.description && (
                    <div
                        className={styles.heroBannerDescription}
                        style={{ color: slide.textColor }}
                        dangerouslySetInnerHTML={{ __html: slide.description }}
                    />
                )}
                <div className={styles.heroBannerAction}>
                    {slide.ctas &&
                        slide.ctas.map((item, index) => {
                            const appearance = ctaAppearance(item)

                            return (
                                <Button
                                    key={`${item.href ?? ''}-${item.label}-${index}`}
                                    href={item.href}
                                    color={appearance.color}
                                    variant={appearance.variant}
                                    target={appearance.target}
                                >
                                    {item.label}
                                </Button>
                            )
                        })}
                </div>
            </div>
            {slide.image && (
                <picture className={styles.heroBannerImage}>
                    <Image
                        src={slide.image.desktop.src}
                        alt=""
                        width={slide.image.desktop.width}
                        height={slide.image.desktop.height}
                        loading="eager"
                    />
                </picture>
            )}
        </div>
    )
}
