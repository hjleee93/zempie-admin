<template>
    <q-table
        title="Subscribers"
        :data="userData"
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
                <q-td key="createdAt" :props="props">
                    {{
                        $q.config.date.formatDate(
                            props.row.createdAt,
                            "YYYY-MM-DD"
                        )
                    }}
                </q-td>
                <q-td key="status" :props="props">
                    {{ props.row.status }}
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
export default class Subscribers extends Vue {
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
            field: "createdAt",
            name: "createdAt",
            label: "가입일",
            align: "left",
            sortable: true,
            sort: () => null,
        },
        {
            field: "status",
            name: "status",
            label: "상태",
            align: "left",
            sortable: true,
            sort: () => null,
        }
    ];

    private userData: any = [];

    async created() {
        this.$api.group
            .members(this.communityId)
            .then((res: any) => {
                console.log(res);
                this.userData = res.result;
            })
            .catch((e) => {
                console.log(e);
            });
    }
}
</script>

<style scoped lang="scss">
</style>
