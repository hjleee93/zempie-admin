<template>
   <q-table
        title="Kick members"
        :data="kickData"
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
                    {{ props.row.name }}
                </q-td>
                <q-td key="email" :props="props">
                    {{ props.row.email }}
                </q-td>
                <q-td>
                    <q-btn>제재 취소</q-btn>
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
export default class KickMembers extends Vue {
     @Prop() communityId!: any;
    columns = [
        {
            field: "profile_img",
            name: "profile_img",
            label: "프로필 사진",
            align: "left",
        },
        {
            field: "name",
            name: "name",
            label: "유저 이름",
            align: "left",
            sortable: true,
            sort: () => null,
            event: true,
        },
        {
            field: "email",
            name: "email",
            label: "이메일",
            align: "left",
            sortable: true,
            sort: () => null,
            event: true,
        },

        {
            field: "state",
            name: "state",
            label: "제재 취소",
            align: "left",
            sortable: true,
            sort: () => null,
        },
    ];

    private kickData: any = [];

    async created() {
        this.$api.group
            .kickMembers(this.communityId)
            .then((res: any) => {
                console.log(res);
                this.kickData = res.result;
            })
            .catch((e) => {
                console.log(e);
            });
    }
}
</script>

<style scoped lang="scss">
</style>
