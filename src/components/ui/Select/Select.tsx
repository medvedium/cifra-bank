'use client'

import styles from './Select.module.scss'
import { Label, ListBox, ListBoxItem, Popover, Select, SelectValue, Button } from 'react-aria-components/Select'
import { Autocomplete, Input, SearchField, Text } from 'react-aria-components'
import { useFilter } from 'react-aria-components/Autocomplete'
import { ChevronIcon, SearchIcon } from '@/components/ui/Icons'
import { useState } from 'react'

interface SelectProps {
    label: string
    value: string
    onChange: (value: string) => void
    name: string
    options: { label: string; value: string; description?: string }[]
    isDisabled?: boolean
    isSearchable?: boolean
    searchLabel?: string
}

function highlightMatch(text: string, query: string) {
    if (!query.trim()) return text

    const start = text.toLocaleLowerCase().indexOf(query.toLocaleLowerCase())
    if (start < 0) return text

    const end = start + query.length

    return (
        <>
            {text.slice(0, start)}
            <mark className={styles.highlight}>{text.slice(start, end)}</mark>
            {text.slice(end)}
        </>
    )
}

export default function SelectElement({
    options,
    value,
    onChange,
    name,
    label,
    isDisabled,
    isSearchable = true,
    searchLabel
}: SelectProps) {
    const { contains } = useFilter({ sensitivity: 'base' })
    const [query, setQuery] = useState('')

    const list = (
        <ListBox className={styles.list}>
            {options.map((option) => (
                <ListBoxItem
                    textValue={option.label}
                    key={option.value}
                    id={option.value}
                    className={styles.listItem}
                >
                    <Text
                        slot="label"
                        className={styles.listItem__text}
                    >
                        {highlightMatch(option.label, query)}
                    </Text>
                    {option.description && (
                        <Text
                            slot="description"
                            className={styles.listItem__description}
                        >
                            {option.description}
                        </Text>
                    )}
                </ListBoxItem>
            ))}
        </ListBox>
    )

    return (
        <Select
            value={value || null}
            onChange={(key) => onChange(String(key))}
            isDisabled={isDisabled}
            name={name}
            className={`${styles.select} ${value ? styles.filled : ''}`}
        >
            <Label className={styles.label}>{label}</Label>
            <Button className={styles.trigger}>
                <SelectValue className={styles.triggerValue}>
                    {options.find((option) => option.value === value)?.label || ''}
                </SelectValue>
                <ChevronIcon className={styles.triggerIcon} />
            </Button>
            <Popover className={styles.popover}>
                {isSearchable ? (
                    <Autocomplete filter={contains}>
                        <SearchField
                            aria-label="Поиск"
                            className={styles.search}
                            value={query}
                            onChange={setQuery}

                        >
                            <Input placeholder={searchLabel ? searchLabel : ''} className={styles.searchInput} />
                            <SearchIcon className={styles.searchIcon} />
                        </SearchField>
                        {list}
                    </Autocomplete>
                ) : (
                    list
                )}

            </Popover>
        </Select>
    )
}
