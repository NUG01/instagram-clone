<script>
import { Form } from 'vee-validate';
import BaseInput from "@/components/inputs/BaseInput.vue";
import SuccessIcon from "@/components/icons/InputSuccess.vue";
import ErrorIcon from "@/components/icons/InputError.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormBorder from "@/components/FormBorder.vue";
import { ref, watch, computed} from 'vue';


export default {
  emits:['updateValues', 'visiblePassword'],
  components:{BaseInput,BaseButton, Form, FormBorder, SuccessIcon, ErrorIcon},
  setup() {
    
    const emailValue=ref('')
    const fullnameValue=ref('')
    const usernameValue=ref('')
    const passwordValue=ref('')
    const emailValidated=ref(false)
    const fullnameValidated=ref(false)
    const usernameValidated=ref(false)
    const passwordValidated=ref(false)
    const emailNotValidated=ref(false)
    const fullnameNotValidated=ref(false)
    const usernameNotValidated=ref(false)
    const passwordNotValidated=ref(false)
    const registerButtonCounter=ref(0)
    const passwordValueLength=ref(false)

    const emailRegex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const fullnameRegex=/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/
    const usernameRegex=/^[a-z0-9_]{2,}$/
    const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
   
   function onSubmit(){
    if(emailValue.value.toLowerCase().match(emailRegex) && fullnameValue.value.match(fullnameRegex) && usernameValue.value.match(usernameRegex) && passwordValue.value.match(passwordRegex)){
      console.log(emailValue.value)
    }
   }

   function counter(data, state){
    if(data!='' && state=='') registerButtonCounter.value++
    if(data=='') registerButtonCounter.value--
   }

   function validationStateControl(value, successValue, errorValue, regex){
      if(value.value==''){
      successValue.value=false
      errorValue.value=false
    }else if(regex){
      successValue.value=true
      errorValue.value=false
    }else{
      successValue.value=false
      errorValue.value=true
    }
   }


function inputValuesUpdate(data){
  if(data.name=='email'){
    emailValue.value=data.value
    validationStateControl(emailValue, emailValidated, emailNotValidated, emailValue.value.toLowerCase().match(emailRegex))
    counter(emailValue.value, data.previousValue)
  }
  if(data.name=='fullname'){
    fullnameValue.value=data.value
    validationStateControl(fullnameValue, fullnameValidated, fullnameNotValidated, fullnameValue.value.match(fullnameRegex))
    counter(fullnameValue.valuem, data.previousValue)
  }
  if(data.name=='username'){
    usernameValue.value=data.value
    validationStateControl(usernameValue, usernameValidated, usernameNotValidated, usernameValue.value.match(usernameRegex))
    counter(usernameValue.value, data.previousValue)
  }
  if(data.name=='password'){
    passwordValue.value=data.value
    if(passwordValue.value!='') passwordValueLength.value=true
    if(passwordValue.value=='') passwordValueLength.value=false
    validationStateControl(passwordValue, passwordValidated, passwordNotValidated, passwordValue.value.match(passwordRegex))
    counter(passwordValue.value, data.previousValue)
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
    registerButtonCounter, 
    emailValidated, 
    emailNotValidated, 
    fullnameValidated, 
    fullnameNotValidated, 
    usernameValidated, 
    usernameNotValidated, 
    passwordValidated, 
    passwordNotValidated,
    changePasswordType,
    passwordValueLength
    
    }
  },
}
</script>


<template>
 <Form @submit="onSubmit" class="flex flex-col items-center justify-center gap-[1.8rem]">
    <base-input @update-values="inputValuesUpdate" :success="emailValidated" :error="emailNotValidated" name="email" label="Email">
      <template v-slot:success><success-icon></success-icon></template>
      <template v-slot:error><error-icon></error-icon></template>
    </base-input>
    <base-input @update-values="inputValuesUpdate" :success="fullnameValidated" :error="fullnameNotValidated" name="fullname" label="Full Name">
      <template v-slot:success><success-icon></success-icon></template>
      <template v-slot:error><error-icon></error-icon></template>
    </base-input>
    <base-input @update-values="inputValuesUpdate" :success="usernameValidated" :error="usernameNotValidated" name="username" label="Username">
      <template v-slot:success><success-icon></success-icon></template>
      <template v-slot:error><error-icon></error-icon></template>
    </base-input>
    <base-input @update-values="inputValuesUpdate" @visible-password="changePasswordType" :passwordIsFilled="passwordValueLength" type="password" :success="passwordValidated" :error="passwordNotValidated" name="password" label="Password">
      <template v-slot:success><success-icon></success-icon></template>
      <template v-slot:error><error-icon></error-icon></template>
    </base-input>
    <base-button type="submit" class="mt-[1.6rem]" :class="[registerButtonCounter!=4 ? 'opacity-[0.63] hover:bg-[#0095f6]' : '']" :disabled="registerButtonCounter!=4">Sign up</base-button>
  </Form>
</template>

<style scoped>

</style>