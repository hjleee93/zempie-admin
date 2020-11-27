<template>
    <div>
        <DetailTable :rows="rows" row-key="id" :columns="columns" link="/judge/game/sub/" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DetailTable from "../../components/DetailTable.vue";
import Api from "../../util/Api";

@Component({
    components: {
        DetailTable
    }
})
export default class extends Vue {
    rows: any[] = []

    columns = [
        { label: '번호', name:"id", field: 'id', align: 'left' },
        { label: '아이디', name: 'project_id', field: 'project_id', align: 'left' },
        { label: '게임 제목', name: "title", field: 'title', align: 'left' },
        { label: '버전', name: "version", field: 'version', align: 'left' },
        { label: '상태', name: "state", field: 'state', align: 'left' },
        { label: '신청일', name: "date", field: 'date', align: 'left' },
        { label: '상세 보기', name: "detail"}
    ];

    async created(){
        this.rows = await Api.getProjectList();
        this.rows = this.rows.map((x: any) => {
            x.title = x.project.name;
            x.date = new Date(x.created_at).toLocaleString();
            return x;
        })
    }
}
</script>
