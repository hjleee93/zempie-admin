import Vue from "vue";
import VueRouter, { NavigationGuardNext, RouteConfig } from "vue-router";

// 기본 페이지
import Login from "../views/LoginPage.vue";
import DashBoard from "../views/DashBoardPage.vue";
import NotFoundPage from "../views/NotFoundPage.vue";
// 관리자
import AdminList from "../views/admin/ListPage.vue";
import AdminListCreate from "../views/admin/ListCreatePage.vue";
import AdminLog from "../views/admin/LogPage.vue";
// 사용자
import UserList from "../views/user/ListPage.vue";
import UserListSub from "../views/user/ListSubPage.vue";
//커뮤니티
import CommunityFAQ from "../views/community/FAQPage.vue";
import CommunityFAQCreate from "../views/community/FAQCreatePage.vue";
import CommunityInquiry from "../views/community/InquiryPage.vue";
import CommunityInquirySub from "../views/community/InquirySubPage.vue";
import CommunityNotice from "../views/community/NoticePage.vue";
import CommunityNoticeCreate from "../views/community/NoticeCreatePage.vue";
// 게임관리
import GameChallenge from "../views/game/ChallengePage.vue";
import GameFormally from "../views/game/FormallyPage.vue";
import GameFormallySub from "../views/game/FormallySubPage.vue";
// 심사
import JudgeGame from "../views/judge/GamePage.vue";
import JudgeGameSub from "../views/judge/GameSubPage.vue";
import JudgeLog from "../views/judge/LogPage.vue";



// import store from "../store/index";
import {Notify} from "quasar";
import store from '@/store';

function loginCheck(next: NavigationGuardNext<Vue>){
    if (!store.getters.isLogin) {
        Notify.create({
            type: "negative",
            message: '해당 서비스는 로그인 후 이용하실 수 있습니다.',
            position: "top",
        });
        next("/login");
    }
    next();
}

// const requireAuth = (levels: number[]) => (to: any, from: any, next: any) => {
//     // if (levels.includes(store.state.subLevel)) {
//     //     return next();
//     // }

//     Notify.create({
//         type: "negative",
//         message: '해당 페이지를 이용할 권한이 없습니다.',
//         position: "top",
//     })
//     next("/");
// };

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    { path: "*", name: "notFoundPage", component: NotFoundPage },
    {
        // 로그인 페이지
        path: "/login",
        name: "Login",
        component: Login,
    },

    {
        // 대쉬보드
        path: "/",
        name: "DashBoard",
        component: DashBoard,
    },

    {
        // 관리자
        path: "/admin/list",
        name: "AdminList",
        component: AdminList,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/admin/list/create",
        name: "AdminListCreate",
        component: AdminListCreate,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/admin/log",
        name: "AdminLog",
        component: AdminLog,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },

    {
        // 회원 관리
        path: "/user/list",
        name: "UserList",
        component: UserList,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/user/list/sub/:index",
        name: "UserListSub",
        component: UserListSub,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        // 커뮤니티
        path: "/community/faq",
        name: "CommunityFAQ",
        component: CommunityFAQ,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/community/faq/create",
        name: "CommunityFAQCreate",
        component: CommunityFAQCreate,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/community/faq/sub/:index",
        name: "CommunityFAQCreate",
        component: CommunityFAQCreate,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/community/inquiry",
        name: "CommunityInquiry",
        component: CommunityInquiry,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/community/inquiry/sub/:index",
        name: "CommunityInquirySub",
        component: CommunityInquirySub,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/community/notice",
        name: "CommunityNotice",
        component: CommunityNotice,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/community/notice/create",
        name: "CommunityNoticeCreate",
        component: CommunityNoticeCreate,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        // 게임 관리
        path: "/game/challenge",
        name: "GameChallenge",
        component: GameChallenge,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/game/formally",
        name: "GameFormally",
        component: GameFormally,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/game/formally/sub/:index",
        name: "GameFormallySub",
        component: GameFormallySub,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        // 게임 심사
        path: "/judge/game",
        name: "JudgeGame",
        component: JudgeGame,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/judge/game/sub/:index",
        name: "JudgeGameSub",
        component: JudgeGameSub,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/judge/log",
        name: "JudgeLog",
        component: JudgeLog,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
];

const router = new VueRouter({
    routes,
});

export default router;
