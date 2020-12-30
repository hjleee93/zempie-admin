<template>
    <div>
        <!-- <DetailTable :rows="rows" row-key="id" :columns="columns" link="/judge/game/sub/" /> -->
        <MainTable
        rowKey="id" 
        :columns="columns" 
        apiLink="studio/versions" 
        columnName="notices" 
        @subEvent="moveSubPage"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import DetailTable from "@/components/DetailTable.vue";
import MainTable from "@/components/MainTable.vue";
import Api from "@/util/Api";

@Component({
    components: {
        // DetailTable,
        MainTable
    }
})
export default class extends Vue {
    // rows: any[] = []

    columns = [
        { label: '인덱스', name:"project_id", field: 'project_id', align: 'left' },
        // { label: '', name: 'project_id', field: 'project_id', align: 'left' },
        { label: '게임 제목', name: "title", field: 'title', align: 'left', event: true },
        { label: '버전', name: "version", field: 'version', align: 'left' },
        { label: '상태', name: "state", field: 'state', align: 'left' },
        { label: '신청일', name: "created_at", field: 'created_at', align: 'left' },
    ];

    // async created(){
    //     this.rows = await Api.getProjectList();
    //     this.rows = this.rows.map((x: any) => {
    //         x.title = x.project.name;
    //         x.date = new Date(x.created_at).toLocaleString();
    //         return x;
    //     })
    // }

    moveSubPage( row : any ){
        this.$router.push("/judge/game/sub/" + row.id);
    }
}
</script>
