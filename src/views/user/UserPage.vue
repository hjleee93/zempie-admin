<template>
    <div>
        <MainTable :columns="columns" apiLink="user/list" columnName="users" @subEvent="subEvent" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MainTable from "@/components/MainTable.vue";

@Component({
    components: {
        MainTable
    },
})
export default class extends Vue {
    columns = [
        { label: "#", name: "id", field: "id", align: "left", sortable: true },
        { label: "닉네임", name: "name", field: "name", align: "left", sortable: true, event: true },
        {
            label: "이메일", name: "email", field: "email", align: "left", sortable: true,
            format: (data : any) => data || '없음'
        },
        { label: "회원가입 수단", name: "provider", field: "provider", align: "left", sortable: true },
        {
            label: "마지막 접속일", name: "last_log_in", field: "last_log_in", align: "left", sortable: true,
            format: (data : any) => data == null ? '-' : new Date(data).toLocaleString()
        },
        { label: "계정 생성일", name: "created_at", field: "created_at", align: "left", sortable: true },
    ];

    subEvent(row: any) {
        this.$router.push("/user/list/sub/" + row.id);
    }
}
</script>
