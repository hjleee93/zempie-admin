import axios from "axios";
import store from "../store/index";
// import { refreshToken } from "../service/login";

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
        if (error.response.data.status === 401) {
            // await store.dipatch("refreshToken");
            return await axios(errorAPI);
        }
        return Promise.reject(error);
    }
);

export default instance;
