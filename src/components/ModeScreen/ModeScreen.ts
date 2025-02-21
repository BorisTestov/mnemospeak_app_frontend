import { useLevelStore } from '@stores/LanguageLevel'
import { useNavigation } from '@/navigation'


export default {
    name: "ModeScreen",
    setup() {
        const { goBack, goGrammar, goVocab }  = useNavigation();

        const levelStore = useLevelStore();
        const currentLevel = levelStore.currentLevel;

        return {
            goBack,
            goGrammar,
            goVocab,
            currentLevel
        }
    }
}