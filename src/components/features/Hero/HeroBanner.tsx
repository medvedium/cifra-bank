import styles from './HeroBanner.module.scss'
import { HeroItem } from '@/lib/content/types'
import Button from '@/components/ui/Button'
import Image from 'next/image'

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
                        slide.ctas.map((item, index) => (
                            <Button
                                key={index}
                                href={item.href}
                                color={item.color}
                                variant={item.variant}
                            >
                                {item.label}
                            </Button>
                        ))}
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
