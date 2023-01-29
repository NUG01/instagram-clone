<script>
import BaseNavigation from "@/components/BaseNavigation.vue";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useNavigationStore } from "@/stores/NavigationStore.js";
import { useFunctionalityStore } from "@/stores/FunctionalityStore.js";


export default {
    components:{BaseNavigation},
  setup() {
        const navigation=useNavigationStore()
        const functionality=useFunctionalityStore()

        const router=useRouter();
        navigation.navigate()
        navigation.explorePage=true

           
        const themeColor = computed(() => {
     return functionality.getDarkTheme ? 'dark-theme' : 'light-theme';
   })


    return {
      navigation,
      themeColor
    }
  },
}
</script>

<template>
<div class="w-[100vw] h-[100vh]" :class="themeColor">
  <base-navigation :activeExplore="navigation.getExplorePage"></base-navigation>
</div>
</template>


<style scoped>
.light-theme{
  color:rgb(27, 27, 27);
  background-color: rgb(250, 250, 250);
}
.dark-theme{
  color:rgba(250,250,250);
  background-color: rgb(27, 27, 27);
}
</style>