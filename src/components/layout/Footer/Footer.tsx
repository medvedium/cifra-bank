import { Navigation, SiteInfo } from '@/lib/content/types'
import Link from 'next/link'
import styles from './Footer.module.scss'

interface FooterProps {
    navigation: Navigation
    site: SiteInfo
}

export default function Footer({ navigation, site }: FooterProps) {
    return (
        <footer className={styles.footer}>
            <div className="container">
                {navigation.footerSections.map((section) => (
                    <div className={styles.footerSection} key={section.title}>
                        <h3>{section.title}</h3>
                        {section.links.map((link) =>
                            link.href.startsWith('http') ? (
                                <a href={link.href} target={'_blank'} rel={'noopener noreferrer'} key={link.href}>
                                    {link.label}
                                </a>
                            ) : (
                                <Link href={link.href} key={link.href}>
                                    {link.label}
                                </Link>
                            )
                        )}
                    </div>
                ))}
                <div>
                    <a href={site.phones.russiaHref}>{site.phones.russia}</a>
                </div>
                <div>
                    <a href={site.email}>{site.email}</a>
                </div>
            </div>
        </footer>
    )
}
