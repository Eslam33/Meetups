<template>
  <div
    class="chat-container scrollable"
    ref="chatContainer"
    v-chat-scroll="{ always: false, smooth: true }"
  >
    <v-layout v-if="messages < 1">
      <v-flex>
        <div><p id="emptyMsgs">No Messages Have been Found</p></div>
      </v-flex>
    </v-layout>
    <v-layout
      v-else
      v-for="(message, index) in messages"
      :key="index"
      class="message"
      :class="{ own: message.user == username }"
    >
      <v-flex>
        <div class="username">{{ message.user }}</div>

        <div style="margin-top: 5px"></div>
        <div class="content">{{ message.content }}</div>
        <div class="date">
          <p>{{ message.date | date }}</p>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  props: ["chatId"],
  data() {
    return {};
  },
  created() {
    if (this.chatId !== null && this.chatId !== undefined) {
      this.$store.dispatch("loadChatMessages", { chatId: this.chatId });
    }
  },
  watch: {
    chatId() {
      if (this.chatId !== null && this.chatId !== undefined) {
        this.$store.dispatch("loadChatMessages", { chatId: this.chatId });
      }
    }
  },
  computed: {
    messages() {
      return this.$store.getters.chatMessages;
    },
    username() {
      return this.$store.getters.user.username;
    }
  }
};
</script>
<style>
#emptyMsgs {
  font-size: 1.5rem;
  align-items: center;
  padding: 6rem;
  color: #b3d4fc;
  align-text: center;
  font-weight: bold;
}
</style>
