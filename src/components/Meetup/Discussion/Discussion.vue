<template>
  <v-container>
    <v-layout row wrap>
      <h1 class="primary--text">Join Discusion</h1>

      <add-post-Discussion :meetupId="meetupId"></add-post-Discussion>

      <v-flex class="text-xs-left text-sm-right">
        <all-reviews></all-reviews>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-for="(post, index) in featuredPosts" :key="index">
      <v-flex xs8 sm10 md8 offset-sm1>
        <v-card>
          <v-card-title>
            <div v-if="authenticatedUserId !== post.user_id">
              <v-btn
                flat
                class="info--text"
                router
                :to="'/u/' + post.user_name + '/' + post.user_id"
              >
                {{ post.user_name }}
              </v-btn>
              <div>{{ post.date | date }}</div>
            </div>
            <div v-else>
              <v-btn
                flat
                class="info--text"
                router
                :to="'/profile/' + authenticatedUserId"
              >
                {{ post.user_name }}
              </v-btn>
              <div>{{ post.date | date }}</div>
            </div>

            <template v-if="authenticatedUserId === post.user_id">
              <v-spacer></v-spacer>
              <edit-post
                :postContent="post.post"
                :postId="post.id"
                :meetupId="meetupId"
              ></edit-post>
            </template>
          </v-card-title>
          <v-card-text>
            <div>{{ post.post }}</div>
          </v-card-text>
          <v-card-actions>
            <v-layout row>
              <v-flex xs12 sm6>
                <add-comment
                  :meetupId="meetupId"
                  :postId="post.id"
                ></add-comment>

                <v-spacer></v-spacer>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
      <hr />
      <!-- comments -->
      <v-flex
        xs8
        sm10
        md8
        offset-sm1
        v-for="(comment, index2) in post.comments"
        :key="index2"
      >
        <v-card class="blue-grey lighten-5">
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm9 class="text-xs-left text-sm-left">
                <div>
                  <strong class="secondary--text">{{
                    comment.user_name
                  }}</strong>
                  <div class="date">{{ comment.date | date }}</div>
                  {{ comment.comment }}
                </div>
              </v-flex>
              <v-flex
                xs12
                sm3
                class="text-xs-left text-sm-right"
                v-if="authenticatedUserId === comment.user_id"
              >
                <v-spacer></v-spacer>
                <edit-comment
                  :commentId="index2"
                  :commentContent="comment.comment"
                  :postId="post.id"
                  :meetupId="meetupId"
                ></edit-comment>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>

        <!-- // comment -->
        <!-- reply -->

        <v-card
          class="blue-grey lighten-5"
          v-for="(reply, index3) in comment.replies"
          :key="index3"
        >
          <v-card-text>
            <div>
              <v-flex xs8 sm10 md8 offset-sm1>
                <v-layout row>
                  <v-flex xs12 sm9 class="text-xs-left text-sm-left">
                    <strong class="secondary--text">{{
                      reply.user_name
                    }}</strong>
                    <div>{{ reply.date | date }}</div>
                    {{ reply.reply }}
                  </v-flex>
                  <v-flex
                    xs12
                    sm3
                    class="text-xs-left text-sm-right"
                    v-if="authenticatedUserId === reply.user_id"
                  >
                    <v-spacer></v-spacer>
                    <edit-reply
                      :replyContent="reply.reply"
                      :replyId="index3"
                      :commentId="index2"
                      :postId="post.id"
                      :meetupId="meetupId"
                    >
                    </edit-reply>
                  </v-flex>
                </v-layout>
              </v-flex>
            </div>
          </v-card-text>
        </v-card>
        <v-card class="blue-grey lighten-5">
          <add-reply
            :meetupId="meetupId"
            :postId="post.id"
            :commentId="index2"
          ></add-reply>
        </v-card>
        <hr />
        <!-- // reply -->
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import ADDPostToDiscussion from "@/components/Meetup/Discussion/AddPostToDiscussion";
import EditPost from "@/components/Meetup/Discussion/EditPost";

import AddComment from "@/components/Meetup/Discussion/AddComment";
import EditComment from "@/components/Meetup/Discussion/EditComment";

import AddReply from "@/components/Meetup/Discussion/AddReply";
import EditReply from "@/components/Meetup/Discussion/EditReply";

import Reviews from "@/components/Meetup/Reviews";

export default {
  props: ["meetupId", "meetupCreatorId", "postsObj"],
  components: {
    "add-post-Discussion": ADDPostToDiscussion,
    "add-comment": AddComment,
    "add-reply": AddReply,
    "edit-post": EditPost,
    "edit-comment": EditComment,
    "edit-reply": EditReply,
    "all-reviews": Reviews
  },
  data() {
    return {};
  },
  computed: {
    featuredPosts() {
      const loadedPosts = [];
      const obj = this.postsObj;
      for (let key in obj) {
        loadedPosts.push({
          id: key,
          post: obj[key].post,
          user_id: obj[key].user_id,
          user_name: obj[key].user_name,
          date: obj[key].date,
          comments: obj[key].comments
        });
      }
      return loadedPosts.reverse();
    },
    dateNow() {
      const dateNow = new Date();
      return dateNow;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    authenticatedUserId() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id;
    }
  },
  methods: {}
};
</script>
