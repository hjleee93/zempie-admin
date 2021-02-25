<template>
    <div>
        <MainTable
            rowKey="id"
            :columns="columns"
            apiLink="studio/surveys"
            columnName="surveys"
            @subEvent="subEvent"
            selection="single"
            @selectEvent="selectEvent"
        >
            <q-btn color="positive" label="생성하기" @click="moveCreatePage" />
            <q-btn color="red" label="삭제하기" @click="deleteSurvey" class="q-ml-md" />
        </MainTable>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MainTable, { TableBus } from "@/components/MainTable.vue";
import Api from "@/util/Api";

@Component({
    components: {
        MainTable,
    },
})
export default class extends Vue {

    columns = [
        { label: "#", name: "id", field: "id", align: "left", sortable: true, sort: ()=>false },
        { label: "설문조사 아이디", name: "form_id", field: "form_id", align: "left"},
        // { label: "설문조사 주소", name: "form_url", field: "form_url", align: "left"},
        // { label: "활성화 여부", name: "activated", field: "activated", align: "left", event : true},
        { label: "시작일", name: "start_at", field: "start_at", align: "left"},
        { label: "종료일", name: "end_at", field: "end_at", align: "left"},
    ];



    moveCreatePage() {
        this.$router.push("/survey/developer/create");
    }

    selectedSurvey : any;
    selectEvent( surveys ) {
        this.selectedSurvey = surveys[0] || null;
    }

    async deleteSurvey() {
        if( this.selectedSurvey == null ) {
            return;
        }

        const result = await Api.deleteSurvey( this.selectedSurvey.id );
        if( result ) {
            TableBus.$emit('reload');
        }
    }

    subEvent( row : any) {
        console.log(row);
        this.$router.push("/survey/developer/sub/" + row.id);
    }
}
</script>
