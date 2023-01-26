<script>
import { useFunctionalityStore } from "@/stores/FunctionalityStore.js";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import { Form } from 'vee-validate';
import { ref, watch } from 'vue';
import { imageUpload } from "@/helpers/ImageUpload/index.js";
import formDataAxios from "@/config/axios/formDataAxios.js";
import axios from "@/config/axios/index.js";

export default {
  components:{CloseIcon, Form},
  setup() {
        const functionality=useFunctionalityStore()
        const reportButtonActivated=ref(false)
        const problem=ref('')
        const selectedFile=ref([])
        const imageDisplay=ref([])


       watch(problem, (currentValue) => {
       if(currentValue!==''){
          reportButtonActivated.value=true
       }else{
         reportButtonActivated.value=false
       }
       });

       function handleImageChange(ev){
         imageUpload(ev,selectedFile, imageDisplay);
      }


   function reportHandle(){
      // const form=new FormData();
      // form.append('text', problem.value);
      // form.append('images', selectedFile.value);
      console.log(imageDisplay.value)
     try{
       axios.post('report-problem',{
        text: problem.value,
        images: imageDisplay.value,
       })
     }catch(err){
      alert('Something went wrong')
     }
   }
    return {functionality, reportHandle, problem, reportButtonActivated, handleImageChange, imageDisplay}
  },
}
</script>

<template>
<div >
<div class="absolute top-0 left-0 w-[100vw] h-[100vh] bg-[#0000009f] z-30" @click="functionality.reportProblem=false"></div>
<div :class="[functionality.getDarkTheme ? 'bg-[#212121]' : 'bg-[#fff]']" class="absolute top-1/2 left-1/2 bg-[#fff] z-40 modal-anim rounded-[20px] overflow-hidden">
<close-icon :fill="[functionality.getDarkTheme ? '#fafafa' : '#000000b4']" class="cursor-pointer absolute right-0 top-0 -translate-x-full translate-y-[85%]" @click="functionality.reportProblem=false"></close-icon>
<div :class="[functionality.getDarkTheme ? 'text-[#fafafa] border-b-[#545454]' : 'text-[#1f1f1f] border-b-[#cdcdcd]']" class="w-[100%] text-center py-[1.6rem] border-b-[1.2px] border-b-solid"><p class="text-[2.7rem] font-[500]">Report a problem</p></div>
<div class="p-[2rem] w-[100%]">
  <Form @submit="reportHandle" class="rounded-[2px]">
    <textarea v-model="problem" :class="[functionality.getDarkTheme ? 'border-[#545454]' : 'border-[#cdcdcd]']" class="w-[100%] bg-inherit max-h-[25rem] min-h-[25rem] mb-[2rem] border border-solid p-[1rem]" style="resize: none;" placeholder="Briefly explain what happend." />
  <div v-if="imageDisplay.length>0" class="mb-[5rem] mt-[3rem] three-column-grid">
    <img v-for="file in imageDisplay" :key="file" :src="file" class="w-[100%] h-[12rem] rounded-[1px]"/>
  </div>
  
  <div class="flex items-center justify-between">
   <button :disabled="!reportButtonActivated" type="submit" :class="[!reportButtonActivated ? 'pointer-events-none opacity-[0.7]' : '']" class="py-[1rem] px-[1.5rem] flex items-center justify-center bg-[#0095f6] text-[#fff] text-[2.4rem] font-[500] hover:bg-[#0074cc] rounded-[10px]"><p>Send report</p></button>
  <div class="flex items-center justify-center bg-[#ebebeb] text-[#000000b4] text-[2.4rem] font-[500] hover:bg-[#dedede] rounded-[10px] py-[1rem] px-[1.5rem] relative">
    <p>Add file</p>
   <input @change="handleImageChange" type="file" class="z-50 w-[100%] h-[100%] absolute top-0 left-0 opacity-0"/>
  </div>
  </div>
  <div class="text-[1.6rem] text-[#9a9a9a] w-[80%] mt-[2rem]">Your Instagram username and browser information will be<br>automatically included in your report.</div>
  </Form>
</div>

</div>
</div>
</template>

<style scoped>
.color{
  color:#dedede;
}
@keyframes animation {
  from {
    transform: translate(-50%, -50%);
    width: 40%;
    height: 50rem;
    opacity: 0.3;
    }
  to {
    transform:translate(-50%, -50%);
    width: 33%;
    height: 45rem;
    opacity: 1;
    }
}

.modal-anim {
  transform:translate(-50%, -50%);
  opacity: 1;
  width: 33%;
  min-height: 45rem;
  animation-name: animation;
  animation-duration: 0.2s;
  animation-timing-function: ease-out;
}

textarea::placeholder{
  font-size:2.4rem;
}
textarea{
  font-size:2.4rem;
}

.three-column-grid{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1.6rem;
}
</style>.