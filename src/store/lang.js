const state = {
    lang:  localStorage.getItem('lang') || process.env.VUE_APP_I18N_LOCALE
};

const getters = {
    getLang(state){
        return state.lang;
    }
};

const mutations = {
    setLang(state, payload){
        state.lang = payload;
    }
};

const actions = {
    changeLang(ctx, payload){
        localStorage.setItem('lang', payload);
        ctx.commit('setLang', payload);
    },
    setLangState(ctx){
        return new Promise((resolve) => {
            if(localStorage.getItem('lang')){
                ctx.commit('setLang', localStorage.getItem('lang'));
                resolve(true);
            }else{
                ctx.commit('setLang', process.env.VUE_APP_I18N_LOCALE);
                resolve(true);
            }
            
        })
    }
};

export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}