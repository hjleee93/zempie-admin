<template>
    <div>
        <Table :rows="rows" :rowKey="'아이디'" :columns="columns" >
        </Table>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Table from "../../components/Table.vue";

@Component({
    components: {
        Table
    }
})
export default class extends Vue {
    rows = [
        {
            "아이디": "Admin_Master",
            "일시": "Master",
            "IP": "정상",
            "변경내역": "2020.10.23 05:22:14"
        }
    ];

    columns = [
        { name: '아이디', label:"아이디", field: '아이디', sortable: true, align: 'left'},
        { name: '일시', label: '일시', field: '일시', sortable: true, align: 'left' },
        { name: 'IP', label: 'IP', field: 'IP', sortable: true, align: 'left' },
        { name: '변경내역', label: "변경내역", field: '변경내역', sortable: true, align: 'left' },
    ]
}
</script>
