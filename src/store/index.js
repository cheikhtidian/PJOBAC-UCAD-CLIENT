import Vue from 'vue'
import Vuex from 'vuex'

//  Store modules
import lang from './lang'
import application from './application/index';
import user from './user/index';
//import demandesModule from '@/modules/demandes/store/index';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    lang,
    application,
    user,
    //demandesModule
  }
})
