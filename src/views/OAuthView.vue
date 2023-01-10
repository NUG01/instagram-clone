<script>
import InstagramLoading from "@/components/InstagramLoading.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
  components:{InstagramLoading},
  setup() {
    const router=useRouter()
    onMounted(()=>{
      router.push({ name: 'home' })
    })
    
  },
}
</script>

<template>
  <instagram-loading></instagram-loading>
</template>