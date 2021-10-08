<template>
    <div>
        <q-table
            title="All group"
            :data="groupData"
            :columns="columns"
            row-key="id"
            :pagination="initialPagination"
            :rows-per-page-options="pageOption"
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
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {},
})
export default class CommunityList extends Vue {
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
            label: "제목",
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
    private groupData: any = [];

    private limit = 31;
    private offset = 0;
    private loading: boolean = false;

    private initialPagination = {
        rowsPerPage: 20,
    };

    private pageOption = [5, 10, 15, 20, 30];

    async created() {
        this.$api.group
            .list("SUBSCRIBE", this.limit, this.offset)
            .then((res: any) => {
                this.groupData = res;
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
