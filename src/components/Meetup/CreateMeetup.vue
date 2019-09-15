<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3> <h4>Create a new Meetup</h4> </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-select
                v-model="selectedCategory"
                :items="items"
                box
                label="Select Category"
                solo
              >
              </v-select>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised class="primary" @click="onPickFile"
                >Upload Image</v-btn
              >
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"
              />
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-progress-linear v-model="uploadPercentage"></v-progress-linear>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="uploadedImageUrl" height="150" />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                multi-line
                v-model="description"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3> <h4>Choose a Data & Time</h4> </v-flex>
          </v-layout>
          <v-layout row class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="date"> </v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" :disabled="!formIsValid" type="submit"
                >Create Meetup</v-btn
              >
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
        "Arts",
        "Career & Business",
        "Fashion & Beauty",
        "Photography",
        "Learning",
        "Music",
        "Sports & Fitness",
        "Health",
        "Language & culture",
        "Book clubs",
        "Dance",
        "Social",
        "Family",
        "Film",
        "Food & Drink",
        "Hobbies"
      ],
      title: "",
      location: "",
      imageUrl: "",
      description: "",
      selectedCategory: "",
      image: null,
      date: null,
      time: new Date()
      // uploadedImageUrl: ""
    };
  },
  created() {
    this.$store.dispatch("clearImageUploaded");
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.uploadedImageUrl !== "" &&
        this.description !== "" &&
        this.selectedCategory !== ""
      );
    },
    submittableDateTime() {
      const date = new Date(this.date);
      if (typeof this.time === "string") {
        let hours = this.time.match(/^(\d+)/)[1];
        const minutes = this.time.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.getMinutes());
      }
      return date;
    },
    dateNow() {
      const dateNow = new Date();
      return dateNow;
    },
    user() {
      return this.$store.getters.user;
    },
    uploadPercentage() {
      return this.$store.getters.uploadPercentage;
    },
    uploadError() {
      return this.$store.getters.upload_error;
    },
    uploadedImageUrl() {
      return this.$store.getters.uploadedImageUrl;
    }
  },
  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        imageUrl: this.uploadedImageUrl,
        description: this.description,
        category: this.selectedCategory,
        date: this.submittableDateTime
      };
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push("/meetups");
      //send notifications to followers of user
      let followersArray = [];
      const followers = this.user.followers;
      for (let key3 in followers) {
        followersArray.push(followers[key3].user_id);
      }
      this.$store.dispatch("sendNotifications", {
        selectedUsersArray: followersArray,
        date: this.dateNow,
        notification: this.user.username + " has created New Meetup",
        url: "/" + this.user.username + "/" + this.user.id
      });
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const file = event.target.files[0];
      this.$store.dispatch("uploadImage", file).then(() => {
        //  this.imageUrl = this.$store.getters.uploadedImageUrl;
        //console.log("isa: " + this.imageUrl);
      });
    }
  }
};
</script>
