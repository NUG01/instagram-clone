<script>
import SettingItem from "@/components/SettingItem.vue";

export default {
  components:{SettingItem},
  setup() {
    
  },
}
</script>

<template>
<div class="absolute bottom-full left-0 w-[105%] moreBarModal flex flex-col justiy-center gap-[1.2rem] z-30">
<div class="flex flex-col bg-[#fff] shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-[7px]">
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
        <setting-item>
           <template v-slot:function>Switch appearance
           </template>
           <template v-slot:icon>Ic
           </template>
        </setting-item>
        <setting-item>
           <template v-slot:function>Report a problem
           </template>
           <template v-slot:icon>Ic
           </template>
        </setting-item>
      </div>
      <div class="flex flex-col bg-[#fff] shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-[7px]">
        <setting-item>
           <template v-slot:function>Switch accounts
           </template>
           <template v-slot:icon>Ic
           </template>
        </setting-item>
        <setting-item>
           <template v-slot:function>Log out
           </template>
           <template v-slot:icon>Ic
           </template>
        </setting-item>
      </div>
</div>
</template>