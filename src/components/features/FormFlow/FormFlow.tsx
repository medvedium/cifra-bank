'use client'

import type { ReactNode } from 'react'
import type { FormId } from '@/lib/forms/types'
import { FormFlowContext } from './FormFlowContext'
import FormFlowResultStep from './FormFlowResultStep'
import FormFlowSmsStep from './FormFlowSmsStep'
import { useFormFlow } from './useFormFlow'

type Props = {
    formId: FormId
    phoneField?: string
    successTitle?: string
    errorTitle?: string
    children: ReactNode
}

export default function FormFlow({
    formId,
    phoneField = 'tel',
    successTitle,
    errorTitle,
    children
}: Props) {
    const flow = useFormFlow({ formId, phoneField })

    return (
        <FormFlowContext.Provider value={flow}>
            {flow.step === 'sms' ? <FormFlowSmsStep /> : null}

            {flow.step === 'result' ? (
                <FormFlowResultStep successTitle={successTitle} errorTitle={errorTitle} />
            ) : null}

            {flow.step === 'fields' ? (
                <>
                    {flow.flowError ? (
                        <p style={{ color: 'var(--text-red)' }}>{flow.flowError}</p>
                    ) : null}
                    {children}
                </>
            ) : null}
        </FormFlowContext.Provider>
    )
}
