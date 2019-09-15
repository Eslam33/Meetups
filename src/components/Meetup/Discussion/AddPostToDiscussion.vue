<template>
  <div>
    <v-dialog
      width="350px"
      v-if="userIsAuthenticated"
      persistent
      v-model="addPostDialog"
    >
      <v-btn fab accent slot="activator"> <v-icon>add_circle</v-icon> </v-btn>
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title>Add Post To Discussion</v-card-title>
            </v-flex>
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
                  v-model="post"
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
                  @click="addPostDialog = false;"
                  >Close</v-btn
                >
                <v-btn flat class="blue--text darken-1" @click="onSaveChanges"
                  >Submit</v-btn
                >
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog width="350px" v-else v-model="doAlert">
      <v-btn fab accent slot="activator"> <v-icon>add_circle</v-icon> </v-btn>
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
  </div>
</template>
<script>
import Warning from "@/components/Meetup/Discussion/Warning";

export default {
  props: ["meetupId"],
  components: {
    "warning-for-auth": Warning
  },
  data() {
    return {
      addPostDialog: false,
      post: "",
      doAlert: false
    };
  },
  computed: {
    formIsValid() {
      return this.post !== "";
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
      this.addPostDialog = false;
      //console.log("post: " + this.post);
      this.$store.dispatch("addPost", {
        meetup_id: this.meetupId,
        post: this.post,
        date: this.dateNow
      });
      this.$store.dispatch("loadMeetups");
    }
  }
};
</script>
