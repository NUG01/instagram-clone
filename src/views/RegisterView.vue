<script>
import InstagramText from "@/components/icons/InstagramText.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormBorder from "@/components/FormBorder.vue";
import BirthdayModal from "@/components/BirthdayModal.vue";
import FacebookIcon from "@/components/icons/FacebookIcon.vue";
import CakeIcon from "@/components/icons/CakeIcon.vue";
import RegisterForm from '@/components/forms/RegisterForm.vue';
import DateForm from '@/components/forms/DateForm.vue';
import { ref } from "vue";
import { useRegisterStore } from '@/stores/RegistrationStore.js';


export default {
  emits:['dateForm', 'hideModal', 'buttonDisability', 'resetButton'],
  components:{InstagramText, BaseButton, FacebookIcon, FormBorder, RegisterForm, CakeIcon, BirthdayModal, DateForm},
  setup() {
    const registrationFormData = useRegisterStore();

    const showDateForm=ref(false)
    const showBirthdayModal=ref(false)
    const nextButtonActivated=ref(false)
    const submitDate=ref(false)

    function submitDateForm(){
     submitDate.value=true
    }
    function changeButtonState(state){
     nextButtonActivated.value=state
    }


    return {showDateForm, showBirthdayModal, nextButtonActivated, submitDateForm, submitDate, changeButtonState}
  },
}
</script>

<template>
  <section class="bg-[rgba(250,250,250)] w-[100%] min-h-[100vh] flex justify-center pr-[7rem] py-[5rem]">
  <birthday-modal @hide-modal="showBirthdayModal=false" v-if="showBirthdayModal"></birthday-modal>
  <div class="w-[35%] flex flex-col items-center justify-center gap-[3rem]">
  <div v-if="!showDateForm" class="w-[100%] bg-[#ffffff90] py-[7rem] px-[6rem] border-[1px] border-solid border-[#cdcdcd] rounded-[1px] flex flex-col items-center">
    <div class="scale-[0.7]"><instagram-text/></div>
    <p class="text-[3.2rem] text-[#7b7b7bb4] font-[500] text-center">Sign up to see photos and videos from your friends.</p>
   <base-button type="button" class="mt-[3.6rem] flex items-center justify-center gap-[1rem]">
   <facebook-icon color="#fff" class="self-end -translate-y-[1.2px]"></facebook-icon>
   <p>Log in with Facebook</p>
   </base-button>
   <form-border class="mt-[1.6rem]"></form-border>
    <register-form @date-form="showDateForm=true" class="pt-[3rem] w-[100%]"></register-form>
  </div>
  <div v-else class="w-[100%] bg-[#ffffff90] py-[4rem] px-[9rem] border-[1px] border-solid border-[#cdcdcd] rounded-[1px] flex flex-col items-center">
    <cake-icon></cake-icon>
    <p class="text-[2.4rem] text-[#000000b4] font-[500] text-center mt-[1rem]">Add Your Birthday</p>
    <p class="text-[2rem] text-[#000000b4] font-[500] text-center mt-[1rem]">This won't be a part of your public profile.</p>
    <p class="text-[2rem] text-[#0094f6b4] font-[500] text-center cursor-pointer" @click="showBirthdayModal=true">Why do I need to provied my birthday?</p>
    <div class="mt-[1.3rem]">
      <date-form :submit="submitDate" @button-disability="changeButtonState" @reset-button="submitDate=false"></date-form>
      <!-- <p class="text-[1.6rem] text-[#4a4a4ab4] font-[400] text-center mt-[1rem]">You need to enter the date you were born</p> -->
      <p class="text-[1.6rem] text-[#4a4a4ab4] font-[400] text-center mt-[2rem]">Use your own birthday, even if this account is for a business, a pet, or something else</p>
      <base-button @click="submitDateForm" type="button" class="mt-[3.2rem]" width="w-[100%]" :class="[!nextButtonActivated ? 'opacity-[0.63] hover:bg-[#0095f6]' : '']" :disabled="!nextButtonActivated">Next</base-button>
      <p class="text-[2.4rem] font-[500] text-center mt-[2rem] text-[#47afff] cursor-pointer" @click="showDateForm=false">Go Back</p>
    </div>
  </div>
  <div class="w-[100%] h-[9rem] bg-[#ffffff90] border-[1px] border-solid border-[#cdcdcd] rounded-[1px] flex items-center justify-center">
   <div class="text-[2.3rem] font-[500]"><p class="text-[#000000b4]">Have an account? <router-link :to="{ name: 'login'}" class="text-[#0094f6b4]">Log in</router-link></p></div>
  </div>
  </div>
  </section>
</template>

<style scoped>
.color{
  color:#444950c4
}
</style>