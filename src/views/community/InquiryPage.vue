<template>
    <div>
        <MainTable 
            rowKey="id" 
            :columns="columns" 
            apiLink="support/inquiries" 
            columnName="inquiries" 
            @subEvent="moveSubPage"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MainTable from "@/components/MainTable.vue";
import Api from "@/util/Api";

@Component({
    components: { 
        MainTable
    },
})
export default class extends Vue {
    rows: any[] = [];
    columns = [
        { label: "인덱스", name: "id", field: "id", align: "left", sortable: true},
        { label: "제목", name: "title", field: "title", align: "left", sortable: true, event: true},
        { label: "카테고리", name: "category", field: "category", align: "left", sortable: true},
        { label: "질문자", name: "userName", field: "userName", align: "left"},
        { label: "질문일", name: "asked_at", field: "asked_at", align: "left"},
        { label: "상태", name: "state", field: "state", align: "left"},
    ];

    moveSubPage(row: any){
        this.$router.push("/community/inquiry/sub/" + row.id);
    }

}
</script>
