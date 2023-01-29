<script>
import { onMounted, ref, computed, watch } from "vue";
import axios from "@/config/axios/index.js";
import { useAuthStore } from "@/stores/AuthStore.js";
import { useFunctionalityStore } from "@/stores/FunctionalityStore.js";
import ReportProblem from "@/components/ReportProblem.vue";
import SwitchAccounts from "@/components/SwitchAccounts.vue";

export default {
  components:{ReportProblem, SwitchAccounts},
  setup() {
    const authStore=useAuthStore();
    const functionality=useFunctionalityStore()

    const dataIsFetched=ref(false)


    onMounted(async()=>{
      if(authStore.getUser==null){ 
        const res=await axios.get('user')
          authStore.user=res.data.user;
          if(authStore.getUser!=null){
            authStore.authenticated = true;
            functionality.darkTheme=res.data.theme=='light' ? false : true
         }else{
           authStore.authenticated = false;
           functionality.darkTheme=false
         }
      }else{
        authStore.authenticated = true;
      }
        dataIsFetched.value=true
    })

    const problemReportActivated = computed(() => {
     return functionality.getReportProblem;
   })
    const switchAccountsActivated = computed(() => {
     return functionality.getSwitchAccounts;
   })

      
    const themeColor = computed(() => {
     return functionality.getDarkTheme ? 'dark-theme' : 'light-theme';
   })




    return { dataIsFetched, themeColor, problemReportActivated, switchAccountsActivated }
  },
}
</script>

<template>
  <main :class="themeColor" id="main">
   <div v-if="problemReportActivated && dataIsFetched" class="z-50"><report-problem></report-problem></div>
   <div v-if="switchAccountsActivated && dataIsFetched" class="z-50"><switch-accounts></switch-accounts></div>
   <router-view v-if="dataIsFetched"></router-view>
  </main>
</template>

<style scoped>

.light-theme{
  color:rgb(27, 27, 27);
  background-color: rgb(250, 250, 250);
}
.dark-theme{
  color:rgba(250,250,250);
  background-color: rgb(27, 27, 27);
}
</style>
