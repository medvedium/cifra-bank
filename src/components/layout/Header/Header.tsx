import { Navigation, SiteInfo } from '@/lib/content/types'
import styles from './Header.module.scss'
import Button from '@/components/ui/Button'
import Logo from '@/components/ui/Logo'
import TextLink from '@/components/ui/TextLink'
import { InternetBankIcon, PinIcon } from '@/components/ui/Icons'
import MainMenu from './MainMenu'
import MobileMenu from './MobileMenu'

interface HeaderProps {
    navigation: Navigation
    altNavigation: Navigation
    site: SiteInfo
    audience: string
}

export default function Header({ navigation, altNavigation, site, audience }: HeaderProps) {
    const homeHref = navigation.audience.find((item) => item.id === audience)?.href ?? '/'
    const offices = navigation.topSideLinks.find((link) => link.href.includes('offices'))
    const internet = navigation.topSideLinks.find((link) => link.href.startsWith('http'))
    const openAccount = navigation.topSideLinks.find((link) => link.color === 'primary')
    const otherAudience = navigation.audience.find((item) => item.id !== audience)
    const menus = {
        [audience]: navigation.mainMenu,
        ...(otherAudience ? { [otherAudience.id]: altNavigation.mainMenu } : {})
    }

    return (
        <header className={styles.header}>
            <div className={styles.topbar}>
                <div className={`container container--wide ${styles.barInner}`}>
                    <TextLink href={homeHref} className={styles.logo} aria-label={site.name}>
                        <Logo />
                    </TextLink>

                    <nav className={`${styles.topMenu} ${styles.topMenuDesktop}`} aria-label="Продукты группы">
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

                    {offices ? (
                        <TextLink className={styles.location} href={offices.href}>
                            <PinIcon />
                            {offices.label}
                        </TextLink>
                    ) : null}

                    {internet ? (
                        <div className={styles.online}>
                            <Button href={internet.href} color="secondary" size="xs" aria-label={internet.label}>
                                <InternetBankIcon />
                                <span className={styles.onlineLabel}>{internet.label}</span>
                            </Button>
                        </div>
                    ) : null}

                    {openAccount ? (
                        <div className={styles.auth}>
                            <Button href={openAccount.href || undefined} color="primary" size="xs">
                                {openAccount.label}
                            </Button>
                        </div>
                    ) : null}

                    <MobileMenu
                        audience={audience}
                        audienceItems={navigation.audience}
                        menus={menus}
                        offices={offices}
                        internet={internet}
                        openAccount={openAccount}
                    />
                </div>
            </div>

            <div className={styles.subbar}>
                <div className={`container container--wide ${styles.barInner}`}>
                    <nav className={`${styles.topMenu} ${styles.topMenuCompact}`} aria-label="Продукты группы">
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
