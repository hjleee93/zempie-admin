<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="glossy">
            <q-toolbar>
                <q-btn dense flat round icon="menu" @click="left = !left" />

                <q-toolbar-title>
                    Zempie admin page
                </q-toolbar-title>

                <q-space />

                <q-btn flat @click="openPasswordPopup">
                    <q-icon name="person" />
                    {{$store.state.name}}

                    <q-tooltip>
                        정보 수정
                    </q-tooltip>
                </q-btn>

                <q-btn stretch flat @click="logout">
                    <q-icon name="logout" />Logout
                </q-btn>
            </q-toolbar>
        </q-header>

        <q-dialog v-model="passwordPopup">
            <q-card class="my-card" style="width: 600px;">
                <q-card-section class="q-pt-none q-ma-md">
                    <div class="row items-center q-mb-md">
                        <div class="col-12">
                            이름
                        </div>

                        <div class="col-12">
                            <q-input outlined v-model="name" label="name" />
                        </div>
                    </div>

                    <div class="row items-center">
                        <div class="col-12">
                            변경할 비밀번호
                        </div>

                        <div class="col-12">
                            <q-input outlined v-model="password" label="New password" />
                        </div>
                    </div>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn v-close-popup color="primary" label="닫기" />
                    <q-btn color="positive" label="변경" @click="changePassword" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-drawer v-model="left" show-if-above side="left" bordered content-class="bg-grey-2">
            <q-scroll-area class="fit">
                <q-list>
                    <template v-for="(categoryItem, index) in filteredCategoryList">
                        <q-expansion-item :key="index" expand-separator :icon="categoryItem.icon" :label="categoryItem.label" v-if="categoryItem.sub != false">
                            <q-list>
                                <q-item
                                    :key="categoryItem.label + subIndex"
                                    clickable
                                    v-ripple
                                    v-for="(subItem, subIndex) in categoryItem.sub"
                                    @click="movepath(categoryItem.path + subItem.path)"
                                    :class="'q-pl-xl ' + getIsActive(subItem)"
                                >
                                    <q-item-section>
                                        {{ subItem.label }}
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-expansion-item>

                        <q-item :key="index" :class="getIsActive(categoryItem)" clickable v-ripple v-else @click="movepath(categoryItem.path)">
                            <q-item-section avatar>
                                <q-icon :name="categoryItem.icon" />
                            </q-item-section>
                            <q-item-section>
                                {{ categoryItem.label }}
                            </q-item-section>
                        </q-item>
                    </template>
                </q-list>
            </q-scroll-area>
        </q-drawer>

        <q-page-container>
            <div class="q-pa-md">
                <div class="text-h5 text-weight-bold q-mb-md q-mt-md" v-if="isSubPage">
                    <span class="previousBtn" @click="movePreviousPage">&lt;</span>&nbsp;{{ activeTitle }}
                </div>
                <div class="text-h5 text-weight-bold q-mb-md q-mt-md" v-else>{{ activeCategory.label }}</div>

                <slot></slot>
            </div>
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Notify, Dialog } from "quasar";
import Api from '@/util/Api';

interface Category{
    icon: string;
    label: string;
    sub: Category[];
    path: string;
}

@Component({
    name: "MainLayout",
    components: {
    },
})
export default class MainLayout extends Vue {
    left = false;

    categoryList = [
        {
            icon: "dashboard",
            label: "대쉬 보드",
            sub: [],
            path: "/",
        },
        {
            icon: "admin_panel_settings",
            label: "관리자",
            sub: [
                {
                    label: "관리자 리스트",
                    path: "/list",
                },
                {
                    label: "관리자 로그",
                    path: "/log",
                },
            ],
            path: "/admin",
        },
        {
            icon: "account_box",
            label: "회원 관리",
            sub: [
                {
                    label: "유저 리스트",
                    path: "/list",
                },
            ],
            path: "/user",
        },
        {
            icon: "forum",
            label: "커뮤니티",
            sub: [
                {
                    label: "FAQ",
                    path: "/faq",
                },
                {
                    label: "1 : 1 문의",
                    path: "/question",
                },
                {
                    label: "공지사항",
                    path: "/notice",
                },
            ],
            path: "/community",
        },
        {
            icon: "assignment_turned_in",
            label: "심사",
            sub: [
                {
                    label: "게임 심사",
                    path: "/game",
                },
                {
                    label: "심사 로그",
                    path: "/log",
                },
            ],
            path: "/judge",
        },
        {
            icon: "sports_esports",
            label: "게임 관리",
            sub: [
                {
                    label: "정식 게임",
                    path: "/formally",
                },
                {
                    label: "도전 게임",
                    path: "/Challenge",
                },
            ],
            path: "/game",
        },
    ];

    titleList = [
        {
            path: "/admin/list/create",
            title: "관리자 생성",
        },
        {
            path: "/user/list/sub",
            title: "유저 상세보기",
        },
        {
            path: "/community/question/sub/",
            title: "1 : 1 문의 상세보기",
        },
        {
            path: "/community/faq/create",
            title: "FAQ 새 글 작성",
        },
        {
            path: "/community/faq/sub/",
            title: "FAQ 문의 상세보기",
        },
        {
            path: "/community/notice/create",
            title: "공지사항 새 글 작성",
        },
        {
            path: "/community/notice/sub/",
            title: "공지사항 상세보기",
        },
        {
            path: "/game/formally/sub/",
            title: "정식 게임 상세보기",
        },
        {
            path: "/judge/game/sub/",
            title: "심사 상세보기",
        },
    ];

    get isSubPage(){
        const path = this.$route.path;
        return path.split("/").length > 3;
    }

    get activeTitle() {
        const path = this.$route.path;
        for(let i = 0; i < this.titleList.length; i++){
            if(path.includes(this.titleList[i].path)){
                return this.titleList[i].title;
            }
        }
        return "not found";
    }

    get activeCategory() {
        const path = this.$route.path;
        for (let i = 0; i < this.categoryList.length; i++) {
            if (this.categoryList[i].sub.length != 0) {
                for (let j = 0; j < this.categoryList[i].sub.length; j++) {
                    if (path.includes((this.categoryList[i].path + this.categoryList[i].sub[j].path))) {
                        return this.categoryList[i].sub[j];
                    }
                }
            } else {
                if (this.categoryList[i].path == path) {
                    return this.categoryList[i];
                }
            }
        }

        return this.categoryList[0];
    }

    get filteredCategoryList(){
        const filterList = [["/", "/user", "/admin"], ["/", "/community", "/judge", "/game"]];

        const filteredList = [];
        const level = 1;

        for(let i = 0; i < this.categoryList.length; i++){
            if(filterList[level].includes(this.categoryList[i].path)){
                filteredList.push(this.categoryList[i]);
            }
        }

        // return filteredList;
        return this.categoryList;
    }

    getIsActive(category: Category) {
        return category == this.activeCategory ? "active" : "";
    }

    movePreviousPage() {
        this.$router.go(-1);
    }

    logout() {
        Dialog.create({
            title: '로그아웃',
            message: '로그아웃하시겠습니까?',
            cancel: true,
            persistent: true,
        }).onOk(async () => {
            this.$store.commit("logout");
            this.$router.push("/login");
        })
    }

    async created() {
        if (!this.$store.getters.isLogin) {
            if(this.$route.path != "/"){
                Notify.create({
                    type: "negative",
                    message: '해당 서비스는 로그인 후 이용하실 수 있습니다.',
                    position: "top",
                });
            }
            this.$router.push("/login");
        }else{
            this.$store.dispatch("getAdminData");
        }
    }

    movepath(path: string) {
        if (this.$route.path != path) {
            this.$router.push(path);
        }
    }
    
    
    
    
    
    passwordPopup = false;
    name = "";
    password = "";

    openPasswordPopup() {
        this.name = this.$store.state.name;
        this.password = "";

        this.passwordPopup = true;
    }

    closePasswordPopup() {
        this.passwordPopup = false;
    }

    async changePassword() {
        const id = this.$store.state.id;
        const name = this.name;
        const password = this.password;

        if (name.trim() == "" || password.trim() == "") {
            return Notify.create({
                type: "negative",
                message: "내용을 전부 채워주시기 바랍니다.",
                position: "top",
            });
            
        }

        const result = await Api.setAdmin(id, name.trim(), password.trim());
        if (result) {
            Notify.create({
                type: "positive",
                message: "변경에 성공하였습니다.",
                position: "top",
            });
            this.$router.go(0);
            this.passwordPopup = false;
        } else {
            Notify.create({
                type: "negative",
                message: "변경하는 도중에 문제가 발생하였습니다.",
                position: "top",
            });
        }
    }
}
</script>

<style lang="scss">
.active {
    background-color: #3f51b5;
    * {
        color: white;
    }
}

.previousBtn {
    cursor: pointer;
}
</style>
