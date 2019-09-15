<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field
            name="serach"
            label="Search For Users"
            id="search"
            v-model="searchText"
            required
          ></v-text-field>
        </v-flex>
        <v-flex
          xs12
          v-if="Number(filteredList) < 1"
          class="text-xs-center primary "
        >
          <h2>Chats not found</h2>
        </v-flex>
        <v-flex
          xs12
          v-else
          class="text-xs-center blue-grey lighten-5 scrollable2"
        >
          <v-list subheader>
            <!-- <v-subheader>Recent Chats</v-subheader> -->
            <v-list-tile
              avatar
              v-for="(chat, index) in filteredList"
              :key="index"
              :to="'/chat/' + chat.chatId"
            >
              <v-list-tile-content>
                <v-list-tile-title> {{ chat.otherUser }} </v-list-tile-title>
                <v-divider></v-divider>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  created() {
    //this.$store.dispatch("loadChats");
  },
  data() {
    return {
      searchText: ""
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    chats() {
      return this.$store.getters.user.chats;
    },
    // featuredChats(members) {
    //   let usersOfChats = [];
    //   for (let key in this.chats) {
    //     let members = this.chats[key].members;
    //     let user_ref = members.find(u => {
    //       return u.id !== this.user.id;
    //     });
    //     console.log("H: " + user_ref.id + "\n" + user_ref.username);
    //     usersOfChats.push({
    //       id: user_ref.id,
    //       username: user_ref.username,
    //       ChatId: key
    //     });
    //   }

    //   return usersOfChats;
    // },
    filteredList() {
      // if (Number(this.chats) > 0) {
      return this.chats.filter((user, index) => {
        return user.otherUser
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
      });
      // }
    }
    // chats() {
    //   return this.$store.getters.chats;
    // }
  },
  methods: {
    // createChatId(username) {
    //   if (
    //     this.user.username !== undefined &&
    //     this.user.username !== null &&
    //     username !== undefined &&
    //     username !== null
    //   ) {
    //     return this.user.username + username;
    //   } else {
    //     alert("something went be wrong \nPlease refresh page & Try again");
    //   }
    // }
    /////////////////////////////////////
    // chatTitle(members) {
    //   let title = "";
    //   let count = 0;
    //   for (let key in members) {
    //     if (count > 1) {
    //       return (title += "  ... + " + (Number(members.length) - 2));
    //     }
    //     title += members[key].username + " , ";
    //     count++;
    //   }
    //   return title;
    // }
  }
};
</script>

<style>
.scrollable2 {
  overflow-y: auto;
  height: 40vh;
}
</style>
