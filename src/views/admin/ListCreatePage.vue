<template>
    <div class="admin-list-create">
        <div class="row items-center">
            <div class="label-area">
                <label class="text-weight-bold text-h6" for="adminID">관리자 아이디</label>
            </div>

            <div class="col-12 col-md-4">
                <q-input
                    outlined
                    v-model="adminID"
                    label="ID"
                    id="adminID"
                    :rules="[(val) => adminIDRule(val) || '중복되는 아이디입니다.']"
                />
            </div>
        </div>

        <div class="row items-center">
            <div class="label-area">
                <label class="text-weight-bold text-h6" for="adminPassowrd">관리자 비밀번호</label>
            </div>

            <div class="col-12 col-md-4">
                <q-input outlined v-model="adminPassword" label="Password" id="adminPassowrd" />
            </div>
        </div>

        <div class="row">
            <div class="label-area text-weight-bold text-h6 q-pt-md">
                권한
            </div>

            <div class="col-12 col-md-4">
                <q-option-group v-model="authority" :options="options" color="primary" type="checkbox" />
            </div>
        </div>

        <div class="row">
            <q-btn class="q-pl-md q-pr-md" color="primary" label="등록" @click="submit" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {},
})
export default class extends Vue {
    adminID = "";
    adminPassword = "";
    authority = [];
    options = [
        {
            label: "대쉬보드 보기",
            value: "op1",
        },
        {
            label: "관리자 로그 보기",
            value: "op2",
        },
        {
            label: "회원관리 보기",
            value: "op3",
        },
        {
            label: "회원관리 수정",
            value: "op4",
        },
        {
            label: "커뮤니티 보기",
            value: "op5",
        },
        {
            label: "커뮤니티 수정",
            value: "op6",
        },
        {
            label: "게임 심사",
            value: "op7",
        },
        {
            label: "게임 심사 로그 보기",
            value: "op8",
        },
        {
            label: "게임 관리",
            value: "op9",
        },
    ];

    adminList = [
        {id: "admin"}
    ]

    adminIDRule(val: string){
        let result = true;
        for(let i = 0; i < this.adminList.length; i++){
            if(this.adminList[i].id == val){
                result = false;
            }
        }
        return result;
    }

    submit(){
        console.log(this.adminID, this.adminPassword, this.authority);
    }
}
</script>

<style lang="scss">
.admin-list-create {
    .row {
        margin: 4px 0;
    }

    .label-area{
        min-width:200px;
        max-width:200px;
    }
}
</style>
