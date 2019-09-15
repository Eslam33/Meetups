<template>
  <v-container>
    <!--
      <v-layout row v-if="error">
        <v-flex xs12 sm6 offset-sm3>
          <app-alert
          @dismissed="onDismissed"
          :text="error.message"
          >
          </app-alert>
        </v-flex>
      </v-layout>
    -->
    <v-layout v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loading"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row v-else>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="sendMessage">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="message"
                      label="Message"
                      id="message"
                      multi-line
                      v-model="message"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-btn
                      type="submit"
                      class="primary"
                      :disabled="loading || !formIsValid"
                      :loading="loading"
                    >
                      Send Message
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      message: ""
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    formIsValid() {
      return this.email !== "" && this.message !== "";
    }
  },
  methods: {
    sendMessage() {
      //console.log( this.email+'//'+this.message);
      const messsageData = {
        email: this.email,
        message: this.message
      };
      this.$store.dispatch("sendCompliment", messsageData);
      this.email = "";
      this.message = "";
    }
  }
};
</script>
