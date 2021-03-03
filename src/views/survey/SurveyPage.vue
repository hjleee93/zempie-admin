<template>
    <div>
        <GraphqlTable
            rowKey="id"
            :columns="columns"
            @subEvent="subEvent"
            selection="single"
            :query="Query.getSurveyTable"
            column-name="survey"
            @selectEvent="selectEvent"
        >
            <q-btn color="positive" label="생성하기" @click="moveCreatePage" />
            <q-btn color="red" label="삭제하기" @click="deleteSurvey" class="q-ml-md" />
        </GraphqlTable>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GraphqlTable, { TableBus } from "@/components/GraphqlTable.vue";
import Api from "@/util/Api";
import Query from "@/util/Query";

@Component({
    components: {
        GraphqlTable,
    },
})
export default class extends Vue {
    Query = Query;

    columns = [
        { label: "#", name: "id", field: "id", align: "left", sortable: true, sort: ()=>false },
        { label: "설문조사 주소", name: "form_url", field: "form_url", align: "left" },
        { label: "설문조사 아이디", name: "form_id", field: "form_id", align: "left" },
        { label: "활성화 여부", name: "activated", field: "activated", align: "left",
            event : true,
            eventButton: true,
            eventButtonColor: (data : any) => data ? 'positive' : 'red',
            format: (data : any) => data ? '활성화' : '비활성화',
        },
        { label: "시작일", name: "start_at", field: "start_at", align: "left",
            format: (data : any) => new Date(data).toLocaleString()
        },
        { label: "종료일", name: "end_at", field: "end_at", align: "left",
            format: (data : any) => new Date(data).toLocaleString()
        },
    ];



    moveCreatePage() {
        this.$router.push("/survey/developer/create");
    }

    selectedSurvey : any;
    selectEvent( surveys : any ) {
        this.selectedSurvey = surveys[0] || null;
    }

    async deleteSurvey() {
        if( this.selectedSurvey == null ) {
            return;
        }

        const result = await Api.deleteSurvey( this.selectedSurvey.id );
        if( result ) {
            this.selectedSurvey = null;
            TableBus.$emit('reload');
        }
    }

    async subEvent( row : any) {
        let activated = row.activated;


        const result = await Api.updateSurveyActivated( row.id, !activated );
        if( result ) {
            this.$q.notify({
                type : 'positive',
                message : `성공적으로 설문조사가 ${ activated ? '비' : '' }활성화되었습니다.`,
                position : 'top',
            });
            TableBus.$emit('reload');
        }
    }
}
</script>
