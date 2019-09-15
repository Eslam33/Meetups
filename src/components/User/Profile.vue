<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs2 class="text-xs-left">
        <h1>> {{ this.user.username }}</h1>
      </v-flex>
      <v-flex xs6 class="text-xs-center">
        <v-list subheader>
          <v-subheader>Choose Your Interested List </v-subheader>
          <interested-list></interested-list>
        </v-list>
      </v-flex>
      <v-flex xs4 class="text-xs-center ">
        <all-followers :followers="user.followers"></all-followers>
        <all-following :following="user.following"></all-following>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 class="text-xs-left text-sm-right">
        <settings :user="user" v-if="userIsAuthenticated"></settings>
      </v-flex>
    </v-layout>
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
import Followers from "@/components/User/Followers";
import Following from "@/components/User/Following";
import InterestedList from "@/components/User/InterestedList";
export default {
  components: {
    "all-followers": Followers,
    "all-following": Following,
    "interested-list": InterestedList
  },
  data() {
    return {
      selectedClass: "info",
      unselectedClass: "secondary",
      selectedDiv: 1
    };
  },
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    user() {
      if (!this.userIsAuthenticated) {
        return;
      }
      return this.$store.getters.user;
    },
    createdMeetups() {
      if (!this.userIsAuthenticated) {
        return;
      }
      //console.log("all: " + this.$store.getters.userMeetups);
      return this.$store.getters.userCreatedMeetups(this.user.id);
    },
    registeredMeetups() {
      if (!this.userIsAuthenticated) {
        return;
      }
      //console.log("all: " + this.$store.getters.userMeetups);
      return this.$store.getters.userRegisteredMeetups;
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
    }
  }
};
</script>
