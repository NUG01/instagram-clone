<script>
import { Form } from 'vee-validate';
import { ref, computed, watch } from "vue";
import { useRegisterStore } from '@/stores/RegistrationStore.js';
import axios from "@/config/axios/index.js";




export default {
  props:['submit'],
  components:{Form},
  setup(props, context) {
    const registrationFormData = useRegisterStore();

    const credentialsError=ref(false)
    const error=ref('')
    let month;
    let day;
    let year;


    const submitState = computed(() => {
    return props.submit
    })

    const date = new Date();

    const months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
     
    if(registrationFormData.getMonth){
      month=ref(registrationFormData.getMonth)
    }else{
       month=ref(months[date.getMonth() + 1])
    }
    if(registrationFormData.getDay){
      day=ref(registrationFormData.getDay)
    }else{
       day=ref(date.getDate())
    }
    if(registrationFormData.getYear){
      year=ref(registrationFormData.getYear)
    }else{
       year=ref(date.getFullYear())
    }

    const now=new Date().getFullYear()
    let eligibleYears=[]
    for (let index = now-120; index <= now; index++) {
       eligibleYears.unshift(index);
    } 

    watch(submitState, (currentValue) => {
      if(currentValue==true){
        document.querySelector('button').click();
      }
      context.emit('resetButton')
    });

   async function onSubmit(){
      context.emit('registrationFailure', '')
      registrationFormData.setMonth(month.value)
      registrationFormData.setDay(day.value)
      registrationFormData.setYear(year.value)
      const dateStr=registrationFormData.getYear+'-'+registrationFormData.getMonth+'-'+registrationFormData.getDay
      const transformDate=new Date(dateStr)
      const isoDate=transformDate.toISOString()
      registrationFormData.setISODate(isoDate)
       try{
      await axios.post('insert-code', {
        username: registrationFormData.getUsername, 
        email: registrationFormData.getEmail,
        })
        context.emit('emailCode')
        context.emit('loadingStop')
     }catch(err){
       context.emit('loadingStop')
       alert(err)
    }
    }
    function verifyYear(){
      if((now-document.getElementById('years').value)<5){
        context.emit('buttonDisability', false)
      }else{
        context.emit('buttonDisability', true)

      }
    }


    return {months, now, eligibleYears, onSubmit, verifyYear, month, day, year}
  },
}
</script>

<template>
<div>
  <Form @submit="onSubmit">
    <div class="flex items-center justify-center gap-[1.2rem]">
     <select v-model="month" name="months" id="months" class="border-[1.4px] border-solid border-[#cdcdcd] rounded-[4px] px-[1rem] py-[1rem] text-[1.8rem] bg-[none] text-[#4a4a4ab4]">
      <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
     </select>
     <select v-model="day" name="days" id="days" class="border-[1.4px] border-solid border-[#cdcdcd] rounded-[4px] px-[1rem] py-[1rem] text-[1.8rem] bg-[none] text-[#4a4a4ab4]">
      <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
     </select>
     <select v-model="year" @change="verifyYear" name="years" id="years" class="border-[1.4px] border-solid border-[#cdcdcd] rounded-[4px] px-[1rem] py-[1rem] text-[1.8rem] bg-[none] text-[#4a4a4ab4]">
      <option v-for="year in eligibleYears" :key="year"  :value="year">{{ year }}</option>
     </select>
    </div>
    <button type="submit" class="opacity-0 pointer-events-none h-0 w-0"></button>
  </Form>
</div>
</template>

<style scoped>
</style>.