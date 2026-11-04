export function isMockErrorEnabled(): boolean {
    if (typeof window === 'undefined') return false
    return new URLSearchParams(window.location.search).get('mock') === 'error'
}

export function withMockQuery(path: string): string {
    if (!isMockErrorEnabled()) return path
    const url = new URL(path, window.location.origin)
    url.searchParams.set('mock', 'error')
    return `${url.pathname}${url.search}`
}