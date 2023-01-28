<script>
import NavigationLink from "@/components/NavigationLink.vue";
import MoreModal from "@/components/MoreModal.vue";
import SettingItem from "@/components/SettingItem.vue";
import InstagramSvg from "@/components/icons/InstagramSvg.vue";
import {useRouter} from "vue-router";
import {computed, ref, onMounted} from "vue";
import { useNavigationStore } from "@/stores/NavigationStore.js";
import { useAuthStore } from "@/stores/AuthStore.js";
import { useFunctionalityStore } from "@/stores/FunctionalityStore.js";
import axios from "@/config/axios/index.js";



export default {
  components:{NavigationLink, InstagramSvg, MoreModal},
  props:['activeHome', 'activeExplore'],
  setup(props, context) {
    const router=useRouter();
    const navigation=useNavigationStore()
    const authStore=useAuthStore()
    const functionality=useFunctionalityStore()


    const dataIsFetched=ref(false)

    onMounted(async()=>{
      if(!authStore.getUser){
        const res=await axios.get('user')
        authStore.user=res.data.user;
        if(authStore.getUser!=null){
            authStore.authenticated = true;
           }else{
             authStore.authenticated = false;
           }
        }
    })

    const moreBar=ref(false)
    const moreBarActive=ref(false)


    function searchActivated(){
      navigation.navigate()
      navigation.searchPage=true
    }

    

    function pushHome(){
      navigation.navigate()
      navigation.homePage=true
      router.push({name: 'home'})
    }

    function pushExplore(){
      navigation.navigate()
      navigation.explorePage=true
      router.push({name: 'explore'})
    }

    function pushMessages(){
      navigation.navigate()
      navigation.messagesPage=true
      router.push({name: 'messages'})
    }

    function pushProile(){
      navigation.navigate()
      navigation.profilePage=true
      router.push(`/${authStore.getUser.username}/`)
    }

    function pushSearch(){
      navigation.navigate()
      navigation.searchPage=true
    }

    function pushNotifications(){
      navigation.navigate()
      navigation.notificationsPage=true
    }

    function pushCreate(){
      navigation.navigate()
      navigation.createPage=true
    }
    function navigateToHome(){
      navigation.navigate()
      navigation.homePage=true
      router.push({name: 'home'})
    }


    const activeHome = computed(() => {
     return navigation.getHomePage
   })
    const activeExplore = computed(() => {
      return navigation.getExplorePage
   })
      
       window.addEventListener("click", function(ev){
         if(ev.path[0]==document.querySelector('.more-parent') || ev.path[0]==document.querySelector('.more-icon') || ev.path[0]==document.querySelector('.more-text')){
           if(moreBar.value==true){
            moreBar.value=false
            moreBarActive.value=false
            return
        }
        }
         if(ev.path[0]!=document.querySelector('.moreBarModal') && moreBar.value==true){
           moreBar.value=false
           moreBarActive.value=false
         }
          if(ev.path[0]==document.querySelector('.more-parent') || ev.path[0]==document.querySelector('.more-text') || ev.path[0]==document.querySelector('.more-icon')){
            if(moreBar.value==true){
            moreBar.value=false
            moreBarActive.value=false
            return;
          }
            moreBar.value=!moreBar.value
             moreBarActive.value=!moreBarActive.value
         }
         });

            dataIsFetched.value=true


return {
  activeHome,
  searchActivated,
  pushHome,
  pushExplore,
  activeExplore,
  navigation,
  pushSearch,
  pushMessages,
  pushNotifications,
  pushNotifications,
  pushCreate,
  pushProile,
  navigateToHome,
  moreBar,
  moreBarActive,
  dataIsFetched,
  functionality,
  authStore
}
  },
}
</script>


<template>
<section v-if="dataIsFetched" class="w-[30rem] h-[100vh] border-r border-r-solid" :class="[functionality.getDarkTheme ? 'border-r-[#919191]' : 'border-r-[#cdcdcd]']">
<div class="w-[100%] flex items-center justify-start pt-[4rem] px-[2rem]">
  <div class="w-[12rem] cursor-pointer">
    <instagram-svg @click="navigateToHome"></instagram-svg>
    </div>
  </div>
<div class="flex flex-col items-start justify-start w-[100%] px-[0.8rem] mt-[5rem] gap-[1rem] rounded-[7px]">
  <navigation-link @click="pushHome" :active="navigation.getHomePage">
     <template v-slot:icon>H
     </template>
     <template v-slot:destination>ok2
     </template>
  </navigation-link>
  <navigation-link :active="navigation.getSearchPage" @click="pushSearch">
     <template v-slot:icon>S
     </template>
     <template v-slot:destination>Search
     </template>
  </navigation-link>
  <navigation-link @click="pushExplore" :active="navigation.getExplorePage">
     <template v-slot:icon>E
     </template>
     <template v-slot:destination>Explore
     </template>
  </navigation-link>
  <navigation-link @click="pushMessages" :active="navigation.getMessagesPage">
     <template v-slot:icon>M
     </template>
     <template v-slot:destination>Messages
     </template>
  </navigation-link>
  <navigation-link  :active="navigation.getNotificationsPage" @click="pushNotifications">
     <template v-slot:icon>N
     </template>
     <template v-slot:destination>Notifications
     </template>
  </navigation-link>
  <navigation-link :active="navigation.getCreatePage" @click="pushCreate">
     <template v-slot:icon>C
     </template>
     <template v-slot:destination>Create
     </template>
  </navigation-link>
  <navigation-link @click="pushProile" :active="navigation.getProfilePage">
     <template v-slot:icon>P
     </template>
     <template v-slot:destination>Profile
     </template>
  </navigation-link>
  <div class="relative w-[100%] more-top-parent mt-[33rem]">
    <div :class="[moreBarActive ? 'font-[500]' : '']" class="text-[1.8rem] w-[100%] flex items-center gap-[1.6rem] px-[2rem] py-[1.5rem] rounded-[50px] cursor-pointer more-parent anim">
       <div class="w-[1.8rem] more-icon">M</div>
       <div class="more-text">More</div>
   </div>
      <more-modal v-if="moreBar"></more-modal>
  </div>
</div>

</section>

</template>

<style scoped>
.anim{
  transition: 0.1s all ease-in;
}
.parent:hover .icon{
  transform: scale(1.1);
}
</style>