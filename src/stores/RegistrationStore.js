import { defineStore } from "pinia";

export const useRegisterStore = defineStore("useRegisterStore", {
    state(){
      return{
        email:null,
        username:null,
        fullname:null,
        password:null,
        month:null,
        day:null,
        year:null,

      }
    },

    getters:{
      getEmail: (state)=>state.email,
      getUsername: (state)=>state.username,
      getFullname: (state)=>state.fullname,
      getPassword: (state)=>state.password,
      getMonth: (state)=>state.month,
      getDay: (state)=>state.day,
      getYear: (state)=>state.year,
    },

    actions:{
      setEmail(email){
        this.email=email
      },
      setUsername(username){
        this.username=username
      },
      setFullname(fullname){
        this.fullname=fullname
      },
      setPassword(password){
        this.password=password
      },
      setMonth(month){
        this.month=month
      },
      setDay(day){
        this.day=day
      },
      setYear(year){
        this.year=year
      },
    },

});
