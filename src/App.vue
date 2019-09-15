<template>
  <v-app>
    <v-navigation-drawer fixed v-model="sideNav">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon
        @click.stop="sideNav = !sideNav;"
        class="hidden-sm-and-up "
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer"
          >Meetups</router-link
        >
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.link"
        >
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn v-if="userIsAuthenticated" flat router to="/notifications">
          <!-- <v-badge overlap> <span slot="badge">3</span> </v-badge> -->
          <v-icon left dark>notifications</v-icon>
        </v-btn>
        <v-btn v-if="userIsAuthenticated" flat router to="/chats">
          <!-- <v-badge overlap> <span slot="badge">3</span> </v-badge> -->
          <v-icon left dark>chat_bubble</v-icon>
        </v-btn>
        <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
          <v-icon left dark>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main><router-view> </router-view></main>
    <br /><br /><br /><br />
    <br /><br />
    <v-layout row wrap class="mt-2 footer">
      <v-flex xs12 class="text-xs-center ">
        <footer2 id="footer"> </footer2>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      sideNav: false,
      feeds: [
        {
          type: "message",
          uid: "UID",
          text: "Example message"
        }
      ]
      // menuItems: [
      //   { icon: "supervisor_account", title: "View Meetups", link: "/meetups" },
      //   { icon: "room", title: "Organize Meetup", link: "/meetup/new" },
      //   { icon: "person", title: "Profile", link: "/profile" },
      //   { icon: "face", title: "Sign up", link: "/signup" },
      //   { icon: "lock_open", title: "Sign in", link: "/signin" }
      // ]
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "face", title: "Sign up", link: "/signup" },
        { icon: "lock_open", title: "Sign in", link: "/signin" }
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: "supervisor_account",
            title: "View Meetups",
            link: "/meetups"
          },
          { icon: "room", title: "Organize Meetup", link: "/meetup/new" },
          { icon: "person", title: "Profile", link: "/profile/" + this.userId }
          //  { icon: "notifications", title: "", link: "/notifications" }
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userId() {
      return this.$store.getters.user.id;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
};
</script>
<style>
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
