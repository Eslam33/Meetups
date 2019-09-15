<template>
  <v-dialog width="350px" v-model="reviewsDialog">
    <v-btn accent slot="activator" class="info">Reviews</v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="blue white--text"
              ><span class="headline">Reviews</span></v-card-title
            >
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout v-if="numberOfReviews < 1">
          <v-flex xs12> <p>Not Found</p> </v-flex>
          <v-divider></v-divider>
        </v-layout>
        <v-layout
          v-else
          row
          wrap
          v-for="(review, index) in reviews"
          :key="index"
        >
          <v-flex xs12 class="text-xs-left text-sm-left">
            <strong class="secondary--text">{{ review.user_name }}</strong>
            <div>{{ review.date | date }}</div>
            {{ review.comment }}
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                flat
                class="blue--text darken-1"
                @click="reviewsDialog = false;"
                >Close</v-btn
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
  data() {
    return {
      reviewsDialog: false
    };
  },
  computed: {
    reviews() {
      return this.$store.getters.meetupReviews;
    },
    numberOfReviews() {
      let count = 0;
      for (let key in this.reviews) {
        count++;
      }
      return count;
    }
  },
  methods: {}
};
</script>
