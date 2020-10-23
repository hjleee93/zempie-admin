<template>
    <div>
        <DetailTable :rows="rows" row-key="번호" :columns="columns" link="/community/question/sub/" />
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
            "카테고리" : "계정",
            "제목" : "Example",
            "조회수" : 123,
        },
        {
            "번호" : "2",
            "카테고리" : "게임문의",
            "제목" : "Example",
            "조회수" : 312,
        }
    ]

    columns = [
        { name: '번호', label:"번호", field: '번호', sortable: true, align: 'left' },
        { name: '카테고리', label: '카테고리', field: '카테고리', sortable: true, align: 'left' },
        { name: '제목', label: "제목", field: '제목', sortable: true, align: 'left' },
        { name: '조회수', label: "조회수", field: '조회수', sortable: true, align: 'left' },
        { name: 'detail', label: "상세 보기"}
    ];
}
</script>
