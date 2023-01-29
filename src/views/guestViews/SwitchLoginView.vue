<script>
import InstagramLoading from "@/components/InstagramLoading.vue";
import { onMounted } from "vue";
import axios from "@/config/axios/index.js";
import { useAuthStore } from "@/stores/AuthStore.js";
import { useRouter } from "vue-router";
import { useNavigationStore } from "@/stores/NavigationStore.js";
import { useFunctionalityStore } from "@/stores/FunctionalityStore.js";

export default {
  components:{InstagramLoading},
  setup() {
    const authStore=useAuthStore();
    const router=useRouter();
    const functionality=useFunctionalityStore()


     const navigation=useNavigationStore()

    onMounted(async()=>{
      try{
        const res= await axios.post('login', {
        username: authStore.getSwitchUsername,
        password: authStore.getSwitchPassword
       })
          navigation.navigate()
          navigation.homePage=true
          authStore.user=res.data.user
          authStore.authenticated=true
          functionality.switchAccounts=false
          router.push({ name: 'home'})
      }catch(err){
        // localStorage.setItem('status', 401)
        router.push({ name: 'landing'})
      }
      
    })

return {}
      }
      
      }
</script>

<template>
  <instagram-loading></instagram-loading>
</template>