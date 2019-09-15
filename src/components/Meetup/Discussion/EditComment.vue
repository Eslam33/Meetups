<template>
  <v-dialog width="350px" persistent v-model="editCommentDialog">
    <v-btn flat accent small slot="activator"> <v-icon>edit</v-icon> </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12> <v-card-title>Edit Comment</v-card-title> </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="comment"
                label="Comment"
                id="comment"
                multi-line
                v-model="EditedComment"
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
                @click="editCommentDialog = false;"
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
  props: ["commentId", "commentContent", "postId", "meetupId"],
  data() {
    return {
      editCommentDialog: false,
      EditedComment: this.commentContent
    };
  },
  computed: {
    formIsValid() {
      return this.EditedComment.trim() !== "";
    }
  },
  methods: {
    onSaveChanges() {
      if (!this.formIsValid) {
        return;
      }
      this.editCommentDialog = false;
      this.$store.dispatch("updateComment", {
        meetup_id: this.meetupId,
        comment: this.EditedComment,
        post_id: this.postId,
        comment_id: this.commentId
      });
      this.$store.dispatch("loadMeetups");
    }
  }
};
</script>
