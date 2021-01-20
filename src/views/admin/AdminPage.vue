<template>
    <div>
        <MainTable rowKey="id" :columns="columns" apiLink="admin/list" columnName="admins" @subEvent="openPopup">
            <q-btn color="primary" @click="moveSubPage">관리자 생성</q-btn>
        </MainTable>

        <q-dialog v-model="levelPopup" v-if="selectedRow != null" :persistent="selectedRow.level < 10">
            <q-card class="my-card" style="width: 600px;" v-if="selectedRow.level < 10">
                <q-card-section class="q-pt-none q-pa-md">
                    <div class="items-center">
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

            <q-card class="row wrap justify-center items-center" style="width: 600px; height: 100px;" v-else>
                <div>Master 권한의 계정은 권한을 변경할 수 없습니다.</div>
            </q-card>
        </q-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MainTable, { TableBus } from "@/components/MainTable.vue";
import Api from "@/util/Api";
import Config from "@/util/Config";
import { Notify } from "quasar";

@Component({
    components: {
        MainTable,
    },
})
export default class extends Vue {
    columns = [
        { label: "#", name: "id", field: "id", align: "left", sortable: true },
        // { label: "아이디", name: "account", field: "account", align: "left", sortable: true },
        { label: "이름", name: "name", field: "name", align: "left", sortable: true },
        { label: "권한", name: "level", field: "level", align: "left", sortable: true, event: true },
        { label: "생성일", name: "created_at", field: "created_at", align: "left", sortable: true },
    ];
    levelPopup = false;
    selectedRow = {
        level: 1,
        subLevel: [],
        id: 1,
    };
    levelOptions = Config.levelOptions;
    subLevelOptions = Config.subLevelOptions;

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
        const level = this.$store.state.level == 10 ? this.selectedRow.level : null;

        if (id == null || level == null) {
            Notify.create({
                type: "negative",
                message: "내용을 전부 채워주시기 바랍니다.",
                position: "top",
            });
            return;
        }
        const result = await Api.setAdminLevel(id, level);
        if (result) {
            TableBus.$emit("reload");
            this.levelPopup = false;
        }
    }
}
</script>
