<template>
    <div>
        <Table :rows="rows" rowKey="id" :columns="columns" @movePage="movePage" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Table from "../../components/Table.vue";
import Api from "../../util/Api";

@Component({
    components: {
        Table,
    },
})
export default class extends Vue {
    logs: any[] = [];

    columns = [
        { label: "id", name: "id", field: "id", align: "left"},
        { label: "계정", name: "account", field: "account", align: "left"},
        { label: "이름", name: "name", field: "name", align: "left"},
        { label: "권한", name: "level", field: "level", align: "left"},
        { label: "변경내역", name: "path", field: "path", align: "left"},
    ];

    async created() {
        await this.movePage(10, 0, "id", "asc");
    }

    get rows() {
        const result = [];
        for (let i = 0; i < this.logs.length; i++) {
            if(this.logs[i] == null){
                result.push({
                    account: null,
                    name: null,
                    level: null,
                    path: null,
                });
                continue;
            }
            result.push({
                id: this.logs[i].id,
                account: this.logs[i].admin.account,
                name: this.logs[i].admin.name,
                level: this.logs[i].admin.level,
                path: this.logs[i].path,
            });
        }
        return result;
    }

    async movePage(limit: number, offset: number, sort: string, dir: string) {
        const result = await Api.getLogList(limit, offset, sort, dir);
        const logs = new Array(result.count);
        for(let i = 0; i < logs.length; i++){
            logs[i] = this.logs[i];
        }
        this.logs = logs;
        for(let i = 0; i < result.logs.length; i++){
            this.logs[offset + i] = result.logs[i];
        }
    }
}
</script>
