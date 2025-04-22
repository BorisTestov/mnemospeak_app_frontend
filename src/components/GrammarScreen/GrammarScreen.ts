import { useNavigation } from '@utils/navigation'
import {useLessonStore} from "@stores/LessonSettings";
import {get_lesson_names_by_level} from "@utils/api_calls";
import {onMounted, ref} from "vue";

export default {
    name: "GrammarScreen",
    setup() {
        const { goBack, goTopic }  = useNavigation();
        let lessons = ref([]);

        const fetchLessons = async() => {

            lessons.value = await get_lesson_names_by_level();
        }

        console.log(lessons);

        // const lessons =

        const setTopicName = (topicName, hasTests, lessonId) => {
            const lessonStore = useLessonStore()
            lessonStore.setLessonName({lesson_name: topicName});
            lessonStore.setLessonProps({lesson_id: lessonId, has_tests: hasTests})
            goTopic();
        }

        onMounted(() => {
            fetchLessons()
        })


        return {
            goBack,
            setTopicName,
            lessons
        }
    }
}