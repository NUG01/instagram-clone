<script>
import InstagramLoading from "@/components/InstagramLoading.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "@/config/axios/index.js";

export default {
  components:{InstagramLoading},
  setup() {
    const router=useRouter()
    onMounted(async()=>{
      const res= await axios.post('easy-login', {
      token: router.currentRoute.value.params.id,
      email: router.currentRoute.value.query.email
     })
      router.push({ name: 'home' })
    })
    
  },
}
</script>

<template>
  <instagram-loading></instagram-loading>
</template>