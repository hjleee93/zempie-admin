<template>
    <q-table :data="rows" :filter="filter" :columns="columns" :pagination.sync="pagination" :rows-per-page-options="[5, 10, 15, 20, 30]" row-key="null">
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
    </q-table>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
    components: {},
})
export default class extends Vue {
    filter = "";
    page = 1;

    pagination = {
        rowsPerPage: 20,
        sortBy: null,
        descending: false,
        page: 1
    };

    @Prop()
    rows: any;

    @Prop()
    rowKey!: string;

    @Prop()
    columns!: any[];

    @Watch("pagination")
    paginationChanged(prevP: any, nextP: any){
        this.$emit("movePage", this.pagination.rowsPerPage, (this.pagination.page - 1) * this.pagination.rowsPerPage, this.pagination.sortBy || this.rowKey, this.pagination.descending ? "desc":"asc");
    }
}
</script>
