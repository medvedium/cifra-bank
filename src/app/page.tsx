import styles from './page.module.scss'
import { getHomePage, getNavigation, getSiteInfo } from '@/lib/content/loader'
import { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export async function generateMetadata(): Promise<Metadata> {
    const page = await getHomePage()
    return buildPageMetadata(page.seo, page.slug)
}

export default async function Home() {
    const [site, page, navigation] = await Promise.all([getSiteInfo(), getHomePage(), getNavigation('retail')])

    const slides = page.hero.items

    return (
        <>
            <Header navigation={navigation} site={site} />

            <main className={styles.main}>
                <h1 className="visually-hidden">{site.name}</h1>
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
            </main>

            <Footer navigation={navigation} site={site} />
        </>
    )
}
