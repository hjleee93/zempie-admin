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
        { field: "title", name: "title", label: "제목", align: "left", event: true },
        { field: "developer", name: "developer", label: "개발자", align: "left" },
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
