<template>
      <div>
         <v-container fluid class="mt-0">
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Authenticiation</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form ref="loginForm" :value="formValid">
                           
                           <v-text-field
                              prepend-inner-icon="mdi-account"
                              name="username"
                              label="Nom utilisatuer"
                              type="text"
                              v-model="user.username"
                           ></v-text-field>

                           <v-text-field
                              id="password"
                              prepend-inner-icon="mdi-lock"
                              name="password"
                              label="Mot de passe"
                              :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                              :rules="[rules.required, rules.min]"
                              :type="showPwd ? 'text' : 'password'"
                              @click:append="showPwd = !showPwd"
                              v-model="user.password"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-btn text small class="small">
                          <!-- {{ $t('forms.auth.forgotpwd') }} -->
                          <router-link :to="{name:'forgotPassword'}" class="text">Mot de passe oublié</router-link>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="handleLogin">Se connecter</v-btn>
                     </v-card-actions>
                  </v-card>

                  <v-card class="mt-1 flat">
                      <v-card-actions>
                        <span text small class="small">
                          {{ new Date().getFullYear() }} — <strong>Office du Bac.</strong>
                        </span>
                        <v-spacer></v-spacer>
                     </v-card-actions>
                  </v-card>
                  
               </v-flex>
            </v-layout>
         </v-container>
      </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Login',
  data () {
    return {
      user: {
        username:'',
        password:''
      },
      showPwd: false,
      rules: {
          required: value => !!value || 'Champ obligatoire.',
          min: v => v.length >= 6 || '6 cractére au moins',
          //emailMatch: () => (`The email and password you entered don't match`),
      },
      formValid: false,
    }
  },
  created () {
    //this.checkLocal();
  },
  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedIn'
    }),
    /* before mapGetters
    logedIn() {
      return this.$store.getters['user/loggedIn'];
    }*/
  },
  methods: {
    ...mapActions({
      login: 'user/login',
      //checkLocal: 'lang/setLangState',
      addNotification: 'application/addNotification'
    }),

    handleLogin(){
      console.log(this.user);
      //console.log(JSON.stringify(this.user));
      if(this.$refs.loginForm.validate){
          this.login(this.user)
          .then( () => {
            this.$router.push( { name: 'dashboard'});
            this.addNotification({
                show: true,
                text:  "Bienvenue"+' '+this.user.username,//this.$i18n.t('welcome')+' '+this.user.username,
                color: 'black'
              });
          });
        
        //console.log(this.user.username);
        //console.log(event, this.$refs.loginForm.validate);
      }
    }
  }
}
</script>
