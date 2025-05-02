import {get} from "./api";
import {useLevelStore} from "../stores/LanguageLevel";
import {useLessonStore} from "../stores/LessonSettings";
import {computed, ref} from "vue";
import {useTestsDataStore} from "../stores/TestsData";
import {debugMessage} from "./debug";

export const backend_healthcheck = async () => {
    await get('/healthcheck', {}, false);
}

export async function get_all_words(): Promise<Word[]> {
    const levelStore = useLevelStore();
    const currentLevel = levelStore.currentLevel;

    try {
        return await get(`/flashcards/?level=${currentLevel}`) as Word[];
    } catch (error) {
        console.error('Error fetching words:', error);
        throw error;
    }
}

export async function get_flashcard_phrases(): Promise<Word[]> {
    const levelStore = useLevelStore();
    const currentLevel = levelStore.currentLevel;

    try {
        return await get(`/flashcards/?phrases=true&level=${currentLevel}`) as Word[];
    } catch (error) {
        console.error('Error fetching phrases:', error);
        throw error;
    }
}

export async function get_flashcard_useful_words(): Promise<Word[]> {
    const levelStore = useLevelStore();
    const currentLevel = levelStore.currentLevel;

    try {
        return await get(`/flashcards/?useful_words=true&level=${currentLevel}`) as Word[];
    } catch (error) {
        console.error('Error fetching useful words:', error);
        throw error;
    }
}

export async function get_lesson_by_id(): Promise {
    const lessonStore = useLessonStore()
    const lessonId = computed(() => lessonStore.lesson_id)

    try {
        const data = await get(`/lessons/${lessonId.value}/parts`);
        if (data && Array.isArray(data)) {
            return data;
        } else {
            console.warn('API response not in expected format');
            throw new Error('Invalid data format received from server');
        }
    } catch (apiErr) {
        console.error('API request failed:', apiErr);
        error.value = `Failed to load lesson data: ${apiErr.message || 'Unknown error'}`;
        loading.value = false;
        throw apiErr;
    }
}

export async function get_healthcheck(): Promise {
    const response = await get<HealthCheckResponse>(
        '/healthcheck',
        {},
        false
    );
    return response.status.toLowerCase() === 'ok';
}

export async function get_lesson_names_by_level(): Promise {
    const levelStore = useLevelStore();
    const currentLevel = levelStore.currentLevel;

    return await get(
        `/lessons/by_level/${currentLevel}`,
        {},
        false
    );
}


export async function get_lesson_by_name_and_level(): Promise {
    const levelStore = useLevelStore();
    const lessonStore = useLessonStore()

    const currentLevel = levelStore.currentLevel;
    const lessonName = lessonStore.lesson_name;

    return await get(
        `/lessons/${currentLevel}/${lessonName}`,
        {},
        false
    );
}

export async function get_tests_by_lesson_id(): Promise {
    const lessonStore = useLessonStore()
    const lessonId = computed(() => lessonStore.lesson_id)

    console.log(`Fetching tests for lesson ID: ${lessonId.value}`);
    const data = await get(`/quizzes/get_by_lesson_id/${lessonId.value}`);
    console.log('API Response:', data);

    if (data && Array.isArray(data)) {
        return data;
    } else {
        console.warn('API response not in expected format');
        throw new Error('Invalid data format received from server');
    }
}

export async function check_subscription(userId: number): Promise<boolean> {
    try {
        const response = await get<SubscriptionResponse>(
            `/check_subscription?user_id=${userId}`,
            {},
            true
        );
        await debugMessage(response);
        await debugMessage(response.is_active);
        return response.is_active;
    } catch (error) {
        debugMessage(`Subscription check error: ${error}`);
        console.error('Subscription check failed:', error);
        return false;
    }
}