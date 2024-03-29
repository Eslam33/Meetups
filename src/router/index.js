import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Meetups from "@/components/Meetup/Meetups";
import CreateMeetup from "@/components/Meetup/CreateMeetup";
import Profile from "@/components/User/Profile";
import OthersProfile from "@/components/User/OthersProfile";
import Notifications from "@/components/User/Notifications";
import Signup from "@/components/User/Signup";
import Signin from "@/components/User/Signin";
import Meetup from "@/components/Meetup/Meetup";
import ContactUs from "@/components/Footer/ContactUs";
import About from "@/components/Footer/About";
import Chats from "@/components/Chat/ChatApp";

import AuthGuard from "./auth-guard";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/meetups",
      name: "Meetups",
      component: Meetups
    },
    {
      path: "/meetup/new",
      name: "CreateMeetup",
      component: CreateMeetup,
      beforeEnter: AuthGuard
    },
    {
      path: "/meetups/:id",
      name: "Meetup",
      props: true,
      component: Meetup
    },
    {
      path: "/profile/:id",
      name: "Profile",
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: "/u/:username/:uid",
      name: "OthersProfile",
      props: true,
      component: OthersProfile
    },
    {
      path: "/notifications",
      name: "Notifications",
      component: Notifications,
      beforeEnter: AuthGuard
    },
    {
      path: "/chats",
      name: "Chats",
      component: Chats,
      beforeEnter: AuthGuard
    },
    {
      path: "/chat/:chatId",
      name: "Chats",
      component: Chats,
      props: true,
      beforeEnter: AuthGuard
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup
    },
    {
      path: "/signin",
      name: "Signin",
      component: Signin
    },
    {
      path: "/about",
      name: "About",
      component: About
    },
    {
      path: "/contactus",
      name: "AbContactUsout",
      component: ContactUs
    }
  ],
  mode: "history"
});
