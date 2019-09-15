<template>
  <v-dialog
    width="350px"
    v-if="userIsAuthenticated"
    persistent
    v-model="addCommentDialog"
  >
    <v-btn flat small slot="activator"> <v-icon>comment</v-icon> </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Add Comment To Post</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="comment"
                label="Comment"
                id="comment"
                v-model="comment"
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
                @click="addCommentDialog = false;"
                >Close</v-btn
              >
              <v-btn flat class="blue--text darken-1" @click="onSaveChanges"
                >submit</v-btn
              >
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
  <v-dialog width="350px" v-else v-model="doAlert">
    <v-btn flat small slot="activator"> <v-icon>comment</v-icon> </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12> <v-card-title>Opps!</v-card-title> </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>You should be login/signup first </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn class="red--text darken-1" flat @click="doAlert = false;"
                >Thanks</v-btn
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
  props: ["meetupId", "postId"],
  data() {
    return {
      addCommentDialog: false,
      comment: "",
      doAlert: false
    };
  },
  computed: {
    formIsValid() {
      return this.comment !== "";
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
      if (!this.formIsValid) {
        return;
      }
      this.addCommentDialog = false;
      this.$store.dispatch("addComment", {
        meetup_id: this.meetupId,
        post_id: this.postId,
        comment: this.comment,
        date: this.dateNow
      });
      this.$store.dispatch("loadMeetups");
      console.log("Date:" + this.dateNow);
    }
  }
};
</script>
