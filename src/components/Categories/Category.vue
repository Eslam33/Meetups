<template>
  <v-layout>
    <v-flex xs12 sm12>
      <v-card>
        <v-container grid-list-sm fluid>
          <v-layout row wrap>
            <v-flex v-for="n in 9" :key="n" xs4 d-flex>
              <v-card flat tile class="d-flex">
                <v-parallax
                  dark
                  :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                  aspect-ratio="2"
                  class="grey lighten-2"
                  height="150"
                  width="100"
                >
                  <v-layout align-center column justify-center>
                    <h1 class="display-2 font-weight-thin mb-3">Vuetify.js</h1>
                    <h4 class="subheading">Build your application today!</h4>
                  </v-layout>
                  <v-layout
                    slot="placeholder"
                    fill-height
                    align-center
                    justify-center
                    ma-0
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-layout>
                </v-parallax>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>
