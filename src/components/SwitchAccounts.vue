<script>
import { useFunctionalityStore } from "@/stores/FunctionalityStore.js";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import SwitchLoginForm from "@/components/forms/SwitchLoginForm.vue";
import { ref } from "vue";
import InstagramSvg from "@/components/icons/InstagramSvg.vue";
import { useNavigationStore } from "@/stores/NavigationStore.js";
import {useRouter} from "vue-router";
import { useAuthStore } from "@/stores/AuthStore.js";

export default {
  components:{CloseIcon, InstagramSvg, SwitchLoginForm},
  setup() {
    const loginActivated=ref(false)
    const functionality=useFunctionalityStore()
    const router=useRouter();
    const navigation=useNavigationStore()
    const authStore=useAuthStore();
    const imageUrl=import.meta.env.VITE_API_BASE_URL_IMAGE


        function navigateToHome(){
          navigation.navigate()
          navigation.homePage=true
          functionality.switchAccounts=false
          router.push({name: 'home'})
    }

    function profilePhoto(image){
      return imageUrl+image
    }
    return {
            functionality,
            loginActivated,
            navigateToHome,
            authStore,
            profilePhoto
       }
  },
}
</script>

<template>
<div>
<div class="absolute top-0 left-0 w-[100vw] h-[100vh] bg-[#0000009f] z-30" @click="functionality.switchAccounts=false"></div>
<div v-if="!loginActivated" :class="[functionality.getDarkTheme ? 'bg-[#212121]' : 'bg-[#fff]']" class="absolute modal-anim top-1/2 left-1/2 bg-[#fff] z-40 rounded-[20px] overflow-hidden">
<close-icon :fill="[functionality.getDarkTheme ? '#fafafa' : '#000000b4']" class="cursor-pointer absolute right-0 top-0 -translate-x-full translate-y-[85%]" @click="functionality.switchAccounts=false"></close-icon>
<div :class="[functionality.getDarkTheme ? 'text-[#fafafa] border-b-[#545454]' : 'text-[#1f1f1f] border-b-[#cdcdcd]']" class="w-[100%] text-center py-[1.6rem] border-b-[1.2px] border-b-solid"><p class="text-[2.7rem] font-[500]">Switch accounts</p></div>
<div class="w-[100%] p-[2rem] flex items-center justify-between">
    <div :class="[functionality.getDarkTheme ? 'text-[#fafafa]' : 'text-[#1f1f1f]']" class="flex items-center text-[2.4rem] font-[500] gap-[3rem]">
      <div class="w-[7rem] h-[7rem] rounded-[50%] bg-center	bg-no-repeat bg-cover	" :style="'background-image: url('+(profilePhoto(authStore.getUser.thumbnail))+')'"></div>
      <p>{{ authStore.getUser.username }}</p>
    </div>
    <div class="bg-blue-300 w-[4rem] h-[4rem] rounded-[50%] flex items-center justify-center">Chk</div>
  </div>
<div :class="[functionality.getDarkTheme ? 'border-b-[#545454]' : 'border-t-[#cdcdcd]']" class="w-[100%] absolute bottom-0 left-0 text-center py-[1.6rem] border-t-[1.5px] border-t-solid"><p @click="loginActivated=true" class="text-[2.4rem] cursor-pointer font-[500] text-[#2d80ce]" :class="[functionality.getDarkTheme ? 'hover:text-[#5fa5e7]' : 'hover:text-[#1064b3]']">Log into an Existing Account</p></div>
</div>
<div v-else :class="[functionality.getDarkTheme ? 'bg-[#212121]' : 'bg-[#fff]']" class="absolute modal-anim top-1/2 left-1/2 bg-[#fff] z-40 rounded-[20px] overflow-hidden">
<close-icon :fill="[functionality.getDarkTheme ? '#fafafa' : '#000000b4']" class="cursor-pointer absolute right-0 top-0 -translate-x-full translate-y-[85%]" @click="functionality.switchAccounts=false"></close-icon>
<div class="px-[10rem] pb-[5rem] pt-[12rem]">
  <div class="w-[100%] flex items-center justify-center mb-[4rem]">
   <div @click="navigateToHome" class="w-[30rem] cursor-pointer">
    <instagram-svg></instagram-svg>
    </div>
  </div>
<switch-login-form></switch-login-form></div>
</div>
</div>
</template>

<style scoped>
.color{
  color:#5fa5e7;
}
@keyframes animation {
  from {
    transform: translate(-50%, -50%);
    width: 40%;
    min-height: 30rem;
    opacity: 0.3;
    }
  to {
    transform:translate(-50%, -50%);
    width: 33%;
    min-height: 25rem;
    opacity: 1;
    }
}

.modal-anim {
  transform:translate(-50%, -50%);
  opacity: 1;
  width: 33%;
  min-height: 25rem;
  animation-name: animation;
  animation-duration: 0.2s;
  animation-timing-function: ease-out;
}

/* .modal-anim-done{
   transform:translate(-50%, -50%);
  opacity: 1;
  width: 33%;
  min-height: 10rem;
  animation-name: animation;
  animation-duration: 0.2s;
  animation-timing-function: ease-out;

} */
</style>