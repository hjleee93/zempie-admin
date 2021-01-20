<template>
    <div>
        <MainTable rowKey="id" :columns="columns" apiLink="admin/logs" columnName="logs" @subEvent="subEvent" />
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
    columns = [
        { label: "#", name: "id", field: "id", align: "left", sortable: true, sort: ()=>false },
        // { label: "아이디", name: "admin_account", field: "admin_account", align: "left"},
        { label: "이름", name: "admin_name", field: "admin_name", align: "left"},
        { label: "권한", name: "admin_level", field: "admin_level", align: "left"},
        { label: "변경내역", name: "path", field: "path", align: "left"},
        { label: "변경일자", name: "created_at", field: "created_at", align: "left"},
    ];

    subEvent( row : any ){
        console.log(row);
    }
}
</script>
