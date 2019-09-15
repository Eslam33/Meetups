<template>
  <v-dialog width="550px" persistent v-model="settingDialog">
    <v-btn fab accent slot="activator"> <v-icon>settings</v-icon> </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 sm6 class="text-xs-center text-sm-right">
            <v-card-title>Account Setting</v-card-title>
          </v-flex>
          <v-flex xs12 sm6 class="text-xs-center text-sm-right">
            <v-btn
              fab
              accent
              slot="activator"
              @click="settingDialog = false;"
              class="secondary"
            >
              <v-icon>close</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>
        <form @submit.prevent="onSave">
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-text>
                <v-text-field
                  name="name"
                  label="Username"
                  id="name"
                  v-model="editedName"
                  required
                >
                </v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-text>
                <v-text-field
                  name="imageUrl"
                  label="Image URL"
                  id="image-url"
                  v-model="imageUrl"
                  required
                >
                </v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="50" circle />
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-text>
                <v-text-field
                  name="phone"
                  label="Pnone Number"
                  id="phone"
                  v-model="editedPhoneNumber"
                  required
                ></v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-text>
                <v-text-field
                  name="city"
                  label="City"
                  id="city"
                  v-model="editedCity"
                  required
                >
                </v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-text>
                <v-text-field
                  name="carrer"
                  label="Your Carrer"
                  id="carrer"
                  multi-line
                  v-model="editedCarrer"
                  required
                >
                </v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-actions>
                <v-btn
                  flat
                  class="blue--text darken-1"
                  @click="settingDialog = false;"
                  >Close</v-btn
                >
                <v-btn
                  flat
                  type="submit"
                  :disabled="loading"
                  :loading="loading"
                  class="blue--text darken-1"
                >
                  Save
                  <span slot="loader" class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
                </v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </form>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["user"],
  data() {
    return {
      settingDialog: false,
      editedName: this.user.username,
      imageUrl: this.user.imageUrl,
      editedPhoneNumber: this.user.phone,
      editedCity: this.user.city,
      editedCarrer: this.user.career
    };
  },

  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },

    loading() {
      return this.$store.getters.loading;
    }
  },

  methods: {
    onSave() {
      if (
        this.editedName.trim() === "" ||
        this.imageUrl.trim() === "" ||
        this.editedPhoneNumber.trim() === "" ||
        this.editedCity.trim() === "" ||
        this.editedCarrer.trim() === ""
      ) {
        return;
      }

      this.$store.dispatch("updateUserData", {
        id: this.user.id,
        username: this.editedName,
        imageUrl: this.imageUrl,
        phone: this.editedPhoneNumber,
        city: this.editedCity,
        career: this.editedCarrer
      });
      this.settingDialog = false;
    }
  }
};
</script>
