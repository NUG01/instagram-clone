<script>
import CakeIcon from "@/components/icons/CakeIcon.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";

export default {
  components:{CakeIcon, CloseIcon},
  setup(props, context) {
      function hideBirthdayModal(){
        context.emit('hideModal')
      }
    
    return {
      hideBirthdayModal
    }
  },
}
</script>

<template>
  <div class="absolute w-[100vw] h-[100vh] bg-[#444950c4] flex items-center justify-center">
     <div class="py-[9rem] px-[9rem] flex flex-col items-center justify-center bg-[#fff] rounded-[18px] max-w-[32%] relative">
      <close-icon @click="hideBirthdayModal" class="absolute top-0 right-0 -translate-x-[130%] translate-y-full"></close-icon>
      <cake-icon></cake-icon>
      <p class="text-[2.7rem] text-[#000000b4] font-[500] text-center mt-[1rem]">Birthdays on Instagram</p>
      <p class="text-[2rem] text-[#000000b4] font-[500] text-center mt-[1rem]">Providing your birthday improves the features and ads you see, and helps us keep the Instagram community safe. You can find your birthday in your personal information account settings.</p>
     </div>
  </div>
</template>