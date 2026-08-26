'use client'

import { useEffect } from 'react'
import styles from './ThemeToggler.module.scss'
import { applyStoredTheme, toggleTheme } from '@/lib/theme'

export default function ThemeToggler() {
    useEffect(() => {
        applyStoredTheme()
    }, [])

    return (
        <button
            type="button"
            className={styles.modalToggle}
            onClick={toggleTheme}
            aria-label="Переключить тему"
        />
    )
}
