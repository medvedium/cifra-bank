import styles from './FooterPrivate.module.scss'
import Link from 'next/link'
import LogoPrivate from '@/components/ui/LogoPrivate'

export default function FooterPrivate() {
 return (
     <footer className={`container ${styles.footer}`}>
         <Link href="/private-banking">
             <LogoPrivate width={276} height={37} />
         </Link>
     </footer>
 )
}