import {get} from "./api";
import {useLevelStore} from "../stores/LanguageLevel";

export const backend_healthcheck = async () => {
    await get('/healthcheck', {}, false);
}

export async function get_all_words(): Promise<Word[]> {
    const levelStore = useLevelStore();
    const currentLevel = levelStore.currentLevel;

    try {
        return await get(`/words/?level=${currentLevel}`) as Word[];
    } catch (error) {
        console.error('Error fetching words:', error);
        throw error;
    }
}
