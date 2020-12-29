<template>
    <div>
        <div v-if="!$apollo.queries.gameGet.loading">
            <q-table 
            :data="rows" 
            row-key="id" 
            :columns="columns"
            :pagination.sync="pagination" 
            :rows-per-page-options="pageOption" 
            >
                <template v-slot:top-right>
                    
                    
                    <!-- <q-input borderless dense debounce="300" v-model="filter" placeholder="Search" class="q-ml-md">
                        <template v-slot:append>
                            <q-icon name="search" />
                        </template>
                    </q-input> -->
                </template>

                <template v-slot:body-cell="props">
                    <q-td :props="props">
                        <div v-if="props.col.event">
                            <a href="#" @click="(event)=>{event.preventDefault();subEvent(props.row)}">{{rows[props.rowIndex][props.col.field]}}</a>
                        </div>
                        <div v-else>
                            {{rows[props.rowIndex][props.col.field]}}
                        </div>
                    </q-td>
                </template>
            </q-table>
        </div>
        
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Query from "../../query/OfficialGameQuery";


@Component({
    components: {},
    apollo: {
        gameGet: Query.gameListGet
    }
})
export default class extends Vue {
    gameGet: any;

    pagination = {
        rowsPerPage: 20,
        sortBy: null,
        descending: true,
        page: 1,
    };
    pageOption = [5, 10, 15, 20, 30]

    get rows(){
        if(this.$apollo.queries.gameGet.loading){
            return [];
        }else{
            return this.gameGet.map((x : any) => {
                if(x.user != null){
                    x.developer = x.user.name || "이름 없음";
                }else{
                    x.developer = "이름 없음";
                }
                x.created_date = new Date(x.created_at).toLocaleString();
                const state = x.enabled;
                x.state = "배포 중";
                if(!state){
                    x.state = "대기 중";
                }
                return x;
            });
        }
    }

    columns = [
        { field: "id", name: "id", label: "인덱스", align: "left" },
        { field: "title", name: "title", label: "제목", align: "left", event: true },
        { field: "developer", name: "developer", label: "개발자", align: "left" },
        { field: "version", name: "version", label: "버전", align: "left" },
        { field: "created_date", name: "created_date", label: "등록일", align: "left" },
        { field: "state", name: "state", label: "상태", align: "left" },
    ];

    created(){
        this.$apollo.queries.gameGet.refetch();
    }

    subEvent( rows: any ){
        this.$router.push("/game/official/sub/" + rows.id);
    }
}
</script>
