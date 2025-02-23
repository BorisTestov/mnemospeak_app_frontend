import { defineComponent, ref, watch, onMounted } from 'vue';
import { useUserSettingsStore } from '@stores/UserSettings'


export default defineComponent({
    name: 'Modal',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        storageKey: {
            type: String,
            default: 'modalToggleSetting'
        }
    },
    emits: ['close'],
    setup(props, { emit }) {
        const isVisible = ref(props.visible);
        const showTranslation = ref(false);
        const userSettings = useUserSettingsStore()


        // Watch for changes in visible prop
        watch(() => props.visible, (newValue) => {
            isVisible.value = newValue;
        });

        onMounted(() => {
            const savedShowTranslation = userSettings.showTranslation;
            if (savedShowTranslation !== null) {
                showTranslation.value = savedShowTranslation;
            }
        });

        const closeModal = () => {
            isVisible.value = false;
            emit('close');
        };

        const handleTranslationToggle = () => {
            showTranslation.value = !!showTranslation.value;
            userSettings.showTranslation = showTranslation.value;
        };

        return {
            isVisible,
            showTranslation,
            closeModal,
            handleTranslationToggle
        };
    }
});