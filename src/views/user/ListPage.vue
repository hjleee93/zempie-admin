<template>
    <div>
        <!-- <div class="row q-mb-md">
            <div class="col-12">
                <q-option-group
                    v-model="option"
                    :options="options"
                    color="primary"
                    inline
                />
            </div>

            <div class="col-12 row">
                <q-select outlined v-model="option2" :options="options2" label="Outlined" style="width: 300px;" class="q-mr-md" />
                <q-btn color="primary" class="q-mr-sm" label="상세 검색" />
            </div>
        </div> -->

        <SubButtonTable rowKey="id" icon="pageview" :rows="viewRows" :columns="columns" @subEvent="openPopup" @movePage="movePage" />

        <q-dialog v-model="popup" v-if="selectedItem != null">
            <q-card style="width: 700px; max-width: 80vw; height: 500px;">
                <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
                    <q-tab name="data" label="정보" />
                    <!-- <q-tab name="item" label="보유 아이템" />
                    <q-tab name="itemUsed" label="아이템 사용 기록" />
                    <q-tab name="exchange" label="환전 기록" />
                    <q-tab name="game" label="게임 기록" /> -->
                    <q-tab name="info" label="1:1 문의" />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="data">
                        <div class="row q-mb-md">
                            <div class="col-12 text-weight-bold text-h6">
                                ID
                            </div>

                            <div class="col-12">
                                {{ selectedItem.id }}
                            </div>
                        </div>
                        <div class="row q-mb-md">
                            <div class="col-12 text-weight-bold text-h6">
                                이름
                            </div>

                            <div class="col-12">
                                {{ selectedItem.name }}
                            </div>
                        </div>
                        <div class="row q-mb-md">
                            <div class="col-12 text-weight-bold text-h6">
                                가입일
                            </div>

                            <div class="col-12">
                                {{ selectedItem.created_at }}
                            </div>
                        </div>
                        <div class="row q-mb-md">
                            <div class="col-12 text-weight-bold text-h6">
                                이메일
                            </div>

                            <div class="col-12">
                                {{ selectedItem.email }}
                            </div>
                        </div>

                        <div class="row q-mb-md">
                            <q-btn color="primary" class="q-mr-sm" label="정지" />
                            <q-btn color="primary" class="q-mr-sm" label="삭제" />
                            <q-btn color="primary" class="q-mr-sm" label="정지 취소" />
                        </div>
                    </q-tab-panel>

                    <!-- <q-tab-panel name="item">
                        보유 아이템
                    </q-tab-panel>

                    <q-tab-panel name="itemUsed">
                        아이템 사용 기록
                    </q-tab-panel>

                    <q-tab-panel name="exchange">
                        환전 기록
                    </q-tab-panel>

                    <q-tab-panel name="game">
                        게임 기록
                    </q-tab-panel> -->

                    <q-tab-panel name="info">
                        <SubButtonTable rowKey="id" icon="pageview" :rows="subrows" :columns="subcolumns" @movePage="moveSubPage" @subEvent="moveInquirySubPage" />
                    </q-tab-panel>
                </q-tab-panels>
            </q-card>
        </q-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SubButtonTable from "../../components/SubButtonTable.vue";
import Api from "../../util/Api";

@Component({
    components: { SubButtonTable },
})
export default class extends Vue {
    option = 1;
    options = [
        {label: "상태", value: 1},
        {label: "가입/최종방문일", value: 2}
    ]

    option2 = "상태";
    options2 = [
        {label: "상태", value: 1},
        {label: "가입/최종방문일", value: 2},
        {label: "상태", value: 1},
        {label: "가입/최종방문일", value: 2},
    ]

    rows: any[] = [];

    get viewRows(){
        const rows = this.rows.map(x => {
            x["created_at"] = new Date(x["created_at"]).toLocaleString();
            x["updated_at"] = new Date(x["updated_at"]).toLocaleString();
            return x;
        })
        return rows;
    }

    columns = [
        { label: "아이디", name: "id", field: "id", align: "left", sortable: true, sort: () => false },
        { label: "닉네임", name: "name", field: "name", align: "left", sortable: true, sort: () => false },
        { label: "생성일", name: "created_at", field: "created_at", align: "left", sortable: true, sort: () => false },
        // { label: "최종 방문일", name: "updated_at",  field: "updated_at", align: "left", sortable: true, sort: () => false },
        { label: "상세 보기", name: "sub", },
    ];

    openPopup(row: any) {
        this.selectedItem = JSON.parse(JSON.stringify(row));
        this.popup = true;
        this.tab = "data";
        this.subrows = [];
    }

    async created() {
        await this.movePage(30, 0, "id", "asc");
    }

    async movePage(limit: number, offset: number, sort: string, dir: string) {
        const result = await Api.getUserList(limit, offset, sort, dir);
        if(result !== false){
            const users = new Array(result.count);
            for (let i = 0; i < users.length; i++) {
                users[i] = this.rows[i];
            }
            this.rows = users;
            for (let i = 0; i < result.users.length; i++) {
                this.rows[offset + i] = result.users[i];
            }
        }
    }

    selectedItem: any = null;
    popup = false;
    tab = "data";

    subrows: any[] = [];
    subCategory = [
        "버그/기술",
        "불량 유저",
        "계정",
        "스튜디오",
        "저작권",
        "이벤트",
        "기타"
    ]

    subcolumns = [
        { label: "번호", name: "id", field: "id", align: "left", sortable: true, sort: () => false},
        { label: "카테고리", name: "category", field: "category", sortable: true, sort: () => false},
        { label: "제목", name: "title", field: "title", sortable: true, sort: () => false},
        { label: "질문일", name: "date", field: "date", sortable: true, sort: () => false},
        { label: "상세 보기", name: "sub" },
    ];

    async moveSubPage(limit: number, offset: number, sort: string, dir: string) {
        const result = await Api.getUserInquiry(limit, offset, sort, dir, this.selectedItem.id);
        const inquiries = new Array(result.count);
        for (let i = 0; i < this.subrows.length; i++) {
            inquiries[i] = this.subrows[i];
        }
        this.subrows = inquiries;
        for (let i = 0; i < result.inquiries.length; i++) {
            this.subrows[offset + i] = result.inquiries[i];
            this.subrows[offset + i].date = new Date(this.subrows[offset + i].asked_at).toLocaleString();
            this.subrows[offset + i].category = this.subCategory[this.subrows[offset + i].category];
        }
    }

    moveInquirySubPage(item: any){
        this.$router.push("/community/inquiry/sub/"+item.id);
    }
}
</script>
