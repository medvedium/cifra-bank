export const THEME_STORAGE_KEY = 'theme'

export type ThemeName = 'light' | 'dark'

export function isThemeName(value: string | null): value is ThemeName {
    return value === 'light' || value === 'dark'
}

export function applyTheme(theme: ThemeName) {
    document.documentElement.dataset.theme = theme
}

export function applyStoredTheme() {
    try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY)
        if (isThemeName(stored)) {
            applyTheme(stored)
        }
    } catch {
        // storage can be unavailable
    }
}

export function toggleTheme() {
    const next: ThemeName = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)

    try {
        localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {
        // storage can be unavailable
    }
}

export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='dark'||t==='light'){document.documentElement.dataset.theme=t}}catch(e){}})()`
