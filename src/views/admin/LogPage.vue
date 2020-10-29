<template>
    <div>
        <Table :rows="rows" :rowKey="'아이디'" :columns="columns" >
        </Table>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Table from "../../components/Table.vue";
import Api from "../../util/Api";

@Component({
    components: {
        Table
    }
})
export default class extends Vue {
    logs: any[] = [];
    
    columns = [
        { name: '계정', label:"계정", field: 'account', sortable: true, align: 'left'},
        { name: '이름', label:"이름", field: 'name', sortable: true, align: 'left'},
        { name: '권한', label: '권한', field: 'level', sortable: true, align: 'left' },
        { name: '변경내역', label: "변경내역", field: 'path', sortable: true, align: 'left' },
    ]

    async mounted(){
        if(this.$store.getters.isLogin){
            this.logs = await Api.getLogList();
        }
    }

    get rows(){
        const result = [];
        for(let i = 0; i < this.logs.length; i++){
            result.push({
                account: this.logs[i].admin.account,
                name: this.logs[i].admin.name,
                level: this.logs[i].admin.level,
                path: this.logs[i].path,
            });
        }
        return result;
    }
}
</script>
