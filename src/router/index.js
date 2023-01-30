import { createRouter, createWebHistory } from "vue-router";
import LandingView from "@/views/guestViews/LandingView.vue";
import RegisterView from "@/views/guestViews/RegisterView.vue";
import LoginView from "@/views/guestViews/LoginView.vue";
import SwitchLoginView from "@/views/guestViews/SwitchLoginView.vue";
import HomeView from "@/views/userViews/HomeView.vue";
import ProfileView from "@/views/userViews/ProfileView.vue";
import ExploreView from "@/views/userViews/ExploreView.vue";
import MessagesView from "@/views/userViews/MessagesView.vue";
import SettingsView from "@/views/userViews/SettingsView.vue";
import ProfilePasswordresetView from "@/views/userViews/ProfilePasswordresetView.vue";
import SavedView from "@/views/userViews/SavedView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import ForbiddenView from "@/views/guestViews/ForbiddenView.vue";
import PasswordForgotView from "@/views/guestViews/PasswordForgotView.vue";
import PasswordRecoverView from "@/views/PasswordRecoverView.vue";
import EasyLoginView from "@/views/guestViews/EasyLoginView.vue";
import OAuthView from "@/views/guestViews/OAuthView.vue";
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
      component: PasswordForgotView,
      beforeEnter: [isLoggedIn],
    },
    { 
      path: '/recover-password/:id',
      name: 'recover-password', 
      component: PasswordRecoverView,
      props:true,
  },
    { 
      path: '/easy-login/:id',
      name: 'easy-login', 
      component: EasyLoginView,
      props:true,
      beforeEnter: [isLoggedIn],
  },
    { 
      path: '/switch-account',
      name: 'switch-account', 
      component: SwitchLoginView,
      beforeEnter: [isLoggedIn],
  },
    { 
      path: '/accounts/password/reset',
      name: 'accounts-password-reset', 
      component: ProfilePasswordresetView,
      beforeEnter: [isAuthenticated],
  },
    {
      path: "/home",
      name: "home",
      component: HomeView,
      beforeEnter: [isAuthenticated],
    },
    {
      path: "/explore/",
      name: "explore",
      component: ExploreView,
      beforeEnter: [isAuthenticated],
    },
    {
      path: "/direct/inbox/",
      name: "messages",
      component: MessagesView,
      beforeEnter: [isAuthenticated],
    },
    {
      path: "/acounts/edit/",
      name: "settings",
      component: SettingsView,
      beforeEnter: [isAuthenticated],
    },
    {
      path: "/direct/inbox/",
      name: "messages",
      component: MessagesView,
      beforeEnter: [isAuthenticated],
    },
    {
      path: "/:username/saved/",
      name: "saved-items",
      component: SavedView,
      beforeEnter: [isAuthenticated],
    },
    {
      path: "/:id/",
      name: "profile",
      component: ProfileView,
      props:true,
      beforeEnter: [isAuthenticated],
    },
    { 
      path: '/oauth', 
      name: 'oauth', 
      component: OAuthView,
  },
  { 
    path: '/403-forbidden', 
    name: 'forbidden', 
    component: ForbiddenView,
    beforeEnter: [isLoggedIn],
  },
  { 
    path: '/:notFound(.*)', 
    name: 'not-found', 
    component: NotFoundView,
  },
  ],
});

export default router;
