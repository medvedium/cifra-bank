import styles from './CardList.module.scss';
import { ServicePackagesCard } from '@/lib/content/types'
import { JSX } from 'react'

interface CardListProps {
    cards: ServicePackagesCard[]
}

export default function CardList({cards}: CardListProps): JSX.Element {
    return (<>
        {cards.map(item => (
            <p key={item.title}>{item.title}</p>
        ))}
    </>)
}