import { useAuthStore } from "@/stores/AuthStore.js";
import axios from "@/config/axios/index.js";


export async function isAuthenticated() {
  const authStore = useAuthStore();
  if(authStore.getUser==null){
     const res= await axios.get("user")
     if(res.data.user==null){
       authStore.authenticated=false
      }
    }else{
      authStore.authenticated=true
    }
  
  if (authStore.getAuthenticated==false) {
    return "/403-forbidden";
  }
}

export async function isLoggedIn() {
  const authStore = useAuthStore();
  
  if(authStore.getUser==null){
    localStorage.removeItem('darkTheme')
    const res= await axios.get("user")
    if(res.data.user!=null){
      authStore.authenticated=true
      authStore.user=res.data.user
    }
  
  }else{
    authStore.authenticated=true
  }

  if (authStore.getAuthenticated==true) {
    return "/home";
  }
}