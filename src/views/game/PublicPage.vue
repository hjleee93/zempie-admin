<template>
    <div>
        <DetailTable :rows="rows" row-key="번호" :columns="columns" link="/game/public/sub/" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DetailTable from "@/components/DetailTable.vue";
import Api from "@/util/Api";

@Component({
    components: {
        DetailTable
    }
})
export default class extends Vue {
    rows: any[] = []

    columns = [
        // { name: '번호', label:"번호", field: '번호', align: 'left' },
        // { name: '아이디', label: '아이디', field: '아이디', align: 'left' },
        { label: "게임 제목", name: 'title', field: 'title', align: 'left' },
        { label: "버전", name: 'version', field: 'version', align: 'left' },
        // { label: "상태", name: '상태', field: '상태', align: 'left' },
        // { label: "배포일", name: '배포일', field: '배포일', align: 'left' },
        // { label: "상세 보기", name: 'detail', }
    ];

    async created(){
        // const result = await Api.getGameList();
        // this.rows = [];
        // for(let i = 0; i < result.games.length; i++){
        //     if(result.games[i].official){
        //         this.rows.push(result.games[i]);
        //     }
        // }
    }
}
</script>
