<template>
  <div>
    <v-dialog
      width="350px"
      v-if="userIsAuthenticated"
      persistent
      v-model="reviewDialog"
    >
      <v-btn fab accent slot="activator"> <v-icon>rate_review</v-icon> </v-btn>
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12> <v-card-title>Review Meetup</v-card-title> </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-text>
                <star-rating
                  @rating-selected="setRating"
                  :rating="rating"
                  :increment="0.01"
                ></star-rating>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-text>
                <v-text-field
                  name="reviewComment"
                  label="Comment"
                  id="reviewComment"
                  v-model="reviewComment"
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
                  @click="reviewDialog = false;"
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
      <v-btn fab accent slot="activator"> <v-icon>rate_review</v-icon> </v-btn>
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
export default {
  props: ["meetup"],
  data() {
    return {
      reviewDialog: false,
      rating: 0,
      reviewComment: "",
      doAlert: false
    };
  },
  computed: {
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
    setRating: function(rating) {
      this.rating = rating;
    },
    onSaveChanges() {
      //console.log("rating: " + this.rating);

      this.$store.dispatch("reviewMeetup", {
        meetup_id: this.meetup.id,
        rating: this.rating,
        comment: this.reviewComment,
        date: this.dateNow
      });
      this.reviewDialog = false;
      this.$store.dispatch("loadMeetupReviews", {
        meetup_id: this.meetup.id
      });
      this.rating = 0;
    }
  }
};
</script>
