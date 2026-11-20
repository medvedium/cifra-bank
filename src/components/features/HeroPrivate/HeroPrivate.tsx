import type { HTMLAttributes } from 'react'
import styles from './HeroPrivate.module.scss'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import { ArrowRightLongIcon } from '@/components/ui/Icons'
import type { PrivateHero } from '@/lib/content/types'

interface HeroPrivateProps extends HTMLAttributes<HTMLElement> {
    heroItem: PrivateHero
}

export default function HeroPrivate({ heroItem, className, ...rest }: HeroPrivateProps) {
    const cta = heroItem.cta[0]

    return (
        <section
            className={[styles.hero, className].filter(Boolean).join(' ')}
            {...rest}
        >
            <div className={styles.media}>
                <Image
                    src={heroItem.image.desktop.src}
                    alt={heroItem.image.alt}
                    fill
                    priority
                    sizes="100vw"
                    className={styles.image}
                />
            </div>

            <div className={`container ${styles.inner}`}>
                <div className={styles.copy}>
                    <h1
                        className={styles.title}
                        dangerouslySetInnerHTML={{ __html: heroItem.title }}
                    />
                    <p className={`text-t1 ${styles.description}`}>{heroItem.description}</p>
                </div>

                {cta ? (
                    <div className={styles.actions}>
                        <Button
                            href={cta.href}
                            className={styles.button}
                            color={cta.color}
                            variant={cta.variant}
                        >
                            {cta.label}
                            <ArrowRightLongIcon />
                        </Button>
                    </div>
                ) : null}
            </div>
        </section>
    )
}
