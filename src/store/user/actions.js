import axios from '@/utils/axios';

const  authenticationURL = '/auth/v1/connexion';
const  deconnexionURL = '/auth/v1/deconnexion';
const  refreshtokenURL = '/auth/v1/refresh-token';
const  registerURL= '/auth/v1/inscription';

export default {
    login(ctx, payload){
        console.log(payload);
        return new Promise((resolve, reject) => {
            axios.post(authenticationURL, payload)
                .then((response) => {
                    console.log(response);
                    if(response.status === 200 && response.data.authenticationToken){
                        localStorage.setItem('token', response.data.authenticationToken);
                        localStorage.setItem('refreshToken', response.data.refreshToken);
                        localStorage.setItem('username', response.data.username);
                        ctx.commit('setLoggedIn', true);
                        ctx.commit('setRefreshToken', response.data.refreshToken);
                        ctx.commit('setUsername', response.data.username);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.authenticationToken}`;
                        resolve(response); 
                    }else{
                        reject(response);
                    }
                    //
                })
                .catch(error => {
                    reject(error);
                });
        })
        
    },

    refreshToken(ctx){
        return new Promise((resolve, reject) => {
            axios.post(refreshtokenURL, {
                refreshToken: localStorage.getItem('refreshToken'),
                username: localStorage.getItem('username')
            })
                .then((response) => {
                    if(response.status === 200 && response.data.authenticationToken){
                        localStorage.setItem('token', response.data.authenticationToken);
                        localStorage.setItem('refreshToken', response.data.refreshToken);
                        localStorage.setItem('username', response.data.username);
                        ctx.commit('setLoggedIn', true);
                        ctx.commit('setRefreshToken', response.data.refreshToken);
                        ctx.commit('setUsername', response.data.username);
                        resolve(response); 
                    }else{
                        reject(response);
                    }
                    //
                })
                .catch(error => {
                    reject(error);
                });
        })
        
    },

    logout(ctx){
        return new Promise((resolve, reject) => {
            axios.post(deconnexionURL, {
                refreshToken: ctx.state.refreshToken,
                username: ctx.state.refreshToken
            })
                .then((response) => {
                    //ctx.commit('setUserDetails'
                    ctx.commit('setLoggedIn', false);
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('username');
                    localStorage.removeItem('token');
                    console.log(response);
                    resolve(true);
                })
                .catch(function (error) {
                    console.log(error.response.data);
                    reject(error);
               });
        })
    },
    setLoggedInState(ctx){
        return new Promise((resolve) => {
            if(localStorage.getItem('token')){
                ctx.commit('setLoggedIn', true);
                resolve(true);
            } else{
                ctx.commit('setLoggedIn', false);
                resolve(false);
            }
            
        })
    },
    forgotPwd(ctx, payload){
        return new Promise((resolve, reject) => {
            axios.post('auth/forgot-password', payload)
                .then((response) => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        })
    },
    register(ctx, payload){
        return new Promise((resolve, reject) => {
            axios.post(registerURL, payload)
                .then((response) => {
                    console.log(response);
                    resolve(response);
                })
                .catch(error => {
                    //console.log(response);
                    reject(error);
                });
        })
    },
    resetPwd(ctx, payload){
        return new Promise((resolve, reject) => {
            axios.post('auth/reset-password', payload)
                .then((response) => {
                    resolve(response);
                })
                .catch(function (error) {
                    //console.log(error.response.data);
                    reject(error);
               });
        })
        
    },
    me(ctx){
        return new Promise((resolve) => {
            //localStorage.removeItem('token');
            ctx.commit('setLoggedIn', false);
            resolve(true);
        })
        /*
        return new Promise((resolve, reject) => {
            axios.get('me')
                .then((response) => {
                    ctx.commit('setUserDetails', response.data.data);
                    console.log(response.data.data);
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log(error.response.data);
                    reject(error);
               });
        })
        */
    },
    resetCredentials(ctx){
        return new Promise((resolve) => {
            localStorage.removeItem('token');
            ctx.commit('setLoggedIn', false);
            ctx.commit('setRefreshToken', '');
            ctx.commit('setUserDetails', {});
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('username');
            localStorage.removeItem('token');
            resolve(true);
        })
    }
};
