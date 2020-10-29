import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "../views/LoginPage.vue";
import DashBoard from "../views/DashBoardPage.vue";
import AdminList from "../views/admin/ListPage.vue";
import AdminListCreate from "../views/admin/ListCreatePage.vue";
import AdminLog from "../views/admin/LogPage.vue";
import UserList from "../views/user/ListPage.vue";
import UserListSub from "../views/user/ListSubPage.vue";
import CommunityFAQ from "../views/community/FAQPage.vue";
import CommunityFAQCreate from "../views/community/FAQCreatePage.vue";
import CommunityQuestion from "../views/community/QuestionPage.vue";
import CommunityQuestionSub from "../views/community/QuestionSubPage.vue";
import CommunityNotice from "../views/community/NoticePage.vue";
import CommunityNoticeCreate from "../views/community/NoticeCreatePage.vue";
import GameChallenge from "../views/game/ChallengePage.vue";
import GameFormally from "../views/game/FormallyPage.vue";
import GameFormallySub from "../views/game/FormallySubPage.vue";
import JudgeGame from "../views/judge/GamePage.vue";
import JudgeGameSub from "../views/judge/GameSubPage.vue";
import JudgeLog from "../views/judge/LogPage.vue";
import NotFoundPage from "../views/NotFoundPage.vue";

import store from "../store/index";
import {Notify} from "quasar";

const requireAuth = (levels: number[]) => (to: any, from: any, next: any) => {
    // if (levels.includes(store.state.subLevel)) {
    //     return next();
    // }

    Notify.create({
        type: "negative",
        message: '해당 페이지를 이용할 권한이 없습니다.',
        position: "top",
    })
    next("/");
};

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
    },
    {
        path: "/admin/list/create",
        name: "AdminListCreate",
        component: AdminListCreate,
    },
    {
        path: "/admin/log",
        name: "AdminLog",
        component: AdminLog,
    },

    {
        // 회원 관리
        path: "/user/list",
        name: "UserList",
        component: UserList,
    },
    {
        path: "/user/list/sub/:index",
        name: "UserListSub",
        component: UserListSub,
    },
    {
        // 커뮤니티
        path: "/community/faq",
        name: "CommunityFAQ",
        component: CommunityFAQ,
    },
    {
        path: "/community/faq/create",
        name: "CommunityFAQCreate",
        component: CommunityFAQCreate,
    },
    {
        path: "/community/question",
        name: "CommunityQuestion",
        component: CommunityQuestion,
    },
    {
        path: "/community/question/Sub/:index",
        name: "CommunityQuestionSub",
        component: CommunityQuestionSub,
    },
    {
        path: "/community/notice",
        name: "CommunityNotice",
        component: CommunityNotice,
    },
    {
        path: "/community/notice/create",
        name: "CommunityNoticeCreate",
        component: CommunityNoticeCreate,
    },
    {
        // 게임 관리
        path: "/game/challenge",
        name: "GameChallenge",
        component: GameChallenge,
    },
    {
        path: "/game/formally",
        name: "GameFormally",
        component: GameFormally,
    },
    {
        path: "/game/formally/sub/:index",
        name: "GameFormallySub",
        component: GameFormallySub,
    },
    {
        // 게임 심사
        path: "/judge/game",
        name: "JudgeGame",
        component: JudgeGame,
    },
    {
        path: "/judge/game/sub/:index",
        name: "JudgeGameSub",
        component: JudgeGameSub,
    },
    {
        path: "/judge/log",
        name: "JudgeLog",
        component: JudgeLog,
    },
];

const router = new VueRouter({
    routes,
});

export default router;
