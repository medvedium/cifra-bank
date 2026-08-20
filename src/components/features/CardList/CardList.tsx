import styles from './CardList.module.scss'
import { ServicePackagesCard } from '@/lib/content/types'
import { JSX } from 'react'
import Link from 'next/link'

interface CardListProps {
    cards: ServicePackagesCard[]
}

export default function CardList({ cards }: CardListProps): JSX.Element {
    return (
        <div className={styles.grid}>
            {cards.map((item) => (
                <div key={item.title} className={styles.card}>
                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.description}>{item.description}</p>
                    
                    <div className={styles.features}>
                        {item.features.map((feature, idx) => (
                            <div key={idx} className={styles.feature}>
                                <span className={styles.featureValue}>{feature.value}</span>
                                <span className={styles.featureLabel}>{feature.description}</span>
                            </div>
                        ))}
                    </div>

                    <div className={styles.actions}>
                        {item.cta.map((cta, idx) => (
                            <Link
                                key={idx}
                                href={cta.href}
                                className={`${styles.button} ${cta.classList === 'primary' ? styles.primary : styles.gray}`}
                            >
                                {cta.label}
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}