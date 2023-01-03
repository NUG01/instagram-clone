<script>
import InstagramText from "@/components/icons/InstagramText.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormBorder from "@/components/FormBorder.vue";
import FacebookIcon from "@/components/icons/FacebookIcon.vue";
import RegisterForm from '@/components/forms/RegisterForm.vue';

export default {
  components:{InstagramText, BaseButton, FacebookIcon, FormBorder, RegisterForm},
  setup() {
    
  },
}
</script>

<template>
  <section class="bg-[rgba(250,250,250)] w-[100%] min-h-[100vh] flex justify-center pr-[7rem] py-[5rem]">
  <div class="w-[35%] flex flex-col items-center justify-center gap-[3rem]">
  <div class="w-[100%] bg-[#ffffff90] py-[7rem] px-[6rem] border-[1px] border-solid border-[#cdcdcd] rounded-[1px] flex flex-col items-center">
    <div class="scale-[0.7]"><instagram-text/></div>
    <p class="text-[3.2rem] text-[#7b7b7bb4] font-[500] text-center">Sign up to see photos and videos from your friends.</p>
   <base-button type="button" class="mt-[3.6rem] flex items-center justify-center gap-[1rem]">
   <facebook-icon color="#fff" class="self-end -translate-y-[1.2px]"></facebook-icon>
   <p>Log in with Facebook</p>
   </base-button>
   <form-border class="mt-[1.6rem]"></form-border>
    <register-form class="pt-[3rem] w-[100%]"></register-form>
  </div>
  <div class="w-[100%] h-[9rem] bg-[#ffffff90] border-[1px] border-solid border-[#cdcdcd] rounded-[1px] flex items-center justify-center">
   <div class="text-[2.3rem] font-[500]"><p class="text-[#000000b4]">Have an account? <router-link :to="{ name: 'login'}" class="text-[#0094f6b4]">Log in</router-link></p></div>
  </div>
  </div>
  </section>
</template>

<style scoped>
.color{
  color:#7b7b7bb4
}
</style>