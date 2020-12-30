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
    filter = "";

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
    @Prop() columns!: any[];
    @Prop() apiLink!: string;
    @Prop() columnName!: string;
    @Prop() title!: string;
    @Prop() apiParam!: any;
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

    async mounted(){
        await this.movePage();
    }

    created(){
        TableBus.$on("reload", async () => {
            await this.movePage();
        }); 
    }

    async movePage() {
        const limit = this.pagination.rowsPerPage;
        const offset = (this.pagination.page - 1) * this.pagination.rowsPerPage;
        const sort = this.pagination.sortBy || this.rowKey;
        const dir = this.pagination.descending ? "desc" : "asc";

        const params = new URLSearchParams();
        params.append("limit", limit.toString());
        params.append("offset", offset.toString());
        params.append("sort", sort);
        params.append("dir", dir);

        for(let key in this.apiParam){
            params.append(key, this.apiParam[key]);
        }

        const result = await Api.getList(this.apiLink, params.toString());
        const rows = new Array(result.count || 0).fill({id:null});

        if(this.rows.length == 0){
            this.rows = new Array(result.count || 0).fill({id:null});
        }

        for(let i = 0; i < this.rows.length; i++){
            rows[i] = this.rows[i];
        }

        this.rows = rows;
        if(result[this.columnName] == null){
            for(let i = 0; i < result.length; i++){
                let index = offset + i;
                this.rows[index] = result[i];

                if(this.rows[index].created_at != null && this.rows[index].created_at != ""){
                    this.rows[index].created_at = new Date(this.rows[index].created_at).toLocaleString();
                }

                if(this.rows[index].project != null && this.rows[index].created_at != ""){
                    this.rows[index].title = this.rows[index].project.name;
                }
            }
            this.pageOption = [0];
            this.pagination.rowsPerPage = 0;
        }else{
            for(let i = 0; i < result[this.columnName].length; i++){
                let index = offset + i;
                this.rows[index] = result[this.columnName][i];

                if(this.rows[index].created_at != null && this.rows[index].created_at != ""){
                    this.rows[index].created_at = new Date(this.rows[index].created_at).toLocaleString();
                }

                if(this.rows[index].admin != null){
                    this.rows[index].admin_account = this.rows[index].admin.account;
                    this.rows[index].admin_name = this.rows[index].admin.name;
                    this.rows[index].admin_level = this.rows[index].admin.level;
                }

                if(this.rows[index].asked_at != null && this.rows[index].asked_at != ""){
                    this.rows[index].asked_at = new Date(this.rows[index].asked_at).toLocaleString();
                }

                if(this.columnName == "inquiries" && this.rows[index].category != null ){
                    this.rows[index].category = Config.inquiryCategory[this.rows[index].category];
                }

                if(this.columnName == "inquiries"){
                    this.rows[index].userName = this.rows[index].user.name
                    this.rows[index].state = this.rows[index].response == null ? "대기" : "답변 완료"
                }

                if(this.columnName == "notices" && this.rows[index].category != null ){
                    this.rows[index].category = Config.noticeCategory[this.rows[index].category];
                }

                if(this.columnName == "users" && this.rows[index].email == null){
                    this.rows[index].email = "없음";
                }

                if(this.columnName == "logs" && this.rows[index].path != null){
                    this.rows[index].path = this.rows[index].path.split("/")
                    .map((text: any) => 
                        text.replace("support", "커뮤니티")
                            .replace("notice", "공지사항")
                            .replace("mod", "수정")
                            .replace("del", "삭제")
                            .replace("response", "문의 답변")
                            .replace("admin", "관리자")
                            .replace("add", "추가")
                    )
                    .join(" ");
                }
            }
        }
    }
}
</script>
