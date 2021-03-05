<template>
    <div>
        <q-table
        :data="rows"
        row-key="id"
        :columns="columns"
        :pagination.sync="pagination"
        :rows-per-page-options="pageOption"
        :selection="selection || 'none'"
        :selected.sync="selected"
        >
            <template v-slot:top-right>
                <div v-if="exportMode != null && rows.length > 0" class="q-mr-md">
                    <q-btn color="primary" icon="get_app" label="엑셀 파일로 추출" @click="exportData" />
                </div>

                <slot></slot>
            </template>

            <template v-slot:body-cell="props">
                <q-td :props="props">
                    <div v-if="props.col.field === 'url_thumb'">
                        <q-img
                            :src="props.row[props.col.field]"
                            spinner-color="white"
                            style="height: 66px; width: 100px"
                            :ratio="1"
                        />
                    </div>
                    <div v-else-if="props.col.field === 'url_img'">
                        <q-btn color="primary" label="이미지보기" @click="openImagePopup(props.row[props.col.field])" v-if="props.row[props.col.field] != null && props.row[props.col.field] != ''" />
                    </div>
                    <div v-else-if="props.col.event">
                        <div v-if="props.col.eventButton">
                            <q-btn
                                :color="props.col.eventButtonColor(props.row[props.col.field]) || 'primary'"
                                @click.prevent="subEvent(props.row)"
                            >
                                {{ props.col.format && props.col.format(props.row[props.col.field]) || props.row[props.col.field] }}
                            </q-btn>
                        </div>
                        <a
                            v-else
                            href="#"
                           @click.prevent="subEvent(props.row)"
                        >
                            {{ props.col.format && props.col.format(props.row[props.col.field]) || props.row[props.col.field] }}
                        </a>
                    </div>
                    <div v-else>
                        <div v-if="props.col.badge">
                            <q-badge :color="props.col.badgeColor && props.col.badgeColor(props.row[props.col.field]) || 'primary'">
                                {{ props.col.format && props.col.format(props.row[props.col.field]) || props.row[props.col.field] }}
                            </q-badge>
                        </div>
                        <div v-else>
                            {{ props.col.format && props.col.format(props.row[props.col.field]) || props.row[props.col.field] }}
                        </div>
                    </div>
                </q-td>
            </template>
        </q-table>
        <q-dialog v-model="imagePopup">
            <img :src="imageUrl" style="max-width: 90%; max-height: 90%;" alt="문의 이미지" />
        </q-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import axios from "axios";
import exportExcel from '@/util/ExportExcel';
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

    selected: any = [];

    @Prop() columns!: any;
    @Prop() query!: Function;
    @Prop() columnName!: string;
    @Prop() exportMode!: boolean;
    @Prop() filename!: string;
    @Prop() selection!: string;

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

    async created(){
        TableBus.$on("reload", async () => {
            await this.movePage();
        });

        TableBus.$on("selectClear", async () => {
            this.selected = [];
        });
    }

    async movePage() {
        const limit = this.pagination.rowsPerPage;
        const offset = (this.pagination.page - 1) * this.pagination.rowsPerPage;
        let order = this.pagination.sortBy || 'id';
        
        if(this.pagination.descending){
            order = "reverse:" + order;
        }

        const { count, list } = await this.getData( order, limit, offset );
        this.setRows( count, list, offset );
    }

    async getData( order : string, limit : number, offset : number ) {
        const result = await axios({
            method: "POST",
            url: process.env.VUE_APP_GRAPHQL_LINK,
            data: {
                query: this.query(order, limit, offset)
            }
        })
        const count = result.data.data[this.columnName + "Count"];
        const list = result.data.data[this.columnName + "Get"];

        return {
            count,
            list
        }
    }

    setRows( count : number, list : any, offset : number ) {
        const rows = new Array(count || 0).fill({id:null});

        if(this.rows.length == 0){
            this.rows = new Array(count || 0).fill({id:null});
        }

        for(let i = 0; i < rows.length; i++){
            rows[i] = this.rows[i];
        }

        this.rows = rows;
        
        this.replaceData( list, offset );
    }

    replaceData( list : any, offset : number ) {
        for(let i = 0; i < list.length; i++){
            let index = offset + i;
            this.rows[index] = list[i];

            if(this.rows[index].created_at != null){
                this.rows[index].created_at = new Date(this.rows[index].created_at).toLocaleString();
            }
        }
    }

    async exportData() {
        let order = this.pagination.sortBy || 'id';
        if(this.pagination.descending){
            order = "reverse:" + order;
        }
        const { count, list } = await this.getData( order, this.rows.length, 0 );
        this.replaceData( list, 0 );

        const columns = this.columns.map((column : any ) => {
            return column.label;
        });

        const keys = this.columns.map((column : any ) => {
            return column.field;
        });

        
        const data = this.rows.map( (row : any) => {
            const arr = [];
            for( let i = 0; i < keys.length; i++ ) {
                arr.push( row[keys[i]] );
            }
            return arr;
        } );
        exportExcel( columns, data, this.filename || 'table' );
    }


    imagePopup = false;
    imageUrl = '';
    openImagePopup( url : string ) {
        this.imagePopup = true;
        this.imageUrl = url;
    }
}
</script>
