<template>
    <div>
        <MainTable 
        rowKey="id" 
        :columns="columns" 
        apiLink="support/notices" 
        columnName="notices" 
        @subEvent="openPopup"
        refs="table"
        > 
            <q-btn class="q-mr-sm" color="primary" label="새 공지사항 작성" @click="moveCreatePage" />
        </MainTable>

        <q-dialog v-model="popup" v-if="selectedItem != null" persistent>
            <q-card style="wdith: 1200px; max-width: 1200px;">
                <q-card-section class="q-pa-md">
                    <div class="row items-center">
                        <div class="row items-center q-mb-md" style="width: 100%;">
                            <div class="col-3">
                                제목
                            </div>
                            <div class="col-9">
                                <q-input outlined v-model="selectedItem.title" placeholder="Title" />
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

                        <div class="row items-center" style="width: 100%;">
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
import { Notify, Dialog } from "quasar";
import MainTable from "@/components/MainTable.vue";
import { TableBus } from "@/components/MainTable.vue";
import Api from "@/util/Api";
import Config from "@/util/Config";


@Component({
    components: { 
        MainTable,
    },
})
export default class extends Vue {
    rows: any[] = [];
    popup = false;
    selectedItem: any = null;

    columns = [
        { label: "인덱스", name: "id", field: "id", align: "left", sortable: true},
        { label: "카테고리", name: "category", field: "category", align: "left", sortable: true},
        { label: "제목", name: "title", field: "title", align: "left", sortable: true, event: true},
    ];

    get options(){
        return Config.noticeCategory;
    }

    moveCreatePage() {
        this.$router.push(this.$route.path + "/create");
    }

    openPopup(row: any){
        this.popup = true;
        this.selectedItem = JSON.parse(JSON.stringify(row));
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
                TableBus.$emit("reload");
            }
        })
    }

    async modifyNotice(){
        if(this.selectedItem.title.trim() == "" || this.selectedItem.content.trim() == ""){
            return Notify.create({
                type: "negative",
                message: "내용을 전부 채워주시기 바랍니다.",
                position: "top",
            });
        }
        const result = await Api.modifyNotice(
            this.selectedItem.id, 
            this.selectedItem.title, 
            this.selectedItem.content, 
            Config.noticeCategory.indexOf(this.selectedItem.category)
        );
        if (result) {
            this.popup = false;
            TableBus.$emit("reload");
        }
    }
}
</script>
