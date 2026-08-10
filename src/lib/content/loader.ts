import { HomePage, Navigation, ServicePackagesPage, SiteInfo } from '@/lib/content/types'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

const contentDir = path.join(process.cwd(), 'content')

// Функция-хэлпер для загрузки данных из JSON
async function readJson<T>(relativePath: string): Promise<T> {
    const filePath = path.join(contentDir, relativePath)
    const raw = await readFile(filePath, 'utf8')
    return JSON.parse(raw) as T
}

// Получение общих данных сайта
export async function getSiteInfo(): Promise<SiteInfo> {
    return readJson<SiteInfo>('site.json')
}

// Получение JSON навигации
export async function getNavigation(audience: 'retail'): Promise<Navigation> {
    return readJson(`navigation/${audience}.json`)
}

// Получение данных для страниц сайта
export async function getHomePage(): Promise<HomePage> {
    return readJson<HomePage>('pages/home.json')
}

export async function getServicePackagesPage(): Promise<ServicePackagesPage> {
    return  readJson<ServicePackagesPage>('pages/service-packages.json')
}