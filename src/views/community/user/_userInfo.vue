<template>
<!--    <div v-if="!$apollo.queries.userGet.loading">-->
<!--        <b style="font-size: 16px">유저 정보</b>-->
<!--        <div class="row">-->

<!--             <div class="col-3">대표 이미지</div>-->
<!--            <div class="col-9">-->
<!--                <q-img-->
<!--                    :src="user.picture"-->
<!--                    style="width: 100px"-->
<!--                    :ratio="1"-->
<!--                ></q-img>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="row">-->
<!--            <div class="col-3">커뮤니티 제목</div>-->
<!--            <div class="col-9">-->
<!--                {{ community.name }}-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="row">-->
<!--            <div class="col-3">자세한 설명</div>-->
<!--            <div class="col-9">-->
<!--                {{ community.description }}-->
<!--            </div>-->
<!--        </div>-->

<!--        <div class="row">-->
<!--            <div class="col-3">멤버 수</div>-->
<!--            <div class="col-9">-->
<!--                {{ community.member_cnt }}-->
<!--            </div>-->
<!--        </div>-->

<!--        <div class="row">-->
<!--            <div class="col-3">포스팅 수</div>-->
<!--            <div class="col-9">-->
<!--                {{ community.posts_cnt }}-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="row">-->
<!--            <div class="col-3">매니저</div>-->
<!--            <div class="col-9">-->
<!--                {{ community.manager_id }}-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="row">-->
<!--            <div class="col-3">젬파이 인증 여부</div>-->
<!--            <div class="col-9">-->
<!--                {{ community.is_certificated }}-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="row">-->
<!--            <div class="col-3">공개여부</div>-->
<!--            <div class="col-9">-->
<!--                {{ community.is_private }}-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="row">-->
<!--            <div class="col-3">생성일</div>-->
<!--            <div class="col-9">-->
<!--                {{ community.createdAt }}-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="q-mt-sm" style="text-align: right">-->
<!--            <q-btn color="secondary" class="q-mr-md">수정</q-btn>-->
<!--            <q-btn style="background: red; color: white">삭제</q-btn>-->
<!--        </div>-->
<!--    </div>-->
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Query from "@/util/Query";

@Component({
    components: {},
    apollo: {
        userGet: {
            query: Query.getUserById,
            variables: {},
        },
    },
})
export default class UserInfo extends Vue {
    @Prop() userUid!: string;
    @Prop() userId!: number;
    private userGet: any;

    get user() {
        return this.userGet[0];
    }

    async created() {

        //todo: id값 (주석제거)
        await this.$apollo.queries.userGet.setVariables({ id: 30 });
        // await this.$apollo.queries.userGet.setVariables({ id: this.userId });
        await this.$apollo.queries.userGet.refetch();
    }
}
</script>

<style scoped lang="scss">
.row {
    margin-top: 8px;
}
</style>
