<script>
import { onMounted, ref, computed } from "vue";
import axios from "@/config/axios/index.js";
import { useAuthStore } from "@/stores/AuthStore.js";
import { useFunctionalityStore } from "@/stores/FunctionalityStore.js";

export default {
  setup() {
    const authStore=useAuthStore();
    const functionality=useFunctionalityStore()

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

    if(localStorage.getItem('darkTheme')){
      functionality.darkTheme=localStorage.getItem('darkTheme')
    }

    const themeColor = computed(() => {
     return functionality.getDarkTheme ? 'dark-theme' : 'light-theme';
   })


    return { dataIsFetched, themeColor }
  },
}
</script>

<template>
<router-view v-if="dataIsFetched" :class="themeColor"></router-view>
</template>

<style scoped>

.light-theme{
  color:rgb(27, 27, 27);
  background-color: rgba(250,250,250);
}
.dark-theme{
  color:rgba(250,250,250);
  background-color: rgb(27, 27, 27);
}
</style>
