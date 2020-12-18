<template>
    <q-table :data="rows" :filter="filter" row-key="null" :columns="columns" :pagination.sync="pagination" :rows-per-page-options="[5, 10, 15, 20, 30]" >
        <template v-slot:top-right>
            <slot></slot>
        </template>

        <!-- <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
        </template> -->

        <template v-slot:body-cell-sub="props">
            <q-td key="sub" :props="props">
                <q-btn round color="primary" :icon="icon" @click="subEvent(props.row)" />
            </q-td>
        </template>
    </q-table>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
    components: {},
})
export default class extends Vue {
    filter = "";

    pagination = {
        rowsPerPage: 20,
        sortBy: null,
        descending: false,
        page: 1,
    };

    @Prop()
    rows: any;

    @Prop()
    rowKey!: string;

    @Prop()
    columns!: any[];

    @Prop()
    icon!: string;

    subEvent(row: any){
        this.$emit('subEvent', row);
    }

    @Watch("pagination")
    paginationChanged(){
        this.$emit("movePage", this.pagination.rowsPerPage, (this.pagination.page - 1) * this.pagination.rowsPerPage, this.pagination.sortBy || this.rowKey, this.pagination.descending ? "desc":"asc");
    }
}
</script>
