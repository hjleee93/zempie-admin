<template>
    <div class="admin-list-create">
        <div class="row items-center">
            <div class="label-area text-weight-bold text-h6">
                관리자 아이디
            </div>

            <div class="col-12 col-md-4">
                <q-input outlined v-model="account" label="Account" :rules="[(val) => adminAccountRule(val) || '중복되는 아이디입니다.']" />
            </div>
        </div>

        <div class="row items-center">
            <div class="label-area text-weight-bold text-h6">
                관리자 비밀번호
            </div>

            <div class="col-12 col-md-4">
                <q-input outlined v-model="password" label="Password" />
            </div>
        </div>

        <div class="row items-center">
            <div class="label-area text-weight-bold text-h6">
                관리자 이름
            </div>

            <div class="col-12 col-md-4">
                <q-input outlined v-model="name" label="Name" />
            </div>
        </div>

        <div class="row">
            <div class="label-area text-weight-bold text-h6 q-pt-md">
                권한
            </div>

            <div class="col-12 col-md-4 q-pt-sm">
                <q-option-group v-model="level" :options="levelOptions" color="primary" type="radio" />
            </div>
        </div>

        <div class="row">
            <div class="label-area text-weight-bold text-h6 q-pt-md">
                권한 영역
            </div>

            <div class="col-12 col-md-4 q-pt-sm">
                <q-option-group v-model="subLevel" :options="subLevelOptions" color="primary" type="checkbox" />
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <q-btn class="q-pl-md q-pr-md" color="primary" label="등록" @click="submit" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Api from "../../util/Api";
import { Notify } from "quasar";

@Component({
    components: {},
})
export default class extends Vue {
    account = "";
    password = "";
    name = "";

    level = 1;
    levelOptions = [
        { label: "Viewer", value: 1 },
        { label: "Editor", value: 3 },
        { label: "Master", value: 10 },
    ];

    subLevel = [];
    subLevelOptions = [
        { label: "대쉬 보드", value: 1 },
        { label: "관리자", value: 2 },
        { label: "회원관리", value: 3 },
        { label: "커뮤니티", value: 4 },
        { label: "심사", value: 5 },
        { label: "게임관리", value: 6 },
    ];

    adminList = [{ account: "admin" }];

    adminAccountRule(val: string) {
        let result = true;
        for (let i = 0; i < this.adminList.length; i++) {
            if (this.adminList[i].account == val) {
                result = false;
            }
        }
        return result;
    }

    async submit() {
        if (this.$store.getters.isLogin) {
            if (this.account.trim() != "" && this.password.trim() != "" && this.name.trim() != "" && this.level != null) {
                const result = await Api.addAdmin(this.account, this.password, this.name, this.level, this.level);
                if (result) {
                    Notify.create({
                        type: "positive",
                        message: `관리자 생성에 성공하였습니다.`,
                        position: "top",
                    });
                    this.$router.push("/admin/list");
                } else {
                    Notify.create({
                        type: "negative",
                        message: `관리자 생성에 실패하였습니다.`,
                        position: "top",
                    });
                }
            }else{
                Notify.create({
                    type: "negative",
                    message: `내용을 전부 채워주시기 바랍니다.`,
                    position: "top",
                });
            }
        }
    }
}
</script>

<style lang="scss">
.admin-list-create {
    .row {
        margin: 4px 0;
    }

    .label-area {
        min-width: 200px;
        max-width: 200px;
    }
}
</style>
