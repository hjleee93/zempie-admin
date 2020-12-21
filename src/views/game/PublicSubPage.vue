<template>
    <div>
        <q-card>
            <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
                <q-tab name="data" label="정보" />
                <q-tab name="chart" label="지표" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="data">
                    <div class="row q-pb-md">
                        <div class="col-3 text-weight-bold">
                            게임 ID
                        </div>

                        <div class="col-9">
                            {{ selectedData.gameID }}
                        </div>
                    </div>

                    <div class="row q-pb-md">
                        <div class="col-3 text-weight-bold">
                            버전
                        </div>

                        <div class="col-9">
                            {{ selectedData.version }}
                        </div>
                    </div>

                    <div class="row q-pb-md">
                        <div class="col-3 text-weight-bold">
                            상태
                        </div>

                        <div class="col-9">
                            {{ selectedData.status }}
                        </div>
                    </div>

                    <div class="row q-pb-md">
                        <div class="col-3 text-weight-bold">
                            배포일
                        </div>

                        <div class="col-9">
                            {{ selectedData.distributionDate }}
                        </div>
                    </div>

                    <div class="row q-pb-md">
                        <div class="col-3 text-weight-bold">
                            개발자
                        </div>

                        <div class="col-9">
                            {{ selectedData.developer }}
                        </div>
                    </div>
                </q-tab-panel>

                <q-tab-panel name="chart">
                    <div class="row q-mb-md">
                        <div class="col">
                            <line-chart label="누적 플레이 수" :data="playData">
                                <q-btn-toggle
                                    v-model="playSelected"
                                    toggle-color="primary"
                                    color="white"
                                    text-color="black"
                                    :options="[
                                        { label: '일간', value: 'day' },
                                        { label: '주간', value: 'week' },
                                        { label: '월간', value: 'month' },
                                    ]"
                                />
                            </line-chart>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <LineChart label="광고 재생 횟수" :data="advertisingData">
                                <q-btn-toggle
                                    v-model="advertisingSelected"
                                    toggle-color="primary"
                                    color="white"
                                    text-color="black"
                                    :options="[
                                        { label: '일간', value: 'day' },
                                        { label: '주간', value: 'week' },
                                        { label: '월간', value: 'month' },
                                    ]"
                                />
                            </LineChart>
                        </div>
                    </div>
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LineChart from "@/components/LineChart.vue";

@Component({
    components: {
        LineChart,
    },
})
export default class extends Vue {
    tab = "data";
    index = this.$route.params.index;

    selectedData = {
        gameID: "ftred1",
        version: "0.0.1",
        status: "심사 대기",
        distributionDate: "2020.10.24 11:11:23",
        developer: "example"
    }

    playData = [11, 22, 82, 29, 54, 52, 24];
    advertisingData = [24, 14, 14, 25, 29, 27, 95];

    playSelected = "day";
    advertisingSelected = "day";
}
</script>
