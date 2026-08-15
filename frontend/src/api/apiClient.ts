import type {ResponseMetadata} from './types';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type RequestOptions = {
    method?: HttpMethod
    body?: unknown
    headers?: Record<string, string>
}

const BASE_URL: string = import.meta.env.VITE_BACKEND_HOST ?? 'http://localhost:5000';

export class ApiError extends Error {
    readonly status: number;
    
    constructor(message: string, status: number) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const {method = 'GET', body, headers} = options;
    
    const response = await fetch(`${BASE_URL}${path}`, {
        method,
        credentials: 'include',
        headers: {
            ...(body !== undefined ? {'Content-Type': 'application/json'} : {}),
            ...headers
        },
        body: body !== undefined ? JSON.stringify(body) : undefined
    });
    
    type EnvelopePayload = {
        data?: unknown
        metadata?: ResponseMetadata
        message?: string
    }
    
    const payload = (await response.json().catch(() => null)) as EnvelopePayload | null;
    
    const failed = !response.ok || (payload?.metadata?.success === false);
    if (failed) {
        const message =
            payload?.metadata?.error ?? payload?.message ?? `Request failed with status ${response.status}`;
        throw new ApiError(message, response.status);
    }
    
    return (payload && 'metadata' in payload ? payload.data : payload) as T;
}
