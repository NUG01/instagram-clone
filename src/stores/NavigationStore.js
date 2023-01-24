import { defineStore } from "pinia";

export const useNavigationStore = defineStore("useNavigationStore",{
 state(){
  return{
      homePage:true,
      searchPage:false,
      explorePage:false,
      messagesPage:false,
      notificationsPage:false,
      createPage:false,
      profilePage:false,
  }
 },

   getters:{
    getHomePage: (state)=>state.homePage,
    getSearchPage: (state)=>state.searchPage,
    getExplorePage: (state)=>state.explorePage,
    getMessagesPage: (state)=>state.messagesPage,
    getNotificationsPage: (state)=>state.notificationsPage,
    getCreatePage: (state)=>state.createPage,
    getProfilePage: (state)=>state.profilePage,
 },


 actions:{
  navigate(){
    this.homePage=false
    this.searchPage=false
    this.explorePage=false
    this.messagesPage=false
    this.notificationsPage=false
    this.createPage=false
    this.profilePage=false
  },
 }
});
