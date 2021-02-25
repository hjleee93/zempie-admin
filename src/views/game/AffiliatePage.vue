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
            <ExcelUploader :schema="schema" @upload="upload" />
        </PopupForm>
        <q-btn label="제휴게임 추가하기" color="primary" @click="moveCreatePage" class="q-ml-md" />
    </GraphqlTable>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator"
import GraphqlTable, { TableBus } from '@/components/GraphqlTable.vue';
import PopupForm, { PopupBus } from "@/components/PopupForm.vue";
import Query from "../../query/AffiliateQuery";
import Api from "@/util/Api";
import ExcelUploader from "@/components/ExcelUploader.vue";


@Component({
    components : {
        GraphqlTable,
        PopupForm,
        ExcelUploader
    }
})
export default class AffiliatePage extends Vue {
    Query = Query;

    columns = [
        { field: "id", name: "id", label: "#", align: "left", sortable: true, sort: () => null },
        { field: "url_thumb", name: "url_thumb", label: "썸네일", align: "left" },
        { field: "title", name: "title", label: "제목", align: "left", sortable: true, sort: () => null, event: true },
        { field: "created_at", name: "created_at", label: "등록일", align: "left", sortable: true, sort: () => null },
        { field: "state", name: "state", label: "공개 상태", align: "left" },
    ];

    moveCreatePage() {
        this.$router.push( this.$route.path + "/create" );
    }

    subEvent( rows: any ){
        this.$router.push("/game/affiliate/sub/" + rows.id);
    }

    schema = {
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


    async upload( data : any ) {
        for( let i = 0; i < data.rows.length; i++ ) {
            await Api.addAffiliateGame(
                data.rows[i].pathname,
                data.rows[i].title,
                data.rows[i].description,
                data.rows[i].tag,
                data.rows[i].url,
                data.rows[i].thumb1,
                '',
                '',
            );
        }

        TableBus.$emit('reload');
        PopupBus.$emit('close');
    }
}
</script>

<style scoped>

</style>