<script>
import SettingItem from "@/components/SettingItem.vue";
import { useFunctionalityStore } from "@/stores/FunctionalityStore.js";
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores/AuthStore.js";
import axios from "@/config/axios/index.js";
import { useRouter } from "vue-router";


export default {
  components:{SettingItem},
  setup() {
       const functionality=useFunctionalityStore()
       const authStore=useAuthStore();
       const router=useRouter();
       const themeColorDB=ref('')


       function changeTheme(){
         functionality.darkTheme=!functionality.darkTheme
        if(functionality.getDarkTheme){
            themeColorDB.value='dark'
        }else{
            themeColorDB.value='light'
        }
        axios.post('change-theme', {
          themeColor: themeColorDB.value
        })
        .then((res)=>{

          if(res.data.color=='dark'){
             functionality.darkTheme=true
          }else if(res.data.color=='light'){
            functionality.darkTheme=false
          }
        })

       }

       function pushSaved(){
        router.push({name: 'saved-items', params: { username: authStore.getUser.username }})
       }
       function pushSettings(){
        router.push({name: 'settings'})
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
       router.push({ name: 'landing' })
     }catch(err){
      alert('Something went wrong')
     } 
    }

    function reportProblem(){
      functionality.reportProblem=true
    }
    function switchAccounts(){
      functionality.switchAccounts=true
    }


    
    
    return {changeTheme, themeColor, logoutHandle, reportProblem, pushSaved, pushSettings, switchAccounts}
  },
}
</script>

<template>
<div class="absolute bottom-full left-0 w-[105%] moreBarModal flex flex-col justiy-center gap-[1.2rem] z-30">
<div :class="themeColor" class="flex flex-col rounded-[7px] overflow-hidden">
       <div @click="pushSettings">
        <setting-item>
           <template v-slot:function>Settings
           </template>
           <template v-slot:icon>Ic
           </template>
        </setting-item>
       </div>
        <div @click="pushSaved">
         <setting-item>
           <template v-slot:function>Saved
           </template>
           <template v-slot:icon>Ic
           </template>
        </setting-item>
        </div>
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
        <div @click="switchAccounts">
        <setting-item>
           <template v-slot:function>Switch accounts
           </template>
           <template v-slot:icon>Ic
           </template>
        </setting-item>
        </div>
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
  }
</style>