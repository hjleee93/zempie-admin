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
                    <b class="q-mr-sm">
                        카테고리
                    </b>
                    <span>
                        {{ gameCategory[project.game.category] || gameCategory[category] }}
                        <q-icon name="edit"/>
                        <q-popup-edit v-model="category" title="카테고리 변경" auto-save>
                            <q-select v-model="category" :options="options">
                            <template v-slot:after>
                            <q-btn @click="updateCategory" label="save" color="primary"></q-btn>
                                </template>
                            </q-select>
                        </q-popup-edit>
                    </span>
                </div>
                <div class="q-mb-md">
                    <b class="q-mr-sm">
                        수상 여부(Award)
                    </b>
                    <span>
                       {{ project.game.gameJam && project.game.gameJam.is_awarded ? '수상' : '미수상' }}
                        <q-icon name="edit"/>
                        <q-popup-edit v-model="is_awarded" title="수상여부 변경" auto-save>
                            <q-toggle v-model="is_awarded" label="수상">
                                <q-btn class="q-ml-sm" @click="updateAwards" label="save" color="primary"></q-btn>
                             </q-toggle>
                        </q-popup-edit>
                    </span>
                </div>


                <div class="q-mb-md">
                    <!--                    <div class="text-h6">-->
                    <!--                        자세한 설명-->
                    <!--                    </div>-->

                    <div>
                        {{ project.description || "없음" }}
                    </div>
                </div>

                <div class="q-mb-md">
                    <!--                    <div class="text-h6">-->
                    <!--                        태그-->
                    <!--                    </div>-->

                    <div v-if="project.hashtags.trim().length > 0">
                        <q-badge class="q-mr-sm" color="orange" text-color="black" :label="tag" v-for="tag in hashTags"
                                 :key="tag"/>
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
                        <div class="text-h6">
                            썸네일
                        </div>

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
                        <div class="text-h6">
                            움직이는 썸네일
                        </div>

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
                    <q-table
                        :data="projectVersions"
                        :columns="projectVersionColumns"
                    >
                        <template v-slot:body-cell="props">
                            <q-td :props="props">
                                <div v-if="props.col.event">
                                    <q-btn
                                        v-if="props.row[props.col.field] && props.row[props.col.field] === 'punish'"
                                        color="red"
                                        @click="punishVersion(props.row)"
                                    >
                                        제재하기
                                    </q-btn>
                                    <q-btn
                                        v-if="props.row[props.col.field] && props.row[props.col.field] === 'release'"
                                        color="positive"
                                        @click="releaseVersion(props.row)"
                                    >
                                        제재 취소
                                    </q-btn>
                                    <q-btn
                                        v-if="props.row[props.col.field] && props.row[props.col.field] === 'release'"
                                        color="positive"
                                        @click="releaseVersion(props.row)"
                                    >
                                        제재 취소
                                    </q-btn>
                                </div>
                                <div v-else>
                                    <div>
                                        {{ props.row[props.col.field] }}
                                    </div>
                                </div>
                            </q-td>
                        </template>
                    </q-table>
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

            <q-separator/>

            <q-card-section>
                <div class="row justify-end" v-if="Config.projectState[project.state] !== '영구정지'">
                    <div v-if="project.game.url_game != null">
                        <q-btn class="q-mr-md" color="red" label="비활성화하기" @click="hideGame"
                               v-if="project.game.enabled"/>
                        <q-btn class="q-mr-md" color="positive" label="활성화하기" @click="showGame" v-else/>
                    </div>

                    <q-btn class="q-mr-md" color="red" label="프로젝트 제재" @click="punishGame"/>
                    <q-btn color="grey" label="도전게임으로 이동" @click="moveGame"/>
                </div>
                <div class="row justify-end" v-else>
                    <q-btn class="q-mr-md" color="positive" label="프로젝트 제재 취소" @click="releaseGame"/>
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
import {Component, Vue} from "vue-property-decorator";
import {Dialog} from "quasar";

import Query from "@/util/Query";
import Config from "@/util/Config";
import Api from "@/util/Api";


enum eGameCategory {
    Challenge,
    Certified,
    Affiliated,
    ZemJam
}

@Component({
    components: {},
    apollo: {
        projectGet: {
            query: Query.getGameById,
            variables: {}
        },
    }
})
export default class extends Vue {
    gameCategory: any = eGameCategory;
    emotions = Config.emotions;
    Config = Config;

    projectGet: any;
    category: any = '카테고리선택';
    is_awarded: boolean = false;

    options = [{label: '게임젬', value: 3}, {label: '젬파이게임', value: 0}]

    async created() {
        await this.$apollo.queries.projectGet.setVariables({game_id: Math.round((Number(this.$route.params.index)))});
        await this.$apollo.queries.projectGet.refetch();
    }

    get project() {
        if (this.projectGet.length == 0) {
            this.$router.go(-1);
        }
        return this.projectGet[0];
    }

    projectVersionColumns = [
        {field: "version", name: "version", label: "버전", align: "left"},
        {field: "state", name: "state", label: "상태", align: "left"},
        {field: "reason", name: "reason", label: "반려 사유", align: "left"},
        {field: "punish", name: "punish", label: "제재", align: "left", event: true},
    ];

    get projectVersions() {
        return this.project.projectVersions.map((version: any) => {
            if (version.state == 'passed' || version.state == 'deploy') {
                version.punish = 'punish';
            }
            else if (version.state == 'ban') {
                version.punish = 'release';
            }

            return version;
        })
    }

    get hashTags() {
        return this.project.hashtags.split(',').map((item: any) => item.trim())
    }

    get iframeLink() {
        return process.env.VUE_APP_LAUNCHER_LINK + '?z_test_url=' + encodeURIComponent(this.project.game.url_game)
    }

    async hideGame() {
        Dialog.create({
            title: '비활성화',
            message: '정말로 비활성화 하겠습니까?',
            cancel: true,
            persistent: true
        }).onOk(async () => {
            const result = await Api.updateActivatedGame(this.project.game.id, false);

            if (result) {
                this.$q.notify({
                    type: "positive",
                    message: "성공적으로 비활성화되었습니다.",
                    position: "top"
                })

                await this.refresh();
            }
        });
    }

    async showGame() {
        Dialog.create({
            title: '활성화',
            message: '정말로 활성화하겠습니까?',
            cancel: true,
            persistent: true
        }).onOk(async () => {
            const result = await Api.updateActivatedGame(this.project.game.id, true);

            if (result) {
                this.$q.notify({
                    type: "positive",
                    message: "성공적으로 활성화되었습니다.",
                    position: "top"
                })

                await this.refresh();
            }
        });
    }

    punishVersion(row: any) {
        Dialog.create({
            title: `게임 프로젝트 버전 제재`,
            message: '정말로 해당 버전을 제재하겠습니까?',
            cancel: true,
            persistent: true
        }).onOk(async () => {
            let game_id = Math.round((Number(this.$route.params.index)));
            let title = `게임 프로젝트 버전 정지 안내`;
            let content = `이용약관 위반 활동이 감지되어 게임 ${this.project.name} 버전 ${row.version}이 정지 처리되었습니다.`;

            let result = await Api.punishGame(game_id, false, title, content, row.id);
            if (result) {
                // await this.$router.push("/game/challenge");
                await this.refresh();
            }
        })
    }

    async punishGame() {
        Dialog.create({
            title: `게임 프로젝트 제재`,
            message: '정말로 제재하겠습니까?',
            cancel: true,
            persistent: true
        }).onOk(async () => {
            let game_id = this.project.game.id;
            let title = `게임 프로젝트 정지 안내`;
            let content = `이용약관 위반 활동이 감지되어 게임 ${this.project.name} 프로젝트가 정지 처리되었습니다.`;

            let result = await Api.punishGame(game_id, true, title, content);
            if (result) {
                await this.refresh();
            }
        })
    }

    releaseVersion(row: any) {
        Dialog.create({
            title: `게임 프로젝트 버전 제재 취소`,
            message: '정말로 해당 버전을 제재 취소하시겠습니까?',
            cancel: true,
            persistent: true
        }).onOk(async () => {
            let result = await Api.releasePunishGame(row.id, false);
            if (result) {
                await this.refresh();
            }
        })
    }

    releaseGame() {
        Dialog.create({
            title: `게임 프로젝트 제재 취소`,
            message: '정말로 제재 취소하시겠습니까?',
            cancel: true,
            persistent: true
        }).onOk(async () => {
            console.log(this.project.id);
            let result = await Api.releasePunishGame(this.project.id, true);
            if (result) {
                await this.refresh();
            }
        })
    }

    async moveGame() {
        Dialog.create({
            title: '도전게임으로 이동',
            message: '정말로 이동하겠습니까?',
            cancel: true,
            persistent: true
        }).onOk(async () => {
            const result = await Api.updateCategoryGame(this.project.game.id, 0);
            if (result) {
                this.$q.notify({
                    type: "positive",
                    message: "성공적으로 이동되었습니다.",
                    position: "top"
                })

                await this.$router.push("/game/challenge");
            }
        });
    }

    updateCategory() {
        if (this.category.value) {
            const payload = {
                game_id: this.project.game.id,
                category: this.category.value
            }
            this.$api.updateGame(payload)
                .then((res) => {
                    this.$q.notify({
                        type: "positive",
                        message: "성공적으로 변경되었습니다.",
                        position: "top"
                    })
                })
                .catch((err) => {
                    this.$q.notify({
                        type: "negative",
                        message: err.message,
                        position: "top"
                    })
                })
        }
    }

    updateAwards(){
        const payload={
            is_awarded:this.is_awarded,
            game_id: this.project.game.id,
        }

        this.$api.updateAwards(payload)
            .then((res) => {
                this.$q.notify({
                    type: "positive",
                    message: "수상 상태가 변경되었습니다.",
                    position: "top"
                })
                this.is_awarded = !this.is_awarded
            })
            .catch((err) => {
                this.$q.notify({
                    type: "negative",
                    message: err.message,
                    position: "top"
                })
            })
    }

    async refresh() {
        await this.$apollo.queries.projectGet.refetch();
    }
}
</script>
