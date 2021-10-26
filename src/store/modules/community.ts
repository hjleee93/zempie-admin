export default {
    state: {
        editOpen:false,
    },
    getters: {
        editOpen(state: any) {
            return state.editOpen;
        },
        communityInfo(state: any) {
            return state.communityInfo;
        },
    },
    mutations: {
        editOpen(state: any, payload: any) {
            state.editOpen = payload;
        },
        communityInfo(state: any, payload: any) {
            state.communityInfo = payload;
        },
    },
    actions: {

    },
}
