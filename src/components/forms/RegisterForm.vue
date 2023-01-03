<script>
import { Form } from 'vee-validate';
import BaseInput from "@/components/inputs/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormBorder from "@/components/FormBorder.vue";

export default {
  components:{BaseInput,BaseButton, Form, FormBorder},
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
    <base-input name="email" label="Mobile Number or Email"></base-input>
    <base-input name="fullname" label="Full Name"></base-input>
    <base-input name="username" label="Username"></base-input>
    <base-input name="password" label="Password"></base-input>
    <base-button type="submit" class="mt-[1.6rem]">Sign up</base-button>
  </Form>
</template>

<style scoped>

</style>