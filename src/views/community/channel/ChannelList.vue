<template>
    <div>
        <q-table
            title="Channels"
            :data="channelData"
            :columns="columns"
            row-key="id"
        >
            <template v-slot:top>
                <div class="table-title">
                    Channels
                    <q-btn
                        color="positive"
                        label="생성하기"
                        @click="openModal"
                    />
                </div>
            </template>
            <template v-slot:body="props">
                <q-tr :props="props">
                    <!--                <q-td auto-width>-->
                    <!--                    <q-btn-->
                    <!--                        size="sm"-->
                    <!--                        color="accent"-->
                    <!--                        round-->
                    <!--                        dense-->
                    <!--                        @click="props.expand = !props.expand"-->
                    <!--                        :icon="props.expand ? 'remove' : 'add'"-->
                    <!--                    />-->
                    <!--                </q-td>-->
                    <q-td key="profile_img" :props="props">
                        <q-img
                            :src="props.row.profile_img"
                            spinner-color="white"
                            style="height: 66px; width: 100px"
                            :ratio="1"
                        ></q-img>
                    </q-td>

                    <q-td key="name" :props="props">
                        {{ props.row.title }}
                    </q-td>

                    <q-td key="desc" :props="props">
                        {{ props.row.description }}
                    </q-td>
                    <q-td key="state" :props="props">
                        {{ props.row.state }}
                    </q-td>

                    <q-td key="createdAt" :props="props">
                        {{
                            $q.config.date.formatDate(
                                props.row.createdAt,
                                "YYYY-MM-DD"
                            )
                        }}
                    </q-td>
                    <q-td key="change">
                        <q-btn
                            label="수정"
                            color="primary"
                            class="q-mr-sm"
                            @click="editChannel(props.row)"
                        />
                        <q-btn
                            label="삭제"
                            color="red"
                            @click="confirmDialog(props.row.id)"
                        />
                    </q-td>
                </q-tr>
            </template>
        </q-table>
        <!-- 채널 생성 모달-->
        <q-dialog ref="createChannel" no-backdrop-dismiss>
            <q-card class="edit-modal">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">채널 생성하기</div>
                    <q-space />
                    <q-btn
                        icon="close"
                        flat
                        round
                        dense
                        v-close-popup="true"
                    ></q-btn>
                </q-card-section>
                <q-card-section>
                    <ChannelCreate
                        :communityId="communityId"
                        @closeModal="closeModal()"
                    ></ChannelCreate>
                </q-card-section>
            </q-card>
        </q-dialog>
        <!-- 채널 수정 모달-->
        <q-dialog ref="editChannel" no-backdrop-dismiss>
            <q-card class="edit-modal">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">채널 수정하기</div>
                    <q-space />
                    <q-btn
                        icon="close"
                        flat
                        round
                        dense
                        v-close-popup="true"
                    ></q-btn>
                </q-card-section>
                <q-card-section>
                    <ChannelEdit
                        :channel="channel"
                        @closeModal="closeModal()"
                    ></ChannelEdit>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ChannelCreate from "@/views/community/channel/_channelCreate.vue";
import ChannelEdit from "@/views/community/channel/_channelEdit.vue";
import { AxiosError, AxiosResponse } from "axios";
import { Notify } from "quasar";

@Component({
    components: { ChannelCreate, ChannelEdit },
})
export default class ChannelList extends Vue {
    @Prop() communityId!: string;

    columns = [
        // {
        //     field: " ",
        //     name: " ",
        //     label: "",
        //     align: "left",
        // },
        {
            field: "profile_img",
            name: "profile_img",
            label: "대표이미지",
            align: "left",
        },
        {
            field: "name",
            name: "name",
            label: "채널 이름",
            align: "left",
            sortable: true,
            sort: () => null,
            event: true,
        },
        {
            field: "desc",
            name: "desc",
            label: "채널 설명",
            align: "left",
            sortable: true,
            sort: () => null,
            event: true,
        },
        {
            field: "state",
            name: "state",
            label: "공개여부",
            align: "left",
            sortable: true,
            sort: () => null,
            event: true,
        },
        {
            field: "createdAt",
            name: "createdAt",
            label: "등록일",
            align: "left",
            sortable: true,
            sort: () => null,
        },
        {
            field: "change",
            name: "change",
            label: "변경",
            align: "left",
        },
    ];

    channelData: any = [];
    channel: any = null;

    created() {
        this.fetch();
    }

    fetch() {
        this.$api.group.channel
            .list(this.communityId)
            .then((res: any) => {
                console.log(res);
                this.channelData = res.result;
            })
            .catch((e) => {
                console.log(e);
            });
    }

    openModal() {
        (this.$refs.createChannel as any).show();
    }

    closeModal(isFetch?: boolean) {
        (this.$refs.createChannel as any).hide();
        (this.$refs.editChannel as any).hide();
        if (isFetch) {
            this.fetch();
        }
    }
    editChannel(channel: any) {
        this.channel = channel;
        (this.$refs.editChannel as any).show();
    }

    confirmDialog(channelId: string) {
        this.$q
            .dialog({
                message: "해당 채널을 삭제하시겠습니까?",
                cancel: true,
            })
            .onOk(() => {
                this.deleteChannel(channelId);
            })
            .onCancel(() => {})
            .onDismiss(() => {});
    }

    deleteChannel(channelId: string) {
        this.$api.group.channel
            .delete(this.communityId, channelId)
            .then((res: AxiosResponse) => {
                Notify.create({
                    type: "positive",
                    message: "해당 채널을 삭제했습니다.",
                    position: "top",
                });
                this.fetch();
            })
            .catch((err: AxiosError) => {
                Notify.create({
                    type: "negative",
                    message: "채널 삭제에 실패했습니다. 다시 시도해주세요.",
                    position: "top",
                });
            });
    }
}
</script>

<style scoped lang="scss">
.edit-modal {
    width: 100%;
}
.table-title {
    font-size: 20px;
    letter-spacing: 0.005em;
    font-weight: 400;
    width: 100%;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
}
</style>
