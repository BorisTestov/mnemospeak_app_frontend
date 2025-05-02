import { useNavigation } from '@utils/navigation'

export default {
    name: "VocabScreen",
    setup() {
        const { goBack, goFlashcards, goTests, goStudyWords, goPhrases, goUsefulWords }  = useNavigation();

        return {
            goBack,
            goFlashcards,
            goTests,
            goStudyWords,
            goPhrases,
            goUsefulWords
        }
    }
}