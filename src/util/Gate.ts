import axios from "axios";
import store from "../store/index";

const instance = axios.create({
    baseURL: "http://192.168.0.10:8299",
    timeout: 1000,
});

instance.interceptors.request.use(
    async function(config) {
        config.headers.Authorization = `Bearer ${store.state.loginToken}`;
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
        const errorAPI = error.config;
        if (error.response.data.error == "Unauthorized") {
            const result = await store.dispatch("refreshToken");
            if(result){
                return await instance(errorAPI);
            }
        }
        return Promise.reject(error);
    }
);

export default instance;
