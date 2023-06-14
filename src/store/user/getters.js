export default {
    loggedIn(state){
        return state.isLoggedIn;
    },

    userDetails(state){
        return state.userDetails;
    },

    username(state){
        return state.username;
    },

    refreshToken(state){
        return state.refreshToken;
    }
};