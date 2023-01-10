<script>
import BaseButton from "@/components/BaseButton.vue";
import axios from "@/config/axios/index.js";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/AuthStore.js";


export default {
  components:{BaseButton},
  setup() {
    const router=useRouter();
    const authStore=useAuthStore();

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

    

    return { logoutHandle }
  },
}
</script>


<template>
<div class="w-[100vw] h-[100vh] bg-red-500">
  <base-button type="button" @click="logoutHandle"></base-button>
</div>
</template>