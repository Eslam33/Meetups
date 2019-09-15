<template>
  <div class="typer">
    <input
      type="text"
      placeholder="Type here..."
      v-on:keyup.enter="sendMessage"
      v-model="content"
    />
    <v-btn icon class="blue--text emoji-panel"> <v-icon>mood</v-icon> </v-btn>
  </div>
</template>
<script>
export default {
  props: ["chatId"],
  data() {
    return {
      content: ""
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    sendMessage() {
      if (this.content !== "") {
        console.log("chatId: " + this.chatId);

        console.log("msg: " + this.content);

        this.$store.dispatch("sendMessage", {
          username: this.user.username,
          content: this.content,
          date: new Date().toString(),
          chatId: this.chatId
        });
        this.content = "";
      }
    }
  }
};
</script>
