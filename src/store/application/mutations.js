export default {
    addNotification(state, payload){
        state.notifications.push(payload);
    },
    
    removeNotification(state, payload){
        state.notifications[payload].show = false;
        state.notifications=state.notifications.splice(payload, 1);
    }
};