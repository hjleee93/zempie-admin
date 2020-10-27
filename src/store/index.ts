import Vue from "vue";
import Vuex from "vuex";
import Gate from "../util/Gate";
import Cookie from "../util/Cookie";

Vue.use(Vuex);

const host = "http://192.168.0.10:8299";

export default new Vuex.Store({
    state: {
        loginToken: null
    },
    getters: {
        isLogin(state){
            if(state.loginToken == null){
                state.loginToken = Cookie.getCookie("token") as any;
            }

            return state.loginToken != null;
        }
    },
    mutations: {
        login(state, token) {
            state.loginToken = token;
        },
        logout(state){
            Cookie.deleteCookie("token");
            state.loginToken = null;
        }
    },
    actions: {
        login: async (context, adminData) => {
            try{
                const params = new URLSearchParams();
                params.append('account', adminData.account);
                params.append('password', adminData.password);
                const result = await Gate({
                    method: "POST",
                    url: "/api/v1/admin/login",
                    params,
                    headers: {
                        'Content-Type': "application/x-www-form-urlencoded"
                    }
                });
                Cookie.setCookie("token", result.data.result.access_token);
                Cookie.setCookie("refresh_token", result.data.result.refresh_token);
                context.commit("login", result.data.result.access_token);
            }catch(error){
                console.log(error);
            }
        },
        refreshToken: (context) => {
            const refreshToken = Cookie.getCookie("refresh_token");
        }
    },
    modules: {},
});
