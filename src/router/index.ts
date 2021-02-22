import Vue from "vue";
import VueRouter, { NavigationGuardNext, RouteConfig } from "vue-router";

// 기본 페이지
import Login from "@/views/LoginPage.vue";
import DashBoard from "@/views/DashBoardPage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";
// 관리자
import Admin from "@/views/admin/AdminPage.vue";
import AdminCreate from "@/views/admin/AdminCreatePage.vue";
import AdminLog from "@/views/admin/AdminLogPage.vue";
// 사용자
import User from "@/views/user/UserPage.vue";
import UserSub from "@/views/user/UserSubPage.vue";
import NotifyPage from "@/views/user/MailPage.vue";
//고객센터
import FAQ from "@/views/support/FAQPage.vue";
import FAQCreate from "@/views/support/FAQCreatePage.vue";
import FAQSub from "@/views/support/FAQSubPage.vue";

import Inquiry from "@/views/support/InquiryPage.vue";
import InquirySub from "@/views/support/InquirySubPage.vue";

import Notice from "@/views/support/NoticePage.vue";
import NoticeCreate from "@/views/support/NoticeCreatePage.vue";
import NoticeSub from "@/views/support/NoticeSubPage.vue";
// 게임관리
import Challenge from "@/views/game/ChallengePage.vue";
import ChallengeSub from "@/views/game/ChallengeSubPage.vue";
import Official from "@/views/game/OfficialPage.vue";
import OfficialSub from "@/views/game/OfficialSubPage.vue";
import Affiliate from "@/views/game/AffiliatePage.vue";
import AffiliateSub from "@/views/game/AffiliateSubPage.vue";
import AffiliateCreate from "@/views/game/AffiliateCreatePage.vue";
// 심사
import Judge from "@/views/judge/JudgePage.vue";
import JudgeSub from "@/views/judge/JudgeSubPage.vue";
import JudgeLog from "@/views/judge/JudgeLogPage.vue";
// 신고
import ReportGame from "@/views/report/ReportGamePage.vue";
import ReportUser from "@/views/report/ReportUserPage.vue";
// 제재
import PunishGame from "@/views/punish/PunishGamePage.vue";
import PunishUser from "@/views/punish/PunishUserPage.vue";
import PunishLog from "@/views/punish/PunishLogPage.vue";
// 단어
import BadWord from "@/views/word/BadWord.vue";
import ForbiddenWord from "@/views/word/ForbiddenWord.vue";


import {Notify} from "quasar";
import store from '@/store';


function loginCheck(next: NavigationGuardNext){
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

    /* 로그인 페이지 */
    { 
        path: "/login",
        name: "Login",
        component: Login,
    },
    /* 로그인 페이지 */

    /* 대쉬보드 */
    {
        path: "/",
        name: "DashBoard",
        component: DashBoard,
    },
    /* 대쉬보드 */

    /* 관리자 */
    {
        path: "/admin/list",
        name: "Admin",
        component: Admin,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/admin/list/create",
        name: "AdminCreate",
        component: AdminCreate,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/admin/log",
        name: "AdminLog",
        component: AdminLog,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    /* 관리자 */

    /* 회원 관리 */
    {
        path: "/user/list",
        name: "UserList",
        component: User,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/user/list/sub/:index",
        name: "UserSub",
        component: UserSub,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    // {
    //     path: "/user/notify",
    //     name: "Notify",
    //     component: NotifyPage,
    //     beforeEnter: (_to, _from, next) => {loginCheck(next)}
    // },
    /* 회원 관리 */

    /* 고객센터 */
    {
        path: "/support/faq",
        name: "FAQ",
        component: FAQ,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/support/faq/create",
        name: "FAQCreate",
        component: FAQCreate,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/support/faq/sub/:index",
        name: "FAQSub",
        component: FAQSub,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/support/inquiry",
        name: "Inquiry",
        component: Inquiry,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/support/inquiry/sub/:index",
        name: "supportInquirySub",
        component: InquirySub,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/support/notice",
        name: "Notice",
        component: Notice,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/support/notice/create",
        name: "NoticeCreate",
        component: NoticeCreate,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/support/notice/sub/:index",
        name: "NoticeSub",
        component: NoticeSub,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    /* 고객센터 */

    /* 게임 관리 */
    {
        path: "/game/challenge",
        name: "GameChallenge",
        component: Challenge,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/game/challenge/sub/:index",
        name: "ChallengeSub",
        component: ChallengeSub,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/game/official",
        name: "Official",
        component: Official,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/game/official/sub/:index",
        name: "OfficialSub",
        component: OfficialSub,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/game/affiliate",
        name: "Affiliate",
        component: Affiliate,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/game/affiliate/sub/:index",
        name: "AffiliateSub",
        component: AffiliateSub,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/game/affiliate/create",
        name: "AffiliateCreate",
        component: AffiliateCreate,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    /* 게임 관리 */

    /* 게임 심사 */
    {
        path: "/judge/game",
        name: "Judge",
        component: Judge,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/judge/game/sub/:index",
        name: "JudgeSub",
        component: JudgeSub,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/judge/log",
        name: "JudgeLog",
        component: JudgeLog,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    /* 게임 심사 */

    /* 신고 */
    {
        path: "/report/game",
        name: "ReportGame",
        component: ReportGame,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/report/user",
        name: "ReportUser",
        component: ReportUser,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    /* 신고 */


    /* 제재 */
    {
        path: "/punish/game",
        name: "PunishGame",
        component: PunishGame,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/punish/user",
        name: "PunishUser",
        component: PunishUser,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/punish/log",
        name: "PunishLog",
        component: PunishLog,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    /* 제재 */

    /* 단어 */
    {
        path: "/word/bad",
        name: "BadWord",
        component: BadWord,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    {
        path: "/word/forbidden",
        name: "ForbiddenWord",
        component: ForbiddenWord,
        beforeEnter: (_to, _from, next) => {loginCheck(next)}
    },
    /* 단어 */
];

const router = new VueRouter({
    routes,
});

export default router;
