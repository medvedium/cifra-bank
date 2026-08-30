import type { FooterNavGroup } from '@/lib/content/types'
import TextLink from '@/components/ui/TextLink'
import styles from './NavGroup.module.scss'

interface NavGroupProps {
    group: FooterNavGroup
    variant: 'primary' | 'secondary'
}

export default function NavGroup({ group, variant }: NavGroupProps) {
    const isSingleColumn = group.columns.length === 1
    const columnsClassName = [
        styles.navColumns,
        isSingleColumn ? styles.navColumnsSingle : styles[`navColumns${variant === 'primary' ? 'Primary' : 'Secondary'}`]
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <div className={styles.navGroup}>
            <span className={styles.navTitle}>{group.title}</span>
            <div className={columnsClassName}>
                {group.columns.map((column, index) => (
                    <ul className={styles.navMenu} key={index}>
                        {column.map((link) => (
                            <li key={link.href}>
                                <TextLink className={styles.navLink} href={link.href}>
                                    {link.label}
                                </TextLink>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    )
}
