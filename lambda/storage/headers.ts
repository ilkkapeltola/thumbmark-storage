import { APIGatewayProxyEvent } from 'aws-lambda'

interface Headers {
    [header: string]: string | number | boolean
    }

export const getHeaders = (event: APIGatewayProxyEvent): Headers => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',')
    const requestOrigin = event.headers.origin || event.headers.referer as string

    if (allowedOrigins.includes('*') || process.env.IS_OFFLINE === 'true')
        return {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'
        }
    else if (allowedOrigins.includes(requestOrigin))
        return {
            'Access-Control-Allow-Origin': requestOrigin,
            'Content-type': 'application/json'
        }

    return {
        'Content-type': 'application/json'
    }
}