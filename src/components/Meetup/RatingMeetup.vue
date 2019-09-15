<template>
  <star-rating :rating="meetupRating" read-only></star-rating>
</template>
<script>
export default {
  props: ["meetupID"],
  created() {
    this.$store.dispatch("loadMeetupReviews", {
      meetup_id: this.meetupID
    });
  },
  computed: {
    meetupRating() {
      const ratingNumer = Number(this.$store.getters.meetupRating);
      if (Number.isNaN(ratingNumer)) {
        return 0;
      } else {
        return ratingNumer;
      }
      // return Number(this.$store.getters.meetupRating);
    }
  }
};
</script>
