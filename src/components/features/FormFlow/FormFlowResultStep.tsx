'use client'

import Button from '@/components/ui/Button'
import { useFormFlowContext } from './FormFlowContext'

type Props = {
    successTitle?: string
    errorTitle?: string
}

export default function FormFlowResultStep({
    successTitle = 'Заявка принята',
    errorTitle = 'Что-то пошло не так при отправке заявки'
}: Props) {
    const { result, flowError, reset } = useFormFlowContext()

    if (result === 'success') {
        return (
            <div>
                <h3>{successTitle}</h3>
                <Button type="button" onClick={reset}>
                    Повторить
                </Button>
            </div>
        )
    }

    return (
        <div>
            <h3>{errorTitle}</h3>
            {flowError ? <p style={{ color: 'var(--text-red)' }}>{flowError}</p> : null}
            <Button type="button" onClick={reset}>
                Повторить
            </Button>
        </div>
    )
}
