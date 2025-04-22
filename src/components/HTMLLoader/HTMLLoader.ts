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
        data: {
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
            if (index < 0 || index >= props.data.length) {
                console.error('Invalid file index:', index);
                return;
            }

            loading.value = true;
            try {
                currentContent.value = props.data[index];
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
            if (currentIndex.value < props.data.length - 1) {
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
