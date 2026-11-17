import Tabs from '@/components/ui/Tabs'
import type { ExchangeRatesContent, RatesConfig } from '@/lib/content/types'
import ExchangeRatesInner from '@/components/features/ExchangeRates/ExchangeRatesInner'

type Props = {
    data: RatesConfig
    content: ExchangeRatesContent
}

export default function ExchangeRatesView({ data, content }: Props) {
    return (
        <div>
            <p>{content.subtitle}</p>
            <p>
                Снимок: {data.meta.city}, офисов {data.offices.length}, дефолт {data.defaultOfficeCode}
            </p>
            <Tabs.Root
                defaultValue={'office'}
                variant={'underline'}
            >
                <Tabs.List aria-label={'Способ обмена'}>
                    {content.tabs.map((tab) => (
                        <Tabs.Trigger
                            value={tab.id}
                            key={tab.id}
                        >
                            {tab.value}
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>

                {content.tabs.map((tab) => (
                    <Tabs.Panel
                        value={tab.id}
                        key={tab.id}
                    >
                        <ExchangeRatesInner
                            data={data}
                            content={content}
                            tabId={tab.id}
                        />
                    </Tabs.Panel>
                ))}
            </Tabs.Root>
        </div>
    )
}
