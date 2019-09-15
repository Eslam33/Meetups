// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// final destination
import Vue from "vue";
import App from "./App";
import router from "./router";
import { store } from "./store";
import DateFilter from "./filters/date";
import Vuetify from "vuetify";
import colors from "vuetify/es5/util/colors";
import * as firebase from "firebase";
import AlertCmp from "./components/Shared/Alert.vue";
import Settings from "./components/User/Settings.vue";

import EditTool from "./components/Meetup/EditTool.vue";
import DeleteTool from "./components/Meetup/DeleteTool.vue";
import ShareTool from "./components/Meetup/ShareTool.vue";

import Register from "./components/Meetup/Register.vue";
import Members from "./components/Meetup/Members.vue";

import Footer from "./components/Footer/Footer.vue";
import SocialSharing from "vue-social-sharing";
import StarRating from "vue-star-rating";
import VueChatScroll from "vue-chat-scroll";
//import { FBMessenger } from "fb-messenger";

Vue.use(VueChatScroll);

Vue.use(SocialSharing);
Vue.component("star-rating", StarRating);
Vue.component("app-alert", AlertCmp);
Vue.component("settings", Settings);
Vue.component("edit-tool", EditTool);
Vue.component("delete-tool", DeleteTool);
Vue.component("share-tool", ShareTool);

Vue.component("register", Register);
Vue.component("members", Members);

Vue.component("footer2", Footer);
Vue.filter("date", DateFilter);

//Vue.use(Vuetify);
Vue.use(Vuetify, {
  theme: {
    primary: colors.red.base,
    secondary: colors.grey.darken1,
    accent: colors.shades.black,
    error: colors.red.accent3,
    warring: colors.grey.darken1,
    success: colors.shades.black,
    info: colors.red.accent3
  }
});

import("vuetify/dist/vuetify.min.css");
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>",
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyBOfx7m7uAyGVZczkffKlIxO0u14SZ8eeU",
      authDomain: "markz-e9106.firebaseapp.com",
      databaseURL: "https://markz-e9106.firebaseio.com",
      projectId: "markz-e9106",
      storageBucket: "markz-e9106.appspot.com",
      messagingSenderId: "294341266559"
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("authSignin", user);
        this.$store.dispatch("fetchUserData");
        // this.$store.dispatch("fetchUsersData");
      }
    });
    this.$store.dispatch("fetchUsersData");
    this.$store.dispatch("loadMeetups");
  }
});
