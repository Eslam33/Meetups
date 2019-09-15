<template>
  <v-dialog width="350px"  >
    <v-btn fab accent slot="activator">
      <v-icon>share</v-icon>
    </v-btn>
    <v-card>
      <v-container>
       <social-sharing :url="url" inline-template>
         <v-list>
            <v-list-tile >
              <v-list-tile-title>
                <network network="facebook">
                  <i class="fa fa-fw fa-facebook"></i> Facebook
                </network>
              </v-list-tile-title>
            </v-list-tile>
            <v-list-tile >
              <v-list-tile-title>
                <network network="googleplus">
                  <i class="fa fa-fw fa-google-plus"></i> Google +
                </network>
              </v-list-tile-title>
            </v-list-tile>
            <v-list-tile >
              <v-list-tile-title>
                <network network="linkedin">
                  <i class="fa fa-fw fa-linkedin"></i> LinkedIn
                </network>
              </v-list-tile-title>
            </v-list-tile>
      
           </v-list>
          </social-sharing>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>

export default {
  props: ['meetupId'],
  data() {
    return {
      url: 'https://k147ljnqx3.codesandbox.io/meetups/'+this.meetupId
    };
  },
  methods: {}
};
</script>
