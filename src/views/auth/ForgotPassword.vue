<template>
      <div>
         <v-container fluid class="mt-0">
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>{{ $t('forms.forgot.titleform') }}</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form ref="forgotPwdForm" :value="formValid">
                           
                           <v-text-field
                              prepend-inner-icon="mdi-email"
                              name="email"
                              :label="$t('forms.forgot.email')"
                              type="text"
                              v-model="user.email"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-btn text small class="small">
                          <router-link :to="{name:'login'}" class="text">{{ $t('forms.forgot.monespace') }}</router-link>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="handleSendMail">{{ $t('forms.forgot.sendLink') }}</v-btn>
                     </v-card-actions>
                     
                  </v-card>

                  <v-card class="mt-1 flat">
                      <v-card-actions>
                        <span text small class="small">
                          {{ new Date().getFullYear() }} — <strong>GEBAM.</strong>
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
import { mapActions } from 'vuex';

export default {
  name: 'ForgotPassword',
  data () {
    return {
        formValid: false,
        user: {
            email:''
        },
        showPwd: false,
        rules: {
            required: value => !!value || 'Champ obligatoire.'
        }
    }
  },
  methods: {
      ...mapActions({
          forgotPwd: 'user/forgotPwd',
          addNotification: 'application/addNotification'
      }),
      handleSendMail(){
          if(this.$refs.forgotPwdForm.validate){
              this.forgotPwd(this.user).then(response => {
                 this.addNotification({
                    show: true,
                    text: response.data.message,
                    color: 'green'
                 });
                 console.log("Mail sebnt")
              }).catch((error) => {
                 this.addNotification({
                    show: true,
                    text: error.data.message,
                    color: 'red'
                 })
                 /*this.snackbar = {
                    show: true,
                    text: error.data.message
                 }*/
              })
          }
      }
  },
}
</script>
