import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import Gate from "@/util/Gate";
import { getCookie, setCookie, deleteCookie } from "@/util/Cookie";
import axios from "axios";
import { Notify } from "quasar";
import router from "@/router/index";

Vue.use(Vuex);
interface State{
    accessToken: string|null;
    name: string|null;
    level: number|null;
    subLevel: number|null;
    id: number|null;
}
const store: StoreOptions<State> = {
    state: {
        accessToken: null,
        name: null,
        level: null,
        subLevel: null,
        id: null
    },
    getters: {
        isLogin(state){
            if(state.accessToken == null){
                state.accessToken = getCookie("access_token") as any;
            }

            return state.accessToken != null;
        }
    },
    mutations: {
        login(state, token) {
            state.accessToken = token;
        },
        logout(state){
            deleteCookie("access_token");
            deleteCookie("refresh_token");
            state.accessToken = null;
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
                setCookie("access_token", result.data.result.access_token);
                setCookie("refresh_token", result.data.result.refresh_token);
                context.commit("login", result.data.result.access_token);

                return true;
            }catch(error){
                // console.log([error]);
                return false;
            }
        },
        refreshToken: async (context) => {
            const refreshToken = getCookie("refresh_token") || "";
            if(refreshToken == null || refreshToken == ""){
                return;
            }
            const params = new URLSearchParams();
            params.append('token', refreshToken);
            try{
                const result = await axios({
                    method: "POST",
                    url: process.env.VUE_APP_API_LINK + "/api/v1/admin/token",
                    params,
                    headers: {
                        'Content-Type': "application/x-www-form-urlencoded"
                    }
                });
                context.state.accessToken = result.data.result.access_token;
                setCookie("access_token", result.data.result.access_token);
                return true;
            }catch(error){
                // console.log([error]);
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
                // context.state.id = result.data.data.id;
            }catch(error){
                // console.log([error]);
            }
        }
    },
    modules: {},
}

export default new Vuex.Store(store);
