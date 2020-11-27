<template>
    <div>
        <SubButtonTable :rows="rows" rowKey="id" :columns="columns" icon="pageview" @subEvent="moveSubPage" @movePage="movePage" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SubButtonTable from "../../components/SubButtonTable.vue";
import Api from "../../util/Api";

@Component({
    components: { SubButtonTable },
})
export default class extends Vue {
    rows: any[] = [];
    columns = [
        { label: "번호", name: "id", field: "id", align: "left", sortable: true, sort: () => false},
        { label: "카테고리", name: "category", field: "category", align: "left", sortable: true, sort: () => false},
        { label: "제목", name: "title", field: "title", align: "left", sortable: true, sort: () => false},
        { label: "질문자", name: "userName", field: "userName", align: "left"},
        { label: "질문일", name: "date", field: "date", align: "left"},
        { label: "상태", name: "state", field: "state", align: "left"},
        { label: "상세 보기", name: "sub" },
    ];

    moveSubPage(row: any){
        this.$router.push("/community/inquiry/sub/" + row.id);
    }

    async created() {
        await this.movePage(10, 0, "id", "asc");
    }

    options = [
        "버그/기술",
        "불량 유저",
        "계정",
        "스튜디오",
        "저작권",
        "이벤트",
        "기타"
    ]


    lastMove = {
        limit: 0,
        offset: 0,
        sort: "",
        dir: ""
    }

    async movePage(limit: number, offset: number, sort: string, dir: string) {
        const result = await Api.getInquiryList(limit, offset, sort, dir);
        const inquiries = new Array(result.count).fill({id:null});
        for(let i = 0; i < inquiries.length; i++){
            inquiries[i] = this.rows[i];
        }
        this.rows = inquiries;
        for(let i = 0; i < result.inquiries.length; i++){
            this.rows[offset + i] = result.inquiries[i];
            this.rows[offset + i].category = this.options[this.rows[offset + i].category];
            this.rows[offset + i].date = new Date(this.rows[offset + i].asked_at).toLocaleString();
            this.rows[offset + i].state = this.rows[offset + i].response == null ? "대기" : "답변 완료";
            this.rows[offset + i].userName = this.rows[offset + i].user.name;
        }
        
        this.lastMove.limit = limit;
        this.lastMove.offset = offset;
        this.lastMove.sort = sort;
        this.lastMove.dir = dir;
    }
}
</script>
