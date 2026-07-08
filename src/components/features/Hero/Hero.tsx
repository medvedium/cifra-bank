import styles from './Hero.module.scss'
import { HeroItem } from '@/lib/content/types'
import Link from 'next/link'

interface HeroProps {
    slides: HeroItem[]
}

export default function Hero({ slides }: HeroProps) {
    return (
        <section className={`${styles.hero} section`}>
            <div className="container">
                {slides?.map((item, index) => (
                    <div className={styles.heroItem} key={index}>
                        <mark className={styles.heroMark}>{item.mark}</mark>
                        <h2 className={styles.heroTitle}>{item.title}</h2>
                        <p className={styles.heroText}>{item.description} </p>
                        <div className={styles.heroAction}>
                            {item.cta.href ? (
                                item.cta.href.startsWith('http') ? (
                                    <a href={item.cta.href} rel="noopener noreferrer">
                                        {item.cta.label}
                                    </a>
                                ) : (
                                    <Link href={item.cta.href}>{item.cta.label}</Link>
                                )
                            ) : (
                                <button>{item.cta.label}</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
