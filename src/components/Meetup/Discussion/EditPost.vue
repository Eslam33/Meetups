<template>
  <v-dialog width="350px" persistent v-model="editPostDialog">
    <v-btn fab small slot="activator"> <v-icon>edit</v-icon> </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12> <v-card-title>Edit Post</v-card-title> </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="post"
                label="Post"
                id="post"
                multi-line
                v-model="EditedPost"
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
                @click="editPostDialog = false;"
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
  props: ["postContent", "postId", "meetupId"],
  data() {
    return {
      editPostDialog: false,
      EditedPost: this.postContent
    };
  },
  computed: {
    formIsValid() {
      return this.EditedPost.trim() !== "";
    }
  },
  methods: {
    onSaveChanges() {
      if (!this.formIsValid) {
        return;
      }
      this.editPostDialog = false;
      this.$store.dispatch("updatePost", {
        meetup_id: this.meetupId,
        post: this.EditedPost,
        post_id: this.postId
      });
      this.$store.dispatch("loadMeetups");
    }
  }
};
</script>
