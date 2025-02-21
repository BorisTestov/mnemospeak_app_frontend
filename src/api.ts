type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

import { API_ENDPOINT } from "@/config";
// import { errorEventBus } from '@components/ErrorNotification/ErrorNotification';

interface FetchOptions {
    method?: HttpMethod;
    headers?: Record<string, string>;
    body?: any;
}

export const fetchData = async <T>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<T> => {
    const { method = 'GET', headers = {}, body } = options;

    const requestOptions: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
    };

    if (body) {
        requestOptions.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_ENDPOINT}${endpoint}`, requestOptions);

        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return await response.json() as T;
    } catch (error) {
        console.error('Fetch error:', error);
        // errorEventBus.showError('Something is wrong. Reload page or contact developer.');
        throw error;
    }
};

export const get = <T>(endpoint: string, headers?: Record<string, string>): Promise<T> => {
    return fetchData<T>(endpoint, { method: 'GET', headers });
};

export const post = <T>(endpoint: string, body: any, headers?: Record<string, string>): Promise<T> => {
    return fetchData<T>(endpoint, { method: 'POST', body, headers });
};