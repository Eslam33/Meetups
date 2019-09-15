<template>
  <v-container>
    <v-layout v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loading"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{ meetup.title }}</h6>
            <rating-meetup :meetupID="meetup.id"></rating-meetup>
            <v-spacer></v-spacer>
            <!--
              <v-btn
                class="primary"
                href="https://www.google.com/"
                target="_blank"
              >
                Start Chat
              </v-btn>
            -->
            <invite-users :meetupId="id"></invite-users>
            <template v-if="userIsCreator">
              <edit-tool :meetup="meetup"></edit-tool>
              <delete-tool :meetup="meetup"> </delete-tool>
            </template>
          </v-card-title>
          <v-card-media :src="meetup.imageUrl" height="400px"></v-card-media>
          <v-card-text>
            <div class="info--text">
              {{ meetup.date | date }} - {{ meetup.location }}
            </div>
            <div>{{ meetup.description }} !</div>
          </v-card-text>
          <v-card-actions>
            <span style="color:#cccccc"> Created By </span>
            <div v-if="authenticatedUserId !== meetup.creatorId">
              <v-btn
                flat
                class="secondary"
                router
                :to="'/u/' + creator[0].username + '/' + meetup.creatorId"
              >
                {{ creator[0].username }}
              </v-btn>
            </div>
            <div v-else>
              <v-btn
                flat
                class="secondary"
                router
                :to="'/profile/' + authenticatedUserId"
              >
                {{ creator[0].username }}
              </v-btn>
            </div>

            <v-spacer></v-spacer>

            <register
              v-if="!userIsCreator && userIsAuthenticated"
              :meetupID="meetup.id"
            >
            </register>
            <review-tool :meetup="meetup"></review-tool>

            <share-tool :meetupId="id"> </share-tool>

            <members :members="meetup.registeredUsers"> </members>
          </v-card-actions>
        </v-card>
      </v-flex>
      <meetup-discussion
        :meetupId="id"
        :meetupCreatorId="meetup.creatorId"
        :postsObj="meetup.posts"
      ></meetup-discussion>
    </v-layout>
  </v-container>
</template>

<script>
import RatingMeetup from "@/components/Meetup/RatingMeetup";
import ReviewTool from "@/components/Meetup/ReviewMeetup";
import Discussion from "@/components/Meetup/Discussion/Discussion";
import Invite from "@/components/Meetup/Invite";

export default {
  props: ["id"],
  components: {
    "rating-meetup": RatingMeetup,
    "review-tool": ReviewTool,
    "meetup-discussion": Discussion,
    "invite-users": Invite
  },
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.meetup.creatorId;
    },
    creator() {
      return this.$store.getters.otherUser(this.meetup.creatorId);
    },
    authenticatedUserId() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id;
    },
    loading() {
      return this.$store.getters.loading;
    },
    registerUsers() {
      return this.$store.getters.registerUsersForMeetup(this.id);
    }
  }
};
</script>
