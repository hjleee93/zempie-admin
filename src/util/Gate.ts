import axios from "axios";
import store from "@/store/index";
import { Notify } from "quasar";

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_LINK
});

instance.interceptors.request.use(
    async function (config) {
        config.headers.Authorization = `Bearer ${store.state.accessToken}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        if (process.env.NODE_ENV == "local") {
            return Promise.reject(error);
        }

        const errorConfig = error.config;
        if (error.response.data.error.message == "Unauthorized") {
            const result = await store.dispatch("refreshToken");
            if (result) {
                return instance(errorConfig);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
