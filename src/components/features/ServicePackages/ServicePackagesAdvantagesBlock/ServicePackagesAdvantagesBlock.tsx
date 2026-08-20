import styles from './ServicePackagesAdvantagesBlock.module.scss'
import { AdvantagesBlock } from '@/lib/content/types'
import Image from 'next/image'

export default function ServicePackagesAdvantagesBlock({ title, featured, items }: AdvantagesBlock) {
    return (
        <section className={styles.root}>
            <h2 className={styles.title}>{title}</h2>

            <div className={styles.featuredGrid}>
                {featured.map((item) => (
                    <article key={item.title} className={styles.featuredCard}>
                        <div className={styles.featuredText}>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                        <Image
                            src={item.imageUrl}
                            alt={item.imageAlt}
                            width={205}
                            height={205}
                            className={styles.featuredImage}
                        />
                    </article>
                ))}
            </div>

            <div className={styles.itemsGrid}>
                {items.map((item) => (
                    <article key={item.title} className={styles.itemCard}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </article>
                ))}
            </div>
        </section>
    )
}
