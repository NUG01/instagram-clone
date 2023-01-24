import { defineStore } from "pinia";

export const useFunctionalityStore = defineStore("useFunctionalityStore",{
 state(){
  return{
      moreBarModal:false,
  }
 },

   getters:{
    getMoreBarModal: (state)=>state.moreBarModal,
 },
});
