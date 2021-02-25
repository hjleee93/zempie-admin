import axios from "axios";
import store from "@/store/index";
import { Notify }from "quasar";

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_LINK
});

instance.interceptors.request.use(
    async function(config) {
        config.headers.Authorization = `Bearer ${store.state.accessToken}`;
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function(response) {
        return response;
    },
    async function(error) {
        if(process.env.NODE_ENV == "local"){
            console.log([error]);
            
            // Notify.create({
            //     type: "negative",
            //     message: error,
            //     position: "top",
            // });
        }
        
        const errorConfig = error.config;
        if (error.response.data.error.message == "Unauthorized") {
            const result = await store.dispatch("refreshToken");
            if(result){
                return instance(errorConfig);
            }
        }else{
            // Notify.create({
            //     type: "negative",
            //     message: error.response.data.error,
            //     position: "top",
            // });
        }
        
        return Promise.reject(error);

    }
);

export default instance;
