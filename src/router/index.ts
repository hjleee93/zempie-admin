import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/LoginPage.vue'
import DashBoard from '../views/DashBoardPage.vue'
import AdminList from '../views/admin/ListPage.vue'
import AdminLog from '../views/admin/LogPage.vue';
import UserList from '../views/user/ListPage.vue';
import CommunityFAQ from '../views/community/FAQPage.vue';
import CommunityQuestion from '../views/community/QuestionPage.vue';
import CommunityNotice from '../views/community/NoticePage.vue';
import GameChallenge from '../views/game/ChallengePage.vue';
import GameFormally from '../views/game/FormallyPage.vue';
import JudgeGame from '../views/judge/GamePage.vue';
import JudgeLog from '../views/judge/LogPage.vue';


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: '/',
    name: 'DashBoard',
    component: DashBoard
  },
  {
    path: "/admin/list",
    name: "AdminList",
    component: AdminList
  },
  {
    path: "/admin/log",
    name: "AdminLog",
    component: AdminLog
  },
  {
    path: "/user/list",
    name: "UserList",
    component: UserList
  },
  {
    path: "/community/faq",
    name: "CommunityFAQ",
    component: CommunityFAQ
  },
  {
    path: "/community/question",
    name: "CommunityQuestion",
    component: CommunityQuestion
  },
  {
    path: "/community/notice",
    name: "CommunityNotice",
    component: CommunityNotice
  },
  {
    path: "/game/challenge",
    name: "GameChallenge",
    component: GameChallenge
  },
  {
    path: "/game/formally",
    name: "GameFormally",
    component: GameFormally
  },
  {
    path: "/judge/game",
    name: "JudgeGame",
    component: JudgeGame
  },
  {
    path: "/judge/log",
    name: "JudgeLog",
    component: JudgeLog
  },
]

const router = new VueRouter({
  routes
})

export default router;
