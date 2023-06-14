<template>
      <div>
         <v-container fluid class="mt-0">
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>{{ $t('forms.reset.titleform') }}</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form ref="resetPwdForm" :value="formValid">
                           <v-text-field
                              id="password"
                              prepend-inner-icon="mdi-lock"
                              name="password"
                              :label="$t('forms.reset.pwd')"
                              :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                              :rules="[rules.required, rules.min]"
                              :type="showPwd ? 'text' : 'password'"
                              @click:append="showPwd = !showPwd"
                              v-model="user.password"
                           ></v-text-field>

                           <v-text-field
                              id="password_confirmation"
                              prepend-inner-icon="mdi-lock"
                              name="password_confirmation"
                              :label="$t('forms.reset.pwd_confirm')"
                              :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                              :rules="[rules.required, rules.min]"
                              :type="showPwd ? 'text' : 'password'"
                              @click:append="showPwd = !showPwd"
                              v-model="user.password_confirmation"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <!--<v-btn text small class="small">
                          {{ $t('forms.auth.forgotpwd') }}
                        </v-btn>-->
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="handleResetPwd">{{ $t('forms.forgot.sendLink') }}</v-btn>
                     </v-card-actions>
                     
                  </v-card>

                  <v-card class="mt-1 flat">
                      <v-card-actions>
                        <span text small class="small">
                          {{ new Date().getFullYear() }} — <strong>FB RIM.</strong>
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
  name: 'ResetPassword',
  data () {
    return {
        formValid: false,
        user: {
            email: '',
            password:'',
            password_confirmation:''
        },
        apiError:{
           email: '',
        },
        showPwd: false,
        rules: {
            required: value => !!value || 'Champ obligatoire.',
            min: v => v.length >= 7 || '7 cractére au moins',
        },
    }
  },
  methods: {
      ...mapActions({
          resetPwd: 'user/resetPwd',
          addNotification: 'application/addNotification'
      }),
      handleResetPwd(){
         this.apiError.email='';
          if(this.$refs.resetPwdForm.validate){
              const token = this.$route.query.token; 
              this.resetPwd({...this.user, token: token}).then(response => {
                 this.addNotification({
                    show: true,
                    text: response.data.message,
                    color: 'green'
                 }).then(() =>{
                    this.$router.push( { name: 'login'});
                 })
              }).catch(function (error) {
                    //console.log(error.response.data);
                    const errors = error.response.data.data;
                    if(errors.email.length>0){
                       //console.log(errors.email);
                       for (let i = 0; i < errors.email.length; i++) {
                        alert(errors.email[i]);
                        this.apiError.email=errors.email[i];
                       }
                    }
                    if(errors.password.length>0){
                       //console.log(errors.password);
                       for (let i = 0; i < errors.password.length; i++) {
                        //console.log(errors.password[i]);
                        this.addNotification({
                           show: true,
                           text: errors.password[i],
                           color: 'red'
                        })
                       }
                    }
                    /*for (let i = 0; i < errors.length; i++) {
                       console.log(errors[i]);
                    }*/
               }
                 /*(data) => {
                 console.log(data);
                 this.addNotification({
                    show: true,
                    text: data.password,
                    color: 'red'
                 })
              }*/)
          }
      }
  },
}
</script>
