import { useNavigation } from '@utils/navigation'

export default {
    name: "VocabScreen",
    setup() {
        const { goBack, goFlashcardsModes, goTests, goStudyWords, goPhrases, goUsefulWords }  = useNavigation();

        return {
            goBack,
            goFlashcardsModes,
            goTests,
            goStudyWords,
            goPhrases,
            goUsefulWords
        }
    }
}