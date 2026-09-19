import { describe, expect, it } from 'vitest'
import { displaySearchUrl, formatSearchCount, getPageTokens } from './helpers'

const variants = { one: 'результат', few: 'результата', many: 'результатов' }

describe('formatSearchCount', () => {
    it('использует форму «one» для 1, 21, 101', () => {
        expect(formatSearchCount(1, 'Найдено', variants)).toBe('Найдено 1 результат')
        expect(formatSearchCount(21, 'Найдено', variants)).toBe('Найдено 21 результат')
    })

    it('использует форму «few» для 2–4, 22–24', () => {
        expect(formatSearchCount(2, 'Найдено', variants)).toBe('Найдено 2 результата')
        expect(formatSearchCount(4, 'Найдено', variants)).toBe('Найдено 4 результата')
        expect(formatSearchCount(22, 'Найдено', variants)).toBe('Найдено 22 результата')
    })

    it('использует форму «many» для 0, 5–20, 25', () => {
        expect(formatSearchCount(0, 'Найдено', variants)).toBe('Найдено 0 результатов')
        expect(formatSearchCount(5, 'Найдено', variants)).toBe('Найдено 5 результатов')
        expect(formatSearchCount(11, 'Найдено', variants)).toBe('Найдено 11 результатов')
        expect(formatSearchCount(25, 'Найдено', variants)).toBe('Найдено 25 результатов')
    })

    it('передано отрицательное количество найденных результатов', () => {
        expect(formatSearchCount(-1, 'Найдено', variants)).toBe('Найдено -1 результат')
    })
})

describe('displaySearchUrl', () => {
    const baseUrl = 'https://cifra-bank.ru'

    it('возвращает абсолютный URL без изменений', () => {
        expect(displaySearchUrl(baseUrl, 'https://example.com/path')).toBe('https://example.com/path')
    })

    it('добавляет baseUrl к относительному пути со слэшем', () => {
        expect(displaySearchUrl(baseUrl, '/search')).toBe('https://cifra-bank.ru/search')
    })

    it('добавляет слэш и baseUrl к относительному пути без слэша', () => {
        expect(displaySearchUrl(baseUrl, 'search')).toBe('https://cifra-bank.ru/search')
    })

    it('кейс передачи URL с http вместо https', () => {
        expect(displaySearchUrl(baseUrl, 'http://example.com/path')).toBe('http://example.com/path')
    })
})

describe('getPageTokens', () => {
    it('возвращает все страницы, если их не больше 7', () => {
        expect(getPageTokens(1, 5)).toEqual([1, 2, 3, 4, 5])
    })

    it('в начале списка показывает 1–5 и последнюю', () => {
        expect(getPageTokens(3, 20)).toEqual([1, 2, 3, 4, 5, 'ellipsis', 20])
    })

    it('в конце списка показывает первую и последние 5', () => {
        expect(getPageTokens(18, 20)).toEqual([1, 'ellipsis', 16, 17, 18, 19, 20])
    })

    it('в середине показывает окно вокруг текущей страницы', () => {
        expect(getPageTokens(10, 20)).toEqual([1, 'ellipsis', 9, 10, 11, 'ellipsis', 20])
    })

    it('ровно 7 страниц в пагинации', () => {
        expect(getPageTokens(1, 7)).toEqual([1, 2, 3, 4, 5, 6, 7])
    })
})
