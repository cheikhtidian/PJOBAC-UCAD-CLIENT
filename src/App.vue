<template>
  <v-app>
    <v-app-bar
      app
      color="white"
      
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          rounded
          lazy-src=""
          :src="require('./assets/logo_ucad.png')"
          transition="scale-transition"
          width="40"
        />
        <h1 class="display-1  mb-0">
          <router-link :to="{name:'home'}"><span class="text black--text hidden-sm-and-down"> PJOBAC-UCAD</span></router-link>
        </h1>
          <!-- <router-link :to="{name:'about'}"><span class="text black--text "> A propos</span></router-link>-->
      </div>

      <v-spacer></v-spacer>
      <v-btn >
        <router-link :to="{name:'login'}" class="text">Connexion</router-link>
      </v-btn>
      <v-btn text>
        <router-link :to="{name:'register'}" class="text"><span class="text black--text hidden-sm-and-down">Inscription</span></router-link>
      </v-btn>
    </v-app-bar>
    <v-main>
     
      <router-view/>
    </v-main>
    
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',

  components: {
    
  },


  data: () => ({
    //
  }),

  created() {
    this.checkUserState().then(() =>{
      if(this.isLoggedIn){
        this.me();
      }
    });

    this.checkLocal();
  },

  computed: {
    ...mapGetters({
      isLoggedIn: 'user/loggedIn',
      allNotifications: 'application/notifications'
    })
  },

  methods: {
    ...mapActions({
      checkUserState: 'user/setLoggedInState',
      checkLocal: 'lang/setLangState',
      removeNotification: 'application/removeNotification',
      me: 'user/me'
    }),
    updateNotification(show, index){
      if(!show){
        this.removeNotification(index);
      }
    }
  }
};
</script>

<style>

 router-link, a{
    text-decoration: none !important;
 }
</style>