<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-select
          v-model="selectedCategory"
          :items="items"
          box
          label="Filtered By Category"
          solo
        >
        </v-select>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-text-field
          name="search"
          label="Search About Meetups"
          id="search"
          v-model="searchText"
          required
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout
      row
      wrap
      v-for="meetup in filteredList"
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
      selectedCategory: "",
      searchText: ""
    };
  },
  computed: {
    meetups() {
      return this.$store.getters.loadedMeetups;
    },
    filteredListByCategory() {
      if (this.selectedCategory === "") {
        return this.meetups;
      }
      return this.meetups.filter(meetup => {
        return meetup.category === this.selectedCategory;
      });
    },
    filteredList() {
      return this.filteredListByCategory.filter(meetup => {
        return meetup.title
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
      });
    }
  }
};
</script>
