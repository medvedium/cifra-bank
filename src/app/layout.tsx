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
    },
    applicationName: 'Цифра банк',
    icons: {
        icon: [
            { url: '/favicons/favicon.ico', sizes: 'any' },
            { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
            { url: '/favicons/favicon-128.png', sizes: '128x128', type: 'image/png' },
            { url: '/favicons/favicon-196x196.png', sizes: '196x196', type: 'image/png' }
        ],
        apple: [
            { url: '/favicons/apple-touch-icon-57x57.png', sizes: '57x57' },
            { url: '/favicons/apple-touch-icon-60x60.png', sizes: '60x60' },
            { url: '/favicons/apple-touch-icon-72x72.png', sizes: '72x72' },
            { url: '/favicons/apple-touch-icon-76x76.png', sizes: '76x76' },
            { url: '/favicons/apple-touch-icon-114x114.png', sizes: '114x114' },
            { url: '/favicons/apple-touch-icon-120x120.png', sizes: '120x120' },
            { url: '/favicons/apple-touch-icon-144x144.png', sizes: '144x144' },
            { url: '/favicons/apple-touch-icon-152x152.png', sizes: '152x152' }
        ]
    },
    other: {
        'msapplication-TileColor': '#FFFFFF',
        'msapplication-TileImage': '/favicons/mstile-144x144.png',
        'msapplication-square70x70logo': '/favicons/mstile-70x70.png',
        'msapplication-square150x150logo': '/favicons/mstile-150x150.png',
        'msapplication-wide310x150logo': '/favicons/mstile-310x150.png',
        'msapplication-square310x310logo': '/favicons/mstile-310x310.png'
    }
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {

    // TODO Переписать theme-toggler
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
