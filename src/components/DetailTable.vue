<template>
    <q-table :data="rows" :filter="filter" :row-key="rowKey" :columns="columns">
        <template v-slot:top-left>
            <slot></slot>
        </template>
        <!-- <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
        </template> -->

        <template v-slot:body-cell-detail="props">
            <q-td key="detail" :props="props">
                <q-btn round color="primary" icon="pageview" @click="moveSubPage(props.row[rowKey])" />
            </q-td>
        </template>
    </q-table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
    components: {},
})
export default class extends Vue {
    filter = "";

    @Prop()
    rows: any;

    @Prop()
    rowKey!: string;

    @Prop()
    columns!: any[];

    @Prop()
    link!: string;

    moveSubPage(index: number){
        this.$router.push(this.link + index);
    }
}
</script>
