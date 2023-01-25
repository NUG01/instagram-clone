import { useAuthStore } from "@/stores/AuthStore.js";
import axios from "axios";

import { useRouter } from "vue-router";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
});

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      localStorage.setItem('status', 401)
      const authStore = useAuthStore();
      const router = useRouter();
      authStore.authenticated=false;
      authStore.user=null;
      localStorage.removeItem('darkTheme')
      window.location.href='login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;