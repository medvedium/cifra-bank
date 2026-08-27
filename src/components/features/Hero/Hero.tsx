import styles from './Hero.module.scss'
import { HeroItem } from '@/lib/content/types'
import Button from '@/components/ui/Button'

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
                            <Button color={'primary'} href={item.cta.href}>
                                {item.cta.label}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
