<script>
import InstagramText from "@/components/icons/InstagramText.vue";
import LoginForm from '@/components/forms/LoginForm.vue';
import InstagramSvg from "@/components/icons/InstagramSvg.vue";
export default {
  components:{InstagramSvg, LoginForm},
  setup() {
    
  },
}
</script>

<template>
  <section class="bg-[url(/src/assets/images/HomeImage.jpg)] w-[100%] min-h-[100vh] bg-center bg-no-repeat bg-cover bg-fixed flex justify-end pr-[7rem] pt-[5rem]">
  <div class="w-[35%] flex flex-col items-center justify-center gap-[3rem]">
  <div class="w-[100%] bg-[#ffffff90] pt-[7rem] pb-[3rem] px-[6rem] border-[1px] border-solid border-[#cdcdcd] rounded-[1px]">
     <div class="w-[100%] flex items-center justify-center"><div class="w-[27rem]"><instagram-svg></instagram-svg></div></div>
    <login-form class="pt-[3rem]"></login-form>
  </div>
  <div class="w-[100%] h-[9rem] bg-[#ffffff90] border-[1px] border-solid border-[#cdcdcd] rounded-[1px] flex items-center justify-center">
   <div class="text-[2.3rem] font-[500]"><p class="text-[#000000b4]">Don't have an account? <router-link :to="{ name: 'registration'}" class="text-[#0094f6b4]">Sign up</router-link></p></div>
  </div>
  </div>
  </section>
</template>

<style scoped>
.color{
  color:#000000b4;
}
</style>