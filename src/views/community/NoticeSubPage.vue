<template>
    <div>
        <div v-if="!$apollo.queries.noticeGet.loading">
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

            <div class="q-mb-md">
                <q-editor v-model="content" min-height="10rem" />
            </div>

            <div class="row">
                <q-btn class="q-pl-md q-pr-md q-mr-md" color="grey" label="취소" />
                <q-btn class="q-pl-md q-pr-md q-mr-md" color="positive" label="수정" :disable="submitDisble" @click="test" />
                <q-btn class="q-pl-md q-pr-md" color="red" label="삭제" />
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
import Config from "@/util/Config";

import gql from "graphql-tag";
import Query from "../../query/NoticeQuery";

@Component({
    components: {},
    apollo: {
        noticeGet: {
            query: Query.noticeGetById,
            variables: {}
        }
    }
})
export default class extends Vue {
    noticeGet: any;
    async created(){
        await this.$apollo.queries.noticeGet.setVariables({id: Math.round((Number(this.$route.params.index)))});
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

    test(){
        console.log(this.title, this.content);
    }

    async deleteNotice(){
        Dialog.create({
            title: '삭제',
            message: '정말로 삭제하겠습니까?',
            cancel: true,
            persistent: true
        }).onOk(async () => {
            const data = await this.$apollo.mutate({
                mutation: Query.noticeDelete,
                variables: {
                    id: Math.round(this.noticeGet[0].id),
                },
            })

            await this.refresh();
        });
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
