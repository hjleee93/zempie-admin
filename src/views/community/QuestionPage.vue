<template>
    <div>
        <DetailTable :rows="rows" row-key="번호" :columns="columns" link="/community/question/sub/" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DetailTable from "../../components/DetailTable.vue";
import Api from "../../util/Api";

@Component({
    components: {
        DetailTable
    }
})
export default class extends Vue {
    rows = []

    columns = [
        { name: '번호', label:"번호", field: '번호', align: 'left' },
        { name: '카테고리', label: '카테고리', field: '카테고리', align: 'left' },
        { name: '제목', label: "제목", field: '제목', align: 'left' },
        { name: '조회수', label: "조회수", field: '조회수', align: 'left' },
        { name: 'detail', label: "상세 보기"}
    ];

    async mounted(){
        if(this.$store.getters.isLogin){
            this.rows = await Api.getQuestionList();
        }
    }
}
</script>
