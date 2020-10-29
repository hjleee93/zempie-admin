<template>
    <div>
        <ModifyTable :rows="rows" :columns="columns" rowKey="account" @openPopup="openPopup" v-if="$store.state.level >= 3">
            <q-btn color="primary" @click="moveSubPage">관리자 생성</q-btn>
        </ModifyTable>

        <Table :rows="rows" :columns="columns" rowKey="account" v-else />

        <q-dialog v-model="modify" v-if="selectedRow != null">
            <q-card class="my-card">
                <q-card-section class="q-pt-none">
                    <div class="row items-center q-ma-md">
                        <div class="row items-center q-mb-md" style="width: 600px;">
                            <div class="col-3">
                                이름
                            </div>
                            <div class="col-9">
                                <q-input outlined v-model="selectedRow.name" label="name" />
                            </div>
                        </div>

                        <div class="row items-center q-mb-md" style="width: 600px;">
                            <div class="col-3">
                                비밀번호
                            </div>
                            <div class="col-9">
                                <q-input outlined v-model="selectedRow.password" label="password" />
                            </div>
                        </div>

                        <div class="row items-center q-mb-md" style="width: 600px;">
                            <div class="col-3">
                                권한
                            </div>
                            <div class="col-9">
                                <q-option-group v-model="selectedRow.level" :options="levelOptions" color="primary" type="radio" />
                            </div>
                        </div>

                        <div class="row items-center q-mb-md" style="width: 600px;">
                            <div class="col-3">
                                권한 영역
                            </div>
                            <div class="col-9">
                                <q-option-group v-model="selectedRow.subLevel" :options="subLevelOptions" color="primary" type="checkbox" />
                            </div>
                        </div>
                        <!-- <div class="row items-center" style="width: 600px;">
                            <div class="col-3">
                                activated
                            </div>
                            <div class="col-9">
                                <q-input outlined v-model="selectedRow.name" label="name" />
                            </div>
                        </div> -->
                    </div>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn v-close-popup color="negative" label="닫기" />
                    <q-btn color="primary" label="저장" @click="submit" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ModifyTable from "../../components/ModifyTable.vue";
import Table from "../../components/Table.vue";
import Api from "../../util/Api";
import { Notify } from "quasar";

@Component({
    components: {
        ModifyTable,
        Table,
    },
})
export default class extends Vue {
    rows = [];

    get columns() {
        const columns = [
            { name: "아이디", label: "아이디", field: "account", sortable: true, align: "left" },
            { name: "이름", label: "이름", field: "name", sortable: true, align: "left" },
            { name: "권한", label: "권한", field: "level", sortable: true, align: "left" },
            { name: "생성일", label: "생성일", field: "created_at", sortable: true, align: "left" },
            { name: "modify", label: "변경" },
        ];
        if (this.$store.state.level < 3) {
            columns.splice(columns.length - 1, 1);
        }
        return columns;
    }

    modify = false;
    selectedRow = {
        name: "",
        password: "",
        level: 1,
        subLevel: [],
        activated: true,
        id: 1,
    };
    levelOptions = [
        { label: "Viewer", value: 1 },
        { label: "Editor", value: 3 },
        { label: "Master", value: 10 },
    ];
    subLevelOptions = [
        { label: "대쉬 보드", value: 1 },
        { label: "관리자", value: 2 },
        { label: "회원관리", value: 3 },
        { label: "커뮤니티", value: 4 },
        { label: "심사", value: 5 },
        { label: "게임관리", value: 6 },
    ];

    async mounted() {
        if (this.$store.getters.isLogin) {
            this.rows = await Api.getAdminList();
        }
    }

    moveSubPage() {
        this.$router.push(this.$route.path + "/create");
    }

    openPopup(row: any) {
        this.selectedRow.id = row.id;
        this.selectedRow.name = row.name;
        this.selectedRow.password = "";
        this.selectedRow.level = row.level;
        this.selectedRow.activated = row.activated;
        this.modify = true;
    }

    closePopup() {
        this.modify = false;
    }

    async submit() {
        const id = this.selectedRow.id;
        const name = this.selectedRow.name;
        const password = this.selectedRow.password;
        const level = this.$store.state.name == "master" ? this.selectedRow.level : null;
        const activated = this.$store.state.name == "master" ? this.selectedRow.activated : null;

        if (id == null || name == "" || password == "") {
            Notify.create({
                type: "negative",
                message: "내용을 전부 채워주시기 바랍니다.",
                position: "top",
            });
            return;
        }

        const result = await Api.setAdmin(id, name, password, level, activated);
        if (result) {
            Notify.create({
                type: "positive",
                message: "변경에 성공했습니다.",
                position: "top",
            });
            this.modify = false;
        } else {
            Notify.create({
                type: "negative",
                message: "변경하는 도중에 문제가 발생하였습니다.",
                position: "top",
            });
        }
    }
}
</script>
