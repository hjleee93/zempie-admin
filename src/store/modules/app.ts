export default {
    state: {
        zempieUrl: process.env.VUE_APP_ZEMPIE_LINK,
        
    },
    getters: {
        zempieUrl(state: any) {
            return state.zempieUrl;
        },
    },

    mutations: {
        
    },
    actions: {}
}

