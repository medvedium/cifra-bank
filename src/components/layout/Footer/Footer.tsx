import Image from 'next/image'
import { getFooter } from '@/lib/content/loader'
import type { Navigation, SiteInfo } from '@/lib/content/types'
import Logo from '@/components/ui/Logo'
import TextLink from '@/components/ui/TextLink'
import {
    ArrowRightIcon,
    BioIcon,
    FeedbackIcon,
    OnlineCallIcon,
    VisuallyImpairedIcon,
    socialIcons,
    storeIcons
} from '@/components/ui/Icons'
import CitySelect from './CitySelect'
import NavGroup from './NavGroup'
import styles from './Footer.module.scss'

interface FooterProps {
    navigation: Navigation
    site: SiteInfo
    audience: string
}

export default async function Footer({ navigation, site, audience }: FooterProps) {
    const footer = await getFooter()
    const homeHref = navigation.audience.find((item) => item.id === audience)?.href ?? '/'

    return (
        <footer className={styles.footer}>
            <div className={`container container--wide ${styles.inner}`}>
                <TextLink href={homeHref} className={styles.logo} aria-label={site.name}>
                    <Logo />
                </TextLink>

                <div className={styles.call}>
                    <ul className={styles.phones}>
                        {footer.phones.map((phone) => (
                            <li key={phone.href}>
                                <TextLink className={styles.phoneLink} href={phone.href}>
                                    {phone.label}
                                </TextLink>
                                {phone.caption ? <span className={styles.phoneCaption}>{phone.caption}</span> : null}
                            </li>
                        ))}
                    </ul>
                    <div className={styles.qr}>
                        <div className={styles.qrImage}>
                            <Image src={footer.app.qrImage} alt={footer.app.qrAlt} width={88} height={88} />
                        </div>
                        <div className={styles.qrContent}>
                            <p className={styles.qrText}>{footer.app.title}</p>
                            <div className={styles.qrStores}>
                                {footer.app.stores.map((store) => {
                                    const Icon = storeIcons[store.id]
                                    return <Icon key={store.id} />
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.info}>
                    <ul className={styles.contacts}>
                        {footer.contacts.map((item) => (
                            <li key={item.href}>
                                <TextLink className={styles.contactLink} href={item.href}>
                                    {item.label}
                                </TextLink>
                            </li>
                        ))}
                    </ul>
                    <ul className={styles.additional}>
                        {footer.additional.map((item) => (
                            <li key={item.href}>
                                <TextLink className={styles.additionalLink} href={item.href}>
                                    {item.label}
                                    <ArrowRightIcon />
                                </TextLink>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.apps}>
                        <span className={styles.blockTitle}>{footer.app.mobileTitle}</span>
                        <ul className={styles.iconRow}>
                            {footer.app.stores.map((store) => {
                                const Icon = storeIcons[store.id]
                                return (
                                    <li key={store.id}>
                                        <TextLink className={styles.iconButton} href={store.href}>
                                            <span className="visually-hidden">{store.label}</span>
                                            <Icon />
                                        </TextLink>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className={styles.social}>
                        <ul className={styles.iconRow}>
                            {footer.social.map((item) => {
                                const Icon = socialIcons[item.id]
                                return (
                                    <li key={item.id}>
                                        <TextLink className={styles.iconButton} href={item.href}>
                                            <span className="visually-hidden">{item.label}</span>
                                            <Icon />
                                        </TextLink>
                                    </li>
                                )
                            })}
                            <li>
                                <TextLink className={`${styles.iconButton} ${styles.iconButtonWide}`} href={footer.feedback.href}>
                                    <FeedbackIcon />
                                    <span>{footer.feedback.label}</span>
                                </TextLink>
                            </li>
                            <li>
                                <button type="button" className={`${styles.iconButton} ${styles.iconButtonWide} ${styles.onlineCall}`}>
                                    <OnlineCallIcon />
                                    <span>{footer.onlineCall.label}</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.actions}>
                        <div className={styles.action}>
                            <span className={styles.blockTitle}>{footer.bio.label}</span>
                            <TextLink className={styles.iconButton} href={footer.bio.href}>
                                <span className="visually-hidden">{footer.bio.alt}</span>
                                <BioIcon />
                            </TextLink>
                        </div>
                        <div className={styles.action}>
                            <span className={styles.blockTitle}>{footer.accessibility.label}</span>
                            <button type="button" className={styles.impaired}>
                                <VisuallyImpairedIcon />
                                <span>{footer.accessibility.offLabel}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <nav className={styles.nav} aria-label="Навигация по сайту">
                    <div className={styles.navPrimary}>
                        {footer.nav.primary.map((group) => (
                            <NavGroup key={group.title} group={group} />
                        ))}
                    </div>
                    <div className={styles.navSecondary}>
                        {footer.nav.secondary.map((group) => (
                            <NavGroup key={group.title} group={group} />
                        ))}
                    </div>
                </nav>

                <div className={styles.bottom}>
                    <CitySelect current={footer.city.current} items={footer.city.items} searchPlaceholder={footer.city.searchPlaceholder} />
                    <p className={styles.copyright}>{footer.copyright}</p>
                </div>
            </div>
        </footer>
    )
}
