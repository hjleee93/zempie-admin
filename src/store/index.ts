import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        adminData: null
    },
    getters: {
        isLogin(state){
            return state.adminData != null;
        }
    },
    mutations: {
        login(state, adminData) {
            state.adminData = adminData;
        },
        logout(state){
            state.adminData = null;
        }
    },
    actions: {},
    modules: {},
});
