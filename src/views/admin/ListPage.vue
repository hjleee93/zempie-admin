<template>
    <div>
        <Table :rows="rows" :columns="columns" :rowKey="'아이디'">
            <q-btn color="primary" @click="moveSubPage">관리자 생성</q-btn>
            <!-- <q-btn color="primary" @click="moveModifyPage">관리자 변경</q-btn> -->
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
    rows = [];

    columns = [
        { name: '아이디', label:"아이디", field: 'account', sortable: true, align: 'left'},
        { name: '이름', label:"이름", field: 'name', sortable: true, align: 'left'},
        { name: '권한', label: '권한', field: 'level', sortable: true, align: 'left' },
        { name: '생성일', label: "생성일", field: 'created_at', sortable: true, align: 'left' },
    ];

    async mounted(){
        if(this.$store.getters.isLogin){
            this.rows = await Api.getAdminList();
        }
    }

    moveSubPage(){
        this.$router.push(this.$route.path + "/create");
    }

    moveModifyPage(){
        this.$router.push(this.$route.path + "/mod");
    }
}
</script>
