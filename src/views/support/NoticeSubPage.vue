<template>
    <div>
        <q-card v-if="!$apollo.queries.noticeGet.loading">
            <q-card-section>
                <div class="q-mb-md row justify-start items-center">
                    <div class="col-12 col-md-2 text-weight-bold">
                        제목
                    </div>
                    
                    <div class="col-12 col-md-10">
                        <q-input v-model="title" placeholder="Title" />
                    </div>
                </div>

                <div class="row justify-start q-mb-md items-center">
                    <div class="col-12 col-md-2 text-weight-bold">
                        카테고리
                    </div>

                    <div class="col-12 col-md-10">
                        <q-select v-model="category" :options="options" />
                    </div>
                </div>

                <div>
                    <q-editor v-model="content" min-height="10rem" />
                </div>
            </q-card-section>

            <q-separator />

            <q-card-section>
                <div class="row justify-end">
                    <q-btn class="q-pl-md q-pr-md q-mr-md" color="grey" outline label="취소" @click="cancel" />
                    <q-btn class="q-pl-md q-pr-md q-mr-md" color="positive" label="수정" :disable="submitDisble" @click="editNotice" />
                    <q-btn class="q-pl-md q-pr-md" color="red" label="삭제" @click="deleteNotice" />
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
import Config from "@/util/Config";

import gql from "graphql-tag";
import Query from "@/util/Query";
import Api from "@/util/Api";

@Component({
    components: {},
    apollo: {
        noticeGet: {
            query: Query.getNoticeById,
            variables: {}
        }
    }
})
export default class extends Vue {
    noticeGet: any;
    async created(){
        await this.$apollo.queries.noticeGet.setVariables({id: Math.round(Number(this.$route.params.index))});
        await this.refresh();
    }

    get notice(){
        return this.noticeGet[0];
    }

    get options(){
        return Config.noticeCategory;
    }

    get submitDisble(){
        return this.title.trim() == "" || this.content.trim() == "";
    }

    deleteProcess = false
    async deleteNotice(){
        if(!this.deleteProcess){
            Dialog.create({
                title: '삭제',
                message: '정말로 삭제하겠습니까?',
                cancel: true,
                persistent: true
            }).onOk(async () => {
                const result = await Api.deleteNotice( this.noticeGet[0].id );
                if( result ) {
                    this.$router.push("/support/notice");
                }
            });
        }else{
            this.$q.notify({
                type: "negative",
                message: "서버 응답 대기중.",
                position: "top"
            })
        }
    }

    editProcess = false
    async editNotice(){
        if(!this.editProcess){
            Dialog.create({
                title: '수정',
                message: '정말로 수정하겠습니까?',
                cancel: true,
                persistent: true
            }).onOk(async () => {
                const result = await Api.modifyNotice( this.noticeGet[0].id, this.title, this.content, Config.noticeCategory.indexOf(this.category) );
                if( result ) {
                    await this.refresh();
                }
            });
        }else{
            this.$q.notify({
                type: "negative",
                message: "서버 응답 대기중.",
                position: "top"
            })
        }
    }

    cancel(){
        this.$router.go(-1);
    }

    title = "";
    category = "";
    content = "";

    async refresh(){
        await this.$apollo.queries.noticeGet.refetch();
        this.title = this.notice.title;
        this.category = Config.noticeCategory[this.notice.category];
        this.content = this.notice.content;
    }
}
</script>
