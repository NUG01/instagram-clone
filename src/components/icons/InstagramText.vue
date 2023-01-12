<script>
import { useRouter } from 'vue-router';
export default {
  components:{useRouter},
  setup() {
    const router=useRouter()
    
    function navigate(){
      router.push({name: 'landing'})
    }

    return {navigate}
  },
}
</script>

<template>
<img @click="navigate" src="https://cdn.cdnlogo.com/logos/i/49/instagram.svg">
</template>