<script>
import MetaIcon from "@/components/icons/MetaIcon.vue";
export default {
  components:{MetaIcon},
  setup() {
    
  },
}
</script>

<template>
  <div class="w-[100vw] h-[100vh] bg-[rgba(250,250,250)] flex items-center justfy-center text-center">
   <div class="w-[100%]">
    <p class="text-[4.2rem] text-[#000] font-[500] mb-[3rem]">Sorry, this page isn't available.</p>
    <p class="text-[2.7rem] text-[#000] font-[400]">The link you followed may be broken, or the page may have been removed. <router-link :to="{name: 'landing'}" class="font-[500]">back to Instagram.</router-link></p>
   </div>
   <div class="absolute bottom-[7%] right-1/2 translate-x-1/2 flex items-center justify-center flex-col">
    <p class="text-[#000000b4] text-[2.4rem]">from</p>
    <meta-icon></meta-icon>
   </div>
</div>
</template>