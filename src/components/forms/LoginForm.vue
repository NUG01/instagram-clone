<script>
import { Form } from 'vee-validate';
import BaseInput from "@/components/inputs/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormBorder from "@/components/FormBorder.vue";
import FacebookIcon from "@/components/icons/FacebookIcon.vue";


export default {
  components:{BaseInput,BaseButton, Form, FormBorder, FacebookIcon},
  setup() {
   function onSubmit(){
     console.log('submited')
   }

   return { onSubmit }
  },
}
</script>


<template>
 <Form @submit="onSubmit" class="flex flex-col items-center justify-center gap-[1.8rem]">
    <base-input name="username" label="Phone number, username or email"></base-input>
    <base-input name="password" label="Password"></base-input>
    <base-button type="submit" class="mt-[1.6rem]">Log in</base-button>
    <form-border class="mt-[1rem]"></form-border>
    <div class="flex flex-col items-center justify-center gap-[2rem]">
      <div class="cursor-pointer flex items-center justify-center gap-[1rem]"> 
        <facebook-icon color="#385185"></facebook-icon>
        <p class="text-[#385185] text-[2.4rem] font-[500]">Log in with Facebook</p>
      </div>
      <router-link to="{ name: 'forgot-password'}" class="text-[rgba(0, 55, 107)] text-[1.8rem]">
       Forgot password?
      </router-link>
    </div>

  </Form>
</template>

<style scoped>

</style>