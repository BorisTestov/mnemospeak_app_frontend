import { defineComponent, ref, onMounted, PropType } from 'vue';
import axios from 'axios';

export default defineComponent({
    name: "HTMLLoader",
    props: {
        title: {
            type: String,
            default: ''
        },
        files: {
            type: Array as PropType<string[]>,
            required: true
        },
        basePath: {
            type: String,
            default: '/data/'
        },
        initialIndex: {
            type: Number,
            default: 0,
            validator: (value: number) => value >= 0
        }
    },
    setup(props) {
        const currentIndex = ref<number>(props.initialIndex);
        const currentContent = ref<string>('');
        const loading = ref<boolean>(false);

        const loadContent = async (index: number): Promise<void> => {
            if (index < 0 || index >= props.files.length) {
                console.error('Invalid file index:', index);
                return;
            }

            loading.value = true;
            try {
                // Build the full path to the file
                const filePath = `${props.basePath}${props.files[index]}`;

                // Use axios to fetch the file
                const response = await axios.get(filePath);
                currentContent.value = response.data;
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
            // Load the initial HTML file
            loadContent(props.initialIndex);
        });

        return {
            currentIndex,
            currentContent,
            loading,
            loadPrevious,
            loadNext
        };
    }
});
