<script>
import { Form } from 'vee-validate';
import { ref } from 'vue';
import SecurityIcon from "@/components/icons/SecurityIcon.vue";
import InstagramText from "@/components/icons/InstagramText.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormBorder from "@/components/FormBorder.vue";
import axios from "@/config/axios/index.js";


export default {
  components:{Form, SecurityIcon, BaseButton, FormBorder, InstagramText},
  setup() {
    const codeFormButtonActivated=ref(false)
    const emailOrUsername=ref('')

    const emailRegex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const usernameRegex=/^[a-z0-9_]{2,}$/


     function getCodeValue(elem){
      emailOrUsername.value=elem.target.value
      if((elem.target.value).match(emailRegex) || (elem.target.value).match(usernameRegex)){
        codeFormButtonActivated.value=true
      }else{
        codeFormButtonActivated.value=false
      }
    }

   async function submitPasswordReset(){
    const res= await axios.post('forgot-password', {
      emailOrUsername: emailOrUsername.value
    })
    console.log(res)
    }

    return {getCodeValue, codeFormButtonActivated, submitPasswordReset}
  },
}
</script>


<template>
<section class="w-[100vw] h-[100vh] bg-[rgba(250,250,250)] flex items-center justify-center">
  <div class="absolute top-0 left-0 w-[100vw] bg-[#fff] border-b-[2px] border-b-solid border-b-[#cdcdcd] pt-[2.4rem] pb-[1.6rem] pl-[10%]">
    <div class="w-[24rem]"><instagram-text></instagram-text></div>
  </div>
  <div class="w-[35%] bg-[#ffffff90] py-[4rem] px-[9rem] border-[1px] border-solid border-[#cdcdcd] border-b-0 rounded-[4px] flex flex-col items-center relative">
    <security-icon></security-icon>
    <p class="text-[2.4rem] text-[#000000b4] font-[500] text-center mt-[1rem]">Trouble logging in?</p>
    <p class="text-[2rem] text-[#7b7b7bb4] font-[500] text-center mt-[1rem] mb-[1rem]">Enter your email or username and we'll send you a link to get back into your account.</p>
    <Form @submit="submitPasswordReset" class="mt-[1.3rem] w-[100%]">
     <input name="reset" id="reset" @input="getCodeValue($event)" class="w-[100%] h-[6.3rem] mb-[2.4rem] text-[2.4rem] text-[#636363] border-[#cdcdcd] focus:border-[#a7a7a7] focus:border-[1.5px] border-[1px] border-solid rounded-[10px] bg-[#f6f7f7c1] pl-[1.6rem] pr-[5rem]']" placeholder="Email or Username" />
      <base-button type="submit" width="w-[100%]" rounded="rounded-[12px]" :class="[!codeFormButtonActivated ? 'opacity-[0.63] hover:bg-[#0095f6]' : '']" :disabled="!codeFormButtonActivated">Send login link</base-button>
    </Form>
    <form-border class="mt-[3rem]" width="w-[100%]"></form-border>
    <router-link :to="{name: 'registration'}" class="text-[2.2rem] text-[#000000b4] hover:text-[#4a4a4ab4] font-[500] text-center mt-[1rem] mb-[10rem]">Create new account</router-link>
    <router-link :to="{name: 'login'}" class="text-[2.2rem] text-[#000000b4] hover:text-[#4a4a4ab4] font-[500] text-center w-[100%] absolute bottom-[0] right-0 bg-[#f6f7f7c1] py-[2rem] border-[1.5px] border-solid border-[#c7c7c7] rounded-[4px]"><p>Back to login</p></router-link>
  </div>
</section>
</template>

<style>
.color{
  color:#c7c7c7
}
</style>