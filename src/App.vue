<script>
import { onMounted, ref } from "vue";
import axios from "@/config/axios/index.js";
import { useAuthStore } from "@/stores/AuthStore.js";

export default {
  setup() {
    const authStore=useAuthStore();
    const dataIsFetched=ref(false)
    onMounted(async()=>{
      if(authStore.getUser==null){
        const res=await axios.get('user')
          authStore.user=res.data.user;
          if(authStore.getUser!=null){
            authStore.authenticated = true;
         }else{
           authStore.authenticated = false;
         }
      }else{
        authStore.authenticated = true;
      }
        dataIsFetched.value=true
    })


    return { dataIsFetched }
  },
}
</script>

<template>
<router-view v-if="dataIsFetched"></router-view>
</template>

<style scoped>

</style>
