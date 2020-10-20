<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="glossy">
            <q-toolbar>
                <q-toolbar-title>
                    Zempie admin page
                </q-toolbar-title>

                <q-space />

                <q-btn stretch flat @click="openLogoutDialog"> <q-icon name="logout" />Logout </q-btn>
            </q-toolbar>
        </q-header>

        <q-drawer show-if-above side="left" bordered content-class="bg-grey-2">
            <q-scroll-area class="fit">
                <q-list>
                    <template v-for="(categoryItem, index) in categoryList">
                        <q-expansion-item :key="index" expand-separator :icon="categoryItem.icon" :label="categoryItem.label" v-if="categoryItem.sub != false">
                            <q-list>
                                <q-item :key="categoryItem.label + subIndex" clickable v-ripple v-for="(subItem, subIndex) in categoryItem.sub" class="q-pl-xl">
                                    <q-item-section>
                                        {{ subItem.label }}
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-expansion-item>

                        <q-item :key="index" clickable v-ripple v-else>
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
            <HelloWorld />
        </q-page-container>

        <q-dialog v-model="logoutDialog" persistent transition-show="scale" transition-hide="scale" style="width: 1000px">
            <q-card style="width: 400px">
                <q-card-section>
                    <div class="text-h6">로그아웃</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    로그아웃 하시겠습니까?
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="취소" color="primary" v-close-popup />
                    <q-btn flat label="확인" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";

@Component({
    components: {
        HelloWorld,
    },
})
export default class Home extends Vue {
    logoutDialog = false;

    categoryList = [
        {
            icon: "inbox",
            label: "대쉬 보드",
            sub: false,
        },
        {
            icon: "inbox",
            label: "관리자",
            sub: [
                {
                    icon: "inbox",
                    label: "관리자 리스트",
                },
                {
                    icon: "inbox",
                    label: "관리자 로그",
                },
            ],
        },
        {
            icon: "inbox",
            label: "회원 관리",
            sub: [
                {
                    icon: "inbox",
                    label: "유저 리스트",
                },
            ],
        },
        {
            icon: "inbox",
            label: "커뮤니티",
            sub: [
                {
                    icon: "inbox",
                    label: "FAQ",
                },
                {
                    icon: "inbox",
                    label: "1 : 1 문의",
                },
                {
                    icon: "inbox",
                    label: "공지사항",
                },
            ],
        },
        {
            icon: "inbox",
            label: "심사",
            sub: [
                {
                    icon: "inbox",
                    label: "게임 심사",
                },
                {
                    icon: "inbox",
                    label: "심사 로그",
                },
            ],
        },
        {
            icon: "inbox",
            label: "게임 관리",
            sub: [
                {
                    icon: "inbox",
                    label: "정식 게임",
                },
                {
                    icon: "inbox",
                    label: "도전 게임",
                },
            ],
        },
    ];

    openLogoutDialog() {
        this.logoutDialog = true;
    }
}
</script>
