<template>
    <v-app :style="{ background: $vuetify.theme.themes.dark.background}">
      <Navbar/>
      <v-container fluid class="remove-top-espace">
        <!--<v-snackbar 
                v-for="(snackbar, index) in allNotifications "
                :key="index"
                :timeout="-1"
                :value="true"
                relative
                middle
                top
                :color="snackbar.color"
                elevation="24"
                v-model="snackbar.show"
              >
                {{snackbar.text}}
                <template >
                  <v-btn
                    color="gold"
                    text
                    @click="removeNotification(index)"
                  >
                    {{ $t('snack.close') }}
                  </v-btn>
                </template>
                            
        </v-snackbar>-->
  
        <router-view></router-view> 
  
      </v-container>
      
       
    </v-app>
   
  </template>
  
  <script>
  
  import Navbar from './Navbar.vue';
  //import Footer from './Footer.vue';
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    name: 'AppLayout',
  
    components: {
     Navbar,
     //Footer,
    },
  
    data: () => ({}),
  
    created() {
      this.checkUserState();
      //this.checkLocal();
    },
  
    computed: {
      ...mapGetters({
        //allNotifications: 'application/notifications'
      })
    },
     
    methods: {
      ...mapActions({
        checkUserState: 'user/setLoggedInState',
        //checkLocal: 'lang/setLangState',
        //removeNotification: 'application/removeNotification'
      })
    },
  
    mounted() {
      //this.$store.dispatch('user/me');
    },
  
  };
  </script>
  
  <style >
    .remove-top-espace{
      margin-top: -65px;
    }
  </style>
  