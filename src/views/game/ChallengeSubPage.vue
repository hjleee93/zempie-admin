<template>
    <div>
        <q-card v-if="!$apollo.queries.projectGet.loading">
            <q-card-section>
                <div class="text-h5 q-mb-md">
                    {{ project.name }}
                </div>

                <div class="q-mb-md">
<!--                    <div class="text-h6">-->
<!--                        생성일-->
<!--                    </div>-->

                    <div>
                        {{ new Date(project.created_at).toLocaleString() }}
                    </div>
                </div>

                <div class="q-mb-md">
<!--                    <div class="text-h6">-->
<!--                        자세한 설명-->
<!--                    </div>-->

                    <div>
                        {{ project.description }}
                    </div>
                </div>

                <div class="q-mb-md">
<!--                    <div class="text-h6">-->
<!--                        태그-->
<!--                    </div>-->

                    <div v-if="project.hashtags.trim().length > 0">
                        <q-badge class="q-mr-sm" color="orange" text-color="black" :label="tag" v-for="tag in hashTags" :key="tag" />
                    </div>
                    <div v-else>
                        설명 없음
                    </div>
                </div>

                <div class="q-mb-md" v-if="project.game.user != null">
<!--                    <div class="text-h6">-->
<!--                        개발자-->
<!--                    </div>-->
                    <router-link :to="'/user/list/sub/' + project.game.user.id">
                        {{ project.game.user.name }}
                    </router-link>
                </div>

                <div class="row q-mb-md">
                    <div class="q-mr-md">
<!--                        <div class="text-h6">-->
<!--                            썸네일-->
<!--                        </div>-->

                        <div class="row justify-center items-center" :style="`width: 250px; height: 250px; `">
                            <q-img
                                :src="project.picture"
                                :ratio="1"
                                spinner-color="primary"
                                spinner-size="82px"
                                width="100%"
                            />
                        </div>
                    </div>
                    <div v-if="project.picture2 != null && project.picture2 != ''">
<!--                        <div class="text-h6">-->
<!--                            움직이는 썸네일-->
<!--                        </div>-->

                        <div class="row justify-center items-center" style="width: 250px; height: 250px;">
                            <q-img
                                :src="project.picture2"
                                :ratio="1"
                                spinner-color="primary"
                                spinner-size="82px"
                                width="100%"
                            />
                        </div>
                    </div>
                </div>

                <div class="q-mb-md">
<!--                    <div class="text-h6">-->
<!--                        플레이 수-->
<!--                    </div>-->
                    <div>
                        {{ project.game.count_over }}회 플레이
                    </div>
                </div>

                <div class="q-mb-md">
<!--                    <div class="text-h6">-->
<!--                        하트 수-->
<!--                    </div>-->
                    <div>
                        🧡{{ project.game.count_heart }}
                    </div>
                </div>

                <div v-if="project.game.emotions !== null" class="q-mb-md">
                    <div class="text-h6">
                        감정표현
                    </div>
                    <div>
                        <div v-for="(emotion, idx) in emotions" :key="idx">
                            {{ emotion.label }} : {{ project.game.emotions[emotion.key] }}
                        </div>
                    </div>
                </div>

            </q-card-section>

            <q-separator />

            <q-card-section>

                <div class="q-mb-md">
                    <div class="text-h6">
                        프로젝트 제재 상태
                    </div>
                    <div>
                        {{ Config.projectState[project.state] }}
                    </div>
                </div>

                <div class="q-mb-md">
                    <div class="text-h6">
                        게임 공개 여부
                    </div>
                    <div>
                        {{ project.game.enabled ? '공개 중' : '비공개' }}
                    </div>
                </div>

                <div class="q-mb-md">
                    <q-table :data="project.projectVersions" :columns="projectVersionColumns" />
                </div>

                <div>
                    <div class="text-h6">
                        게임 플레이
                    </div>
                    <div v-if="project.game.url_game != null">
                        <iframe ref="game" :src="iframeLink" frameborder="0" width="100%" height="1000px"></iframe>
                    </div>
                    <div v-else>
                        플레이 불가
                    </div>
                </div>
            </q-card-section>

            <q-separator />

            <q-card-section>
                <div class="row justify-end">
                    <div v-if="project.game.url_game != null" class="float-left">
                        <q-btn class="q-mr-md" color="red" label="비활성화하기" @click="hideGame" v-if="project.game.enabled" />
                        <q-btn class="q-mr-md" color="positive" label="활성화하기" @click="showGame" v-else />
                    </div>

                    <q-btn class="q-mr-md" color="red" label="버전 제재" @click="punishGame(false)" />
                    <q-btn class="q-mr-md" color="red" label="프로젝트 제재" @click="punishGame(true)" />
                    <q-btn color="grey" label="정식게임으로 이동" @click="moveGame" />
                </div>
            </q-card-section>
        </q-card>

        <div v-else>
            <q-spinner-gears
                color="primary"
                size="3rem"
                :thickness="5"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Dialog } from "quasar";

import Query from "../../query/ChallengeGameQuery";
import Config from "@/util/Config";
import Api from "@/util/Api";

@Component({
    components: {},
    apollo: {
        projectGet: {
            query: Query.projectGet,
            variables: {}
        }
    }
})
export default class extends Vue {
    emotions = Config.emotions;
    Config = Config;

    projectVersionColumns = [
        { field: "version", name: "version", label: "버전", align: "left" },
        { field: "state", name: "state", label: "상태", align: "left" },
        { field: "reason", name: "reason", label: "반려 사유", align: "left" },
    ];

    projectGet: any;
    async created(){
        await this.$apollo.queries.projectGet.setVariables({game_id: Math.round((Number(this.$route.params.index)))});
        await this.$apollo.queries.projectGet.refetch();
    }

    get project() {
        if(this.projectGet.length == 0) {
            this.$router.go(-1);
        }
        return this.projectGet[0];
    }

    get hashTags(){
        return this.project.hashtags.split(',').map((item: any) => item.trim())
    }

    get iframeLink(){
        return process.env.VUE_APP_LAUNCHER_LINK + '?z_test_url=' + encodeURIComponent(this.project.game.url_game)
    }

    async hideGame(){
        Dialog.create({
            title: '비활성화',
            message: '정말로 비활성화하겠습니까?',
            cancel: true,
            persistent: true
        }).onOk(async () => {
            await this.$apollo.mutate({
                mutation: Query.gameHide,
                variables: {
                    id: this.project.game.id,
                },
            })

            this.$q.notify({
                type: "positive",
                message: "성공적으로 비활성화되었습니다.",
                position: "top"
            })

            await this.refresh();
        });
    }

    async showGame(){
        Dialog.create({
            title: '활성화',
            message: '정말로 활성화하겠습니까?',
            cancel: true,
            persistent: true
        }).onOk(async () => {
            await this.$apollo.mutate({
                mutation: Query.gameShow,
                variables: {
                    id: this.project.game.id,
                },
            })

            this.$q.notify({
                type: "positive",
                message: "성공적으로 활성화되었습니다.",
                position: "top"
            })

            await this.refresh();
        });
    }

    async punishGame( permanent : boolean ) {
        Dialog.create({
            title: `게임 ${this.project.title} ${ permanent ? '프로젝트' : '버전' } 제재`,
            message: '정말로 제재하겠습니까?',
            cancel: true,
            persistent: true
        }).onOk(async () => {
            let game_id = Math.round((Number(this.$route.params.index)));
            let title = `게임 ${ permanent ? '프로젝트' : '버전' } 정지 안내`;
            let content = `이용약관 위반 활동이 감지되어 게임 ${this.project.title} ${ permanent ? '프로젝트가' : `버전 ${this.project.game.version}이` } 정지 처리되었습니다.`;

            let result = await Api.punishGame( game_id, permanent, title, content );
            if( result ) {
                await this.$router.push("/game/challenge");
            }
        })

    }

    async moveGame(){
        Dialog.create({
            title: '정식게임으로 이동',
            message: '정말로 이동하겠습니까?',
            cancel: true,
            persistent: true
        }).onOk(async () => {
            await this.$apollo.mutate({
                mutation: Query.gameMoveOfficial,
                variables: {
                    id: this.project.game.id,
                },
            })

            this.$q.notify({
                type: "positive",
                message: "성공적으로 이동되었습니다.",
                position: "top"
            })

            await this.$router.push("/game/official");
        });
    }

    async refresh(){
        await this.$apollo.queries.projectGet.refetch();
    }
}
</script>
