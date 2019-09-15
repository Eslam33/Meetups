<template>
  <v-dialog width="350px" v-model="followingDialog">
    <v-btn flat accent slot="activator" class="primary">
      Following {{ this.numberOfFollowing }}
    </v-btn>
    <v-card height="auto">
      <v-card-title class="blue white--text">
        <span class="headline">Following</span>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-layout v-if="numberOfFollowing < 1">
          <v-flex xs12> <p>There are No Following For You</p> </v-flex>
          <v-divider></v-divider>
        </v-layout>
        <v-layout v-for="(item, i) in following" :key="i">
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
  props: ["following"],
  data() {
    return {
      followingDialog: false
    };
  },
  computed: {
    numberOfFollowing() {
      return this.following.length;
    }
  }
};
</script>
