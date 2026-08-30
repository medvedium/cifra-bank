'use client'

import { useSyncExternalStore } from 'react'
import { THEME_INIT_SCRIPT } from '@/lib/theme'

const subscribe = () => () => {}

export default function ThemeInitScript() {
    const isServerRender = useSyncExternalStore(subscribe, () => false, () => true)

    if (!isServerRender) {
        return null
    }

    return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
}
