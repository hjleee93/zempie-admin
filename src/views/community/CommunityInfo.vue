<template>
    <div >
        <b style="font-size: 16px">커뮤니티 정보</b>
        <div class="row">
            <div class="col-3">대표 이미지</div>
            <div class="col-9">
                <q-img
                    :src="community.profile_img"
                    style="width: 100px"
                    :ratio="1"
                ></q-img>
            </div>
        </div>

        <div class="row">
            <div class="col-3">배너(배경) 이미지</div>
            <div class="col-9">
                <q-img
                    :src="community.banner_img"
                    style="height: 66px; width: 100px"
                    :ratio="1"
                ></q-img>
            </div>
        </div>
        <div class="row">
            <div class="col-3">커뮤니티 제목</div>
            <div class="col-9">
                {{ community.name }}
            </div>
        </div>
        <div class="row">
            <div class="col-3">자세한 설명</div>
            <div class="col-9">
                {{ community.description }}
            </div>
        </div>

        <div class="row">
            <div class="col-3">멤버 수</div>
            <div class="col-9">
                {{ community.member_cnt }}명
            </div>
        </div>

        <div class="row">
            <div class="col-3">포스팅 수</div>
            <div class="col-9">
                {{ community.posts_cnt }}개
            </div>
        </div>
        <!-- <div class="row">
            <div class="col-3">매니저</div>
            <div class="col-9">
                {{ user.name }}
            </div>
        </div> -->
        <div class="row">
            <div class="col-3">젬파이 인증 여부</div>
            <div class="col-9">
                {{ community.is_certificated ?'인증' : '미인증'}}
            </div>
        </div>
        <div class="row">
            <div class="col-3">공개여부</div>
            <div class="col-9">
                {{ community.is_private ?'비공개' : '공개'}}
            </div>
        </div>
        <div class="row">
            <div class="col-3">생성일</div>
            <div class="col-9">
                {{ createdDate }}
            </div>
        </div>
        <div class="q-mt-sm" style="text-align: right">
            <q-btn color="secondary" class="q-mr-md" @click="edit">수정</q-btn>
            <q-btn style="background: red; color: white" @click="deleteConfirm" >삭제</q-btn>
        </div>
        <q-dialog ref="editCommunity" no-backdrop-dismiss >
            <CommunityEdit :community="community" @closeModal='closeModal()'></CommunityEdit>
        </q-dialog>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import Query from "@/util/Query";
import CommunityEdit from "@/views/community/_communityEdit.vue";
import {AxiosError, AxiosResponse} from "axios";
import {Notify} from "quasar";
import moment from "moment";

@Component({
    components: {CommunityEdit},
    apollo: {
        userGet: {
            query: Query.getUserById,
            variables: {},
        },
    },
})
export default class CommunityInfo extends Vue {
    @Prop() communityId!: any;
    community: any = {};
    userGet: any;
    user: any = {};
    createdDate: string = ''

    mounted() {
        this.fetch();
    }

    fetch() {
        this.$api.group
            .info(this.communityId)
            .then(async (res) => {
                this.community = res;
                //todo: id값 (주석제거)
                const response: any = await this.$apollo.queries.userGet.setVariables({id: 30});
                this.user = response.data.userGet[0];
                  this.createdDate = moment(this.community.createdAt).locale('ko').format('LL')
                // await this.$apollo.queries.userGet.setVariables({ id: this.community.manager_id });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    edit(){
        (this.$refs.editCommunity as any).show();
    }
    closeModal() {
        (this.$refs.editCommunity as any).hide();
        this.fetch();
    }
    deleteConfirm(){
        this.$q.dialog({
            message: '해당 커뮤니티를 삭제하시겠습니까?',
            cancel: true
        }).onOk(() => {
            this.deleteCommunity()
        }).onCancel(() => {
        }).onDismiss(() => {
        })
    }
    deleteCommunity(){
    this.$api.group.delete(this.communityId)
        .then((res:AxiosResponse)=>{
            Notify.create({
                type: "positive",
                message: "해당 커뮤니티를 삭제했습니다.",
                position: "top",
            });
            this.$router.push('/community/list')
        })
        .catch((err:AxiosError)=>{
            Notify.create({
                type: "negative",
                message: "커뮤니티 삭제에 실패했습니다. 다시 시도해주세요.",
                position: "top",
            });
        })
    }


}
</script>

<style scoped lang="scss">
.row {
    margin-top: 8px;
}
.edit-modal{
    width: 100%;
}
</style>
