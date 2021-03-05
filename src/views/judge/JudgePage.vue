<template>
    <div>
        <MainTable
        :columns="columns" 
        apiLink="studio/versions" 
        columnName="notices" 
        @subEvent="moveSubPage"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MainTable from "@/components/MainTable.vue";

@Component({
    components: {
        MainTable
    }
})
export default class extends Vue {
    columns = [
        { label: '#', name:"project_id", field: 'project_id', align: 'left' },
        // { label: '', name: 'project_id', field: 'project_id', align: 'left' },
        {
            label: '게임 제목', name: "project", field: 'project', align: 'left', event: true,
            format: (data : any) => data.name
        },
        { label: '버전', name: "version", field: 'version', align: 'left' },
        { label: '상태', name: "state", field: 'state', align: 'left' },
        { label: '신청일', name: "created_at", field: 'created_at', align: 'left' },
    ];

    moveSubPage( row : any ){
        this.$router.push("/judge/game/sub/" + row.id);
    }
}
</script>
