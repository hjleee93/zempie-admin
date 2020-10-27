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

            <div class="col-12 col-md-4">
                <q-option-group v-model="level" :options="options" color="primary" type="radio" />
            </div>
        </div>

        <div class="row">
            <q-btn class="q-pl-md q-pr-md" color="primary" label="등록" @click="submit" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Api from "../../util/Api";

@Component({
    components: {},
})
export default class extends Vue {
    account = "";
    password = "";
    name = "";
    level = 1;
    options = [
        { label: "대쉬보드 보기", value: 1 },
        { label: "관리자 로그 보기", value: 2 },
        { label: "회원관리 보기", value: 3 },
        { label: "회원관리 수정", value: 4 },
        { label: "커뮤니티 보기", value: 5 },
        { label: "커뮤니티 수정", value: 6 },
        { label: "게임 심사", value: 7 },
        { label: "게임 심사 로그 보기", value: 8 },
        { label: "게임 관리", value: 9 },
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
                const result = await Api.addAdmin(this.account, this.password, this.name, this.level);
                if (result) {
                    this.$q.notify({
                        type: "positive",
                        message: `관리자 생성에 성공하였습니다.`,
                        position: "top",
                    });
                    this.$router.push("/admin/list");
                } else {
                    this.$q.notify({
                        type: "negative",
                        message: `관리자 생성에 실패하였습니다.`,
                        position: "top",
                    });
                }
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
