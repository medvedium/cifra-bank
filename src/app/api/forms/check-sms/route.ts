import { NextResponse } from 'next/server'
import type { FormApiResponse } from '@/lib/forms/types'

const STUB_CODE = '123456'

export async function POST(request: Request) {
    const body = (await request.json().catch(() => ({}))) as {
        phone?: string
        sms?: string
    }
    console.info('[forms/check-sms]', body)

    const response: FormApiResponse =
        body.sms === STUB_CODE ? { status: 'ok' } : { status: 'error', error: 'Неверный код' }
    return NextResponse.json(response)
}
