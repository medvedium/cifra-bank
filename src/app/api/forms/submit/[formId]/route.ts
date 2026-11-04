import { FormApiResponse } from '@/lib/forms/types'
import { NextResponse } from 'next/server'

type RouteContext = {
    params: Promise<{ formId: string }>
}

export async function POST(request: Request, context: RouteContext) {
    const { formId } = await context.params
    const url = new URL(request.url)
    const forceError = url.searchParams.get('mock') === 'error'

    const contentType = request.headers.get('content-type') ?? ''
    let payload: unknown

    if (contentType.includes('application/json')) {
        payload = await request.json().catch(() => ({}))
    } else {
        const formData = await request.formData()
        payload = Object.fromEntries(formData.entries())
    }

    console.info('[forms/submit]', { formId, forceError, payload })

    const response: FormApiResponse = forceError ? { status: 'error', error: 'Что-то пошло не так' } : { status: 'ok' }

    return NextResponse.json(response)
}
