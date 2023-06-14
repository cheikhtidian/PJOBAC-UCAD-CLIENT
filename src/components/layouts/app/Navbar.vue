<template>
    <nav>
       
    </nav>
 </template>
 
 <script>

 import Footer from './Footer.vue';
 import { mapActions, mapGetters } from 'vuex';
 
 export default {
 
    data: () => ({
       drawer: true,
       user: {
         initials: 'LD',
         fullName: 'Lamine Dieye',
         email: 'lamine.dieye@gmail.com',
       },
       //apps: dataMenu.apps,
       //selectedApp: dataMenu.selectedApp,
       //listModules: dataMenu.intialListeNav,
       //itemModule: dataMenu.modules.filter(o => o.app == this.selectedApp),
       locales: process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(','),
     }),
 
     components: {
         Footer
     },
 
     computed: {
       ...mapGetters({
         userDetails: 'user/userDetails'
       }),
       fullName: function(){
         return this.userDetails.prenoms + ' '+ this.userDetails.nom;
       },
     },
 
     methods: {
       ...mapActions({
         logout: 'user/logout',
         me: 'user/me',
         addNotification: 'application/addNotification'
       }),
       
       handleLogout(){
         //this.$store.dispatch('user/logout')
         this.logout()
             .then( () => {
               this.addNotification({
                 show: true,
                 text:  this.$i18n.t('goodbye')+' '+this.user.email,
                 color: 'black'
               }).then(()=>{
                 this.$router.push( { name: 'home'});
               })
               
             });
       },
       handleMe(){
         //this.$store.dispatch('user/logout')
         this.me()
             .then( () => {
               /*this.addNotification({
                 show: true,
                 text:  this.$i18n.t('goodbye')+' '+this.user.email,
                 color: 'black'
               }).then(()=>{
                 this.$router.push( { name: 'home'});
               })*/
               
             });
       },
       
     },
 
     filters: {
       short_full_name(full_name){
         let words = full_name.split(" ")
         let short_full_name = words[0][0] + words[words.length-1][0]
         return short_full_name; // <-- The return value as Per logic
       },
       to_upper_case(words){
         return words.toUpperCase();
       }
     }
 }
 </script>
 <style scoped>
 .border {
   border-left: 4px solid #0ba518;
 }
 </style>
 