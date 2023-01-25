import { defineStore } from "pinia";

export const useFunctionalityStore = defineStore("useFunctionalityStore",{
 state(){
  return{
      darkTheme:false,
  }
 },

   getters:{
    getDarkTheme: (state)=>state.darkTheme,
 },
});
