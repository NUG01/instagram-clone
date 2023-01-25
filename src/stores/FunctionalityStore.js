import { defineStore } from "pinia";

export const useFunctionalityStore = defineStore("useFunctionalityStore",{
 state(){
  return{
      darkTheme:false,
      reportProblem:false,
  }
 },

   getters:{
    getDarkTheme: (state)=>state.darkTheme,
    getReportProblem: (state)=>state.reportProblem,
 },
});
