<script>
import { Form } from 'vee-validate';
import BaseInput from "@/components/inputs/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import ButtonSpinner from "@/components/ButtonSpinner.vue";
import { ref, computed } from 'vue';
import axios from "@/config/axios/index.js";
import { useRouter } from 'vue-router';
import { useAuthStore } from "@/stores/AuthStore.js";
import { useFunctionalityStore } from "@/stores/FunctionalityStore.js";



export default {
  emits:['updateValues',  'visiblePassword'],
  components:{BaseInput,BaseButton, Form, ButtonSpinner},
  setup(props) {

   const router=useRouter()
   const authStore=useAuthStore();
   const functionality=useFunctionalityStore()

   
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
    if((usernameValue.value.toLowerCase().match(emailRegex) || usernameValue.value.match(usernameRegex)) && passwordValue.value.match(passwordRegex)){
      authStore.switchUsername=usernameValue.value
      authStore.switchPassword=passwordValue.value
        localStorage.removeItem('status')
        await axios.post('logout').then(()=>{
          router.push({ name: 'switch-account'})
          authStore.user=null
          authStore.authenticated=false
          functionality.darkTheme=false
          functionality.switchAccounts=false
        })
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

   return { 
    onSubmit, 
    inputValuesUpdate, 
    registerButtonActivated, 
    changePasswordType, 
    passwordValueLength, 
    loginAttempt,
    credentialsError,
    error,
    functionality
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
    <div class="flex flex-col items-center justify-center gap-[2rem]">
     <div v-if="credentialsError" class="text-[#FA383E] text-[2.4rem] text-center">{{ error }}</div>
      <router-link @click="functionality.switchAccounts=false" :to="{name: 'accounts-password-reset'}" class="text-[rgba(0, 55, 107)] text-[1.8rem]">
       Forgot password?
      </router-link>
    </div>

  </Form>
</template>

<style scoped>

</style>