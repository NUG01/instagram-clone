import { defineStore } from "pinia";

export const useAuthStore = defineStore("useAuthStore",{
 state(){
  return{
      user:null,
      authenticated:false,
      switchUsername:null,
      switchPassword:null,

  }
 },

   getters:{
    getUser: (state)=>state.user,
    getAuthenticated: (state)=>state.authenticated,
    getSwitchUsername: (state)=>state.switchUsername,
    getSwitchPassword: (state)=>state.switchPassword,
 },
});
