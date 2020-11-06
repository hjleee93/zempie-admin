<template>
    <div>
        <SubButtonTable :rows="rows" :columns="columns" rowKey="id" @subEvent="openPopup" v-if="$store.state.level >= 10" icon="create" @movePage="movePage">
            <q-btn color="primary" @click="moveSubPage">관리자 생성</q-btn>
        </SubButtonTable>

        <Table :rows="rows" :columns="columns" rowKey="id" v-else @movePage="movePage" />

        <q-dialog v-model="levelPopup" v-if="selectedRow != null">
            <q-card class="my-card" style="width: 600px;">
                <q-card-section class="q-pt-none">
                    <div class="items-center q-ma-md">
                        <div class="row items-center" v-if="$store.state.level >= 10">
                            <div class="col-12">
                                권한
                            </div>

                            <div class="col-12">
                                <q-option-group v-model="selectedRow.level" :options="levelOptions" color="primary" type="radio" />
                            </div>
                        </div>

                        <div class="row items-center" v-if="$store.state.level >= 10">
                            <div class="col-12">
                                권한 영역
                            </div>

                            <div class="col-12">
                                <q-option-group v-model="selectedRow.subLevel" :options="subLevelOptions" color="primary" type="checkbox" />
                            </div>
                        </div>
                    </div>
                </q-card-section>


                <q-separator />

                <q-card-actions align="right">
                    <q-btn v-close-popup color="primary" label="닫기" />
                    <q-btn color="positive" label="저장" @click="submit" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SubButtonTable from "../../components/SubButtonTable.vue";
import Table from "../../components/Table.vue";
import Api from "../../util/Api";
import { Notify } from "quasar";

@Component({
    components: {
        SubButtonTable,
        Table,
    },
})
export default class extends Vue {
    rows: any[] = [];

    get columns() {
        const columns = [
            { label: "아이디", name: "account", field: "account", align: "left", sortable: true, sort: ()=>false },
            { label: "이름", name: "name", field: "name", align: "left", sortable: true, sort: ()=>false },
            { label: "권한", name: "level", field: "level", align: "left", sortable: true, sort: ()=>false },
            { label: "생성일", name: "created_at", field: "created_at", align: "left", sortable: true, sort: ()=>false },
            { label: "권한 변경", name: "sub" },
        ];
        if (this.$store.state.level < 3) {
            columns.splice(columns.length - 1, 1);
        }
        return columns;
    }

    levelPopup = false;
    selectedRow = {
        level: 1,
        subLevel: [],
        id: 1,
    };
    levelOptions = [
        { label: "Viewer", value: 1 },
        { label: "Editor", value: 3 },
        // { label: "Master", value: 10 },
    ];
    subLevelOptions = [
        { label: "대쉬 보드", value: 1 },
        { label: "관리자", value: 2 },
        { label: "회원관리", value: 3 },
        { label: "커뮤니티", value: 4 },
        { label: "심사", value: 5 },
        { label: "게임관리", value: 6 },
    ];
    lastMove = {
        limit: 10,
        offset: 0,
        sort: "id",
        dir: "asc",
    };

    async created() {
        await this.movePage(10, 0, "id", "asc");
    }

    moveSubPage() {
        this.$router.push(this.$route.path + "/create");
    }

    openPopup(row: any) {
        this.selectedRow.id = row.id;
        this.selectedRow.level = row.level;
        this.levelPopup = true;
    }

    closePopup() {
        this.levelPopup = false;
    }

    async submit() {
        const id = this.selectedRow.id;
        const level = this.$store.state.name == "master" ? this.selectedRow.level : null;

        if (id == null || level == null) {
            Notify.create({
                type: "negative",
                message: "내용을 전부 채워주시기 바랍니다.",
                position: "top",
            });
            return;
        }

        const result = await Api.setAdminLevel(id, level, level);
        if (result) {
            Notify.create({
                type: "positive",
                message: "변경에 성공했습니다.",
                position: "top",
            });
            this.movePage(this.lastMove.limit, this.lastMove.offset, this.lastMove.sort, this.lastMove.dir);
            this.levelPopup = false;
        } else {
            Notify.create({
                type: "negative",
                message: "변경하는 도중에 문제가 발생하였습니다.",
                position: "top",
            });
        }
    }

    async movePage(limit: number, offset: number, sort: string, dir: string) {
        const result = await Api.getAdminList(limit, offset, sort, dir);
        const admins = new Array(result.count).fill({id:null});
        for(let i = 0; i < this.rows.length; i++){
            admins[i] = this.rows[i];
        }
        this.rows = admins;
        for(let i = 0; i < result.admins.length; i++){
            this.rows[offset + i] = result.admins[i];
        }
        
        this.lastMove.limit = limit;
        this.lastMove.offset = offset;
        this.lastMove.sort = sort;
        this.lastMove.dir = dir;
    }
}
</script>
