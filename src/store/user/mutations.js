export default {
    setLoggedIn(state, payload){
        state.isLoggedIn = payload;
    },

    setUserDetails(state, payload){
        state.userDetails = payload;
    },
    
    setUsername(state, payload){
        state.username = payload;
    },
    
    setRefreshToken(state, payload){
        state.refreshToken = payload;
    }
};