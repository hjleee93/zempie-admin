<template>
    <div>
        <MainTable
        :columns="columns" 
        apiLink="support/notices" 
        columnName="notices" 
        @subEvent="subEvent"
        refs="table"
        > 
            <q-btn class="q-mr-sm" color="primary" label="새 공지사항 작성" @click="moveCreatePage" />
        </MainTable>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Notify, Dialog } from "quasar";
import MainTable from "@/components/MainTable.vue";
import { TableBus } from "@/components/MainTable.vue";
import Api from "@/util/Api";
import Config from "@/util/Config";


@Component({
    components: { 
        MainTable,
    },
})
export default class extends Vue {
    rows: any[] = [];

    columns = [
        { label: "#", name: "id", field: "id", align: "left", sortable: true},
        {
            label: "카테고리", name: "category", field: "category", align: "left", sortable: true,
            format: (data : any) => Config.noticeCategory[data]
        },
        { label: "제목", name: "title", field: "title", align: "left", sortable: true, event: true},
    ];

    moveCreatePage() {
        this.$router.push(this.$route.path + "/create");
    }

    subEvent(row: any){
        this.$router.push("/support/notice/sub/" + row.id);
    }
}
</script>
