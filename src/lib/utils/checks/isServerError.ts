import { ServerError } from "@/types/otherTypes"

export const isServerError = (error: unknown): error is ServerError => {
    return (
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        typeof (error as Record<string, unknown>).data === 'object'
    )
}