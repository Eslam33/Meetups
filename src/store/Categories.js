import * as firebase from "firebase";

const Categories = {
  state: {
    categories: []
    // categories: [
    //   {
    //     categoryName: "Programming",
    //     subcategories: [
    //       {
    //         subcategoryName: "web"
    //       },
    //       {
    //         subcategoryName: "anroid"
    //       },
    //       {
    //         subcategoryName: "ios"
    //       }
    //     ]
    //   },
    //   {
    //     categoryName: "sports",
    //     subcategories: [
    //       {
    //         subcategoryName: "football"
    //       },
    //       {
    //         subcategoryName: "basketball"
    //       }
    //     ]
    //   },
    //   {
    //     categoryName: "Economy"
    //   }
    // ]
  },
  mutations: {
    setLoadedCategories(state, payload) {
      state.categories = payload;
    }
  },
  actions: {
    loadedCategories(context, payload) {
      firebase
        .database()
        .ref("categories")
        .once("value")
        .then(data => {
          const obj = data.val();
          context.commit("setLoadedCategories", obj);
        })
        .catch(error => {
          console.log(error);
        });
    },
    createCategoriesList(context, payload) {
      console.log("inside action interested list");
      const categories = context.getters.categories;
      for (let key in categories) {
        console.log(
          "inside loop categories  " +
            key +
            " ////// " +
            categories[key].categoryName
        );
        firebase
          .database()
          .ref("/categories/")
          .push({
            categoryName: categories[key].categoryName
          })
          .then(data => {
            const categoryId = data.key;
            console.log("categoryID:  " + categoryId);
            const subcategories = categories[key].subcategories;
            for (let skey in subcategories) {
              console.log(
                "inside sub category  " +
                  skey +
                  " ///////// " +
                  subcategories[skey].subcategoryName
              );
              firebase
                .database()
                .ref("/categories/")
                .child(categoryId)
                .child("subcategories")
                .push({
                  subcategoryName: subcategories[skey].subcategoryName
                })
                .then(data2 => {
                  const subcategoryId = data2.key;
                  console.log("sub-categoryID:  " + subcategoryId);
                })
                .catch(error => {
                  console.log(error);
                });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    addInterestedUser(context, payload) {
      // const user = context.getters.user;
      // firebase
      //   .database()
      //   .ref("/categories/" + payload.categoryId)
      //   .child("/registeredUsers/" + user.id)
      //   .set({
      //     username: user.username
      //   }) //user.id
      //   .then(data => {
      //     const key = data.key;
      //     context.commit("addRegisteredUser", {
      //       meetupId: payload,
      //       userId: user.id,
      //       fbKey: key
      //     });
      //     context.commit("setLoading", false);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     context.commit("setLoading", false);
      //   });
    },
    interestUserForCategory(context, payload) {
      // const user = context.getters.user;
      // firebase
      //   .database()
      //   .ref("/users/" + user.id)
      //   .child("/categories/")
      //   .push(payload.categoryId)
      //   .then(data => {
      //     dispatch("addInterestedUser", payload);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     commit("setLoading", false);
      //   });
    }
  },
  getters: {
    categories(state) {
      return state.categories;
    }
  }
};
export default Categories;
