<template>
  <v-tabs
    centered
    color="cyan"
    dark
    icons-and-text
  >
    <v-tabs-slider color="yellow"></v-tabs-slider>

    <v-tab v-for="(tab,i) in tabs" :key="i"  >
      {{tab.title}}
      <v-icon>{{ tab.icon}}</v-icon>
    </v-tab>

   

    <v-tab-item
      v-for="(tab,i) in tabs"
      :id="'tab-' + i"
      :key="i"
    >
      <v-card flat>
        <v-card-text>{{ tab.text }}</v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>
<script>
  export default {
    data () {
      return {
        tabs:[  {title: 'About Us' , icon: 'business' , text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do' } ,
                {title: 'Be Sponsor' , icon: 'favorite', text:' eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim'} ,
                {title: 'Support Us' , icon: 'account_box', text:'veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'} ,
        ], 
        text: ' '
      }
    }
  }
</script>
