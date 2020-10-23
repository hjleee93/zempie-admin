<template>
    <div>
        <Table :rows="rows" :rowKey="'아이디'">
            <q-btn color="primary" @click="moveSubPage">관리자 생성</q-btn>
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
            "권한": "Master",
            "상태": "정상",
            "생성일": "2020.10.23 05:22:14"
        },
        {
            "아이디": "Admin_Alpha",
            "권한": "Alpha",
            "상태": "정상",
            "생성일": "2020.10.23 19:22:14"
        }
    ];

    columns = [
        { name: '아이디', label:"아이디", field: '아이디', sortable: true, align: 'left'},
        { name: '권한', label: '권한', field: '권한', sortable: true, align: 'left' },
        { name: '상태', label: '상태', field: '상태', sortable: true, align: 'left' },
        { name: '생성일', label: "생성일", field: '생성일', sortable: true, align: 'left' },
    ];


    moveSubPage(){
        this.$router.push(this.$route.path + "/create");
    }
}
</script>
