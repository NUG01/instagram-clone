import { defineStore } from "pinia";

export const useAuthStore = defineStore("useAuthStore",{
 state(){
  return{
      user:null,
      authenticated:false,
  }
 },

   getters:{
    getUser: (state)=>state.user,
    getAuthenticated: (state)=>state.authenticated,
 },
});
