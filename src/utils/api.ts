type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

import errorNotification from "@utils/errorNotification";
import {API_ENDPOINT} from "@utils/config";

interface FetchOptions {
    method?: HttpMethod;
    headers?: Record<string, string>;
    body?: any;
    showErrorNotification?: boolean;
}

export const fetchData = async <T>(
    endpoint: string,
    options: FetchOptions = {},
    isJson: boolean = true,
    prefix: str = '/api/v1'
): Promise<T> => {
    const {
        method = 'GET',
        headers = {},
        body,
        showErrorNotification = true
    } = options;

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
        console.log(`${API_ENDPOINT}${prefix}${endpoint}`);
        const response = await fetch(`${API_ENDPOINT}${prefix}${endpoint}`, requestOptions);

        if (response.status >= 400 && response.status < 600) {
            const errorText = `Error: ${response.status} ${response.statusText}`;
            console.error(errorText);

            if (showErrorNotification) {
                // Try to parse error message from response if available
                try {
                    const errorData = await response.json();
                    const errorMessage = errorData.message || errorData.error || errorText;
                    errorNotification.show("Ошибка обработки данных. Свяжитесь с разработчиком.");
                } catch {
                    // If we can't parse JSON from error response, show status text
                    errorNotification.show("Ошибка обработки данных. Свяжитесь с разработчиком.");
                }
            }

            throw new Error(errorText);
        }

        if (isJson) {
            return await response.json() as T;
        }
        else {
            return await response.text();
        }
        }
    } catch (error) {
        console.error('Fetch error:', error);

        if (showErrorNotification && error instanceof Error) {
            errorNotification.show("Ошибка запроса. Свяжитесь с разработчиком или попробуйте позже.");
        }

        throw error;
    }
};

export const get = <T>(
    endpoint: string,
    headers?: Record<string, string>,
    showErrorNotification = true,
    prefix: str = '/api/v1'
): Promise<T> => {
    return fetchData<T>(endpoint, { method: 'GET', headers, showErrorNotification }, prefix);
};

export const post = <T>(
    endpoint: string,
    body: any,
    headers?: Record<string, string>,
    showErrorNotification = true
): Promise<T> => {
    return fetchData<T>(endpoint, { method: 'POST', body, headers, showErrorNotification });
};