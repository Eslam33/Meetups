<template>
  <v-footer
    height="auto"
    color="primary lighten-1"
  >
  
    <v-layout
      justify-center
      row
      wrap
    >
      <v-btn
        v-for="link in links"
        :key="link.title"
        color="white"
        flat
        round
        router
        :to="link.link"
      >
        {{ link.title }}
      </v-btn>
      <v-flex
        primary
        lighten-2
        py-3
        text-xs-center
        white--text
        xs12
      >
        &copy;2018 — <strong>Vuetify</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</template>
<script>
export default {
  data() {
    return {
      links: [
        { title: "About Us", link: "/about" },
         { title: "Be Sponsor", link: "/about" },
         { title: "Support Us", link: "/about" },
        // { title: "Blog", link: "/" },
        { title: "Contact Us", link: "/contactus" }
      ]
    };
  }
};
</script>
