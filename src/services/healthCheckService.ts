// src/services/healthCheckService.ts
import { get } from '@utils/api';

/**
 * Interface for health check response
 */
interface HealthCheckResponse {
    status: string;
    // Add any other properties returned by your healthcheck endpoint
}

/**
 * Service to check the health status of the API
 * Returns a promise that resolves to the health status
 */
export const checkHealth = async (): Promise<boolean> => {
    try {
        // Using your existing fetch utility with a short timeout
        const response = await get<HealthCheckResponse>(
            '/healthcheck',
            {},
            false
        );
        console.log("STATUS");
        console.log(response.status);
        console.log(response.status === 'OK');
        // Return true if status is "ok" or whatever indicates healthy status in your API
        return response.status === 'OK';
    } catch (error) {
        console.error('Health check failed:', error);
        return false;
    }
};

/**
 * Gets the current health status directly from the API
 */
export const getHealthStatus = async (): Promise<boolean> => {
    return await checkHealth();
};