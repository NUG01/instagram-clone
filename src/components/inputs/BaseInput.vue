<script>
import { Field } from 'vee-validate';
import { ref, watch, computed } from 'vue';
export default {
  props:['name', 'label', 'success', 'error', 'type', 'passwordIsFilled'],
  components:{Field},
  setup(props, context) {
     const inputName=props.name
     const label=props.label
     const type=props.type
     const model=ref('')
     const passwordVisibilityState=ref('Show')

    const validationSuccess = computed(() => {
      return props.success
    })
    const validationError = computed(() => {
      return props.error
    })

    const passwordValueIsFilled = computed(() => {
      return props.passwordIsFilled
    })

     function getValue(id){
      const elem=document.getElementById(id)
      if(elem.value==''){
        elem.previousElementSibling.classList.remove('shrinkLabel')
        return;
      }
        elem.previousElementSibling.classList.add('shrinkLabel')
     }
    
     function changePasswordType(){
      if(passwordVisibilityState.value=='Show'){
        passwordVisibilityState.value='Hide'
      }else{
        passwordVisibilityState.value='Show'
      }
      context.emit('visiblePassword')
     }

     watch(model, (currentValue, oldValue) => {
     const elem=document.getElementById(inputName)
      context.emit('updateValues',  {name: elem.name, value: elem.value, previousValue: oldValue})
    });


     return {
      inputName, 
      label, 
      getValue, 
      model, 
      validationSuccess, 
      validationError, 
      type, 
      changePasswordType,
      passwordVisibilityState,
      passwordValueIsFilled
      }
  },
}
</script>


<template>
<div class="w-[90%] relative">
  <label :for="inputName" class="text-[#a7a7a7] text-[2.4rem] absolute top-1/2 left-0 translate-x-[1.6rem] -translate-y-1/2 pointer-events-none	">{{ label }}</label>
  <input v-model="model" :type="type" :name="inputName" :id="inputName" @input="getValue(inputName)" class="w-[100%] h-[6.3rem] text-[2.4rem] text-[#636363] border-[#cdcdcd] focus:border-[#a7a7a7] focus:border-[2px] border-[1px] border-solid rounded-[3px] bg-[#f6f7f7c1] pl-[1.6rem]" :class="[type ? 'pr-[12rem]' : 'pr-[5rem]']" />
  <div class="absolute top-0 right-0" :class="[type ? '-translate-x-[12%] flex items-center justify-center gap-[0.5rem] translate-y-[25%]' : '-translate-x-1/2 translate-y-1/2']">
  <slot v-if="validationSuccess" name="success"></slot>
  <slot v-if="validationError" name="error"></slot>
  <div v-if="type && passwordValueIsFilled" class="text-[2.7rem] text-[#000] font-[500] cursor-pointer" @click="changePasswordType($event)">{{ passwordVisibilityState }}</div>
  </div>
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