<template>
    <q-table 
    :data="rows" 
    row-key="id" 
    :columns="columns" 
    :pagination.sync="pagination" 
    :rows-per-page-options="pageOption" 
    :title="title"
    :selection="selection || 'none'"
    :selected.sync="selected"
    >
        <template v-slot:top-right>
            <slot></slot>
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
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Api from "@/util/Api";
import Config from "@/util/Config";

export const TableBus = new Vue();

@Component({
    components: {},
})
export default class extends Vue {
    pagination = {
        rowsPerPage: 20,
        sortBy: null,
        descending: true,
        page: 1,
    };
    pageOption = [5, 10, 15, 20, 30]

    rows: any = [];

    selected : any = [];

    @Prop() rowKey!: string;
    @Prop() columns!: any;
    @Prop() query!: any;

    subEvent( row: any ){
        this.$emit('subEvent', row);
    }

    @Watch("pagination")
    async paginationChanged(){
        await this.movePage();
    }

    @Watch("selected")
    onSelectedChanged(){
        this.$emit('selectEvent', this.selected);
    }

    async mounted(){
        console.log(this.query);
        // await this.movePage();
    }

    created(){
        TableBus.$on("reload", async () => {
            await this.movePage();
        }); 
    }

    async movePage() {
        // const limit = this.pagination.rowsPerPage;
        // const offset = (this.pagination.page - 1) * this.pagination.rowsPerPage;
        // let order = this.pagination.sortBy || this.rowKey;
        // if(this.pagination.descending){
        //     order = "reverse:" + order;
        // }



        // const rows = new Array(result.count || 0).fill({id:null});

        // if(this.rows.length == 0){
        //     this.rows = new Array(result.count || 0).fill({id:null});
        // }

        // for(let i = 0; i < this.rows.length; i++){
        //     rows[i] = this.rows[i];
        // }

        // this.rows = rows;
        // if(result[this.columnName] == null){
        //     for(let i = 0; i < result.length; i++){
        //         let index = offset + i;
        //         this.rows[index] = result[i];

        //         if(this.rows[index].created_at != null && this.rows[index].created_at != ""){
        //             this.rows[index].created_at = new Date(this.rows[index].created_at).toLocaleString();
        //         }

        //         if(this.rows[index].project != null && this.rows[index].created_at != ""){
        //             this.rows[index].title = this.rows[index].project.name;
        //         }
        //     }
        //     this.pageOption = [0];
        //     this.pagination.rowsPerPage = 0;
        // }else{
        //     for(let i = 0; i < result[this.columnName].length; i++){
        //     }
        // }
    }
}
</script>
