<template>
    <div>
        <div v-if="!$apollo.queries.gameGet.loading">
            <GraphqlTable 
            rowKey="id" 
            :query="Query.gameListGetOptionAxios" 
            :columns="columns" 
            columnName="game"
            @subEvent="subEvent"
            :exportMode="true"
            filename="도전 게임">

            </GraphqlTable>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GraphqlTable from "@/components/GraphqlTable.vue";

import Query from "../../query/ChallengeGameQuery";


@Component({
    components: {
        GraphqlTable
    },
    apollo: {
        gameGet: Query.gameListGet
    }
})
export default class extends Vue {
    Query = Query;
    gameGet: any;

    columns = [
        { field: "id", name: "id", label: "#", align: "left" },
        { field: "url_thumb", name: "url_thumb", label: "썸네일", align: "left" },
        { field: "title", name: "title", label: "제목", align: "left", event: true },
        { field: "developer", name: "developer", label: "개발자", align: "left" },
        { field: "count_over", name: "count_over", label: "플레이 수", align: "left", sortable: true, sort: () => null },
        { field: "count_heart", name: "count_heart", label: "하트 수", align: "left", sortable: true, sort: () => null },
        { field: "version", name: "version", label: "버전", align: "left" },
        { field: "created_at", name: "created_at", label: "등록일", align: "left" },
        { field: "state", name: "state", label: "상태", align: "left" },
    ];

    created(){
        this.$apollo.queries.gameGet.refetch();
    }

    subEvent( rows: any ){
        this.$router.push("/game/challenge/sub/" + rows.id);
    }
}
</script>
