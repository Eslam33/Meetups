<template>
  <v-card>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card-title class="blue white--text">
            <span class="headline">Chat </span>

            <!-- <members :members="members"> </members> -->
            <v-spacer></v-spacer>
          </v-card-title>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row>
        <v-flex xs12 sm7 order-xs1 style="position: relative;">
          <for-messages :chatId="chatId"></for-messages>

          <!--
            <emoji-picker :show="emojiPanel"
                  @close="toggleEmojiPanel"
                  @click="addMessage"
              >
            </emoji-picker>
          -->

          <for-typer :chatId="chatId"></for-typer>
        </v-flex>
        <v-flex sm5 order-xs2 class=""> <all-chats></all-chats> </v-flex>
      </v-layout>

      <v-divider></v-divider>
      <v-layout row wrap>
        <v-flex xs12>
          <!--
            <v-card-actions>
              <v-btn flat class="blue--text darken-1" @click="onSaveChanges"
                >Send</v-btn
              >
            </v-card-actions>
          -->
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
import EmojiPicker from "@/components/Chat/EmojiPicker.vue";
import Messages from "@/components/Chat/Messages.vue";

import Typer from "@/components/Chat/Typer.vue";
import AllChats from "./Chats.vue";

//import AllChats from "./AllChats.vue";
export default {
  props: ["chatId"],
  components: {
    "emoji-picker": EmojiPicker,
    "for-typer": Typer,
    "for-messages": Messages,
    //  "all-chats": AllChats
    "all-chats": AllChats
  },
  mounted() {
    console.log("ChatApp has mounted");
  },
  data() {
    return {
      ChatDialog: false,
      //post: "",
      doAlert: false
    };
  },
  computed: {
    formIsValid() {
      //return this.post !== "";
      return true;
    },
    dateNow() {
      const dateNow = new Date();
      return dateNow;
    },

    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    onSaveChanges() {
      this.$store.dispatch("setaChatAtivation");

      // if (!this.formIsValid) {
      //   return;
      // }
      // this.ChatDialog = false;
      //console.log("post: " + this.post);
      // this.$store.dispatch("addPost", {
      //   meetup_id: this.meetupId,
      //   post: this.post,
      //   date: this.dateNow
      // });
      // this.$store.dispatch("loadMeetups");
    }
  }
};
</script>

<style>
.scrollable {
  overflow-y: auto;
  height: 50vh;
}
.typer {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  bottom: 0;
  height: 3.9rem;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 -5px 10px -5px rgba(0, 0, 0, 0.2);
}
.typer .emoji-panel {
  /*margin-right: 15px;*/
}
.typer input[type="text"] {
  position: absolute;
  left: 2.5rem;
  padding: 1rem;
  width: 80%;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1.25rem;
}
.chat-container {
  box-sizing: border-box;
  height: calc(75vh - 8.5rem);
  overflow-y: auto;
  padding: 10px;
  background-color: #f2f2f2;
}
.message {
  margin-bottom: 3px;
}
.message.own {
  text-align: right;
}
.message.own .content {
  background-color: lightskyblue;
}
.chat-container .username {
  font-size: 18px;
  font-weight: bold;
}
.chat-container .content {
  padding: 8px;
  background-color: lightwhite;
  border-radius: 10px;
  display: inline-block;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
  max-width: 50%;
  word-wrap: break-word;
}
@media (max-width: 480px) {
  .chat-container .content {
    max-width: 60%;
  }
}
</style>
