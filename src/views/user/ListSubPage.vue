<template>
    <div>
        <q-card>
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
                            {{ userData.id }}
                        </div>
                    </div>
                    <!-- <div class="row q-mb-md">
                        <div class="col-12 text-weight-bold text-h6">
                            비밀번호
                        </div>

                        <div class="col-12">
                            example
                        </div>
                    </div> -->
                    <!-- <div class="row q-mb-md">
                        <div class="col-12 text-weight-bold text-h6">
                            상태
                        </div>

                        <div class="col-12">
                            example
                        </div>
                    </div> -->
                    <div class="row q-mb-md">
                        <div class="col-12 text-weight-bold text-h6">
                            가입일
                        </div>

                        <div class="col-12">
                        {{ userData.created_at }}
                        </div>
                    </div>
                    <!-- <div class="row q-mb-md">
                        <div class="col-12 text-weight-bold text-h6">
                            최근 접속일
                        </div>

                        <div class="col-12">
                            example
                        </div>
                    </div> -->
                    <!-- <div class="row q-mb-md">
                        <div class="col-12 text-weight-bold text-h6">
                            젬
                        </div>

                        <div class="col-12">
                            example
                        </div>
                    </div> -->
                    <div class="row q-mb-md">
                        <div class="col-12 text-weight-bold text-h6">
                            이메일
                        </div>

                        <div class="col-12">
                            {{ userData.email }}
                        </div>
                    </div>
                    <!-- <div class="row q-mb-md">
                        <div class="col-12 text-weight-bold text-h6">
                            연락처
                        </div>

                        <div class="col-12">
                            example
                        </div>
                    </div> -->
                    <!-- <div class="row q-mb-md">
                        <div class="col-12 text-weight-bold text-h6">
                            개발자 닉네임
                        </div>
                        
                        <div class="col-12">
                            {{userData.name}}
                        </div>
                    </div>
                    <div class="row q-mb-md">
                        <div class="col-12 text-weight-bold text-h6">
                            은행
                        </div>

                        <div class="col-12">
                            example
                        </div>
                    </div>
                    <div class="row q-mb-md">
                        <div class="col-12 text-weight-bold text-h6">
                            계좌번호
                        </div>

                        <div class="col-12">
                            example
                        </div>
                    </div> -->
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
                    <!-- <DetailTable :rows="rows"  :rowKey="rowKey" :columns="columns" link="/community/inquiry/sub/" /> -->

                    <MainTable rowKey="id" :columns="columns" apiLink="support/inquiries" columnName="inquiries" @subEvent="subEvent" :apiParam="{user_id: index}" />
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LineChart from "@/components/LineChart.vue";
// import DetailTable from "@/components/DetailTable.vue";
import MainTable from "@/components/MainTable.vue";
// import Api from "@/util/Api";

@Component({
    components: {
        LineChart,
        // DetailTable,
        MainTable,
    },
})
export default class extends Vue {
    tab = "data";
    index = this.$route.params.index;

    rowKey = "번호"

    // rows = [];

    columns = [
        { name: '번호', label:"번호", field: '번호', align: 'left' },
        { name: '아이디', label: '아이디', field: '아이디', align: 'left' },
        { name: '카테고리', label: "카테고리", field: '카테고리', align: 'left' },
        { name: '제목', label: "제목", field: '제목', align: 'left' },
        { name: '상태', label: "상태", field: '상태', align: 'left' },
        { name: '등록일', label: "등록일", field: '등록일', align: 'left' },
        { name: 'detail', label: "상세 보기"}
    ];

    // async created(){}
}
</script>
