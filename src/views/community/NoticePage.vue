<template>
    <div>
        <CheckTable :rows="rows" rowKey="id" :columns="columns" link="/community/notice/sub/" @selectEvent="selectItem">
            <q-btn class="q-mr-sm" color="primary" label="새 글작성" @click="moveCreatePage" />
            <q-btn class="q-mr-sm" color="primary" label="편집" @click="openModifyNotice" />
            <q-btn class="q-mr-sm" color="primary" label="삭제" @click="deleteNotice" />
        </CheckTable>

        <q-dialog v-model="modify" v-if="modifyItem != null">
            <q-card class="my-card">
                <q-card-section class="q-pt-none">
                    <div class="row items-center q-ma-md">
                        <div class="row items-center q-mb-md" style="width: 600px;">
                            <div class="col-3">
                                제목
                            </div>
                            <div class="col-9">
                                <q-input outlined v-model="modifyItem.title" label="title" />
                            </div>
                        </div>

                        <div class="row items-center q-mb-md" style="width: 600px;">
                            <div class="col-3">
                                내용
                            </div>
                            <div class="col-9">
                                <q-editor v-model="modifyItem.content" min-height="10rem" />
                            </div>
                        </div>
                    </div>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn v-close-popup color="negative" label="닫기" />
                    <q-btn color="primary" label="저장" @click="modifyNotice" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CheckTable from "../../components/CheckTable.vue";
import Api from "../../util/Api";
import { Notify, Dialog } from "quasar";

@Component({
    components: { CheckTable },
})
export default class extends Vue {
    selectedItem: any = null;
    rows = [];
    modify = false;
    modifyItem: any = null;

    columns = [
        { name: "번호", label: "번호", field: "id", sortable: true },
        { name: "카테고리", label: "카테고리", field: "type", sortable: true },
        { name: "제목", label: "제목", field: "title", sortable: true },
        { name: "detail", label: "상세 보기" },
    ];

    moveCreatePage() {
        this.$router.push(this.$route.path + "/create");
    }

    selectItem(item: any) {
        this.selectedItem = item;
    }

    async mounted() {
        if (this.$store.getters.isLogin) {
            this.rows = await Api.getNoticeList();
        }
    }

    deleteNotice() {
        if (this.selectedItem != null) {
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
                    this.selectedItem = null;
                } else {
                    Notify.create({
                        type: "negative",
                        message: "공지사항을 삭제하는 도중에 문제가 발생하였습니다.",
                        position: "top",
                    });
                }
            })
        } else {
            Notify.create({
                type: "negative",
                message: "공지사항을 선택해 주시기 바랍니다.",
                position: "top",
            });
        }
    }

    openModifyNotice(){
        if(this.selectedItem != null){
            this.modify = true;
            this.modifyItem = JSON.parse(JSON.stringify(this.selectedItem));
        }else{
            Notify.create({
                type: "negative",
                message: "공지사항을 선택해 주시기 바랍니다.",
                position: "top",
            });
        }
    }

    async modifyNotice(){
        if(this.modifyItem.title.trim() == "" || this.modifyItem.content.trim() == ""){
            Notify.create({
                type: "negative",
                message: "내용을 전부 채워주시기 바랍니다.",
                position: "top",
            });
        }
        const result = await Api.modifyNotice(this.modifyItem.id, this.modifyItem.title, this.modifyItem.content);
        if (result) {
            Notify.create({
                type: "positive",
                message: "공지사항이 성공적으로 수정되었습니다.",
                position: "top",
            });
            this.modify = false;
            this.modifyItem = null;
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
