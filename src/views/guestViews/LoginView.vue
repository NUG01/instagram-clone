<script>
import InstagramText from "@/components/icons/InstagramText.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormBorder from "@/components/FormBorder.vue";
import LoginForm from '@/components/forms/LoginForm.vue';


export default {
  components:{InstagramText, BaseButton, FormBorder, LoginForm},
  setup() {
    
  },
}
</script>

<template>
  <section class="bg-[rgba(250,250,250)] min-h-[100vh] w-[100%] flex justify-center pr-[7rem] py-[5rem]">
  <div class="w-[35%] flex flex-col items-center justify-center gap-[3rem]">
  <div class="w-[100%] bg-[#ffffff90] py-[7rem] px-[6rem] border-[1px] border-solid border-[#cdcdcd] rounded-[1px] flex flex-col items-center">
    <div class="scale-[0.7]"><instagram-text/></div>
    <login-form class="pt-[3rem] w-[100%]"></login-form>
  </div>
  <div class="w-[100%] h-[9rem] bg-[#ffffff90] border-[1px] border-solid border-[#cdcdcd] rounded-[1px] flex items-center justify-center">
   <div class="text-[2.3rem] font-[500]"><p class="text-[#000000b4]">Don't have an account? <router-link :to="{ name: 'registration'}" class="text-[#0094f6b4]">Sign up</router-link></p></div>
  </div>
  </div>
  </section>
</template>

<style scoped>
.color{
  color:#7b7b7bb4
}
</style>