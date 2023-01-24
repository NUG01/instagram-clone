<script>
import BaseNavigation from "@/components/BaseNavigation.vue";
import { useRouter } from "vue-router";
import { useNavigationStore } from "@/stores/NavigationStore.js";


export default {
    components:{BaseNavigation},
  setup() {
        const navigation=useNavigationStore()

        const router=useRouter();
        navigation.navigate()
        navigation.messagesPage=true


    return {
      navigation
    }
  },
}
</script>

<template>
<div class="w-[100vw] h-[100vh] bg-[rgba(250,250,250)]">
  <base-navigation :activeExplore="navigation.getMessagesPage"></base-navigation>
</div>
</template>