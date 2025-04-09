import {defineComponent, ref, onMounted, PropType, onActivated} from 'vue';
import {fetchData} from "@utils/api";
import {useNavigation} from "../../utils/navigation";

export default defineComponent({
    name: "HTMLLoader",
    props: {
        title: {
            type: String,
            default: ''
        },
        files: {
            type: Array as PropType<Object[]>,
            required: true
        },
        basePath: {
            type: String,
            default: '/lessons/'
        },
        initialIndex: {
            type: Number,
            default: 0,
            validator: (value: number) => value >= 0
        },
        hasTests: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        console.log("setup");
        const currentIndex = ref<number>(props.initialIndex);
        const currentContent = ref<string>('');
        const loading = ref<boolean>(false);
        const { goLessonTests } = useNavigation();
        const hasTests = ref<boolean>(props.hasTests);

        const loadContent = async (index: number): Promise<void> => {
            console.log("1");
            if (index < 0 || index >= props.files.length) {
                console.error('Invalid file index:', index);
                return;
            }

            loading.value = true;
            try {
                // Build the full path to the file
                const data = props.files[index];
                const filePath = `${props.basePath}${props.files[index]}`;
                const lesson_id = data.lesson_id;
                const id = data.id;
                console.log(filePath);
                const response = await fetchData(`/lessons/${lesson_id}/parts/${id}/content`, {method: 'GET'}, false);
                console.log(response);
                currentContent.value = response;
                currentIndex.value = index;
            } catch (error: any) {
                console.error('Error loading content:', error);
                currentContent.value = `<p>Error loading content: ${error.message || 'Unknown error'}</p>`;
            } finally {
                loading.value = false;
            }
        };

        const loadPrevious = (): void => {
            if (currentIndex.value > 0) {
                loadContent(currentIndex.value - 1);
            }
        };

        const loadNext = (): void => {
            if (currentIndex.value < props.files.length - 1) {
                loadContent(currentIndex.value + 1);
            }
        };

        onMounted(() => {
            console.log("HTMLLoader Mounted: Loading initial content");
            loadContent(props.initialIndex);
        });

        onActivated(() => {
            console.log("HTMLLoader Activated: Reloading content");
            loadContent(props.initialIndex);
        });
        return {
            goLessonTests,
            currentIndex,
            currentContent,
            loading,
            loadPrevious,
            loadNext,
            hasTests
        };
    }
});
