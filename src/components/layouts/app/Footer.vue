<template>
    <v-footer
      height="auto"
      color="primary lighten-1"
      padless
      inset
      fixed
      class="mb-2"
    >
      <v-layout
        justify-center
        row
        wrap
      >
      <v-card
        class="flex"
        flat
        tile
        color="black"
        :elevation="10"
      >
  
        <v-card-text class="py-2 white--text text-center">
          &copy; {{ new Date().getFullYear() }} — <strong>UCAD</strong>
        </v-card-text>
      </v-card>
      </v-layout>
    </v-footer>
    <!--<v-footer
      dark
      padless
      app
      inset
    >
      <v-card
        class="flex"
        flat
        tile
        color="black"
        :elevation="10"
      >
  
        <v-card-text class="py-2 white--text text-center">
          &copy; {{ new Date().getFullYear() }} — <strong>UCAD</strong>
        </v-card-text>
      </v-card>
    </v-footer>-->
  </template>
  
  <script>
  export default {
      name: 'Footer'
  }
  </script>
  