<template>
    <q-table
        title="Channels"
        :data="channelData"
        :columns="columns"
        row-key="id"
    >
     <template v-slot:body="props">
           <q-tr :props="props" @click.prevent="subEvent(props.row)">
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

                    <q-td key="createdAt" :props="props">
                        {{
                            $q.config.date.formatDate(
                                props.row.createdAt,
                                "YYYY-MM-DD"
                            )
                        }}
                    </q-td>
                </q-tr>
     </template>
    </q-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {},
})
export default class ChannelList extends Vue {
    @Prop() communityId!: any;
    columns = [
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
            field: "createdAt",
            name: "createdAt",
            label: "등록일",
            align: "left",
            sortable: true,
            sort: () => null,
        },
    ];

    private channelData: any = [];

    async created() {
        this.$api.group.channel.list(this.communityId)
            .then((res: any) => {
                console.log(res)
                this.channelData = res.result;
            })
            .catch((e) => {
                console.log(e);
            });
    }
}
</script>

<style scoped lang="scss">
</style>
