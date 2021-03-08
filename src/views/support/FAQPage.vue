<template>
    <div>
        <GraphqlTable
        :query="Query.getFaqTable"
        :columns="columns" 
        columnName="faq" 
        @subEvent="subEvent"
        >
            <q-btn class="q-mr-sm" color="primary" label="새 FAQ작성" @click="moveCreatePage" />
        </GraphqlTable>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GraphqlTable from "@/components/GraphqlTable.vue";

import Query from "@/util/Query";
import Config from "@/util/Config";

@Component({
    components: {
        GraphqlTable
    },
})
export default class extends Vue {
    Query = Query;

    columns = [
        { field: "id", name: "id", label: "#", align: "left" },
        { field: "q", name: "q", label: "질문", align: "left", event: true, html: true },
        {
            field: "category", name: "category", label: "카테고리", align: "left",
            format: (data : any) => Config.faqCategory[data]
        },
        // { field: "a", name: "a", label: "응답", align: "left" },
        { field: "created_at", name: "created_at", label: "생성일", align: "left" }
    ];

    subEvent( row : any ){
        this.$router.push(this.$route.path + "/sub/" + row.id);
    }

    moveCreatePage(){
        this.$router.push(this.$route.path + "/create");
    }
}
</script>
