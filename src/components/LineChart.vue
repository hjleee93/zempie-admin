<template>
    <q-card class="bg-white full-width">
        <q-card-section class="bg-blue-grey-8">
            <div class="row justify-between items-center no-wrap">
                <div class="col">
                    <div class="text-h6 text-white text-left">{{ title }}</div>
                </div>

                <div class="col row justify-end">
                    <slot></slot>
                </div>
            </div>
        </q-card-section>
        <q-card-section>
            <canvas ref="canvas"></canvas>
        </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Chart from "chart.js";

@Component({
    components: {},
})
export default class extends Vue {
    @Prop() data: any;
    @Prop() title!: string;
    @Prop() label!: string;
    @Prop() labelList!: string[];

    chart: any = null;

    @Watch("data", {deep: true})
    onDataChanged(){
        if(this.chart != null){
            this.chart.config.data.datasets[0].data = this.data;
            this.chart.update();
        }
    }

    mounted() {
        this.chart = this.createChart();
    }

    createChart() {
        const ctx = this.$refs.canvas as HTMLCanvasElement;
        return new Chart(ctx, {
            type: "line",
            data: {
                labels: this.labelList,
                datasets: [
                    {
                        data: this.data,
                        label: this.label,
                        fill: false,
                        lineTension: 0,
                        pointRadius: 10,
                        pointHoverRadius: 10
                    },
                ],
            },
            options: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: "",
                },
                elements:{
                    point:{
                        pointStyle: "rect"
                    }
                }
            },
        });
    }
}
</script>

<style></style>
