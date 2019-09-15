import * as firebase from "firebase";

const Chat = {
  state: {
    chatMessages: []
  },
  mutations: {
    setChatMessages(state, payload) {
      state.chatMessages = payload;
    }
  },
  actions: {
    createChatChannel(context, payload) {
      const users = context.getters.users;
      let currentUser = {
        id: payload.userId,
        username: payload.username
      };

      for (let key in users) {
        let otherUser = users[key];
        console.log(
          "welcomeee master" + currentUser.id + "\n" + otherUser.username
        );
        let members = [];
        members[currentUser.id] = { username: currentUser.username };
        members[otherUser.id] = { username: otherUser.username };
        const newChat = {
          members
        };
        firebase
          .database()
          .ref("chats")
          .push(newChat)
          .then(data => {
            console.log("Now chatID: " + data.key);
            context.dispatch("activeChatChannel", {
              chatId: data.key,
              currentUsername: currentUser.username,
              currentUserId: currentUser.id,
              otherUsername: otherUser.username,
              otherUserId: otherUser.id
            });
          })
          .catch(error => {});
        //////////////////////////
      }
    },
    activeChatChannel(context, payload) {
      firebase
        .database()
        .ref("users")
        .child(payload.currentUserId)
        .child("chats")
        .child(payload.chatId)
        .set({
          //user_id: currentUser.id,
          action: "date",
          otherUser: payload.otherUsername
        })
        .then(data => {
          console.log("El7");

          firebase
            .database()
            .ref("users")
            .child(payload.otherUserId)
            .child("chats")
            .child(payload.chatId)
            .set({
              //user_id: currentUser.id,
              action: "date",
              otherUser: payload.currentUsername
            })
            .then(data => {
              console.log("El72");
            })
            .catch(error => {});
        })
        .catch(error => {});
      //////////////////

      console.log("-------------------");
    },
    setaChatAtivation(context, payload) {
      firebase
        .database()
        .ref("/chats/")
        .once("value")
        .then(data => {
          const obj = data.val();
          for (let key in obj) {
            console.log(" chatID: " + key + "\n");
            let members = obj[key].members;
            let twoMembers = [];
            let count = 0;
            for (let ukey in members) {
              twoMembers[count] = members[ukey].username;
              count++;
            }
            count = 1;
            for (let ukey in members) {
              console.log(" member_: " + ukey + "\t" + members[ukey].username);
              firebase
                .database()
                .ref("users")
                .child(ukey)
                .child("chats")
                .child(key)
                .set({
                  //user_id: currentUser.id,
                  action: "date",
                  otherUser: twoMembers[count]
                })
                .then(data => {
                  console.log("El7");
                })
                .catch(error => {});
              //////////////////
              count--;
            }
            console.log("-------------------");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    sendMessage(context, payload) {
      let chatId = payload.chatId;
      const message = {
        user: payload.username,
        content: payload.content,
        date: payload.date
      };
      // console.log(
      //   "Send sucessfully \n" +
      //     message.user +
      //     "\n" +
      //     message.content +
      //     "\n" +
      //     message.date +
      //     "\n" +
      //     chatId
      // );
      firebase
        .database()
        .ref("chats-messages")
        .child(chatId)
        .child("messages")
        .push(message)
        .then(data => {})
        .catch(error => {
          console.log(error);
        });
    },
    loadChatMessages(context, payload) {
      firebase
        .database()
        .ref("chats-messages")
        .child(payload.chatId)
        .child("messages")
        .on("value", function(snapshot) {
          context.commit("setChatMessages", snapshot.val());
        });
    }
  },
  getters: {
    chatMessages(state) {
      return state.chatMessages;
    }
  }
};
export default Chat;
