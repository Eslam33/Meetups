<template>
  <v-dialog width="350px" persistent v-model="editReplyDialog">
    <v-btn flat accent small slot="activator"> <v-icon>edit</v-icon> </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12> <v-card-title>Edit Reply</v-card-title> </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="reply"
                label="Reply"
                id="reply"
                multi-line
                v-model="EditedReply"
                required
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                flat
                class="blue--text darken-1"
                @click="editReplyDialog = false;"
                >Close</v-btn
              >
              <v-btn flat class="blue--text darken-1" @click="onSaveChanges"
                >Save Changes</v-btn
              >
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["replyContent", "replyId", "commentId", "postId", "meetupId"],
  data() {
    return {
      editReplyDialog: false,
      EditedReply: this.replyContent
    };
  },
  computed: {
    formIsValid() {
      return this.EditedReply.trim() !== "";
    }
  },
  methods: {
    onSaveChanges() {
      if (!this.formIsValid) {
        return;
      }
      this.editReplyDialog = false;
      this.$store.dispatch("updateReply", {
        meetup_id: this.meetupId,
        reply: this.EditedReply,
        post_id: this.postId,
        comment_id: this.commentId,
        reply_id: this.replyId
      });
      this.$store.dispatch("loadMeetups");
    }
  }
};
</script>
