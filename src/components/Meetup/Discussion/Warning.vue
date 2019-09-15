<template>
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
</template>

<script>
export default {
  data() {
    return {
      doAlert: false
    };
  }
};
</script>
