import { Navigation, SiteInfo } from '@/lib/content/types'
import Link from 'next/link'
import styles from './Header.module.scss'
import Button from '@/components/ui/Button'
import Logo from '@/components/ui/Logo'

interface HeaderProps {
    navigation: Navigation
    site: SiteInfo
    audience: string
}

export default function Header({ navigation, site, audience }: HeaderProps) {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.wrapper}>
                    <Link href="/" className={styles.logo} aria-label={site.name}>
                        <Logo />
                    </Link>
                    <nav className={styles.topMenu}>
                        {navigation.topLinks.map((link) =>
                            link.href.startsWith('http') ? (
                                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={styles.topMenuLink}>
                                    {link.label}
                                </a>
                            ) : (
                                <Link key={link.label} href={link.href} className={`${styles.topMenuLink} ${link.href === '/' ? styles.active : ''}`}>
                                    {link.label}
                                </Link>
                            )
                        )}
                    </nav>

                    <div className={styles.links}>
                        <Button size="small" color="white" href="/offices-and-atms">
                            Офисы и банкоматы
                        </Button>
                        <Button size="small" color="secondary" href="https://client.cifra-bank.ru">
                            Интернет-банк
                        </Button>
                        <Button size="small" color={'primary'}>
                            Открыть счёт
                        </Button>
                    </div>
                </div>

                <div className={styles.wrapper}>
                    <nav className={styles.userType}>
                        {navigation.audience.map((item) =>
                            item.id === audience ? (
                                <span key={item.id}>{item.label}</span>
                            ) : item.href.startsWith('http') ? (
                                <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer">
                                    {item.label}
                                </a>
                            ) : (
                                <Link key={item.id} href={item.href}>
                                    {item.label}
                                </Link>
                            )
                        )}
                    </nav>
                    <nav className={styles.menu}>
                        {navigation.mainMenu.map((item) =>
                            item.href.startsWith('http') ? (
                                <a target={'_blank'} rel={'noopener noreferrer'} className={styles.menuLink} href={item.href} key={item.href}>
                                    {item.label}
                                </a>
                            ) : (
                                <Link className={styles.menuLink} href={item.href} key={item.label}>
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
