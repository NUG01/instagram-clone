<script>
import InstagramText from "@/components/icons/InstagramText.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormBorder from "@/components/FormBorder.vue";
import BirthdayModal from "@/components/BirthdayModal.vue";
import FacebookIcon from "@/components/icons/FacebookIcon.vue";
import CakeIcon from "@/components/icons/CakeIcon.vue";
import RegisterForm from '@/components/forms/RegisterForm.vue';
import DateForm from '@/components/forms/DateForm.vue';
import { ref, watch } from "vue";
import { useRegisterStore } from '@/stores/RegistrationStore.js';
import axios from "@/config/axios/index.js";
import { Form } from 'vee-validate';
import { useRouter } from 'vue-router';


export default {
  emits:['dateForm', 'hideModal', 'buttonDisability', 'resetButton', 'emailCode'],
  components:{InstagramText, BaseButton, FacebookIcon, FormBorder, RegisterForm, CakeIcon, BirthdayModal, DateForm, Form},
  setup() {
    const registrationFormData = useRegisterStore();
    const router = useRouter();

    const showDateForm=ref(false)
    const showCredentialsForm=ref(true)
    const showBirthdayModal=ref(false)
    const nextButtonActivated=ref(false)
    const submitDate=ref(false)
    const credentialsError=ref(true)
    const error=ref('')
    const dateError=ref(false)

    const codeRegex=/^[0-9_]{6,6}$/
    const codeFormButtonActivated=ref(false)


    function submitDateForm(){
     submitDate.value=true
    }
    function changeButtonState(state){
     nextButtonActivated.value=state
    }
   
    function showRegistrationError(responseError){
      error.value=responseError
      credentialsError.value=true
    }
    function getCodeValue(elem){
      if((elem.target.value).match(codeRegex)){
        codeFormButtonActivated.value=true
      }else{
        codeFormButtonActivated.value=false

      }
    }
   
    function verifyEmailCode(){
      showCredentialsForm.value=false
    }
   async function submitRegistration(){
        credentialsError.value=false
        error.value=''
    try{
       await axios.post('register', {
        username: registrationFormData.getUsername, 
        email: registrationFormData.getEmail, 
        fullname: registrationFormData.getFullname, 
        password: registrationFormData.getPassword,
        birth_date: registrationFormData.getISODate,
        code:document.getElementById('code').value
        })
        registrationFormData.setEmail(null)
        registrationFormData.setUsername(null)
        registrationFormData.setFullname(null)
        registrationFormData.setMonth(null)
        registrationFormData.setDay(null)
        registrationFormData.setYear(null)
        registrationFormData.setCode(null)
        registrationFormData.setFromDateToRegister(false)
        router.push({ name : 'home' })
        }catch(err){
        credentialsError.value=true
      if(err.response.data.message){
        error.value=err.response.data.message
        }else{
        error.value=err.response.data
        }

    }
    }
   async function resendCode(){
      try{
      await axios.post('resend-code', {email: registrationFormData.getEmail})
     }catch(error){
         alert(error)
    }
    }

    watch(nextButtonActivated, (currentValue, oldValue) => {
     dateError.value=oldValue
});
function goBackToRegistration(){
  showDateForm.value=false
  registrationFormData.setFromDateToRegister(true)
}
    return {
      showDateForm, 
      showBirthdayModal, 
      nextButtonActivated, 
      submitDateForm, 
      submitDate, 
      changeButtonState,
      credentialsError, 
      error, 
      dateError, 
      showCredentialsForm, 
      verifyEmailCode, 
      registrationFormData, 
      resendCode, 
      getCodeValue,
      codeFormButtonActivated,
      submitRegistration,
      goBackToRegistration
       
    }
  },
}
</script>

<template>
  <section class="bg-[rgba(250,250,250)] w-[100%] min-h-[100vh] flex justify-center pr-[7rem] py-[5rem]">
  <birthday-modal @hide-modal="showBirthdayModal=false" v-if="showBirthdayModal" class="z-50"></birthday-modal>
  <div class="w-[35%] flex flex-col items-center justify-center gap-[3rem]">
  <div v-if="!showDateForm && showCredentialsForm" class="w-[100%] bg-[#ffffff90] pt-[7rem] pb-[4rem] px-[6rem] border-[1px] border-solid border-[#cdcdcd] rounded-[1px] flex flex-col items-center">
    <div class="scale-[0.7]"><instagram-text/></div>
    <p class="text-[3.2rem] text-[#7b7b7bb4] font-[500] text-center">Sign up to see photos and videos from your friends.</p>
   <base-button type="button" class="mt-[3.6rem] flex items-center justify-center gap-[1rem]">
   <facebook-icon color="#fff" class="self-end -translate-y-[1.2px]"></facebook-icon>
   <p>Log in with Facebook</p>
   </base-button>
   <form-border class="mt-[1.6rem]"></form-border>
    <register-form @date-form="showDateForm=true" class="pt-[3rem] w-[100%]"></register-form>
  </div>
  <div v-if="showDateForm && showCredentialsForm" class="w-[100%] bg-[#ffffff90] py-[4rem] px-[9rem] border-[1px] border-solid border-[#cdcdcd] rounded-[1px] flex flex-col items-center">
    <cake-icon></cake-icon>
    <p class="text-[2.4rem] text-[#000000b4] font-[500] text-center mt-[1rem]">Add Your Birthday</p>
    <p class="text-[2rem] text-[#000000b4] font-[500] text-center mt-[1rem]">This won't be a part of your public profile.</p>
    <p class="text-[2rem] text-[#0094f6b4] font-[500] text-center cursor-pointer" @click="showBirthdayModal=true">Why do I need to provied my birthday?</p>
    <div class="mt-[1.3rem]">
      <code-form></code-form>
      <date-form :submit="submitDate" @email-code="verifyEmailCode" @button-disability="changeButtonState" @reset-button="submitDate=false"></date-form>
      <p v-show="dateError" class="text-[1.6rem] text-[#4a4a4ab4] font-[400] text-center mt-[1rem]">You need to enter the date you were born</p>
      <p class="text-[1.6rem] text-[#4a4a4ab4] font-[400] text-center mt-[2rem]">Use your own birthday, even if this account is for a business, a pet, or something else</p>
      <div v-if="credentialsError" class="text-[#FA383E] text-[1.8rem] text-center mt-[3rem]">{{ error }}</div>
      <base-button @click="submitDateForm" type="button" width="w-[100%]" :class="[!nextButtonActivated ? 'opacity-[0.63] hover:bg-[#0095f6]' : '', credentialsError ? 'mt-[1rem]' : 'mt-[3rem]']" :disabled="!nextButtonActivated">Next</base-button>
      <p class="text-[2.4rem] font-[500] text-center mt-[2rem] text-[#47afff] cursor-pointer" @click="goBackToRegistration">Go Back</p>
    </div>
  </div>
  <div v-if="!showCredentialsForm" class="w-[100%] bg-[#ffffff90] py-[4rem] px-[9rem] border-[1px] border-solid border-[#cdcdcd] rounded-[1px] flex flex-col items-center">
    <img src="/src/assets/images/EmailIcon.png" class="w-[9rem] h-[9rem]"/>
    <p class="text-[2.4rem] text-[#000000b4] font-[500] text-center mt-[1rem]">Enter Confirmation Code</p>
    <p class="text-[2rem] text-[#000000b4] font-[500] text-center mt-[1rem] mb-[2.7rem]">Enter the confirmation code we sent to {{ registrationFormData.getEmail }}. <button @click="resendCode"><p class="text-[#47afff] font-[600]">Resend Code.</p></button></p>
    <Form @submit="submitRegistration" class="mt-[1.3rem] w-[100%]">
     <input name="code" id="code" @input="getCodeValue($event)" class="w-[100%] h-[6.3rem] mb-[2.4rem] text-[2.4rem] text-[#636363] border-[#cdcdcd] focus:border-[#a7a7a7] focus:border-[1.5px] border-[1px] border-solid rounded-[10px] bg-[#f6f7f7c1] pl-[1.6rem] pr-[5rem]']" placeholder="Confirmation Code" />
      <base-button type="submit" width="w-[100%]" rounded="rounded-[12px]" :class="[!codeFormButtonActivated ? 'opacity-[0.63] hover:bg-[#0095f6]' : '']" :disabled="!codeFormButtonActivated">Next</base-button>
      <p class="text-[2.4rem] font-[500] text-center mt-[2rem] text-[#47afff] cursor-pointer" @click="showCredentialsForm=true">Go Back</p>
    </Form>
  </div>
  <div class="w-[100%] h-[9rem] bg-[#ffffff90] border-[1px] border-solid border-[#cdcdcd] rounded-[1px] flex items-center justify-center">
   <div class="text-[2.3rem] font-[500]"><p class="text-[#000000b4]">Have an account? <router-link :to="{ name: 'login'}" class="text-[#0094f6b4]">Log in</router-link></p></div>
  </div>
  </div>
  </section>
</template>

<style scoped>
.color{
  color:#d4d4d4c4
}
input::placeholder{
  color:#a3a3a3c4;
}
</style>