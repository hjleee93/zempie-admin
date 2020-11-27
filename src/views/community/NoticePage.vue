<template>
    <div>
        <SubButtonTable :rows="rows" rowKey="id" :columns="columns" icon="pageview" @subEvent="openPopup" @movePage="movePage">
            <q-btn class="q-mr-sm" color="primary" label="새 공지사항 작성" @click="moveCreatePage" />
        </SubButtonTable>

        <q-dialog v-model="popup" v-if="selectedItem != null">
            <q-card style="wdith: 1200px; max-width: 1200px;">
                <q-card-section>
                    <div class="row items-center q-ma-md">
                        <div class="row items-center q-mb-md" style="width: 100%;">
                            <div class="col-3">
                                제목
                            </div>
                            <div class="col-9">
                                <q-input outlined v-model="selectedItem.title" label="title" />
                            </div>
                        </div>

                        <div class="row items-center q-mb-md" style="width: 100%;">
                            <div class="col-3">
                                카테고리
                            </div>
                            <div class="col-9">
                                <q-select outlined v-model="selectedItem.category" :options="options" />
                            </div>
                        </div>

                        <div class="row items-center q-mb-md" style="width: 100%;">
                            <div class="col-3">
                                내용
                            </div>
                            <div class="col-9">
                                <q-editor v-model="selectedItem.content" min-height="10rem" />
                            </div>
                        </div>
                    </div>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn v-close-popup color="primary" label="닫기" />
                    <q-btn color="red" label="삭제" @click="deleteNotice" />
                    <q-btn color="positive" label="저장" @click="modifyNotice" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SubButtonTable from "../../components/SubButtonTable.vue";
import Api from "../../util/Api";
import { Notify, Dialog } from "quasar";

@Component({
    components: { SubButtonTable },
})
export default class extends Vue {
    rows: any[] = [];
    popup = false;
    selectedItem: any = null;

    columns = [
        { label: "번호", name: "id", field: "id", align: "left", sortable: true, sort: () => false},
        { label: "카테고리", name: "category", field: "category", align: "left", sortable: true, sort: () => false},
        { label: "제목", name: "title", field: "title", align: "left", sortable: true, sort: () => false},
        // { label: "조회수", name: "조회수", field: "title"},
        { label: "상세 보기", name: "sub" },
    ];

    moveCreatePage() {
        this.$router.push(this.$route.path + "/create");
    }

    openPopup(row: any){
        this.popup = true;
        this.selectedItem = JSON.parse(JSON.stringify(row));
    }

    async created() {
        await this.movePage(10, 0, "id", "asc");
    }

    deleteNotice() {
        Dialog.create({
            title: '삭제',
            message: '정말로 삭제하시겠습니까?',
            cancel: true,
            persistent: true
        }).onOk(async () => {
            const result = await Api.deleteNotice(this.selectedItem.id);
            if (result) {
                this.selectedItem = null;
                this.movePage(this.lastMove.limit, this.lastMove.offset, this.lastMove.sort, this.lastMove.dir);
            }
        })
    }

    options = [
        "공지", "점검", "업데이트", "이벤트", "기타"
    ]
    async modifyNotice(){
        if(this.selectedItem.title.trim() == "" || this.selectedItem.content.trim() == ""){
            return Notify.create({
                type: "negative",
                message: "내용을 전부 채워주시기 바랍니다.",
                position: "top",
            });
        }
        const result = await Api.modifyNotice(this.selectedItem.id, this.selectedItem.title, this.selectedItem.content, this.options.indexOf(this.selectedItem.category));
        if (result) {
            this.popup = false;
            this.movePage(this.lastMove.limit, this.lastMove.offset, this.lastMove.sort, this.lastMove.dir);
        }
    }


    lastMove = {
        limit: 0,
        offset: 0,
        sort: "",
        dir: ""
    }

    async movePage(limit: number, offset: number, sort: string, dir: string) {
        const result = await Api.getNoticeList(limit, offset, sort, dir);
        const notices = new Array(result.count).fill({id:null});
        for(let i = 0; i < notices.length; i++){
            notices[i] = this.rows[i];
        }
        this.rows = notices;
            
        for(let i = 0; i < result.notices.length; i++){
            this.rows[offset + i] = result.notices[i];
            this.rows[offset + i].category = this.options[this.rows[offset + i].category];
        }
        
        this.lastMove.limit = limit;
        this.lastMove.offset = offset;
        this.lastMove.sort = sort;
        this.lastMove.dir = dir;
    }
}
</script>
