<template>
    <GraphqlTable
        :query="Query.gameListGetOptionAxios"
        :columns="columns"
        rowKey="id"
        columnName="game"
        @subEvent="subEvent">
        <PopupForm
            btn-color="primary"
            btn-label="엑셀 파일로 제휴게임 추가하기"
        >
            <q-file filled bottom-slots v-model="file" label="File" counter max-files="1" :disable="waiting">
                <template v-slot:append>
                    <q-icon v-if="file !== null" name="close" @click.stop="file = null" class="cursor-pointer" />
                </template>

                <template v-slot:after>
                    <q-btn :disable="file == null || waiting" class="q-pa-sm" color="primary" @click="upload" >
                        <div v-if="!waiting">
                            업로드
                        </div>
                        <q-spinner
                            color="white"
                            size="1em"
                            v-else
                        />
                    </q-btn>
                </template>
            </q-file>
        </PopupForm>
        <q-btn label="제휴게임 추가하기" color="primary" @click="moveCreatePage" class="q-ml-md" />
    </GraphqlTable>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator"
import GraphqlTable, { TableBus } from '@/components/GraphqlTable.vue';
import PopupForm, { PopupBus } from "@/components/PopupForm.vue";
import Query from "../../query/AffiliateQuery";
// @ts-ignore
import readXlsxFile from 'read-excel-file';
import Api from "@/util/Api";


@Component({
    components : {
        GraphqlTable: GraphqlTable,
        PopupForm
    }
})
export default class AffiliatePage extends Vue {
    Query = Query;

    columns = [
        { field: "id", name: "id", label: "#", align: "left", sortable: true, sort: () => null },
        { field: "url_thumb", name: "url_thumb", label: "썸네일", align: "left" },
        { field: "title", name: "title", label: "제목", align: "left", sortable: true, sort: () => null, event: true },
        { field: "created_at", name: "created_at", label: "등록일", align: "left", sortable: true, sort: () => null },
        { field: "state", name: "state", label: "상태", align: "left" },
    ];

    moveCreatePage() {
        this.$router.push( this.$route.path + "/create" );
    }

    subEvent( rows: any ){
        this.$router.push("/game/affiliate/sub/" + rows.id);
    }


    file : File | null = null
    waiting = false;

    async upload() {
        if( this.file == null ) {
            return;
        }
        this.waiting = true;

        const schema = {
            '게임명' : {
                prop: "title",
                type: String
            },
            '영어명' : {
                prop: 'pathname',
                type: String
            },
            '썸네일 링크' : {
                prop: 'thumb1',
                type: String
            },
            '게임 링크' : {
                prop: 'url',
                type: String
            },
            '게임설명' : {
                prop: 'description',
                type: String
            },
            '태그' : {
                prop: 'tag',
                type: String
            },

        }
        const result = await readXlsxFile(this.file, {schema});
        console.log(result);
        for( let i = 0; i < result.rows.length; i++ ) {
            await Api.addAffiliateGame(
                result.rows[i].pathname,
                result.rows[i].title,
                result.rows[i].description,
                result.rows[i].tag,
                result.rows[i].url,
                result.rows[i].thumb1,
                '',
                ''
            );
        }


        TableBus.$emit('reload');
        PopupBus.$emit('close');
        this.waiting = false;
    }
}
</script>

<style scoped>

</style>