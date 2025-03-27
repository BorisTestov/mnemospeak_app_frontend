<template>
  <div class="screen-wrapper">
    <HTMLLoader
        title="Падежи"
        :files="grammarFiles"
    />
  </div>
</template>
<script lang="ts">
import { useNavigation } from '@utils/navigation'
import HTMLLoader from '@components/HTMLLoader.vue' // Import the HTMLLoader component

export default {
  name: "GrammarScreen",
  components: {
    HTMLLoader // Register the component
  },
  setup() {
    const { goBack } = useNavigation();

    // Define grammar files to be loaded
    const grammarFiles = [
      'lessons/nouns/cases/1.html',
      'lessons/nouns/cases/2.html',
      'lessons/nouns/cases/3.html'
    ];

    return {
      goBack,
      grammarFiles
    }
  }
}
</script>
