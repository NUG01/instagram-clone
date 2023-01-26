<script>
import BaseButton from "@/components/BaseButton.vue";
import BaseNavigation from "@/components/BaseNavigation.vue";
import axios from "@/config/axios/index.js";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/AuthStore.js";
import { useNavigationStore } from "@/stores/NavigationStore.js";
import { useFunctionalityStore } from "@/stores/FunctionalityStore.js";


export default {
  emits:['searchActivated', 'componentsLoaded'],
  components:{BaseButton, BaseNavigation},
  setup() {
    const navigation=useNavigationStore()
    const functionality=useFunctionalityStore()

    const router=useRouter();
    const authStore=useAuthStore();


const searchActive = computed(() => {
     return navigation.getSearchPage
   })

    return { searchActive }
  },
}
</script>


<template>
<div class="w-[100vw] h-[100vh]">
  <base-navigation :activeHome="!searchActive"></base-navigation>
</div>
</template>