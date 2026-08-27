import styles from './page.module.scss'
import { getHomePage, getSiteInfo } from '@/lib/content/loader'
import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'
import Hero from '@/components/features/Hero'

export async function generateMetadata(): Promise<Metadata> {
    const page = await getHomePage()
    return buildPageMetadata(page.seo, page.slug)
}

export default async function Home() {
    const [site, page] = await Promise.all([getSiteInfo(), getHomePage()])

    return (
        <>
            <h1 className="visually-hidden">{site.name}</h1>

            <Hero slides={page.hero.items} />

            <section className={`${styles.products} section`}>
                <div className="container">
                    <h2 className="section__title">{page.products.title}</h2>
                    <div className={styles.productsGrid}>
                        {page.products.items?.map((item, index) => (
                            <a href={item.href} rel="noopener noreferrer" key={index}>
                                <h3 className={styles.productsItemTitle}>{item.title}</h3>
                                <span className={styles.productsItemLink}>{item.linkLabel}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
