import Vue from "vue";
import Vuex from "vuex";
import Gate from "../util/Gate";
import Cookie from "../util/Cookie";
import axios from "axios";
import { Notify } from "quasar";
import router from "../router/index";

Vue.use(Vuex);

const host = "http://192.168.0.10:8299";

export default new Vuex.Store({
    state: {
        loginToken: null,
        name: null,
        level: null,
        subLevel: null
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
            Cookie.deleteCookie("refresh_token");
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

                return true;
            }catch(error){
                return false;
            }
        },
        refreshToken: async (context) => {
            const refreshToken = Cookie.getCookie("refresh_token") || "";
            const params = new URLSearchParams();
            params.append('token', refreshToken);
            try{
                const result = await axios({
                    method: "POST",
                    url: "/api/v1/admin/token",
                    params,
                    headers: {
                        'Content-Type': "application/x-www-form-urlencoded"
                    }
                });
                context.state.loginToken = result.data.result.access_token;
                return true;
            }catch(error){
                Notify.create({
                    type: "negative",
                    message: '해당 계정의 토큰이 만료되었습니다. 다시 로그인해주시기 바랍니다.',
                    position: "top",
                });
                router.push("/login");
                context.commit("logout");
                return false;
            }
        },
        getAdminData: async (context) => {
            if(!context.getters.isLogin){
                return false;
            }
            try{
                const result = await Gate({
                    method: "GET",
                    url: "/api/v1/admin/verify",
                    headers: {
                        'Content-Type': "application/x-www-form-urlencoded"
                    }
                });
                context.state.name = result.data.result.name;
                context.state.level = result.data.result.level;
                context.state.subLevel = result.data.result.sub_level;
            }catch(error){
                // console.log(error);
            }
        }
    },
    modules: {},
});
