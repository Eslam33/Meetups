<template>
  <v-dialog width="350px" v-model="membersDialog">
    <v-btn fab accent slot="activator"> <v-icon>group</v-icon> </v-btn>
    <v-card height="auto">
      <v-card-title class="blue white--text">
        <span class="headline">Members {{ numberOfMembers }}</span>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-layout v-if="numberOfMembers < 1">
          <v-flex xs12> <p>Not Found</p> </v-flex>
          <v-divider></v-divider>
        </v-layout>

        <v-layout v-else v-for="(item, i) in members" :key="i">
          <v-flex xs12>
            <v-btn
              flat
              router
              :to="'/u/' + item.username + '/' + i"
              slot="header"
            >
              {{ item.username }}
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
  props: ["members"],
  data() {
    return {
      membersDialog: false
    };
  },
  computed: {
    numberOfMembers() {
      let count = 0;
      for (let key in this.members) {
        count++;
      }
      return count;
    }
  }
};
</script>
