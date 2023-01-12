<script>
import { Form } from 'vee-validate';
import BaseInput from "@/components/inputs/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormBorder from "@/components/FormBorder.vue";
import ButtonSpinner from "@/components/ButtonSpinner.vue";
import GoogleIcon from "@/components/icons/GoogleIcon.vue";
import { ref } from 'vue';
import axios from "@/config/axios/index.js";
import { useRouter } from 'vue-router';
import { useAuthStore } from "@/stores/AuthStore.js";



export default {
  emits:['updateValues',  'visiblePassword'],
  components:{BaseInput,BaseButton, Form, FormBorder, GoogleIcon, ButtonSpinner},
  setup() {

   const router=useRouter()
   const authStore=useAuthStore();

   
   const usernameValue=ref('')
   const passwordValue=ref('')
   const error=ref('')
   const registerButtonActivated=ref(false)
   const passwordValueLength=ref(false)
   const loginAttempt=ref(false)
   const credentialsError=ref(false)

   const emailRegex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   const usernameRegex=/^[a-z0-9_]{2,}$/
   const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/


  async function onSubmit(){
    credentialsError.value=false
    error.value=''
    loginAttempt.value=true
    if((usernameValue.value.toLowerCase().match(emailRegex) || usernameValue.value.match(usernameRegex)) && passwordValue.value.match(passwordRegex)){
      try{
        const res= await axios.post('login', {username: usernameValue.value, password: passwordValue.value,})
        authStore.user=res.data.user
        authStore.authenticated=true
        loginAttempt.value=false
        router.push({ name: 'home'})
     }catch(err){
       loginAttempt.value=false
       error.value=err.response.data
       credentialsError.value=true
    }
    }
   }


function inputValuesUpdate(data){
  if(data.name=='username'){
    usernameValue.value=data.value
  }
  if(data.name=='password'){
    passwordValue.value=data.value
    if(passwordValue.value!='') passwordValueLength.value=true
    if(passwordValue.value=='') passwordValueLength.value=false
  }
  if((usernameValue.value.toLowerCase().match(emailRegex) || usernameValue.value.match(usernameRegex)) && (passwordValue.value.match(passwordRegex))){
   registerButtonActivated.value=true
  }else if(usernameValue.value=='' || passwordValue.value==''){    
    registerButtonActivated.value=false
  }else{
    registerButtonActivated.value=false

  }
}

function changePasswordType(){
 const elem = document.querySelector('[name="password"]')
 if(elem.getAttribute("type")){
   elem.removeAttribute("type")
 }else{
   elem.setAttribute("type", "password")
 }
}

function googleSignup(){
  window.location.href=import.meta.env.VITE_API_BASE_URL+'auth/google/redirect';

}
   return { 
    onSubmit, 
    inputValuesUpdate, 
    registerButtonActivated, 
    changePasswordType, 
    passwordValueLength, 
    googleSignup,
    loginAttempt,
    credentialsError,
    error
    }
  }
}
</script>

<template>
 <Form @submit="onSubmit" class="flex flex-col items-center justify-center gap-[1.8rem]">
    <base-input @update-values="inputValuesUpdate" name="username" label="Username or Email"></base-input>
    <base-input @update-values="inputValuesUpdate" @visible-password="changePasswordType" :passwordIsFilled="passwordValueLength" type="password" name="password" label="Password"></base-input>
    <base-button type="submit" class="mt-[1.6rem] h-[5rem]" :class="[!registerButtonActivated ? 'opacity-[0.63] hover:bg-[#0095f6]' : '']" :disabled="!registerButtonActivated">
    <p v-if="!loginAttempt">Log in</p>
    <button-spinner v-else></button-spinner>
    </base-button>
    <form-border class="mt-[1rem]"></form-border>
    <div class="flex flex-col items-center justify-center gap-[2rem]">
      <div class="cursor-pointer flex items-center justify-center gap-[1rem]" @click="googleSignup"> 
        <google-icon></google-icon>
        <p class="text-[#385185] text-[2.4rem] font-[500]">Log in with Google</p>
      </div>
     <div v-if="credentialsError" class="text-[#FA383E] text-[1.8rem] text-center">{{ error }}</div>
      <router-link :to="{ name: 'forgot-password'}" class="text-[rgba(0, 55, 107)] text-[1.8rem]">
       Forgot password?
      </router-link>
    </div>

  </Form>
</template>

<style scoped>

</style>