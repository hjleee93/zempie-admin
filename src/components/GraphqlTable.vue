<template>
    <q-table 
    :data="rows" 
    row-key="id" 
    :columns="columns" 
    :pagination.sync="pagination" 
    :rows-per-page-options="pageOption"
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
import Gate from "@/util/Gate";
import axios from "axios";

export const TableBus = new Vue();

@Component({})
export default class extends Vue {
    pagination = {
        rowsPerPage: 20,
        sortBy: null,
        descending: true,
        page: 1,
    };
    pageOption = [5, 10, 15, 20, 30]

    rows: any = [];

    @Prop() rowKey!: string;
    @Prop() columns!: any;
    @Prop() query!: Function;
    @Prop() columnName!: string;

    subEvent( row: any ){
        this.$emit('subEvent', row);
    }

    @Watch("pagination")
    async paginationChanged(){
        await this.movePage();
    }

    async created(){
        TableBus.$on("reload", async () => {
            await this.movePage();
        }); 
    }

    async movePage() {
        const limit = this.pagination.rowsPerPage;
        const offset = (this.pagination.page - 1) * this.pagination.rowsPerPage;
        let order = this.pagination.sortBy || this.rowKey;
        
        if(this.pagination.descending){
            order = "reverse:" + order;
        }
        const result = await axios({
            method: "POST",
            url: process.env.VUE_APP_GRAPHQL_LINK,
            data: {
                query: this.query(order, limit, offset)
            }
        })
        const count = result.data.data[this.columnName + "Count"];
        const list = result.data.data[this.columnName + "Get"];

        const rows = new Array(count || 0).fill({id:null});

        if(this.rows.length == 0){
            this.rows = new Array(count || 0).fill({id:null});
        }

        for(let i = 0; i < this.rows.length; i++){
            rows[i] = this.rows[i];
        }

        this.rows = rows;
        for(let i = 0; i < list.length; i++){
            let index = offset + i;
            this.rows[index] = list[i];

            if(rows[index].created_at != null){
                rows[index].created_at = new Date(rows[index].created_at).toLocaleString();
            }

            if(this.columnName == "game" && rows[index].user != null){
                rows[index].developer = rows[index].user.name;
            }else{
                rows[index].developer = '없음';
            }

            if(this.columnName == "game"){
                if(rows[index].enabled){
                    rows[index].state = "배포 중";
                }else{
                    rows[index].state = "대기 중";
                }
            }

            if(this.columnName == "faq"){
                rows[index].category = Config.faqCategory[rows[index].category];
            }
        }
    }
}
</script>
