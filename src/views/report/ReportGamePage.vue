<template>
    <div>
        <GraphqlTable
            row-key="id"
            :columns="columns"
            column-name="userReport"
            :query="Query.gameReportGetOptionAxios"
            @subEvent="subEvent"
        >

        </GraphqlTable>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GraphqlTable from "@/components/GraphqlTable.vue";
import Query from "@/query/ReportQuery";

@Component({
    components : {
        GraphqlTable,
    }
})
export default class  extends Vue {
    Query = Query;
    columns = [
        { field: "id", name: "id", label: "#", align: "left", sortable: true, sort: () => null },
        { field: "user_name", name: "user_name", label: "신고자", align: "left" },
        { field: "game_title", name: "game_title", label: "신고된 게임", align: "left" },
        { field: "reason", name: "reason", label: "신고 사유", align: "left" },
        { field: "is_done", name: "is_done", label: "해결 상태", align: "left" },
        { field: "url_img", name: "url_img", label: "첨부 이미지", align: "left" },

        { field: "created_at", name: "created_at", label: "생성일", align: "left", sortable: true, sort: () => null },
    ];

    subEvent(row : any) {
        console.log(row);
    }
}
</script>

<style scoped>

</style>