<template>
  <div>
    <v-dialog v-if="userIsAuthenticated" width="350px" v-model="inviteDialog">
      <v-btn accent slot="activator" class="info">Invite</v-btn>
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title class="blue white--text"
                ><span class="headline">Invite Friends</span>
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>

          <v-layout row wrap>
            <v-flex xs12>
              <v-card-text>
                <v-text-field
                  name="serach"
                  label="Search For Users"
                  id="search"
                  v-model="searchText"
                  required
                ></v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>

          <v-layout>
            <v-flex xs12 class="text-xs-center  scrollable">
              <v-list subheader>
                <v-subheader>Suggested Users </v-subheader>
                <v-list-tile
                  avatar
                  v-for="(user, index) in filteredList"
                  :key="index"
                >
                  <v-list-tile-content>
                    <div>
                      <input
                        type="checkbox"
                        :id="user.id"
                        :value="user.id"
                        v-model="selected"
                      />
                      <label :for="user.id"> {{ user.username }}</label>
                    </div>

                    <!--
                      <v-checkbox
                        color="red"
                        v-model="selected"
                        :label="user.username"
                        :value="user.id"
                      ></v-checkbox>
                    -->
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-actions>
                <v-btn
                  flat
                  class="blue--text darken-1"
                  @click="inviteDialog = false;"
                  >Close</v-btn
                >
                <v-btn class="green--text darken-1" flat @click="invite"
                  >Invite</v-btn
                >
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog width="350px" v-else v-model="doAlert">
      <v-btn accent slot="activator" class="info">Invite</v-btn>

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
  props: ["meetupId"],
  data() {
    return {
      inviteDialog: false,
      searchText: "",
      selected: [],
      doAlert: false
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    filteredList() {
      // return this.users;
      return this.users.filter((user, index) => {
        return user.username
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
      });
    },
    dateNow() {
      const dateNow = new Date();
      return dateNow;
    },
    formIsValid() {
      return this.selected.length < 1;
    },
    username() {
      return this.$store.getters.user.username;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    invite() {
      if (this.formIsValid) {
        return;
      }
      this.inviteDialog = false;
      this.$store.dispatch("sendNotifications", {
        selectedUsersArray: this.selected,
        date: this.dateNow,
        notification: this.username + " invite you for meetup",
        url: "/meetups/" + this.meetupId
      });
    }
  }
};
</script>

<style>
.scrollable {
  overflow-y: auto;
  height: 40vh;
}
.search_checkbox {
  width: 100%;
}
</style>
