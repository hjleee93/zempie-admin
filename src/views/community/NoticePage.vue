<template>
    <div>
        <SubButtonTable :rows="rows" rowKey="id" :columns="columns" icon="pageview" @subEvent="openPopup">
            <q-btn class="q-mr-sm" color="primary" label="새 글작성" @click="moveCreatePage" />
        </SubButtonTable>

        <q-dialog v-model="popup" v-if="selectedItem != null">
            <q-card class="my-card">
                <q-card-section class="q-pt-none">
                    <div class="row items-center q-ma-md">
                        <div class="row items-center q-mb-md" style="width: 600px;">
                            <div class="col-3">
                                제목
                            </div>
                            <div class="col-9">
                                <q-input outlined v-model="selectedItem.title" label="title" />
                            </div>
                        </div>

                        <div class="row items-center q-mb-md" style="width: 600px;">
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
                    <q-btn color="negative" label="삭제" @click="deleteNotice" />
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
    rows = [];
    popup = false;
    selectedItem: any = null;

    columns = [
        { name: "번호", label: "번호", field: "id", align: "left"},
        { name: "카테고리", label: "카테고리", field: "type"},
        { name: "제목", label: "제목", field: "title"},
        { name: "sub", label: "상세 보기" },
    ];

    moveCreatePage() {
        this.$router.push(this.$route.path + "/create");
    }

    openPopup(row: any){
        this.popup = true;
        this.selectedItem = JSON.parse(JSON.stringify(row));
    }

    async mounted() {
        if (this.$store.getters.isLogin) {
            this.rows = await Api.getNoticeList();
        }
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
                Notify.create({
                    type: "positive",
                    message: "공지사항이 성공적으로 삭제되었습니다.",
                    position: "top",
                });
                this.rows = this.rows.filter((item: any) => item.id != this.selectedItem.id);
                this.selectedItem = null;
            } else {
                Notify.create({
                    type: "negative",
                    message: "공지사항을 삭제하는 도중에 문제가 발생하였습니다.",
                    position: "top",
                });
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
        const result = await Api.modifyNotice(this.selectedItem.id, this.selectedItem.title, this.selectedItem.content);
        if (result) {
            Notify.create({
                type: "positive",
                message: "공지사항이 성공적으로 수정되었습니다.",
                position: "top",
            });
            this.popup = false;
        } else {
            Notify.create({
                type: "negative",
                message: "공지사항을 수정하는 도중에 문제가 발생하였습니다.",
                position: "top",
            });
        }
    }
}
</script>
