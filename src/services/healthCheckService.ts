// src/services/healthCheckService.ts
import { get } from '@utils/api';
import {get_healthcheck} from "@utils/api_calls";

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
        return await get_healthcheck()
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