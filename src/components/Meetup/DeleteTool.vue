<template>
  <div>
    <v-dialog width="350px" persistent v-model="deleteDialog">
      <v-btn fab accent slot="activator"> <v-icon>delete</v-icon> </v-btn>
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title>Delete for Meetup?</v-card-title>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-text
                >You can always change your decision later on.</v-card-text
              >
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-actions>
                <v-btn
                  class="red--text darken-1"
                  flat
                  @click="deleteDialog = false;"
                  >Cancel</v-btn
                >
                <v-btn class="green--text darken-1" flat @click="onAgree"
                  >Confirm</v-btn
                >
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog width="350px" persistent v-model="doAlert">
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12> <v-card-title>Opps!</v-card-title> </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-text
                >You can not delete this meetup because there are many people
                that have registered on meetup
              </v-card-text>
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
export default {
  props: ["meetup"],
  data() {
    return {
      deleteDialog: false,
      doAlert: false
    };
  },
  methods: {
    onAgree() {
      if (this.meetup.totalRegisteredUsers > 0) {
        this.deleteDialog = false;
        this.doAlert = true;
      } else {
        this.$store.dispatch("deleteMeetup", {
          id: this.meetup.id,
          creatorId: this.meetup.creatorId
        });
        this.$router.push("/profile/" + this.$store.getters.user.id);
      }
    }
  }
};
</script>
