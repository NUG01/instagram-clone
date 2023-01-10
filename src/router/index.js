import { createRouter, createWebHistory } from "vue-router";
import LandingView from "@/views/LandingView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";
import ForgotPasswordView from "@/views/ForgotPasswordView.vue";
import OAuthView from "@/views/OAuthView.vue";
import { isAuthenticated, isLoggedIn } from "@/router/guards.js";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingView,
      beforeEnter: [isLoggedIn],
    },
    {
      path: "/register",
      name: "registration",
      component: RegisterView,
      beforeEnter: [isLoggedIn],
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      beforeEnter: [isLoggedIn],
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: ForgotPasswordView,
      beforeEnter: [isLoggedIn],
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
      beforeEnter: [isAuthenticated],
    },
    { 
      path: '/oauth', 
      name: 'oauth', 
      component: OAuthView,
  },
  ],
});

export default router;
