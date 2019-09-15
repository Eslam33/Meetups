<template>
  <div>
    <v-dialog
      v-if="userIsAuthenticated"
      width="350px"
      v-model="interestedListDialog"
    >
      <v-btn accent slot="activator" class="secondary">Interested-List</v-btn>
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title class="blue white--text"
                ><span class="headline">Choose Interested-List</span>
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          {{ selectedCategories }} ////////////////{{ selectedSubcategories }}
          <v-layout row wrap>
            <v-flex xs12 class="text-xs-left  scrollable">
              <v-card>
                <v-card-title
                  xs12
                  class="text-xs-left"
                  v-for="(item, index) in interestedList"
                  :key="index"
                >
                  <h2>
                    <input
                      type="checkbox"
                      :id="index"
                      :value="index"
                      v-model="selectedCategories"
                    />
                    <label :for="index"> {{ item.categoryName }}</label>
                  </h2>
                  <v-spacer></v-spacer>

                  <v-flex xs12>
                    <v-card>
                      <v-card-title
                        v-for="(subitem, index2) in item.subcategories"
                        :key="index2"
                      >
                        <h4>
                          <input
                            type="checkbox"
                            :id="index2"
                            :value="index2"
                            v-model="selectedSubcategories"
                          />
                          <label :for="index2">
                            {{ subitem.subcategoryName }}</label
                          >
                        </h4>
                      </v-card-title>
                    </v-card>
                  </v-flex>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-actions>
                <v-btn
                  flat
                  class="blue--text darken-1"
                  @click="interestedListDialog = false;"
                  >Close</v-btn
                >
                <v-btn
                  class="green--text darken-1"
                  flat
                  @click="saveInterestedList"
                  >Submit</v-btn
                >
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog width="350px" v-else v-model="doAlert">
      <v-btn accent slot="activator" class="info">Interested-List</v-btn>

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
  data() {
    return {
      interestedListDialog: false,
      searchText: "",
      selectedCategories: [],
      selectedSubcategories: [],
      selected: [],

      doAlert: false
    };
  },
  created() {
    this.$store.dispatch("loadedCategories");
  },
  watch: {
    selectedCategories(value) {
      if (value !== undefined && value !== null) {
        let arr = [];
        arr.push(value);
        console.log("category: " + Number(arr));
      }
    },
    selectedSubcategories(value) {
      if (value !== undefined && value !== null) {
        console.log("subcategory: " + value);
      }
    }
  },
  computed: {
    interestedList() {
      return this.$store.getters.categories;
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
    saveInterestedList() {
      // if (this.formIsValid) {
      //   return;
      // }
      console.log("save interested list");
      this.$store.dispatch("createCategoriesList");
      //   this.interestedListDialog = false;
      //   this.$store.dispatch("sendNotifications", {
      //     selectedUsersArray: this.selected,
      //     date: this.dateNow,
      //     notification: this.username + " invite you for meetup",
      //     url: "/meetups/" + this.meetupId
      //   });
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
