<template>
    <div>
        <Table :rows="rows" />
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
            "번호" : 1,
            "아이디" : "Admin Master",
            "게임 제목" : "Example",
            "버전" : "0.0.1",
            "상태" : "심사 완료",
            "신청일" : "2020.10.24 04:32:11",
            "심사일" : "2020.10.24 04:32:13",
            "반려 사유" : "-"
        },
        {
            "번호" : 2,
            "아이디" : "Admin Alpha",
            "게임 제목" : "Example",
            "버전" : "0.0.1",
            "상태" : "반려됨",
            "신청일" : "2020.10.24 04:32:11",
            "심사일" : "2020.10.24 04:32:12",
            "반려 사유" : "선정성"
        }
    ]

    columns = [
        { name: '번호', label:"번호", field: '번호', sortable: true, align: 'left'},
        { name: '아이디', label: '아이디', field: '아이디', sortable: true, align: 'left' },
        { name: '게임 제목', label: '게임 제목', field: '게임 제목', sortable: true, align: 'left' },
        { name: '버전', label: "버전", field: '버전', sortable: true, align: 'left' },
        { name: '상태', label:"상태", field: '상태', sortable: true, align: 'left'},
        { name: '신청일', label: '신청일', field: '신청일', sortable: true, align: 'left' },
        { name: '심사일', label: '심사일', field: '심사일', sortable: true, align: 'left' },
        { name: '반려 사유', label: "반려 사유", field: '반려 사유', sortable: true, align: 'left' },
    ]
}
</script>
