<template>
    <div>
        <MainTable
            columnName="games"
            :columns="columns"
            apiLink="games"
            search-column="title"
            :data="{category:0}"
            @subEvent="subEvent"
        >

        </MainTable>
<!--        <div >-->
<!--            <GraphqlTable-->
<!--            :query="Query.getChallengeGameTable"-->
<!--            :columns="columns"-->
<!--            columnName="game"-->
<!--            @subEvent="subEvent"-->
<!--            :exportMode="true"-->
<!--            filename="도전 게임">-->

<!--            </GraphqlTable>-->
<!--        </div>-->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GraphqlTable from "@/components/GraphqlTable.vue";
import MainTable from "@/components/MainTable.vue";
import Query from "@/util/Query";


@Component({
    components: {
        GraphqlTable,
        MainTable
    },
    apollo: {
    }
})
export default class extends Vue {
    Query = Query;
    gameGet: any;

    columns = [
        { field: "id", name: "id", label: "#", align: "left" },
        { field: "url_thumb", name: "url_thumb", label: "썸네일", align: "left" },
        { field: "title", name: "title", label: "제목", align: "left", event: true },
        {
            field: "user", name: "user", label: "개발자", align: "left",
            format: (data : any) => data.name || '없음',
        },
        { field: "count_over", name: "count_over", label: "플레이 수", align: "left", sortable: true, sort: () => null },
        { field: "count_heart", name: "count_heart", label: "하트 수", align: "left", sortable: true, sort: () => null },
        { field: "version", name: "version", label: "버전", align: "left" },
        { field: "created_at", name: "created_at", label: "등록일", align: "left" },
        {
            field: "enabled", name: "enabled", label: "공개 상태", align: "left",
            format: (data : any) => data ? '공개 중' : '비공개',
            badge : true,
            badgeColor : (data : any) => data ? 'positive' : 'grey',
        },
    ];

    subEvent( rows: any ){
        this.$router.push("/game/challenge/sub/" + rows.id);
    }
}
</script>
