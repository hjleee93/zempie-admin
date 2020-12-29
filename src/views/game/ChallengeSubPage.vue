<template>
    <div>
        <div v-if="!$apollo.queries.gameGet.loading">
            <!-- {{
                gameGet
            }} -->

            <div class="text-h5 q-mb-md">
                {{ game.title }} - {{ game.version }}
            </div>

            <div class="q-mb-md">
                <div class="text-h6">
                    생성일
                </div>

                <div>
                    {{ new Date(game.created_at).toLocaleString() }}
                </div>
            </div>

            <div class="q-mb-md">
                <div class="text-h6">
                    자세한 설명
                </div>

                <div>
                    {{ game.description }}
                </div>
            </div>

            <div class="q-mb-md">
                <div class="text-h6">
                    상태
                </div>
                <div>
                    {{ game.enabled ? '배포 중' : '대기 중' }}
                </div>
            </div>

            <div class="q-mb-md">
                <div class="text-h6">
                    태그
                </div>

                <div v-if="game.hashtags.trim().length > 0">
                    <q-badge class="q-mr-sm" color="orange" text-color="black" :label="tag" v-for="tag in gameTags" :key="tag" />
                </div>
                <div v-else>
                    없음
                </div>
            </div>

            <div class="q-mb-md">
                <div class="text-h6">
                    개발자
                </div>
                <router-link :to="'/user/list/sub/' + game.user.id">
                    {{ game.user.name }}
                </router-link>
            </div>

            <div class="q-mb-md">
                <div class="q-mr-md">
                    <div class="text-h6">
                        썸네일
                    </div>

                    <div class="row justify-center items-center" :style="`width: 250px; height: 250px; `">
                        <q-img
                            :src="game.url_thumb"
                            :ratio="1"
                            spinner-color="primary"
                            spinner-size="82px"
                            width="100%"
                        />
                    </div>
                </div>
                <div v-if="game.url_thumb_gif != null">
                    <div class="text-h6">
                        움직이는 썸네일
                    </div>

                    <div class="row justify-center items-center" style="width: 250px; height: 250px;">
                        <q-img
                            :src="game.url_thumb_gif"
                            :ratio="1"
                            spinner-color="primary"
                            spinner-size="82px"
                            width="100%"
                        />
                    </div>
                </div>
            </div>

            <div class="q-mb-md">
                <div class="text-h6">
                    게임 플레이
                </div>
                <div v-if="game.url_game != null">
                    <iframe ref="game" :src="iframeLink" frameborder="0" width="100%" height="1000px"></iframe>
                </div>
                <div v-else>
                    플레이 불가
                </div>
            </div>

            <div class="q-mb-md">
                <div class="text-h6">
                    게임 컨트롤
                </div>

                <div>
                    <div v-if="game.url_game != null" class="float-left">
                        <q-btn class="q-mr-md" color="red" label="비활성화" @click="hideGame" v-if="game.enabled" />
                        <q-btn class="q-mr-md" color="positive" label="활성화" @click="showGame" v-else />
                    </div>

                    <q-btn class="q-mr-md" color="red" label="삭제" @click="deleteGame" />
                    <q-btn class="q-mr-md" color="grey" label="정식게임으로 이동" @click="moveGame" />
                </div>
            </div>
        </div>

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

import gql from "graphql-tag";
import { QueryOptions } from "apollo-boost";
import Query from "../../query/ChallengeGameQuery";

@Component({
    components: {},
    apollo: {
        gameGet: {
            query: Query.gameGetById,
            variables: {}
        }
    }
})
export default class extends Vue {
    gameGet: any;
    async created(){
        await this.$apollo.queries.gameGet.setVariables({id: Math.round((Number(this.$route.params.index)))});
        await this.$apollo.queries.gameGet.refetch();
    }

    get game(){
        return this.gameGet[0];
    }

    get gameLink(){
        return process.env.VUE_APP_ZEMPIE_LINK + 'play/' + this.game.pathname;
    }

    get gameTags(){
        return this.game.hashtags.split(',').map((item: any) => item.trim())
    }

    get iframeLink(){
        return process.env.VUE_APP_LAUNCHER_LINK + encodeURIComponent(this.game.url_game)
    }

    async hideGame(){
        Dialog.create({
            title: '숨김',
            message: '정말로 숨기겠습니까?',
            cancel: true,
            persistent: true
        }).onOk(async () => {
            const data = await this.$apollo.mutate({
                mutation: Query.gameHide,
                variables: {
                    id: Math.round(this.gameGet[0].id),
                },
            })

            await this.refresh();
        });
    }

    async showGame(){
        Dialog.create({
            title: '숨김',
            message: '정말로 숨기겠습니까?',
            cancel: true,
            persistent: true
        }).onOk(async () => {
            const data = await this.$apollo.mutate({
                mutation: Query.gameShow,
                variables: {
                    id: Math.round(this.gameGet[0].id),
                },
            })

            await this.refresh();
        });
    }

    async deleteGame(){
        Dialog.create({
            title: '삭제',
            message: '정말로 삭제하겠습니까?',
            cancel: true,
            persistent: true
        }).onOk(async () => {
            const data = await this.$apollo.mutate({
                mutation: Query.gameDelete,
                variables: {
                    id: Math.round(this.gameGet[0].id),
                },
            })

            this.$router.push("/game/challenge");
        });
    }

    async moveGame(){
        Dialog.create({
            title: '정식게임으로 이동',
            message: '정말로 이동하겠습니까?',
            cancel: true,
            persistent: true
        }).onOk(async () => {
            const data = await await this.$apollo.mutate({
                mutation: Query.gameMoveOfficial,
                variables: {
                    id: Math.round(this.gameGet[0].id),
                },
            })

            this.$router.push("/game/official");
        });
    }

    async refresh(){
        await this.$apollo.queries.gameGet.refetch();
    }
}
</script>
