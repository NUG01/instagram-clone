<script>
import { Field } from 'vee-validate';
export default {
  props:['name', 'label'],
  components:{Field},
  setup(props) {
     const inputName=props.name
     const label=props.label

     function getValue(id){
      const elem=document.getElementById(id)
      if(elem.value==''){
        elem.previousElementSibling.classList.remove('shrinkLabel')
        return;
      }
        elem.previousElementSibling.classList.add('shrinkLabel')
     }


     return {inputName, label, getValue}
  },
}
</script>


<template>
<div class="w-[90%] relative">
  <label :for="inputName" class="text-[#a7a7a7] text-[2.4rem] absolute top-1/2 left-0 translate-x-[1.6rem] -translate-y-1/2 pointer-events-none	">{{ label }}</label>
  <Field :name="inputName" :id="inputName" @input="getValue(inputName)" class="w-[100%] h-[6.3rem] text-[2.4rem] text-[#636363] border-[#cdcdcd] focus:border-[#a7a7a7] focus:border-[2px] border-[1px] border-solid rounded-[3px] bg-[#f6f7f7c1] px-[1.6rem]" />
</div>
</template>

<style scoped>
.color{
  color:#636363;
}

.shrinkLabel{
  transition: all 0.1s ease-in;
  font-size: 1.4rem;
  top:0;
  transform: translate(1.6rem,10%);
}
</style>