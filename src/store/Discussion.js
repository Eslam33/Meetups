import * as firebase from "firebase";

const Discussion = {
  state: {
    Posts: []
  },
  mutations: {},
  actions: {
    addPost(context, payload) {
      const user = context.getters.user;
      const newPost = {
        user_id: user.id,
        user_name: user.username,
        date: payload.date.toISOString(),
        post: payload.post
      };
      firebase
        .database()
        .ref("/meetups/" + payload.meetup_id)
        .child("/posts/")
        .push(newPost)
        .then(data => {})
        .catch(error => {
          console.log(error);
        });
    },
    updatePost(context, payload) {
      const updateObj = {};
      if (payload.post) {
        updateObj.post = payload.post;
      }
      firebase
        .database()
        .ref("/meetups/" + payload.meetup_id)
        .child("/posts/" + payload.post_id)
        .update(updateObj)
        .then(data => {})
        .catch(error => {
          console.log(error);
        });
    },
    addComment(context, payload) {
      const user = context.getters.user;
      const newComment = {
        user_id: user.id,
        user_name: user.username,
        date: payload.date.toISOString(),
        comment: payload.comment
      };
      firebase
        .database()
        .ref("/meetups/" + payload.meetup_id)
        .child("/posts/" + payload.post_id)
        .child("/comments/")
        .push(newComment)
        .then(data => {})
        .catch(error => {
          console.log(error);
        });
    },
    updateComment(context, payload) {
      const updateObj = {};
      if (payload.comment) {
        updateObj.comment = payload.comment;
      }
      firebase
        .database()
        .ref("/meetups/" + payload.meetup_id)
        .child("/posts/" + payload.post_id)
        .child("/comments/" + payload.comment_id)
        .update(updateObj)
        .then(data => {})
        .catch(error => {
          console.log(error);
        });
    },
    addReply(context, payload) {
      const user = context.getters.user;
      const newReply = {
        user_id: user.id,
        user_name: user.username,
        date: payload.date.toISOString(),
        reply: payload.reply
      };
      firebase
        .database()
        .ref("/meetups/" + payload.meetup_id)
        .child("/posts/" + payload.post_id)
        .child("/comments/" + payload.comment_id)
        .child("/replies/")
        .push(newReply)
        .then(data => {})
        .catch(error => {
          console.log(error);
        });
    },
    updateReply(context, payload) {
      const updateObj = {};
      if (payload.reply) {
        updateObj.reply = payload.reply;
      }
      // console.log(
      //   "update \nmeetup: " +
      //     payload.meetup_id +
      //     "\ncomment: " +
      //     payload.comment_id +
      //     "\nreplyID: " +
      //     payload.reply_id +
      //     "\nreply: " +
      //     updateObj.reply
      // );
      firebase
        .database()
        .ref("/meetups/" + payload.meetup_id)
        .child("/posts/" + payload.post_id)
        .child("/comments/" + payload.comment_id)
        .child("/replies/" + payload.reply_id)
        .update(updateObj)
        .then(data => {})
        .catch(error => {
          console.log(error);
        });
    }
  },
  getters: {}
};
export default Discussion;
