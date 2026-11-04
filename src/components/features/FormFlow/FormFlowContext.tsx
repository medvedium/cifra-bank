'use client'

import { createContext, useContext } from 'react'
import type { FormFlowApi } from './useFormFlow'

export const FormFlowContext = createContext<FormFlowApi | null>(null)

/** API текущего FormFlow — только внутри потомков `<FormFlow>`. */
export function useFormFlowContext(): FormFlowApi {
    const ctx = useContext(FormFlowContext)
    if (!ctx) {
        throw new Error('useFormFlowContext нужно вызывать внутри <FormFlow>')
    }
    return ctx
}
