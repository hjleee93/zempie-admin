<template>
    <div>
        <MainTable
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
import Config from "@/util/Config";

@Component({
    components: { 
        MainTable
    },
})
export default class extends Vue {
    rows: any[] = [];
    columns = [
        { label: "#", name: "id", field: "id", align: "left", sortable: true},
        { label: "제목", name: "title", field: "title", align: "left", sortable: true, event: true},
        {
            label: "카테고리", name: "category", field: "category", align: "left", sortable: true,
            format: (data : any) => Config.inquiryCategory[data]
        },
        {
            label: "질문자", name: "user", field: "user", align: "left",
            format: (data : any) => data.name
        },
        {
            label: "질문일", name: "asked_at", field: "asked_at", align: "left",
            format: (data : any) => new Date(data).toLocaleString()
        },
        {
            label: "상태", name: "response", field: "response", align: "left",
            format: (data: any) => data == null ? "대기" : "답변 완료",
            badge: true,
            badgeColor: (data: any) => data == null ? "grey" : "positive"
        },
    ];

    moveSubPage(row: any){
        this.$router.push("/support/inquiry/sub/" + row.id);
    }

}
</script>
