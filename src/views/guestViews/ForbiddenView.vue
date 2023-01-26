<script>
import InstagramText from "@/components/icons/InstagramText.vue";
import MetaIcon from "@/components/icons/MetaIcon.vue";

export default {
  components:{InstagramText, MetaIcon},
  setup() {
    
  },
}
</script>

<template>
  <div class="w-[100vw] h-[100vh] bg-[rgba(250,250,250)] flex items-center justify-center text-center">
    <div class="absolute top-0 left-0 w-[100vw] bg-[#fff] border-b-[2px] border-b-solid border-b-[#cdcdcd] pt-[2.4rem] pb-[1.6rem] px-[10%] flex items-center justify-between">
     <div class="w-[24rem]"><instagram-text></instagram-text></div>
     <div class="flex items-center justify-center gap-[2.4rem]">
      <router-link :to="{name: 'login'}" class="bg-[#0095f6] text-[#fff] text-[3rem] py-[1.2rem] px-[3rem] font-[500] hover:bg-[#0074cc] rounded-[16px]">Log In</router-link>
      <router-link :to="{name: 'registration'}" class="py-[1.2rem] text-[3rem] font-[500] signup">Sign Up</router-link>
     </div>
    </div>
    <div class="absolute bottom-[7%] right-1/2 translate-x-1/2 flex items-center justify-center flex-col">
    <p class="text-[#000000b4] text-[2.4rem]">from</p>
    <meta-icon></meta-icon>
   </div>
   <div class="w-[100%] mb-[5rem]">
    <p class="text-[4.2rem] text-[#000] font-[500] mb-[3rem]">Sorry, you can't access this page without authorization,<br>please log in</p>
   </div>
  </div>
</template>

<style scoped>
.signup{
  color:rgba(0, 149, 246);
}
.signup:hover{
  color:rgb(84, 155, 248);
}
</style>