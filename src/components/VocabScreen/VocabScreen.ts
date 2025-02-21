import { useNavigation } from '@/navigation'

export default {
    name: "VocabScreen",
    setup() {
        const { goBack, goFlashcards, goTests, goStudyWords }  = useNavigation();

        return {
            goBack,
            goFlashcards,
            goTests,
            goStudyWords
        }
    }
}