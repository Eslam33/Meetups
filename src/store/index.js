import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";
import VuexPersist from "vuex-persist";

import DiscussionModule from "./Discussion";
import ChatModule from "./Chat";
import CategoriesModule from "./Categories";

Vue.use(Vuex);
const vuexLocalStorage = new VuexPersist({
  key: "vuex"
});
//https://retireinvalencia.com/wp-content/uploads/2017/02/Valencia-beach-for-retirement-1-681x456.jpg
export const store = new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  modules: {
    discussionmodule: DiscussionModule,
    chatmodule: ChatModule,
    categoriesmodule: CategoriesModule
  },
  state: {
    loadedMeetups: [],
    user: null,
    users: [],
    loading: false,
    error: null,
    meetupRating: "",
    meetupReviews: [],
    uploadPercentage: 0,
    upload_error: null,
    uploaded_image_url: ""
  },
  mutations: {
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    updateMeetup(state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id;
      });
      if (payload.title) {
        meetup.title = payload.title;
      }
      if (payload.description) {
        meetup.description = payload.description;
      }
      if (payload.date) {
        meetup.date = payload.date;
      }
    },
    deleteMeetup(state, payload) {
      state.loadedMeetups = state.loadedMeetups.filter(meetup => {
        return meetup.id !== payload.id;
      });
    },
    updateUser(state, payload) {
      const user = state.user;
      if (payload.username) {
        user.username = payload.username;
      }
      if (payload.imageUrl) {
        user.imageUrl = payload.imageUrl;
      }
      if (payload.phone) {
        user.phone = payload.phone;
      }
      if (payload.city) {
        user.city = payload.city;
      }
      if (payload.career) {
        user.career = payload.career;
      }
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setUsers(state, payload) {
      state.users = payload;
    },
    setMeetupRating(state, payload) {
      state.meetupRating = payload;
    },
    setMeetupReviews(state, payload) {
      state.meetupReviews = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    registerUserForMeetup(state, payload) {
      const id = payload.id;
      if (
        state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0
      ) {
        return;
      }
      state.user.registeredMeetups.push(id);
      state.users.push({
        id: id,
        username: "",
        city: "",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/330px-User_icon_2.svg.png",
        career: "",
        phone: ""
      });
      state.user.fbKeys[id] = payload.fbKey;
      // const meetup = state.loadedMeetups.findIndex(
      //   meetup => meetup.id === payload.id
      // );
      // meetup.totalRegisteredUsers += 1;
    },
    unregisterUserFromMeetup(state, payload) {
      const registeredMeetups = state.user.registeredMeetups;
      registeredMeetups.splice(
        registeredMeetups.findIndex(meetup => meetup.id === payload),
        1
      );
      Reflect.deleteProperty(state.user.fbKeys, payload);
    },
    plusOne(state, payload) {
      const meetup_ref = state.loadedMeetups.find(meetup => {
        return meetup.id === payload;
      });
      meetup_ref.totalRegisteredUsers += 1;
    },
    addRegisteredUser(state, payload) {
      const meetup_ref = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.meetupId;
      });
      meetup_ref.registeredUsers.push({
        fbKey: payload.fbKey,
        userId: payload.userId
      });
    },
    removeRegisteredUser(state, payload) {
      const meetup_ref = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.meetupId;
      });
      meetup_ref.registeredUsers = meetup_ref.registeredUsers.filter(item => {
        return item.userId !== payload.userId;
      });
    },
    minusOne(state, payload) {
      const meetup_ref = state.loadedMeetups.find(meetup => {
        return meetup.id === payload;
      });
      meetup_ref.totalRegisteredUsers -= 1;
    },
    setUploadPercentage(state, payload) {
      state.uploadPercentage = payload;
    },
    setUploadError(state, payload) {
      state.upload_error = payload;
    },
    clearUploadError(state) {
      state.upload_error = null;
    },
    setUploadedImageUrl(state, payload) {
      state.uploaded_image_url = payload;
    }
  },
  actions: {
    loadMeetups(context) {
      context.commit("setLoading", true);
      firebase
        .database()
        .ref("meetups")
        .once("value")
        .then(data => {
          const meetups = [];
          const obj = data.val();
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              category: obj[key].category,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              location: obj[key].location,
              creatorId: obj[key].creatorId,
              totalRegisteredUsers: obj[key].totalRegisteredUsers,
              registeredUsers: obj[key].registeredUsers,
              posts: obj[key].posts
            });
          }
          context.commit("setLoadedMeetups", meetups);
          context.commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          context.commit("setLoading", false);
        });
    },
    createMeetup(context, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        category: payload.category,
        date: payload.date.toISOString(),
        creatorId: this.getters.user.id,
        totalRegisteredUsers: 0,
        registeredUsers: []
      };
      firebase
        .database()
        .ref("meetups")
        .push(meetup)
        .then(data => {
          const key = data.key;
          context.commit("createMeetup", {
            ...meetup,
            id: key
          });
        })
        .catch(error => {
          console.log(error);
        });
      // context.commit("createMeetup", meetup);
      // Reach out to firebase and store it
    },
    clearImageUploaded(context) {
      context.commit("setUploadedImageUrl", "");
    },
    uploadImage(context, payload) {
      //get file =>  payload : file-object
      //create storage reference
      const ext = payload.name.slice(payload.name.lastIndexOf("."));
      var StorageRef = firebase
        .storage()
        .ref("sweet_gifs/" + payload.name + "." + ext);
      // upload file
      var task = StorageRef.put(payload);
      //upload progress bar
      task.on(
        "state_changed",
        function progress(snapshot) {
          var uploading_Percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          context.commit("setUploadPercentage", uploading_Percentage);
        },
        function error(err) {
          console.log("upload-error" + err);
          context.commit("setUploadError", err);
        },
        function complete() {
          task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log("File available at", downloadURL);
            context.commit("setUploadedImageUrl", downloadURL);
          });
          console.log("upload is complete ");
        }
      );
    },
    updateMeetup(context, payload) {
      context.commit("setLoading", true);
      const updateObj = {};
      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.description) {
        updateObj.description = payload.description;
      }
      if (payload.date) {
        updateObj.date = payload.date;
      }
      firebase
        .database()
        .ref("meetups")
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          context.commit("setLoading", false);
          context.commit("updateMeetup", payload);
        })
        .catch(error => {
          console.log(error);
          context.commit("setLoading", false);
        });
    },
    deleteMeetup(context, payload) {
      context.commit("setLoading", true);
      firebase
        .database()
        .ref("meetups")
        .child(payload.id)
        .remove()
        .then(() => {
          context.commit("deleteMeetup", payload);

          context.commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          context.commit("setLoading", false);
        });
    },
    reviewMeetup(context, payload) {
      const user = context.getters.user;
      let reviewObj = {
        user_name: user.username,
        rating: payload.rating,
        date: payload.date.toISOString()
      };
      if (payload.comment) {
        reviewObj.comment = payload.comment;
      }
      firebase
        .database()
        .ref("reviews")
        .child(payload.meetup_id)
        .child(user.id)
        .set(reviewObj)
        .then(data => {
          const key = data.key;
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadMeetupReviews(context, payload) {
      firebase
        .database()
        .ref("reviews")
        .child(payload.meetup_id)
        .once("value")
        .then(data => {
          let rating = 0;
          let n = 0;
          const reviews = [];
          const obj = data.val();
          for (let key in obj) {
            rating += obj[key].rating;
            n += 1;
            if (obj[key].comment) {
              reviews.push({
                user_name: obj[key].user_name,
                date: obj[key].date,
                comment: obj[key].comment
              });
            }
          }

          context.commit("setMeetupRating", rating / n);
          context.commit("setMeetupReviews", reviews);
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSignup(context, payload) {
      context.commit("setLoading", true);
      context.commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(userData => {
          // handle exception of undefined userData.uid
          if (userData.uid === null || userData.uid === undefined) {
            userData.uid = firebase.auth().currentUser.uid;
          }
          console.log("auth is done" + userData.uid);

          const newUser = {
            email: payload.email,
            username: payload.username
          };
          firebase
            .database()
            .ref("/users/" + userData.uid)
            .set({
              username: payload.username,
              email: payload.email
            })
            .then(message => {
              context.commit("setLoading", false);
              context.commit("setUser", {
                id: userData.uid,
                username: payload.username,
                email: payload.email,
                registeredMeetups: [],
                fbKeys: {}
              });
              context.dispatch("fetchUserData");
              context.dispatch("fetchUsersData");
              context.dispatch("createChatChannel", {
                userId: userData.uid,
                username: payload.username
              });
            })
            .catch(er => {
              console.log(er);
            });
        })
        .catch(error => {
          context.commit("setLoading", false);
          context.commit("setError", error);
          console.log("Error" + error);
        });
    },
    onSignin(context, payload) {
      context.commit("setLoading", true);
      context.commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          context.commit("setLoading", false);
          context.commit("setUser", {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {}
          });
          context.dispatch("fetchUserData");
          context.dispatch("fetchUsersData");
        })
        .catch(error => {
          context.commit("setLoading", false);
          context.commit("setError", error);
          console.log("Error" + error);
        });
    },
    authSignin(context, payload) {
      context.commit("setUser", {
        id: payload.uid,
        registeredMeetups: [],
        fbKeys: {}
      });
      //context.dispatch("fetchUserData");
    },
    clearError({ commit }) {
      commit("clearError");
    },
    logout(context) {
      firebase.auth().signOut();
      context.commit("setUser", null);
    },
    addRegisteredUser(context, payload) {
      //payload => meetupId
      const user = context.getters.user;
      firebase
        .database()
        .ref("/meetups/" + payload)
        .child("/registeredUsers/" + user.id)
        .set({
          username: user.username
        }) //user.id
        .then(data => {
          const key = data.key;
          context.commit("addRegisteredUser", {
            meetupId: payload,
            userId: user.id,
            fbKey: key
          });
          context.commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          context.commit("setLoading", false);
        });
    },
    plusOne(context, payload) {
      context.commit("setLoading", true);
      const userId = context.getters.user.id;
      const meetup_ref = context.getters.loadedMeetups.find(meetup => {
        return meetup.id === payload;
      });

      firebase
        .database()
        .ref("meetups")
        .child(meetup_ref.id)
        .update({
          totalRegisteredUsers: meetup_ref.totalRegisteredUsers + 1
          //  registeredUsers: [meetup_ref.registeredUsers, userId]
        })
        .then(() => {
          context.commit("plusOne", payload);
          context.commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          context.commit("setLoading", false);
        });
    },
    registerUserForMeetup({ commit, getters, dispatch }, payload) {
      commit("setLoading", true);
      const user = getters.user;
      firebase
        .database()
        .ref("/users/" + user.id)
        .child("/registrations/")
        .push(payload)
        .then(data => {
          commit("registerUserForMeetup", {
            id: payload,
            fbKey: data.key
          });
          commit("setLoading", false);
          dispatch("plusOne", payload);
          dispatch("addRegisteredUser", payload);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    removeRegisteredUser(context, payload) {
      //payload => meetupId
      console.log("Welcome remove");

      const user = context.getters.user;
      firebase
        .database()
        .ref("/meetups/" + payload + "/registeredUsers/" + user.id)
        .remove()
        .then(() => {
          context.commit("removeRegisteredUser", {
            meetupId: payload,
            userId: user.id
            //fbKey: key
          });
          context.commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          context.commit("setLoading", false);
        });
    },
    minusOne(context, payload) {
      context.commit("setLoading", true);
      // const userId = context.getters.user.id;
      const meetup_ref = context.getters.loadedMeetups.find(meetup => {
        return meetup.id === payload;
      });
      // const registered = meetup_ref.registeredUsers.filter(user => {
      //   return user.id !== userId;
      // });
      firebase
        .database()
        .ref("meetups")
        .child(meetup_ref.id)
        .update({
          totalRegisteredUsers: meetup_ref.totalRegisteredUsers - 1
          //  registeredUsers: registered
        })
        .then(() => {
          context.commit("minusOne", payload);
          context.commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          context.commit("setLoading", false);
        });
    },
    unregisterUserFromMeetup({ commit, getters, dispatch }, payload) {
      commit("setLoading", true);
      const user = getters.user;
      if (!user.fbKeys) {
        return;
      }
      const fbKey = user.fbKeys[payload];
      firebase
        .database()
        .ref("/users/" + user.id + "/registrations/")
        .child(fbKey)
        .remove()
        .then(() => {
          commit("setLoading", false);
          commit("unregisterUserFromMeetup", payload);
          dispatch("minusOne", payload);
          dispatch("removeRegisteredUser", payload);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    fetchUserData({ commit, getters }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("/users/" + getters.user.id)
        .once("value")
        .then(data => {
          const obj = data.val();
          const dataPairs = obj.registrations;
          let registeredMeetups = [];
          let swappedPairs = {};
          for (let key in dataPairs) {
            registeredMeetups.push(dataPairs[key]);
            swappedPairs[dataPairs[key]] = key;
          }
          const userNotifications = [];
          for (let key in obj.notifications) {
            userNotifications.push(obj.notifications[key]);
          }
          //get followers
          let followersArray = [];
          const followers = obj.followers;
          for (let key3 in followers) {
            followersArray.push({
              user_id: key3,
              user_name: followers[key3].user_name
            });
          }
          //get following
          let followingArray = [];
          const following = obj.following;
          for (let key3 in following) {
            followingArray.push({
              user_id: key3,
              user_name: following[key3].user_name
            });
          }
          //get chats
          let chatArray = [];
          const chats = obj.chats;
          for (let key4 in chats) {
            chatArray.push({
              chatId: key4,
              otherUser: chats[key4].otherUser
            });
          }
          const updatedUser = {
            id: getters.user.id,
            username: obj.username,
            city: obj.city,
            imageUrl: obj.imageUrl,
            career: obj.career,
            phone: obj.phone,
            notifications: userNotifications.reverse(),
            followers: followersArray,
            following: followingArray,
            chats: chatArray,
            registeredMeetups: registeredMeetups,
            fbKeys: swappedPairs
          };
          commit("setUser", updatedUser);
          commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    fetchUsersData({ commit, getters }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("/users/")
        .once("value")
        .then(data => {
          const users = [];
          const obj = data.val();
          for (let key in obj) {
            const dataPairs = obj[key].registrations;
            let registeredMeetups = [];
            let swappedPairs = {};
            for (let key2 in dataPairs) {
              registeredMeetups.push(dataPairs[key2]);
              swappedPairs[dataPairs[key2]] = key2;
            }

            users.push({
              id: key,
              username: obj[key].username,
              city: obj[key].city,
              imageUrl: obj[key].imageUrl,
              career: obj[key].career,
              phone: obj[key].phone,
              followers: obj[key].followers,
              following: obj[key].following,
              registeredMeetups: registeredMeetups,
              fbKeys: swappedPairs
            });
          }
          commit("setUsers", users);
          commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    updateUserData(context, payload) {
      context.commit("setLoading", true);

      const updateObj = {};
      if (payload.username) {
        updateObj.username = payload.username;
      }
      if (payload.imageUrl) {
        updateObj.imageUrl = payload.imageUrl;
      }
      if (payload.phone) {
        updateObj.phone = payload.phone;
      }
      if (payload.city) {
        updateObj.city = payload.city;
      }
      if (payload.career) {
        updateObj.career = payload.career;
      }
      firebase
        .database()
        .ref("/users/")
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          context.commit("updateUser", +payload);
          context.commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          context.commit("setLoading", false);
        });
    },
    sendNotifications(context, payload) {
      let newNotification = {
        notification: payload.notification,
        url: payload.url,
        date: payload.date.toISOString()
      };
      for (var index in payload.selectedUsersArray) {
        let userId = payload.selectedUsersArray[index];
        firebase
          .database()
          .ref("users")
          .child(userId)
          .child("notifications")
          .push(newNotification)
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    followUser(context, payload) {
      const currentUser = context.getters.user;
      firebase
        .database()
        .ref("users")
        .child(payload.otherUser_id)
        .child("followers")
        .child(currentUser.id)
        .set({
          //user_id: currentUser.id,
          user_name: currentUser.username
        })
        .then(data => {
          console.log(data);
          firebase
            .database()
            .ref("users")
            .child(currentUser.id)
            .child("following")
            .child(payload.otherUser_id)
            .set({
              //user_id: payload.otherUser_id,
              user_name: payload.otherUser_name
            })
            .then(data => {
              console.log(data);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
    unfollowUser(context, payload) {
      const currentUser = context.getters.user;
      firebase
        .database()
        .ref("users")
        .child(payload.otherUser_id)
        .child("followers")
        .child(currentUser.id)
        .remove()
        .then(data => {
          console.log(data);
          firebase
            .database()
            .ref("users")
            .child(currentUser.id)
            .child("following")
            .child(payload.otherUser_id)
            .remove()
            .then(data => {
              console.log(data);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
    sendCompliment(context, payload) {
      context.commit("setLoading", true);
      firebase
        .database()
        .ref("compliments")
        .push(payload)
        .then(data => {
          context.commit("setLoading", false);
          console.log(data);
        })
        .catch(error => {
          context.commit("setLoading", false);
        });
    },
    clearUploadError(context) {
      context.commit("clearUploadError");
    },
    sendFBMessage(context, payload) {
      // const messenger = new FBMessenger({ token: '<YOUR TOKEN>' })
      // try {
      //   const response = await messenger.sendTextMessage({ id: '<ID>', text: 'Hello' })
      //   console.log(response)
      // } catch (e) {
      //   console.error(e)
      // }
    }
    // activeChatsForUsers(context, payload) {
    //   const users = context.getters.users;
    //   for (let ukey in users) {
    //     let user = users[ukey];
    //     for (let key in users) {
    //       let otherUser = users[key];
    //       //console.log("welcomeee master" + user.id + "\n" + otherUser.username);
    //       let newchat = {
    //         otherUser: otherUser.username
    //       };
    //       firebase
    //         .database()
    //         .ref("users")
    //         .child(user.id)
    //         .child("chats")
    //         .push(newchat)
    //         .then(key2 => {
    //           console.log(
    //             "welcomeee master" + user.id + "\n" + "chat_id: " + key2
    //           );
    //         })
    //         .catch(error => {});
    //     }
    //   }
    // }
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    userCreatedMeetups(state, getters) {
      //const userId = getters.user.id;
      return userId => {
        const allMeetups = getters.loadedMeetups;
        const data = [];
        for (let key in allMeetups) {
          if (allMeetups[key].creatorId === userId) {
            data.push(allMeetups[key]);
          }
        }
        return data;
      };
    },
    userRegisteredMeetups(state, getters) {
      const allMeetups = getters.loadedMeetups;
      const registeredMeetups = getters.user.registeredMeetups;
      const data = [];
      for (let key in registeredMeetups) {
        const meetup = allMeetups.find(meetup => {
          return meetup.id === registeredMeetups[key];
        });
        if (meetup) {
          data.push(meetup);
        }
      }
      return data;
    },
    otherUserRegisteredMeetups(state, getters) {
      return registeredMeetups => {
        const allMeetups = getters.loadedMeetups;
        //const registeredMeetups = registeredMeetups;
        const data = [];
        for (let key in registeredMeetups) {
          const meetup = allMeetups.find(meetup => {
            return meetup.id === registeredMeetups[key];
          });
          if (meetup) {
            data.push(meetup);
          }
        }
        return data;
      };
    },
    loadedMeetup(state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === meetupId;
        });
      };
    },
    registerUsersForMeetup(state) {
      return meetupId => {
        const data = [];
        const meetup_ref = state.loadedMeetups.find(meetup => {
          return meetup.id === meetupId;
        });
        const registered_users = meetup_ref.registeredUsers;
        for (let key in registered_users) {
          data.push({
            fbKey: registered_users[key].fbKey,
            userId: registered_users[key].userId
          });
        }
        return data;
      };
    },
    user(state) {
      return state.user;
    },
    users(state) {
      return state.users;
    },
    meetupRating(state) {
      return state.meetupRating;
    },
    meetupReviews(state) {
      return state.meetupReviews;
    },
    otherUser(state) {
      return userId => {
        return state.users.filter(user => {
          return user.id === userId;
        });
      };
    },

    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    uploadPercentage(state) {
      return state.uploadPercentage;
    },
    upload_error(state) {
      return state.upload_error;
    },
    uploadedImageUrl(state) {
      return state.uploaded_image_url;
    }
  }
});
