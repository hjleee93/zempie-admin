<template>
    <div>
        <CheckTable :rows="rows" rowKey="id" :columns="columns" link="/support/faq/sub/" @selectEvent="selectItem" >
            <q-btn class="q-mr-sm" color="primary" label="새 글작성" @click="moveCreatePage" />
            <q-btn class="q-mr-sm" color="primary" label="편집" />
            <q-btn class="q-mr-sm" color="primary" label="삭제" />
        </CheckTable>
        <!-- <MainTable
        rowKey="id" 
        :columns="columns" 
        apiLink="studio/versions" 
        columnName="notices" 
        @subEvent="moveSubPage"
        >
            <q-btn class="q-mr-sm" color="primary" label="새 글작성" @click="moveCreatePage" />
            <q-btn class="q-mr-sm" color="primary" label="편집" />
            <q-btn class="q-mr-sm" color="primary" label="삭제" />
        </MainTable> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CheckTable from "@/components/CheckTable.vue";
import MainTable from "@/components/MainTable.vue";

@Component({
    components: {
        CheckTable,
        MainTable
    },
})
export default class extends Vue {
    selectedItem = null;
    rows = [
        {
            "번호" : 1,
            "카테고리" : "게임 문의",
            "제목" : "제목",
            "조회수" : 11,
        },
        {
            "번호" : 2,
            "카테고리" : "계정",
            "제목" : "제목",
            "조회수" : 10,
        }
    ]

    columns = [
        { name: '번호', label:"번호", field: '번호', align: "left" },
        { name: '카테고리', label: '카테고리', field: '카테고리', align: "left" },
        { name: '제목', label: '제목', field: '제목', align: "left" },
        { name: '조회수', label: '조회수', field: '조회수', align: "left" },
        { name: 'detail', label: "상세 보기"}
    ];

    moveCreatePage(){
        this.$router.push(this.$route.path + "/create");
    }

    selectItem(item: any){
        this.selectedItem = item;
    }
}
</script>
