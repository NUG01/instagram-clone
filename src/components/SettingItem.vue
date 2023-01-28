<script>
import { useFunctionalityStore } from "@/stores/FunctionalityStore.js";
import { computed } from "vue";
export default {
  setup() {
     const functionality=useFunctionalityStore()

    const hoverColor = computed(() => {
     return functionality.getDarkTheme ? 'hover:bg-[#393939]' : 'hover:bg-gray-100';
   })

   return{hoverColor }
  },
}
</script>

<template>
  <div :class="hoverColor" class="w-[100%] px-[2rem] py-[1rem] flex items-center justify-between cursor-pointer text-[2rem]">
    <p><slot name="function">Settings</slot></p>
    <div><slot  name="icon">Ic</slot></div>
  </div>
</template>
