<template>
  <v-dialog width="350px" v-model="followersDialog">
    <v-btn flat accent slot="activator" class="primary">
      Followers {{ this.numberOfFollowers }}</v-btn
    >
    <v-card height="auto">
      <v-card-title class="blue white--text">
        <span class="headline">Followers</span>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-layout v-if="numberOfFollowers < 1">
          <v-flex xs12> <p>There are No Followers For You</p> </v-flex>
          <v-divider></v-divider>
        </v-layout>

        <v-layout v-for="(item, i) in followers" :key="i">
          <v-flex xs12>
            <v-btn
              flat
              router
              :to="'/' + item.user_name + '/' + item.user_id"
              slot="header"
            >
              {{ item.user_name }}
            </v-btn>
          </v-flex>
          <v-divider></v-divider>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["followers"],
  data() {
    return {
      followersDialog: false
    };
  },
  computed: {
    numberOfFollowers() {
      return this.followers.length;
    }
  }
};
</script>
