<template>
    <div>
        <!-- <div class="row q-mb-md">
            <div class="col">
                <line-chart label="접속자 수" :data="accessorData">
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

        <div class="row">
            <div class="col">
                <line-chart label="플레이 수" :data="playData">
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
        </div> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LineChart from "../components/LineChart.vue";

@Component({
    components: {
        LineChart,
    },
})
export default class extends Vue {
    accessorData = [24, 14, 14, 25, 29, 27, 95];
    playData = [11, 22, 82, 29, 54, 52, 24];

    accessorSelected = "day"
    playSelected = "day"
}
</script>
