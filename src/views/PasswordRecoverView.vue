<script>
import InstagramLoading from "@/components/InstagramLoading.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "@/config/axios/index.js";
import { Form } from 'vee-validate';
import BaseInput from "@/components/inputs/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";



export default {
  components:{InstagramLoading, Form, BaseInput, BaseButton},
  setup() {
    const router=useRouter()

    const password=ref('')
    const passwordConfirm=ref('')


    const resetButtonActivated=ref(false)
    const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/

  async function onSubmit(){
    try{
      const res= await axios.post('recover-password', {
       token: router.currentRoute.value.params.id,
       email: router.currentRoute.value.query.email,
       password: password.value
      })
       router.push({ name: 'login' })
    }catch(err){
       alert(err)
    }

   }

    function inputValuesUpdate(val){
      if(val.name=='password'){
        password.value=val.value
      }else{
        passwordConfirm.value=val.value
      }
      if(password.value==passwordConfirm.value && password.value.match(passwordRegex)){
        resetButtonActivated.value=true
      }else{
        resetButtonActivated.value=false

      }
    }
    return {
       inputValuesUpdate,
       onSubmit, 
       resetButtonActivated,
       }
  },
}
</script>

<template>
  <section class="bg-[rgba(250,250,250)] min-h-[100vh] w-[100%] flex justify-center pr-[7rem] py-[5rem]">
  <div class="w-[30%] flex flex-col items-center justify-center gap-[3rem]">
  <div class="w-[100%] bg-[#ffffff90] py-[7rem] px-[6rem] border-[1px] border-solid border-[#cdcdcd] rounded-[1px] flex flex-col items-center">
  <p class="text-[2.4rem] text-[#000000b4] font-[500] text-center mt-[1rem]">Create A Strong Password</p>
  <p class="text-[1.6rem] text-[#4a4a4ab4] font-[400] text-center mt-[2rem]">Your password must be at least 6 characters and should include a combination of numbers and letters.</p>
<Form @submit="onSubmit" class="w-[100%] mt-[4rem] flex flex-col gap-[2.4rem]">
  <base-input @update-values="inputValuesUpdate" width="w-[100%]" name="password" label="New password"></base-input>
  <base-input @update-values="inputValuesUpdate" width="w-[100%]" name="confirm_password" label="New password, again"></base-input>
  <base-button type="submit" width="w-[100%]" class="mt-[2.4rem]" :class="[!resetButtonActivated ? 'opacity-[0.63] hover:bg-[#0095f6]' : '']" :disabled="!resetButtonActivated">Reset Password</base-button>
</Form>
  </div>
  </div>
</section>
</template>