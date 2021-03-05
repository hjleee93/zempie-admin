<template>
    <div>
        <MainTable :columns="columns" apiLink="admin/logs" columnName="logs" @subEvent="subEvent" />
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
        {
            label: "변경내역", name: "path", field: "path", align: "left",
            format: (data : any) => data.split("/")
                .map((text: any) =>
                    text.replace("support", "고객센터")
                        .replace("notice", "공지사항")
                        .replace("response", "문의 답변")
                        .replace("admin", "관리자")
                        .replace("add", "추가")
                        .replace("game", "게임")
                        .replace("punish", "제재")
                        .replace("studio", "스튜디오")
                        .replace("survey", "설문조사")
                        .replace("user", "유저")
                        .replace("list", "리스트")
                        .replace("mod", "수정")
                        .replace("del", "삭제")
                        .replace("c", "추가")
                        .replace("u", "수정")
                        .replace("d", "삭제")
                        .replace("p", "제휴게임")
                )
                .join(" ")
        },
        { label: "변경일자", name: "created_at", field: "created_at", align: "left"},
    ];

    subEvent( row : any ){
    }
}
</script>
