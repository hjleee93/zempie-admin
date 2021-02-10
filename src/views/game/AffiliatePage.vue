<template>
    <GraphqlTable
        :query="Query.gameListGetOptionAxios"
        :columns="columns"
        rowKey="id"
        columnName="game"
        @subEvent="subEvent">
        <q-btn label="제휴게임 추가하기" color="primary" @click="moveCreatePage" class="q-ml-md" />
        <q-btn label="엑셀 파일로 제휴게임 추가하기" color="primary" @click="openCreatePopup" class="q-ml-md" />

        <q-dialog v-model="popup" persistent>
            <q-card class="my-card" style="width: 1200px;">
                <q-card-section>
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
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn v-close-popup color="red" label="닫기" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </GraphqlTable>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator"
import GraphqlTable, {TableBus} from '@/components/GraphqlTable.vue';
import Query from "../../query/AffiliateQuery";
import readXlsxFile from 'read-excel-file';
import Api from "@/util/Api";


@Component({
    components : {
        GraphqlTable: GraphqlTable
    }
})
export default class AffiliatePage extends Vue {
    Query = Query;

    columns = [
        { field: "id", name: "id", label: "#", align: "left", sortable: true, sort: () => null },
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


    popup = false;
    file : File | null = null
    waiting = false;
    openCreatePopup() {
        this.popup = true;
    }

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
        this.popup = false;
        this.waiting = false;
    }
}
</script>

<style scoped>

</style>