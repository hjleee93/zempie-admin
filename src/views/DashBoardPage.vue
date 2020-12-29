<template>
    <div>
        <div class="row q-mb-md">
            <div class="col-12 col-md-6">
                <div class="row">
                    <div class="col-12 col-md-12 col-lg-6 q-pa-sm">
                        <q-card class="full-width">
                            <q-card-section>
                                <div class="row jusify-bewween items-center no-wrap">
                                    <div class="col">
                                        <div class="text-h6 text-center">오늘 접속자 수</div>
                                    </div>
                                </div>
                            </q-card-section>

                            <q-card-section>
                                <div class="text-h4 text-center q-pt-md q-pb-md">
                                    3
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>

                    <div class="col-12 col-md-12 col-lg-6 q-pa-sm">
                        <q-card class="full-width">
                            <q-card-section>
                                <div class="row jusify-bewween items-center no-wrap">
                                    <div class="col">
                                        <div class="text-h6 text-center">총 접속자 수</div>
                                    </div>
                                </div>
                            </q-card-section>

                            <q-card-section>
                                <div class="text-h4 text-center q-pt-md q-pb-md">
                                    3,342
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>

                    <div class="col-12 q-pa-sm">
                        <line-chart title="접속자 수" :data="accessorData" label="접속자 수" :labelList="accessLabel">
                            <q-btn-toggle
                                v-model="accessorSelected"
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
            </div>
            

            <div class="col-12 col-md-6">
                <div class="row">
                        <div class="col-12 col-md-12 col-lg-6 q-pa-sm">
                        <q-card class="full-width">
                            <q-card-section>
                                <div class="row jusify-bewween items-center no-wrap">
                                    <div class="col">
                                        <div class="text-h6 text-center">오늘 플레이 수</div>
                                    </div>
                                </div>
                            </q-card-section>

                            <q-card-section>
                                <div class="text-h4 text-center q-pt-md q-pb-md">
                                    38,871
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>

                    <div class="col-12 col-md-12 col-lg-6 q-pa-sm">
                        <q-card class="full-width">
                            <q-card-section>
                                <div class="row jusify-bewween items-center no-wrap">
                                    <div class="col">
                                        <div class="text-h6 text-center">총 플레이 수</div>
                                    </div>
                                </div>
                            </q-card-section>

                            <q-card-section>
                                <div class="text-h4 text-center q-pt-md q-pb-md">
                                    1,735,168
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>

                    <div class="col-12 q-pa-sm">
                        <line-chart title="플레이 수" :data="playData" label="플레이 수" :labelList="playLabel">
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
            </div>
        </div>
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
    accessorData = [24, 14, 14, 25, 29, 27, 95];
    accessLabel = ["7일전", "6일전", "5일전", "4일전", "3일전", "2일전", "1일전"];
    playData = [11, 22, 82, 29, 54, 52, 24];
    playLabel = ["7일전", "6일전", "5일전", "4일전", "3일전", "2일전", "1일전"];

    accessorSelected = "day";
    playSelected = "day";
}
</script>
