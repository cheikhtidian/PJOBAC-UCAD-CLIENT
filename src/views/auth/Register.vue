<template>
    <div>
       <v-container fluid class="mt-0">
          <v-layout align-center justify-center>
             <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                   <v-toolbar dark color="primary">
                      <v-toolbar-title>Inscription</v-toolbar-title>
                   </v-toolbar>
                   <v-card-text>
                      <v-form ref="loginForm" :value="formValid">
                         
                        <!--<v-text-field
                            prepend-inner-icon="mdi-account"
                            name="matricule"
                            label="Matricule"
                            type="text"
                            v-model="user.matricule"
                         ></v-text-field>-->
                         <v-text-field
                            prepend-inner-icon="mdi-account"
                            name="prenoms"
                            label="Prénoms"
                            type="text"
                            v-model="user.prenoms"
                         ></v-text-field>
                         <v-text-field
                            prepend-inner-icon="mdi-account"
                            name="nom"
                            label="Nom"
                            type="text"
                            v-model="user.nom"
                         ></v-text-field>
                         <!--Sexe
                         <v-radio-group
                            v-model="user.sexe"
                            inline
                            row
                            >
                            <v-radio
                                label="Homme"
                                value="Homme"
                            ></v-radio>
                            <v-radio
                                label="Femme"
                                value="Femme"
                            ></v-radio>
                            </v-radio-group>

                        <v-text-field
                            prepend-inner-icon="mdi-account"
                            name="telephone"
                            label="Telephone"
                            type="text"
                            v-model="user.telephone"
                        ></v-text-field>

                        <v-text-field
                            prepend-inner-icon="mdi-account"
                            name="anciennete"
                            label="Anciennete"
                            type="number"
                            v-model="user.anciennete"
                        ></v-text-field>

                        <v-text-field
                            prepend-inner-icon="mdi-account"
                            name="fonction"
                            label="Fonction"
                            type="text"
                            v-model="user.fonction"
                        ></v-text-field>-->
                        <v-text-field
                            prepend-inner-icon="mdi-account"
                            name="dateNaiss"
                            label=""
                            type="text"
                            v-model="user.dateNaiss"
                        ></v-text-field>
                        <v-text-field
                            prepend-inner-icon="mdi-account"
                            name="email"
                            label="Email"
                            type="text"
                            v-model="user.email"
                        ></v-text-field>
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
                            v-model="user.mdpasse"
                         ></v-text-field>
                      </v-form>
                   </v-card-text>
                   <v-card-actions>
                      <v-btn text small class="small">
                        Vous avez un compte? 
                        <router-link :to="{name:'login'}" class="text">Se connecter</router-link>
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" @click="handleRegister">S'inscrire</v-btn>
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
name: 'Register',
data () {
  return {
    user: {
       // matricule:  '',
        prenoms: '',
        nom: '',
       /* sexe:'Homme',
        telephone:'',
        anciennete:0,
        fonction:'',*/
        dateNaiss:'01/01/2001',
        email:'',
        username:'',
        mdpasse:''
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
    register: 'user/register',
    //checkLocal: 'lang/setLangState',
    addNotification: 'application/addNotification'
  }),

  handleRegister(){
    console.log(this.user);
    //console.log(JSON.stringify(this.user));
    if(this.$refs.loginForm.validate){
        this.register(this.user)
        .then( () => {
          this.$router.push( { name: 'login'});
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
