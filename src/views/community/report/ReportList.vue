<template>
    <div>
        <q-table
            title="All group"
            :data="data"
            :columns="columns"
            row-key="id"
            :pagination="initialPagination"
            :rows-per-page-options="pageOption"
        >
            <template v-slot:body="props">
                <q-tr :props="props" @click.prevent="subEvent(props.row)">
                    <q-td key="userId" :props="props">
                        {{ props.row.user_id }}
                    </q-td>

                    <q-td key="createdAt" :props="props">
                        {{
                            $q.config.date.formatDate(
                                props.row.createdAt,
                                "YYYY-MM-DD"
                            )
                        }}
                    </q-td>

                    <q-td key="name" :props="props">
                        {{ props.row.report_reason }}
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
    components: {},
})
export default class ReportList extends Vue {
    columns = [
        {
            field: "userId",
            name: "userId",
            label: "신고자",
            align: "left",
        },
        {
            field: "createdAt",
            name: "createdAt",
            label: "신고일",
            align: "left",
            sortable: true,
            sort: () => null,
        },
        {
            field: "name",
            name: "name",
            label: "신고 사유",
            align: "left",
            sortable: true,
            sort: () => null,
            event: true,
        },
    ];
    private data: any = [];

    private limit = 31;
    private offset = 0;
    private loading: boolean = false;

    private initialPagination = {
        rowsPerPage: 20,
    };

    private pageOption = [5, 10, 15, 20, 30];

    async created() {
        this.$api.group.report
            .list()
            .then((res: any) => {
                this.data = res;
            })
            .catch((e) => {
                console.log(e);
            });
    }

    subEvent(rows: any) {
        this.$router.push("/community/sub/" + rows.id);
    }
}
</script>

<style scoped lang="scss">
</style>
