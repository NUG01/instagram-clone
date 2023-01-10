<script>
import { Form } from 'vee-validate';
import BaseInput from "@/components/inputs/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormBorder from "@/components/FormBorder.vue";
import GoogleIcon from "@/components/icons/GoogleIcon.vue";
import { ref } from 'vue';
import axios from "@/config/axios/index.js";
import { useRouter } from 'vue-router';
import { useAuthStore } from "@/stores/AuthStore.js";



export default {
  emits:['updateValues',  'visiblePassword'],
  components:{BaseInput,BaseButton, Form, FormBorder, GoogleIcon},
  setup() {

   const router=useRouter()
   const authStore=useAuthStore();

   
   const usernameValue=ref('')
   const passwordValue=ref('')
   const registerButtonActivated=ref(false)
   const passwordValueLength=ref(false)

   const emailRegex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   const usernameRegex=/^[a-z0-9_]{2,}$/
   const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/


  async function onSubmit(){
    if((usernameValue.value.toLowerCase().match(emailRegex) || usernameValue.value.match(usernameRegex)) && passwordValue.value.match(passwordRegex)){
      try{
       const res= await axios.post('login', {username: usernameValue.value, password: passwordValue.value,})
        authStore.user=res.data.user
        authStore.authenticated=true
        router.push({ name: 'home'})
     }catch(error){
         alert(error)
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
   return { onSubmit, inputValuesUpdate, registerButtonActivated, changePasswordType, passwordValueLength, googleSignup }
  }
}
</script>

<template>
 <Form @submit="onSubmit" class="flex flex-col items-center justify-center gap-[1.8rem]">
    <base-input @update-values="inputValuesUpdate" name="username" label="Username or Email"></base-input>
    <base-input @update-values="inputValuesUpdate" @visible-password="changePasswordType" :passwordIsFilled="passwordValueLength" type="password" name="password" label="Password"></base-input>
    <base-button type="submit" class="mt-[1.6rem]" :class="[!registerButtonActivated ? 'opacity-[0.63] hover:bg-[#0095f6]' : '']" :disabled="!registerButtonActivated">Log in</base-button>
    <form-border class="mt-[1rem]"></form-border>
    <div class="flex flex-col items-center justify-center gap-[2rem]">
      <div class="cursor-pointer flex items-center justify-center gap-[1rem]" @click="googleSignup"> 
        <google-icon></google-icon>
        <p class="text-[#385185] text-[2.4rem] font-[500]">Log in with Google</p>
      </div>
      <router-link :to="{ name: 'forgot-password'}" class="text-[rgba(0, 55, 107)] text-[1.8rem]">
       Forgot password?
      </router-link>
    </div>

  </Form>
</template>

<style scoped>

</style>