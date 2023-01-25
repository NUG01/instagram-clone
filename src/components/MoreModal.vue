<script>
import SettingItem from "@/components/SettingItem.vue";
import { useFunctionalityStore } from "@/stores/FunctionalityStore.js";
import { computed } from "vue";
import { useAuthStore } from "@/stores/AuthStore.js";
import axios from "@/config/axios/index.js";
import { useRouter } from "vue-router";


export default {
  components:{SettingItem},
  setup() {
       const functionality=useFunctionalityStore()
       const authStore=useAuthStore();
       const router=useRouter();


       function changeTheme(){
         functionality.darkTheme=!functionality.darkTheme
         localStorage.setItem('darkTheme', functionality.getDarkTheme);

       }


       const themeColor = computed(() => {
     return functionality.getDarkTheme ? 'dark-theme' : 'light-theme';
   })

    async function logoutHandle(){
     try{
       await axios.post('logout')
       authStore.user=null
       authStore.authenticated=false
       functionality.darkTheme=false
       localStorage.removeItem('darkTheme')
       router.push({ name: 'landing' })
     }catch(err){
      alert('Something went wrong')
     } 
    }

    function reportProblem(){
      functionality.reportProblem=true
    }


    
    
    return {changeTheme, themeColor, logoutHandle, reportProblem}
  },
}
</script>

<template>
<div class="absolute bottom-full left-0 w-[105%] moreBarModal flex flex-col justiy-center gap-[1.2rem] z-30">
<div :class="themeColor" class="flex flex-col rounded-[7px] overflow-hidden">
        <setting-item>
           <template v-slot:function>Settings
           </template>
           <template v-slot:icon>Ic
           </template>
        </setting-item>
         <setting-item>
           <template v-slot:function>Saved
           </template>
           <template v-slot:icon>Ic
           </template>
        </setting-item>
        <div @click="changeTheme">
        <setting-item>
           <template v-slot:function>Switch appearance
           </template>
           <template v-slot:icon>Ic
           </template>
        </setting-item>
        </div>
        <div @click="reportProblem">
        <setting-item>
           <template v-slot:function>Report a problem
           </template>
           <template v-slot:icon>Ic
           </template>
        </setting-item>
        </div>
      </div>
      <div :class="themeColor" class="flex flex-col rounded-[7px] overflow-hidden">
        <setting-item>
           <template v-slot:function>Switch accounts
           </template>
           <template v-slot:icon>Ic
           </template>
        </setting-item>
        <div @click="logoutHandle">
        <setting-item>
           <template v-slot:function>Log out
           </template>
           <template v-slot:icon>Ic
           </template>
        </setting-item>
        </div>
      </div>
</div>
</template>


<style scoped>
.light-theme{
  color:rgb(27, 27, 27);
  background-color: rgba(250,250,250);
  box-shadow: 0px 4px 16px rgba(17,17,26,0.1), 0px 8px 24px rgba(17,17,26,0.1), 0px 16px 56px rgba(17,17,26,0.1);
}
.dark-theme{
  color:rgb(250, 250, 250);
  background-color: #4d4d4d;
  /* box-shadow: 0 0 15px 0 #fafafa5d; */
  }
</style>