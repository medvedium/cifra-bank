import type { Metadata } from 'next'
import localFont from 'next/font/local'

import '@/styles/globals.scss'
import ThemeToggler from '@/components/features/ThemeToggler'
import { THEME_INIT_SCRIPT } from '@/lib/theme'

const gtAmerica = localFont({
    src: [
        {
            path: '../fonts/GTAmericaLCG-Lt.woff2',
            weight: '300',
            style: 'normal'
        },
        {
            path: '../fonts/GTAmericaLCG-Rg.woff2',
            weight: '400',
            style: 'normal'
        },
        {
            path: '../fonts/GTAmericaLCG-Md.woff2',
            weight: '500',
            style: 'normal'
        },
        {
            path: '../fonts/GTAmericaLCG-Bd.woff2',
            weight: '700',
            style: 'normal'
        }
    ],
    variable: '--font-gt-america',
    display: 'swap'
})

const stolzl = localFont({
    src: [
        {
            path: '../fonts/Stolzl-Book.woff2',
            weight: '300',
            style: 'normal'
        },
        {
            path: '../fonts/Stolzl-Regular.woff2',
            weight: '400',
            style: 'normal'
        },
        {
            path: '../fonts/Stolzl-Medium.woff2',
            weight: '500',
            style: 'normal'
        }
    ],
    variable: '--font-stolzl',
    display: 'swap'
})

export const metadata: Metadata = {
    metadataBase: new URL('https://cifra-bank.ru'),
    title: {
        default: 'Цифра банк',
        template: '%s'
    }
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {

    return (
        <html lang="ru" className={`${gtAmerica.variable} ${stolzl.variable}`} suppressHydrationWarning>
            <body>
                <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
                {children}
                <ThemeToggler />
            </body>
        </html>
    )
}
