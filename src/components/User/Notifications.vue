<template>
  <div>
    <br />

    <v-layout v-if="!this.isExist_Notifications">
      <v-flex xs12 sm10 md8 offset-sm1>
        <v-card class="blue-grey lighten-5">
          <v-card-text>
            <div><h4>you don't have any Notifications</h4></div>
          </v-card-text>
        </v-card>
      </v-flex>
      <hr />
    </v-layout>
    <v-layout
      v-else
      row
      wrap
      v-for="(noti, index) in notifications"
      :key="index"
    >
      <v-flex xs12 sm10 md8 offset-sm1>
        <v-card class="blue-grey lighten-5" router :to="noti.url">
          <v-card-text>
            <div>
              {{ noti.notification }}<br />

              {{ noti.date | date }}
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <hr />
    </v-layout>
    <br /><br />
  </div>
</template>
<script>
export default {
  created() {
    this.$store.dispatch("fetchUserData");
  },
  computed: {
    notifications() {
      return this.$store.getters.user.notifications.slice(0, 20);
    },
    isExist_Notifications() {
      if (this.notifications.length < 1) {
        return false;
      }
      return true;
    }
  }
};
</script>
