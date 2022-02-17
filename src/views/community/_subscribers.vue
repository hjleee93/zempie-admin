<template>
    <q-table
        title="Subscribers"
        :data="userData"
        :columns="columns"
        row-key="id"
    >
        <template v-slot:body="props">
            <!-- @click.prevent="openUserInfo(props.row.uid)" -->
            <q-tr :props="props" >
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
                <q-td key="manage" :props="props">
                    {{props.row.state}}
                    <q-btn class="q-mr-sm" @click="block(props.row.id)" v-if="props.row.state !== 'BLOCK'&& props.row.state !== 'KICK' " >블락</q-btn>
                    <!-- <q-btn @click="kick(props.row.id)" v-if="props.row.state !== 'KICK' && props.row.state !== 'BLOCK'">강퇴</q-btn> -->

                    <q-btn class="q-mr-sm" @click="unblock(props.row.id)" v-if="props.row.state === 'BLOCK'">블락 해제</q-btn>                    
                    <!-- <q-btn @click="unkick(props.row.id)" v-if="props.row.state === 'KICK'" >강퇴 해제</q-btn> -->

                </q-td>
            </q-tr>
<!--            <q-dialog ref="userDialog" @hide="onDialogHide">-->
<!--                <UserInfo :userUid="props.row.uid" :userId="props.row.id" />-->
<!--            </q-dialog>-->
        </template>
    </q-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import UserInfo from "./user/_userInfo.vue";
import {Notify, QDialog} from "quasar";

@Component({
    components: { UserInfo },
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
        },
        {
            field: "manage",
            name: "manage",
            label: "관리",
            align: "left",
        },
    ];

    private userData: any = [];
    private manage: string = '';

    created() {
        this.fetch()
    }
    fetch(){
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
    block(userId:string){
        this.$api.group.block(this.communityId, userId)
            .then((res: any) => {
                Notify.create({
                    type: "positive",
                    message: "해당 유저 블락되었습니다.",
                    position: "top",
                });
            })
        this.fetch()
    }
    unblock(userId:string){
        this.$api.group.unblock(this.communityId, userId)
            .then((res: any) => {
                Notify.create({
                    type: "positive",
                    message: "해당 유저 블락이 해제되었습니다.",
                    position: "top",
                });
            })
        this.fetch()
    }
    kick(userId:string){
        this.$api.group.kick(this.communityId, userId)
            .then((res: any) => {
                Notify.create({
                    type: "positive",
                    message: "해당 유저가 강퇴되었습니다.",
                    position: "top",
                });
            })

        this.fetch()

    }
    unkick(userId:string){
        this.$api.group.unkick(this.communityId, userId)
            .then((res: any) => {
                Notify.create({
                    type: "positive",
                    message: "해당 유저 강퇴가 해제되었습니다.",
                    position: "top",
                });
            })
        this.fetch()

    }
    // openUserInfo() {
    //     (this.$refs.userDialog as QDialog).show();
    // }
    //
    // onDialogHide() {
    //     this.$emit("hide");
    // }
}
</script>

<style scoped lang="scss">
</style>
