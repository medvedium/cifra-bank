import Image from 'next/image'
import { Navigation, SiteInfo } from '@/lib/content/types'
import Link from 'next/link'
import styles from './Header.module.scss'

interface HeaderProps {
    navigation: Navigation
    site: SiteInfo
}

export default function Header({ navigation, site }: HeaderProps) {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.wrapper}>
                    <Link href="/">
                        <Image src={'/logo.svg'} alt={site.name} width={145} height={20} />
                    </Link>
                    <nav>
                        {navigation.topLinks.map((link) =>
                            link.href.startsWith('http') ? (
                                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                                    {link.label}
                                </a>
                            ) : (
                                <Link key={link.href} href={link.href}></Link>
                            )
                        )}
                    </nav>
                    <Link href={site.phones.russiaHref}>{site.phones.russia}</Link>
                </div>
                <div className={styles.wrapper}>
                    <nav>
                        <span>{navigation.audienceLabel}</span>
                        <Link href={navigation.alternateAudience.href}>{navigation.alternateAudience.label}</Link>
                    </nav>
                    <nav className={styles.menu}>
                        {navigation.mainMenu.map((item) =>
                            item.href.startsWith('http') ? (
                                <a target={'_blank'} rel={'noopener noreferrer'} className={styles.menuLink} href={item.href} key={item.href}>
                                    {item.label}
                                </a>
                            ) : (
                                <Link className={styles.menuLink} href={item.href} key={item.href}>
                                    {item.label}
                                </Link>
                            )
                        )}
                    </nav>
                </div>
            </div>
        </header>
    )
}
