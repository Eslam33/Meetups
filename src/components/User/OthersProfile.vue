<template>
  <v-container>
    <h1>
      > D-{{ this.username }}

      <v-btn :color="this.followingColor" @click="onFollowing">{{
        this.followingState
      }}</v-btn>
    </h1>

    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router @click="swap(1);" :class="selectedClass"
          >Created Meetups</v-btn
        >
      </v-flex>

      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router @click="swap(2);" :class="unselectedClass"
          >Registered Meetups</v-btn
        >
      </v-flex>
    </v-layout>
    <!-- ////////////////////////////////////// -->
    <template v-if="selectedDiv === 1">
      <v-container v-if="createdMeetups.length > 0">
        <v-alert :value="true" type="info"> created Meetups </v-alert>
        <v-layout
          row
          wrap
          v-for="meetup in createdMeetups"
          :key="meetup.id"
          class="mb-2"
        >
          <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
            <v-card class="info">
              <v-container fluid>
                <v-layout row>
                  <v-flex xs5 sm4 md3>
                    <v-card-media
                      :src="meetup.imageUrl"
                      height="130px"
                    ></v-card-media>
                  </v-flex>
                  <v-flex xs7 sm8 md9>
                    <v-card-title primary-title>
                      <div>
                        <h5 class="white--text mb-0">{{ meetup.title }}</h5>
                        <div>{{ meetup.date | date }}</div>
                      </div>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn flat :to="'/meetups/' + meetup.id">
                        <v-icon left light>arrow_forward</v-icon>
                        View Meetup
                      </v-btn>
                    </v-card-actions>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container v-else>
        <v-layout row wrap class="mb-2">
          <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
            <v-alert :value="true" type="info">
              No Meetups have been created
            </v-alert>
          </v-flex>
        </v-layout>
      </v-container>
    </template>

    <!-- ///////////////////////////////////////// -->
    <!-- &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& -->
    <template v-if="selectedDiv === 2">
      <v-container v-if="registeredMeetups.length > 0">
        <v-alert :value="true" type="info"> Registered Meetups </v-alert>
        <v-layout
          row
          wrap
          v-for="meetup in registeredMeetups"
          :key="meetup.id"
          class="mb-2"
        >
          <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
            <v-card class="info">
              <v-container fluid>
                <v-layout row>
                  <v-flex xs5 sm4 md3>
                    <v-card-media
                      :src="meetup.imageUrl"
                      height="130px"
                    ></v-card-media>
                  </v-flex>
                  <v-flex xs7 sm8 md9>
                    <v-card-title primary-title>
                      <div>
                        <h5 class="white--text mb-0">{{ meetup.title }}</h5>
                        <div>{{ meetup.date | date }}</div>
                      </div>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn flat :to="'/meetups/' + meetup.id">
                        <v-icon left light>arrow_forward</v-icon>
                        View Meetup
                      </v-btn>
                    </v-card-actions>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-container v-else>
        <v-layout row wrap class="mb-2">
          <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
            <v-alert :value="true" type="info">
              No Meetups have been created
            </v-alert>
          </v-flex>
        </v-layout>
      </v-container>
    </template>

    <!-- &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& -->
  </v-container>
</template>
<script>
export default {
  props: ["username", "uid"],
  data() {
    return {
      selectedClass: "info",
      unselectedClass: "secondary",
      selectedDiv: 1,
      followingColor: "",
      followingState: ""
    };
  },
  created() {
    if (!this.userIsFollowed) {
      this.followingColor = "blue lighten-3";
      this.followingState = "Follow";
    } else {
      this.followingColor = "red lighten-3";
      this.followingState = "UnFollow";
    }
  },
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsFollowed() {
      if (!this.userIsAuthenticated) {
        console.log("othersProfile: user is not authenticated ");
        return;
      }
      return (
        this.$store.getters.user.following.findIndex(u => {
          return u.user_id === this.uid;
        }) >= 0
      );
    },
    otherUser() {
      // if (!this.userIsAuthenticated) {
      //   return;
      // }
      return this.$store.getters.otherUser(this.uid);
    },
    createdMeetups() {
      // if (!this.userIsAuthenticated) {
      //   return;
      // }
      return this.$store.getters.userCreatedMeetups(this.uid);
    },
    registeredMeetups() {
      // if (!this.userIsAuthenticated) {
      //   return;
      // }
      return this.$store.getters.otherUserRegisteredMeetups(
        this.otherUser[0].registeredMeetups
      );
      //return this.$store.getters.userRegisteredMeetups;
    }
  },
  methods: {
    // swap buttons when you click
    swap(value) {
      if (value === 1) {
        this.selectedClass = "info";
        this.unselectedClass = "secondary";
        this.selectedDiv = 1;
      } else {
        this.selectedClass = "secondary";
        this.unselectedClass = "info";
        this.selectedDiv = 2;
      }
    },
    onFollowing() {
      console.log("on following--" + this.userIsFollowed);
      if (!this.userIsAuthenticated) {
        alert("you should be login/signup first");
        return;
      }
      if (!this.userIsFollowed) {
        this.followingState = "UnFollow";
        this.followingColor = "red lighten-3";
        this.$store.dispatch("followUser", {
          otherUser_id: this.uid,
          otherUser_name: this.username
        });
      } else {
        this.followingState = "Follow";
        this.followingColor = "blue lighten-3";
        this.$store.dispatch("unfollowUser", {
          otherUser_id: this.uid,
          otherUser_name: this.username
        });
      }
      this.$store.dispatch("fetchUserData");
    }
  }
};
</script>
