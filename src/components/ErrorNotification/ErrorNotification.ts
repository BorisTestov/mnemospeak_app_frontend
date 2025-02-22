import { defineComponent, ref, onBeforeUnmount, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import errorNotification from '@/utils/errorNotification';

export default defineComponent({
    name: 'ErrorToast',

    props: {
        defaultDuration: {
            type: Number,
            default: 3000
        }
    },

    setup(props) {
        const router = useRouter();
        const isVisible = ref(false);
        const progress = ref(100);
        const message = ref('');
        const duration = ref(props.defaultDuration);
        let progressInterval = null;

        const show = () => {
            isVisible.value = true;
            progress.value = 100;
        };

        const hide = () => {
            isVisible.value = false;
            clearInterval(progressInterval);
        };

        watch(() => router.currentRoute.value, () => {
            if (isVisible.value) {
                hide();
            }
        });

        onBeforeUnmount(() => {
            clearInterval(progressInterval);
        });

        const instance = {
            show,
            hide,
            get message() { return message.value; },
            set message(value) { message.value = value; },
            get duration() { return duration.value; },
            set duration(value) { duration.value = value; }
        };

        onMounted(() => {
            errorNotification.setInstance(instance);
        });

        return {
            isVisible,
            progress,
            message,
            show,
            hide
        };
    }
});