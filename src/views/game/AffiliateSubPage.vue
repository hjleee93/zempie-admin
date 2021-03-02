<template>
    <div>
        <q-card v-if="!$apollo.queries.gameGet.loading">
            <q-card-section>
                <div class="text-h5 q-mb-md">
                    {{ game.title }} - {{ game.version }}
                </div>

                <div class="q-mb-md">
<!--                    <div class="text-h6">-->
<!--                        생성일-->
<!--                    </div>-->

                    <div>
                        {{ new Date(game.created_at).toLocaleString() }}
                    </div>
                </div>

                <div class="q-mb-md">
<!--                    <div class="text-h6">-->
<!--                        자세한 설명-->
<!--                    </div>-->

                    <div>
                        {{ game.description || "설명 없음" }}
                    </div>
                </div>

                <div class="q-mb-md">
<!--                    <div class="text-h6">-->
<!--                        태그-->
<!--                    </div>-->

                    <div v-if="game.hashtags.trim().length > 0">
                        <q-badge class="q-mr-sm" color="orange" :label="tag" v-for="tag in gameTags" :key="tag" />
                    </div>

                    <div v-else>없음</div>
                </div>

                <div class="q-mb-md" v-if="game.user != null">
                    <div class="text-h6">
                        개발자
                    </div>
                    <router-link :to="'/user/list/sub/' + game.user.id">
                        {{ game.user.name }}
                    </router-link>
                </div>

                <div class="row q-mb-md">
                    <div class="q-mr-md">
<!--                        <div class="text-h6">-->
<!--                            썸네일-->
<!--                        </div>-->

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
                    <div v-if="game.url_thumb_gif != null && game.url_thumb_gif !== ''">
<!--                        <div class="text-h6">-->
<!--                            움직이는 썸네일-->
<!--                        </div>-->

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
                        게임 공개 여부
                    </div>

                    <div>
                        {{ game.enabled ? '공개 중' : '비공개' }}
                    </div>
                </div>

                <div>
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
            </q-card-section>

            <q-separator />

            <q-card-section>
                <div class="row justify-end">
                    <div v-if="game.url_game != null">
                        <q-btn color="red" label="비활성화하기" @click="hideGame" v-if="game.enabled" />
                        <q-btn color="positive" label="활성화하기" @click="showGame" v-else />
                    </div>

                    <PopupForm btn-color="positive" btn-label="게임 정보 수정" @open="onOpenPopup">
                        <div class="q-mb-md row justify-start items-center">
                            <div class="col-12 col-md-2 text-weight-bold">
                                게임 제목 *
                            </div>

                            <div class="col-12 col-md-10">
                                <q-input type="text" v-model="updateData.title" placeholder="Title" />
                            </div>
                        </div>

                        <div class="q-mb-md row justify-start items-center">
                            <div class="col-12 col-md-2 text-weight-bold">
                                게임 URL *
                            </div>

                            <div class="col-12 col-md-10">
                                <q-input type="text" v-model="updateData.url_game" placeholder="URL" />
                            </div>
                        </div>

                        <div class="q-mb-md row justify-start items-center">
                            <div class="col-12 col-md-2 text-weight-bold">
                                접속주소 *
                            </div>

                            <div class="col-12 col-md-10">
                                <q-input type="text" v-model="updateData.pathname" placeholder="Pathname"  hint="영문과 숫자로 된 고유한 게임 아이디를 만듭니다. 만들어진 아이디는 게임 접속 주소등으로 사용됩니다." />
                            </div>
                        </div>

                        <div class="q-mb-md row justify-start items-center">
                            <div class="col-12 col-md-2 text-weight-bold">
                                자세한 설명
                            </div>

                            <div class="col-12 col-md-10">
                                <q-input type="textarea" v-model="updateData.description" placeholder="Description" />
                            </div>
                        </div>

                        <div class="q-mb-md row justify-start items-center">
                            <div class="col-12 col-md-2 text-weight-bold">
                                태그 *
                            </div>

                            <div class="col-12 col-md-10">
                                <q-input type="text" v-model="updateData.hashtags" placeholder="Tag" hint="게임을 검색할 수 있는 단어를 태그로 설정하세요. 여러개를 사용하는경우 , 로 구분해 주세요." />
                            </div>
                        </div>

                        <div class="q-mb-md row justify-start items-center">
                            <div class="col-12 col-md-2 text-weight-bold">
                                썸네일 이미지 *
                            </div>

                            <div class="col-12 col-md-10">
                                <q-input type="text" v-model="updateData.url_thumb" placeholder="Thumb1" />
                            </div>
                        </div>

                        <div class="q-mb-md row justify-start items-center">
                            <div class="col-12 col-md-2 text-weight-bold">
                                미리보기 이미지
                            </div>

                            <div class="col-12 col-md-10">
                                <q-input type="text" v-model="updateData.url_thumb_gif" placeholder="Thumb3" />
                            </div>
                        </div>

                        <div>
                            <q-btn color="positive" label="수정" @click="updateGame" />
                        </div>
                    </PopupForm>

                    <q-btn class="q-ml-md" color="red" label="삭제" @click="deleteGame" />
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
import PopupForm, {PopupBus} from "@/components/PopupForm.vue";

import Query from "../../query/AffiliateQuery";
import Api from "@/util/Api";

@Component({
    components: {
        PopupForm,
    },
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
        if(this.gameGet.length == 0) {
            this.$router.go(-1);
        }
        return this.gameGet[0];
    }

    get gameLink(){
        return process.env.VUE_APP_ZEMPIE_LINK + '/play/' + this.game.pathname;
    }

    get gameTags(){
        return this.game.hashtags.split(',').map((item: any) => item.trim())
    }

    get iframeLink(){
        return process.env.VUE_APP_LAUNCHER_LINK + '?z_test_url=' + encodeURIComponent(this.game.url_game)
    }

    async hideGame(){
        Dialog.create({
            title: '비활성화',
            message: '정말로 비활성화 하겠습니까?',
            cancel: true,
            persistent: true
        }).onOk(async () => {
            const result = Api.updateActivatedGame( this.gameGet[0].id, false );

            if( result ) {
                this.$q.notify({
                    type: "positive",
                    message: "성공적으로 비활성화되었습니다.",
                    position: "top"
                })

                await this.refresh();
            }
        });
    }

    async showGame(){
        Dialog.create({
            title: '활성화',
            message: '정말로 활성화하겠습니까?',
            cancel: true,
            persistent: true
        }).onOk(async () => {
            const result = Api.updateActivatedGame( this.gameGet[0].id, true );

            if( result ) {
                this.$q.notify({
                    type: "positive",
                    message: "성공적으로 활성화되었습니다.",
                    position: "top"
                })

                await this.refresh();
            }
        });
    }

    async deleteGame(){
        Dialog.create({
            title: '삭제',
            message: '정말로 삭제하겠습니까?',
            cancel: true,
            persistent: true
        }).onOk(async () => {
            const result = await Api.deleteAffiliateGame( this.gameGet[0].id );

            if( result ) {
                await this.$router.push( "/game/affiliate" );
            }
        });
    }

    updateData : any = {
        pathname : '',
        title : '',
        description : '',
        hashtags : '',
        url_game : '',
        url_thumb : '',
        url_thumb_webp : '',
        url_thumb_gif : '',
    };
    onOpenPopup() {
        this.updateData.pathname = this.game.pathname;
        this.updateData.title = this.game.title;
        this.updateData.description = this.game.description;
        this.updateData.hashtags = this.game.hashtags;
        this.updateData.url_game = this.game.url_game;
        this.updateData.url_thumb = this.game.url_thumb;
        this.updateData.url_thumb_webp = this.game.url_thumb_webp;
        this.updateData.url_thumb_gif = this.game.url_thumb_gif;

        console.log(this.updateData);
    }

    async updateGame() {
        console.log(this.updateData);
        const result = await Api.updateAffiliateGame(
            Math.round((Number(this.$route.params.index))),
            this.updateData.pathname,
            this.updateData.title,
            this.updateData.description,
            this.updateData.hashtags,
            this.updateData.url_game,
            this.updateData.url_thumb,
            this.updateData.url_thumb_webp,
            this.updateData.url_thumb_gif,
        );
        if( result ) {
            PopupBus.$emit('close');
            await this.refresh();
        }
    }

    async refresh(){
        await this.$apollo.queries.gameGet.refetch();
    }
}
</script>
