import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
    name: 'SplashScreen',
    props: {
        imagePath: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            default: 1000
        }
    },
    emits: ['splash-complete'],
    setup(props, { emit }) {
        const visible = ref(true);
        const showContent = ref(true);

        onMounted(() => {
            setTimeout(() => {
                showContent.value = false;

                setTimeout(() => {
                    visible.value = false;
                    emit('splash-complete');
                }, 800);
            }, props.duration);
        });

        return {
            visible,
            showContent
        };
    }
});