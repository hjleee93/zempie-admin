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
                <q-btn color="primary" class="q-mr-sm" label="정지" />
            </div>
        </div> -->
        

        <SubButtonTable icon="pageview" :rows="rows" :columns="columns" @subEvent="openPopup" @movePage="movePage"> </SubButtonTable>

        <q-dialog v-model="popup" v-if="selectedItem != null">
            <q-card style="width: 700px; max-width: 80vw; height: 500px;">
                <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
                    <q-tab name="data" label="정보" />
                    <q-tab name="item" label="보유 아이템" />
                    <q-tab name="itemUsed" label="아이템 사용 기록" />
                    <q-tab name="exchange" label="환전 기록" />
                    <q-tab name="game" label="게임 기록" />
                    <q-tab name="info" label="고객센터" />
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

                    <q-tab-panel name="item">
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
                    </q-tab-panel>

                    <q-tab-panel name="info">
                        <SubButtonTable icon="pageview" :rows="subrows" :columns="subcolumns" @movePage="moveSubPage" />
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
    rows: any[] = [];

    columns = [
        // { name: '상태', label: '상태', field: '상태' },
        // { name: '젬', label: '젬', field: '젬' },
        { label: "아이디", name: "id", field: "id", align: "left", sortable: true, sort: () => false },
        { label: "닉네임", name: "name", field: "name", align: "left", sortable: true, sort: () => false },
        { label: "생성일", name: "created_at", field: "created_at", align: "left", sortable: true, sort: () => false },
        { label: "최종 방문일", name: "updated_at",  field: "updated_at", align: "left", sortable: true, sort: () => false },
        { label: "상세 보기", name: "sub", },
    ];

    openPopup(row: any) {
        this.selectedItem = JSON.parse(JSON.stringify(row));
        this.popup = true;
    }

    async created() {
        await this.movePage(30, 0, "id", "asc");
    }

    async movePage(limit: number, offset: number, sort: string, dir: string) {
        const result = await Api.getUserList(limit, offset, sort, dir);
        const users = new Array(result.count);
        for (let i = 0; i < this.rows.length; i++) {
            users[i] = this.rows[i];
        }
        this.rows = users;
        for (let i = 0; i < result.users.length; i++) {
            this.rows[offset + i] = result.users[i];
        }
    }

    async moveSubPage(limit: number, offset: number, sort: string, dir: string) {
        const result = await Api.getUserQuestion(limit, offset, sort, dir, this.selectedItem.id || 1);
        const questions = new Array(result.count);
        for (let i = 0; i < this.subrows.length; i++) {
            questions[i] = this.subrows[i];
        }
        this.subrows = questions;
        for (let i = 0; i < result.questions.length; i++) {
            this.subrows[offset + i] = result.questions[i];
        }
    }

    selectedItem: any = null;
    popup = false;
    tab = "data";

    subrows: any[] = [
        // {
        //     번호: "1",
        //     아이디: "person1",
        //     카테고리: "결제",
        //     제목: "결제가 2번 되었습니다.",
        //     상태: "답변완료",
        //     등록일: "2020.10.12 10.44.12",
        // },
        // {
        //     번호: "2",
        //     아이디: "person2",
        //     카테고리: "건의",
        //     제목: "개발자 아이템을 만들어 주세요",
        //     상태: "대기",
        //     등록일: "2020.10.11 10.44.12",
        // },
    ];

    subcolumns = [
        { label: "번호", name: "id", field: "id", align: "left" },
        { label: "아이디", name: "아이디", field: "아이디", align: "left" },
        { label: "카테고리", name: "카테고리", field: "카테고리", align: "left" },
        { label: "제목", name: "제목", field: "제목", align: "left" },
        { label: "상태", name: "상태", field: "상태", align: "left" },
        { label: "등록일", name: "등록일",  field: "등록일", align: "left" },
        { label: "상세보기", name: "sub" },
    ];
}
</script>
