<template>
    <GraphqlTable
        :query="Query.gameListGetOptionAxios"
        :columns="columns"
        rowKey="id"
        columnName="game"
        @subEvent="subEvent"
        :export-mode="true"
        filename="제휴 게임">
        <q-btn label="제휴게임 추가하기" color="primary" @click="moveCreatePage" class="q-ml-md" />
    </GraphqlTable>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator"
import GraphqlTable from '@/components/GraphqlTable.vue';

import Query from "../../query/AffiliateQuery";

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
        { field: "developer", name: "developer", label: "개발자", align: "left" },
        { field: "version", name: "version", label: "버전", align: "left" },
        { field: "created_at", name: "created_at", label: "등록일", align: "left", sortable: true, sort: () => null },
        { field: "state", name: "state", label: "상태", align: "left" },
    ];

    moveCreatePage() {
        this.$router.push( this.$route.path + "/create" );
    }

    subEvent( rows: any ){
        this.$router.push("/game/affiliate/sub/" + rows.id);
    }
}
</script>

<style scoped>

</style>