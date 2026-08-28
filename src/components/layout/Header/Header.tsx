import { Navigation, SiteInfo } from '@/lib/content/types'
import styles from './Header.module.scss'
import Button from '@/components/ui/Button'
import Logo from '@/components/ui/Logo'
import TextLink from '@/components/ui/TextLink'
import MainMenu from './MainMenu'

interface HeaderProps {
    navigation: Navigation
    site: SiteInfo
    audience: string
}

export default function Header({ navigation, site, audience }: HeaderProps) {
    const homeHref = navigation.audience.find((item) => item.id === audience)?.href ?? '/'

    return (
        <header className={styles.header}>
            <div className="container container--wide">
                <div className={styles.wrapper}>
                    <TextLink href={homeHref} className={styles.logo} aria-label={site.name}>
                        <Logo />
                    </TextLink>
                    <nav className={styles.topMenu}>
                        {navigation.topLinks.map((link) => (
                            <TextLink
                                key={link.href}
                                href={link.href}
                                className={`${styles.topMenuLink} ${link.href === '/' ? styles.active : ''}`}
                            >
                                {link.label}
                            </TextLink>
                        ))}
                    </nav>

                    <div className={styles.links}>
                        {navigation.topSideLinks.map((link) => (
                            <Button href={link.href} key={link.label} color={link.color} size="xs">
                                {link.label}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className={styles.wrapper}>
                    <nav className={styles.userType}>
                        {navigation.audience.map((item) =>
                            item.id === audience ? (
                                <span key={item.id}>{item.label}</span>
                            ) : (
                                <TextLink key={item.id} href={item.href}>
                                    {item.label}
                                </TextLink>
                            )
                        )}
                    </nav>
                    <nav className={styles.menu} aria-label="Разделы сайта">
                        <MainMenu items={navigation.mainMenu} />
                    </nav>
                </div>
            </div>
        </header>
    )
}
