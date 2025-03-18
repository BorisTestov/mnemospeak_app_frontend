import {get} from "./api";

export const backend_healthcheck = async () => {
    await get('/healthcheck', {}, false);
}

export async function get_all_words(): Promise<Word[]> {
    try {
        return await get('/words/');
    } catch (error) {
        console.error('Error fetching words:', error);
        throw error;
    }
}
