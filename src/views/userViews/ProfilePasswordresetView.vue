<script>
import BaseNavigation from "@/components/BaseNavigation.vue";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useNavigationStore } from "@/stores/NavigationStore.js";
import { useFunctionalityStore } from "@/stores/FunctionalityStore.js";
import SecurityIcon from "@/components/icons/SecurityIcon.vue";
import { Form } from 'vee-validate';
import BaseButton from "@/components/BaseButton.vue";
import ButtonSpinner from "@/components/ButtonSpinner.vue";
import axios from "@/config/axios/index.js";


export default {
    components:{BaseNavigation, SecurityIcon, Form, BaseButton, ButtonSpinner},
  setup() {
        const navigation=useNavigationStore()
        const functionality=useFunctionalityStore()

        const router=useRouter();
        navigation.navigate()
        functionality.switchAccounts=false
        const codeFormButtonActivated=ref(false)
        const emailOrUsername=ref('')
        const credentialsError=ref(false)
        const emailSubmitted=ref(false)
        const hiddenEmail=ref('');
        const error=ref('')
        const emailSent=ref(false)
        const userEmail=ref('')
        const emailRegex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const usernameRegex=/^[a-z0-9_]{2,}$/
           
        const themeColor = computed(() => {
     return functionality.getDarkTheme ? 'dark-theme' : 'light-theme';
   })

       function getCodeValue(elem){
      emailOrUsername.value=elem.target.value
      if((elem.target.value).match(emailRegex) || (elem.target.value).match(usernameRegex)){
        codeFormButtonActivated.value=true
      }else{
        codeFormButtonActivated.value=false
      }
    }

      let str=[];
      let trimmedString;
      function populateSymbol(symbol, quantity){
        for (let k = 0; k < quantity; k++) {
           str.push(symbol);
           trimmedString+=str[k]
        }
        trimmedString= trimmedString.substring(trimmedString.indexOf("*"), trimmedString.lastIndexOf("*"));
        return trimmedString;
      }

     const formColor = computed(() => {
     return functionality.getDarkTheme ? 'bg-[#000000b4] border-[#5a5a5ab4]' : 'bg-[#ffffff90] border-[#cdcdcd]';
   })
     const successColor = computed(() => {
     return functionality.getDarkTheme ? 'bg-[#000000b4] border-[#5a5a5ab4] text-[#7b7b7bb4]' : 'bg-[#ffffff90] border-[#cdcdcd] text-[#000000b4]';
   })


       async function submitPasswordReset(){
    credentialsError.value=false
    error.value=''
    try{
      emailSubmitted.value=true
      const res= await axios.post('forgot-password', {
        emailOrUsername: emailOrUsername.value
      })
      userEmail.value= res.data.email
      let emailName= userEmail.value.substring(0, userEmail.value.indexOf('@'));
      let emailIndex= userEmail.value.substring(userEmail.value.indexOf("@"), userEmail.value.length);

      hiddenEmail.value=emailName.charAt(0) + populateSymbol('*', emailName.length-1) + emailName.charAt(emailName.length-1) + emailIndex;
      emailSent.value=true
      emailSubmitted.value=false
     }catch(err){
       error.value=err.response.data
       credentialsError.value=true
       emailSubmitted.value=false
    }
    }


    return {
      navigation,
      themeColor,
      getCodeValue,
      submitPasswordReset,
      codeFormButtonActivated,
      formColor,
      functionality,
      emailOrUsername,
      emailSubmitted,
      credentialsError,
      hiddenEmail,
      error,
      emailSent,
      successColor
    }
  },
}
</script>

<template>
<div class="w-[100vw] h-[100vh] flex" :class="themeColor">
  <base-navigation></base-navigation>
  <div class="flex items-center justify-center w-[100%] h-[100vh]">
    <div v-if="!emailSent" :class="formColor" class="w-[35%] py-[4rem] px-[9rem] border-[1px] border-solid rounded-[4px] flex flex-col items-center relative">
    <security-icon></security-icon>
    <p :class="functionality.getDarkTheme ? 'text-[#fafafa]' : 'text-[#000000b4]'" class="text-[2.4rem] font-[500] text-center mt-[1rem]">Trouble logging in?</p>
    <p :class="functionality.getDarkTheme ? 'text-[#aaaaaab4]' : 'text-[#7b7b7bb4]'" class="text-[2rem] font-[500] text-center mt-[1rem] mb-[1rem]">Enter your email or username and we'll send you a link to get back into your account.</p>
    <Form @submit="submitPasswordReset" class="mt-[1.3rem] w-[100%]">
     <input :class="functionality.getDarkTheme ? 'bg-[#1b1b1b] border-[#5a5a5ab4] text-[#fafafa]' : 'bg-[#f6f7f7c1] border-[#cdcdcd] text-[#636363]'" name="reset" id="reset" @input="getCodeValue($event)" class="w-[100%] h-[6.3rem] mb-[2.4rem] text-[2.4rem] focus:border-[#a7a7a7] focus:border-[1.5px] border-[1px] border-solid rounded-[10px] pl-[1.6rem] pr-[5rem]']" placeholder="Email or Username" />
      <base-button type="submit" width="w-[100%] h-[5rem]" rounded="rounded-[12px]" :class="[!codeFormButtonActivated ? 'opacity-[0.63] hover:bg-[#0095f6]' : '']" :disabled="!codeFormButtonActivated">
      <p v-if="!emailSubmitted">Send login link</p>
      <button-spinner v-else></button-spinner>
      </base-button>
    </Form>
    <div v-if="credentialsError" :class="[credentialsError ?  'mb-[1rem] mt-[1rem]' : '', functionality.getDarkTheme ? 'text-[#aaaaaab4] text-[#ec7478] ' : 'text-[#7b7b7bb4] text-[#FA383E] ']" class="text-[1.8rem] text-center">{{ error }}</div>
  </div>
  <div v-else :class="successColor"  class="w-[35%] py-[4rem] px-[9rem] border-[1px] border-solid rounded-[4px] flex flex-col items-center relative">
    <p :class="functionality.getDarkTheme ? 'text-[#d0d0d0b4]' : '' " class="text-[2.4rem] font-[500] text-center mt-[1rem]">Email Sent</p>
    <p class="text-[2rem] text-[#7b7b7bb4] font-[500] text-center mt-[2rem] mb-[1rem]">We sent an email to <span :class="functionality.getDarkTheme ? 'text-[#d0d0d0b4]' : 'text-[#000000b4]' ">{{ hiddenEmail }}</span> with a link to get back into your account</p>
    <router-link :to="{name: 'login'}"><p class="text-[2.4rem] font-[500] text-center mt-[2rem] text-[#47afff] cursor-pointer">OK</p></router-link>
  </div>
  </div>
</div>
</template>


<style scoped>
.color{
  color:#d0d0d0b4;
}
.light-theme{
  color:hsl(0, 0%, 11%);
  background-color: rgb(250, 250, 250);
}
.dark-theme{
  color:rgba(250,250,250);
  background-color: rgb(27, 27, 27);
}
</style>