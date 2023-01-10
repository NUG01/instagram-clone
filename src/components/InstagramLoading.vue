<script>
import InstagramLogo from "@/components/icons/InstagramLogo.vue";
export default {
  components:{InstagramLogo},
  setup() {
    
  },
}
</script>

<template>
<div class="w-[100vw] h-[100vh] bg-[rgba(250,250,250)] absolute top-0 left-0 z-50 flex items-center justfy-center">
<instagram-logo class="w-[100%] logo"></instagram-logo>
</div>
</template>

<style scoped>
@keyframes opacity-anim {
  0% {opacity: 0;}
  50% {opacity: 1}
  100% {opacity: 0;}
}

.logo{
  animation-name: opacity-anim;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}
</style>