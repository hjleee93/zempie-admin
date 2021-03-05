<template>
    <div>
        <GraphqlTable
            row-key="id"
            :columns="columns"
            column-name="userReport"
            :query="Query.getReportTable"
            @subEvent="subEvent"
        >

        </GraphqlTable>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GraphqlTable from "@/components/GraphqlTable.vue";
import Query from "@/util/Query";
import Config from "@/util/Config";

@Component({
    components : {
        GraphqlTable,
    }
})
export default class  extends Vue {
    Query = Query;
    columns = [
        { field: "id", name: "id", label: "#", align: "left", sortable: true, sort: () => null },
        {
            field: "game", name: "game", label: "신고된 게임", align: "left", event : true,
            format: (data : any) => data.title || '없음'
        },
        { field: "reason", name: "reason", label: "신고 사유", align: "left" },
        {
          field: "is_done", name: "is_done", label: "해결 상태", align: "left",
          format: (data : any) => data ? '해결' : '해결되지 않음',
          badge: true,
          badgeColor: (data : any) => data ? 'positive' : 'red',
        },
        { field: "url_img", name: "url_img", label: "첨부 이미지", align: "left" },
        { field: "created_at", name: "created_at", label: "생성일", align: "left", sortable: true, sort: () => null },
        {
            field: "reason_num", name: "reason_num", label: "신고사유", align: "left",
            format: (data : any) => data.split(",").map((num : number) => Config.reportGameReason[num]).join(','),
        },
    ];

    subEvent(row : any) {
        console.log(row);

        if( row.category == 1 ) {
            this.$router.push( '/game/official/sub/' + row.target_id );
        } else {
            this.$router.push( '/game/challenge/sub/' + row.target_id );
        }
    }
}
</script>

<style scoped>

</style>