<template>
    <div>
        <q-table
            title="신고 목록"
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

                    <q-td key="targetType" :props="props">
                        {{ props.row.targetType }}
                    </q-td>
                    <q-td key="createdAt" :props="props">
                        {{
                            $q.config.date.formatDate(
                                props.row.createdAt,
                                "YYYY-MM-DD HH:MM:SS"
                            )
                        }}
                    </q-td>

                    <q-td key="name" :props="props">
                        {{ reportEnum[props.row.report_reason] }}
                    </q-td>
                    <q-td>
                        <q-btn
                            class="q-mr-sm"
                            @click="readPost(props.row.post_id)"
                            >보기</q-btn
                        >
                    </q-td>
                    <q-td>
                        <q-btn
                            class="q-mr-sm"
                            @click="deletePost(props.row.post_id)"
                            >삭제</q-btn
                        >
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Notify } from "quasar";

enum eReportReason {
    spam = 1,
    sexual,
    curse,
    other,
}
@Component({
    components: {},
})
export default class ReportList extends Vue {
    reportEnum: any = eReportReason;
    columns = [
        {
            field: "userId",
            name: "userId",
            label: "신고자",
            align: "left",
        },
        {
            field: "targetType",
            name: "targetType",
            label: "타입",
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
        {
            field: "check",
            name: "check",
            label: "확인",
            align: "left",
        },
        {
            field: "manage",
            name: "manage",
            label: "관리",
            align: "left",
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

    isPostRead = false;
    postInfo: any = {};

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
        // this.$router.push("/community/sub/" + rows.id);
    }
    readPost(id: string) {
        window.open(`${process.env.VUE_APP_ZEMPIE_LINK}feed/${id}`);
        this.$api.group
            .readPost(id)
            .then((res: any) => {
                this.postInfo = res;
                console.log(res);
                this.isPostRead = true;
                // this.data = res;
            })
            .catch((e) => {
                console.log(e);
            });
    }
    deletePost(id: string) {
        this.$q
            .dialog({
                message: "해당 포스팅을 삭제하시겠습니까?",
                cancel: true,
            })
            .onOk(() => {
                this.$api.group.deletePost(id).then((res) => {
                    Notify.create({
                        type: "positive",
                        message: "해당 포스팅을 삭제했습니다.",
                        position: "top",
                    });
                });
            })
            .onCancel(() => {})
            .onDismiss(() => {});
    }
}
</script>

<style scoped lang="scss">
</style>
