// File: src/utils/errorNotification.ts
import { ref } from 'vue';

// A simple singleton for error notifications across the app
const errorToastInstance = ref(null);

const errorNotification = {
    // Set the error toast instance (usually called from App.vue)
    setInstance(instance) {
        errorToastInstance.value = instance;
    },

    // Show an error notification
    show(message) {
        if (errorToastInstance.value) {
            errorToastInstance.value.message = message;
            errorToastInstance.value.show();
            return true;
        }

        console.warn('Error toast instance not set. Make sure to call setInstance in App.vue');
        return false;
    }
};

export default errorNotification;