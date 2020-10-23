<template>
    <div>
        <DetailTable :rows="rows" row-key="번호" :columns="columns" link="/judge/game/sub/" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DetailTable from "../../components/DetailTable.vue";

@Component({
    components: {
        DetailTable
    }
})
export default class extends Vue {
    rows = [
        {
            "번호" : "1",
            "아이디" : "Admin Master",
            "게임 제목" : "Example",
            "버전" : "0.0.1",
            "상태" : "심사 대기",
            "신청일" : "2020.10.24 04:32:11",
        },
        {
            "번호" : "2",
            "아이디" : "Admin Alpha",
            "게임 제목" : "Example",
            "버전" : "0.0.1",
            "상태" : "심사 대기",
            "신청일" : "2020.10.24 04:32:11",
        }
    ]

    columns = [
        { name: '번호', label:"번호", field: '번호', sortable: true, align: 'left' },
        { name: '아이디', label: '아이디', field: '아이디', sortable: true, align: 'left' },
        { name: '게임 제목', label: "게임 제목", field: '게임 제목', sortable: true, align: 'left' },
        { name: '버전', label: "버전", field: '버전', sortable: true, align: 'left' },
        { name: '상태', label: "상태", field: '상태', sortable: true, align: 'left' },
        { name: '신청일', label: "신청일", field: '신청일', sortable: true, align: 'left' },
        { name: 'detail', label: "상세 보기"}
    ];
}
</script>
