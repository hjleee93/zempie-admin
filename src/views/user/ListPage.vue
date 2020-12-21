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

        <MainTable rowKey="id" :columns="columns" apiLink="user/list" columnName="users" @subEvent="openPopup" />

        <q-dialog v-model="popup" v-if="selectedItem != null" persistent>
            <q-card style="width: 1000px; max-width: 80vw; height: 600px;">
                <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
                    <q-tab name="data" label="정보" />
                    <!-- <q-tab name="item" label="보유 아이템" />
                    <q-tab name="itemUsed" label="아이템 사용 기록" />
                    <q-tab name="exchange" label="환전 기록" />
                    <q-tab name="game" label="게임 기록" /> -->
                    <q-tab name="info" label="1:1 문의" />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated style="height: calc(100% - 90px);">
                    <q-tab-panel name="data">
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
                            <div class="col-12 text-weight-bold text-h6">
                                개발자 여부
                            </div>

                            <div class="col-12">
                                {{ selectedItem.is_developer }}
                            </div>
                        </div>
                        <div class="row q-mb-md">
                            <div class="col-12 text-weight-bold text-h6">
                                채널
                            </div>

                            <div class="col-12">
                                <a :href="channelLink" target="_blank">
                                    채널 열기
                                </a>
                                <!-- {{ selectedItem.is_developer }} -->
                            </div>
                        </div>
                        <div class="row q-mb-md">
                            <div class="col-12 text-weight-bold text-h6">
                                정지 횟수
                            </div>

                            <div class="col-12">
                                {{ selectedItem.banned }}
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
                        <MainTable 
                            rowKey="id" 
                            :columns="subcolumns" 
                            apiLink="support/inquiries" 
                            columnName="inquiries" 
                            @subEvent="moveInquirySubPage" 
                            :apiParam="{user_id: selectedItem.id}"
                        /> 
                    </q-tab-panel>
                </q-tab-panels>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn v-close-popup color="primary" label="닫기" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MainTable from "@/components/MainTable.vue";
import Api from "@/util/Api";

@Component({
    components: {
        MainTable
    },
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
    channelLink = "";

    columns = [
        { label: "인덱스", name: "id", field: "id", align: "left", sortable: true },
        { label: "닉네임", name: "name", field: "name", align: "left", sortable: true, event: true },
        { label: "이메일", name: "email", field: "email", align: "left", sortable: true },
        { label: "계정 생성일", name: "created_at", field: "created_at", align: "left", sortable: true },
    ];

    openPopup(row: any) {
        this.selectedItem = JSON.parse(JSON.stringify(row));
        this.popup = true;
        this.tab = "data";
        this.channelLink = process.env.VUE_APP_ZEMPIE_LINK+'channel/'+this.selectedItem.channel_id;
    }

    // async created() {}

    selectedItem: any = null;
    popup = false;
    tab = "data";

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
        { label: "인덱스", name: "id", field: "id", align: "left", sortable: true},
        { label: "제목", name: "title", field: "title", align: "left", sortable: true, event: true},
        { label: "카테고리", name: "category", field: "category", align: "left", sortable: true},
        { label: "질문일", name: "asked_at", field: "asked_at", align: "left", sortable: true},
        { label: "상태", name: "state", field: "state", align: "left", sortable: true},
    ];

    moveInquirySubPage( row: any ){
        this.$router.push("/community/inquiry/sub/" + row.id);
    }
}
</script>
