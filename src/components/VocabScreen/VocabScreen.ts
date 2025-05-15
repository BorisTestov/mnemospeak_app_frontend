import { useNavigation } from '@utils/navigation'

export default {
    name: "VocabScreen",
    setup() {
        const { goBack, goFlashcardsModes, goLetterType, goTests, goStudyWords, goPhrases, goUsefulWords }  = useNavigation();

        return {
            goBack,
            goFlashcardsModes,
            goTests,
            goLetterType,
            goStudyWords,
            goPhrases,
            goUsefulWords
        }
    }
}