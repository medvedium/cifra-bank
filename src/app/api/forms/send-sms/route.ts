import {NextResponse} from 'next/server'
import type {FormApiResponse} from '@/lib/forms/types'

export async function POST(request: Request) {
    const body = (await request.json().catch(() => ({}))) as {phone?: string}
    console.info('[forms/send-sms]', body)

    const response: FormApiResponse = {status: 'ok'}
    return NextResponse.json(response)
}