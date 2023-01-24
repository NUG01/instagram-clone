<script>
import BaseButton from "@/components/BaseButton.vue";
import BaseNavigation from "@/components/BaseNavigation.vue";
import axios from "@/config/axios/index.js";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/AuthStore.js";
import { useNavigationStore } from "@/stores/NavigationStore.js";


export default {
  emits:['searchActivated', 'componentsLoaded'],
  components:{BaseButton, BaseNavigation},
  setup() {
    const navigation=useNavigationStore()

    const router=useRouter();
    const authStore=useAuthStore();

const searchActive = computed(() => {
     return navigation.getSearchPage
   })


   async function logoutHandle(){
     try{
       await axios.post('logout')
       authStore.user=null
       authStore.authenticated=false
       router.push({ name: 'landing' })
     }catch(err){
      alert('Something went wrong')
     } 
    }


    return { logoutHandle, searchActive }
  },
}
</script>


<template>
<div class="w-[100vw] h-[100vh] bg-[rgba(250,250,250)]">
  <base-navigation :activeHome="!searchActive"></base-navigation>
  <div class="absolute right-0 top-0 w-[10rem]">        
  <base-button type="button" @click="logoutHandle"></base-button>
  </div>
</div>
</template>