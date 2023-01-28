<script>
import { useNavigationStore } from "@/stores/NavigationStore.js";
import { useFunctionalityStore } from "@/stores/FunctionalityStore.js";

import { computed } from "vue";
export default {
  props:['active'],
  setup(props) {
    const navigation=useNavigationStore()
    const functionality=useFunctionalityStore()


    const active = computed(() => {
     return props.active
   })
       const hoverColor = computed(() => {
     return functionality.getDarkTheme ? 'hover:bg-[#393939]' : 'hover:bg-gray-100';
   })
    

    return {active, hoverColor}
  },
}
</script>

<template>
<div :class="[active ? 'font-[500]' : '', hoverColor]" class="text-[2.4rem] w-[100%] flex items-center justify-start gap-[1.6rem] px-[2rem] py-[1.5rem] rounded-[50px] cursor-pointer parent">
  <div class="w-[2rem] icon"><slot name="icon"></slot></div>
  <div><slot name="destination"></slot></div>
  </div>
</template>

<style scoped>
div{
  transition: 0.1s all ease-in;
}
.parent:hover .icon{
  transform: scale(1.1);
}
</style>