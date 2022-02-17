<template>
    <div>
        <q-table
            title="신고 목록"
            :data="data"
            :columns="columns"
            row-key="id"
            :pagination="pagination"
            :rows-per-page-options="[0]"
        >
            <template v-slot:body="props">
                <q-tr :props="props" @click.prevent="subEvent(props.row)">
                    <q-td key="user" :props="props">
                        {{ props.row.user.name }}
                    </q-td>
                    <q-td key="target_user" :props="props">
                        {{ props.row.target_user.name }}
                    </q-td>
                    <q-td key="reason_num" :props="props">
                        {{ reportEnum[props.row.reason_num] }}
                    </q-td>
                    <q-td key="is_done" :props="props">
                        {{ props.row.is_done ? "해결" : "해결안됨" }}
                    </q-td>
                    <q-td key="user_channel" :props="props">
                        <q-btn
                            class="center cursor-pointer"
                            @click="
                                openUserChannel(
                                    props.row.target_user.channel_id
                                )
                            "
                            target="_blank"
                        >
                            유저 채널 바로가기
                        </q-btn>
                    </q-td>
                    <q-td key="created_at" :props="props">
                        {{
                            moment(props.row.created_at).format(
                                "YYYY-MM-DD HH:mm:ss"
                            )
                        }}
                    </q-td>

                    <q-td key="report_handle" :props="props">
                        <ReportHadlingBtn
                            :row="props.row"
                            @refresh="fetch"
                        ></ReportHadlingBtn>
                    </q-td>
                    <q-td key="report_handle_cancel" :props="props">
                        <ReportCancelBtn
                            :row="props.row"
                            @refresh="fetch"
                        ></ReportCancelBtn>
                    </q-td>
                </q-tr>
            </template>
            <template v-slot:pagination>
                <span class="q-mr-md"> {{ currPage }} - {{ pagesNumber }}</span>
                <q-btn
                    v-if="pagesNumber > 2"
                    icon="first_page"
                    color="grey-8"
                    round
                    dense
                    flat
                    :disable="isFirstPage"
                    @click="firstPage"
                />

                <q-btn
                    icon="chevron_left"
                    color="grey-8"
                    round
                    dense
                    flat
                    :disable="isFirstPage"
                    @click="prevPage"
                />

                <q-btn
                    icon="chevron_right"
                    color="grey-8"
                    round
                    dense
                    flat
                    :disable="isLastPage"
                    @click="nextPage"
                />

                <q-btn
                    v-if="pagesNumber > 2"
                    icon="last_page"
                    color="grey-8"
                    round
                    dense
                    flat
                    :disable="isLastPage"
                    @click="lastPage"
                />
            </template>
        </q-table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Notify } from "quasar";
import moment from "moment";
import ReportHadlingBtn from "@/views/report/_reportHandlingBtn.vue";
import ReportCancelBtn from "@/views/report/_reportCancelBtn.vue";

enum eReportReason {
    "해킹" = 1,
    "사칭",
    "혐오",
}
@Component({
    components: { ReportHadlingBtn, ReportCancelBtn },
})
export default class userReportList extends Vue {
    moment = moment;
    reportEnum: any = eReportReason;
    columns = [
        {
            field: "user",
            name: "user",
            label: "신고한 유저",
            align: "left",
        },
        {
            field: "target_user",
            name: "target_user",
            label: "신고된 유저",
            align: "left",
        },
        {
            field: "reason_num",
            name: "reason_num",
            label: "신고 사유",
            align: "left",
            sortable: true,
            sort: () => null,
            event: true,
        },
        {
            field: "is_done",
            name: "is_done",
            label: "해결 상태",
            align: "left",
        },
        {
            field: "user_channel",
            name: "user_channel",
            label: "유저 채널",
            align: "left",
        },
        {
            field: "created_at",
            name: "created_at",
            label: "신고일",
            align: "left",
            sortable: true,
            sort: () => null,
        },
        {
            field: "report_handle",
            name: "report_handle",
            label: "신고 처리",
            align: "left",
            sortable: true,
            sort: () => null,
        },
        {
            field: "report_handle_cancel",
            name: "report_handle_cancel",
            label: "제재 수정",
            align: "left",
            sortable: true,
            sort: () => null,
        },
    ];
    data: any = [];

    limit = 20;
    offset = 0;
    loading: boolean = false;

    pagination = {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: this.limit,
        rowsNumber: 10,
    };

    pagesNumber: number = 1;
    currPage: number = 1;
    isFirstPage: boolean = true;
    isLastPage: boolean = false;
    pageOption = [5, 10, 15, 20, 30];

    totalCount: number = 0;
    isPostRead = false;
    postInfo: any = {};

    async mounted() {
        this.fetch();
    }

    fetch() {
        const obj = {
            limit: this.limit,
            offset: this.offset,
            sort: "created_at",
            dir: "desc",
        };

        this.$api
            .userReportList(obj)
            .then((res: any) => {
                this.data = res.result.lists;
                this.totalCount = res.result.count;
                this.pagesNumber = Math.ceil(
                    res.result.count / this.pagination.rowsPerPage
                );
                if (res.result.lists.length < this.pagination.rowsPerPage) {
                    this.isLastPage = true;
                }
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

    openUserChannel(channel_id: string) {
        window.open(
            `${this.$store.getters.zempieUrl}channel/${channel_id}/timeline`
        );
    }

    // pagination
    nextPage() {
        this.offset += this.limit;
        this.isFirstPage = false;
        this.currPage++;

        if (this.offset + this.limit === this.totalCount) {
            this.isLastPage = true;
        }
        this.fetch();
    }
    prevPage() {
        this.offset -= this.limit;
        this.isLastPage = false;
        this.currPage--;
        if (this.offset === 0) {
            this.isFirstPage = true;
        }
        this.fetch();
    }
    lastPage() {
        this.currPage = this.pagesNumber;
        this.offset = this.totalCount - this.pagination.rowsPerPage;
        this.isFirstPage = false;
        this.isLastPage = true;
        this.fetch();
    }

    firstPage() {
        this.currPage = 1;
        this.offset = 0;
        this.isFirstPage = true;
        this.isLastPage = false;
        this.fetch();
    }

    // /pagination
}
</script>

<style scoped lang="scss">
.center {
    display: flex;
    vertical-align: middle;
}
.cursor-pointer {
    cursor: pointer;
}
</style>
