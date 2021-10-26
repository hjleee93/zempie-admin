<template>
<!--    <div>-->
<!--        <div class="row">-->
<!--            <div class="col-3">대표 이미지</div>-->
<!--            <div class="col-9">-->
<!--                <q-img-->
<!--                    :src="channel.profile_img"-->
<!--                    style="width: 100px"-->
<!--                    :ratio="1"-->
<!--                ></q-img>-->
<!--            </div>-->
<!--        </div>-->

<!--        <div class="row">-->
<!--            <div class="col-3">커뮤니티 제목</div>-->
<!--            <div class="col-9">-->
<!--                {{ channel.title }}-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="row">-->
<!--            <div class="col-3">자세한 설명</div>-->
<!--            <div class="col-9">-->
<!--                {{ channel.description }}-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="row">-->
<!--            <div class="col-3">공개여부</div>-->
<!--            <div class="col-9">-->
<!--                {{ channel.state }}-->
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

@Component({
    components: {},
})
export default class ChannelInfo extends Vue {
    @Prop() channelId!: string;
    @Prop() communityId!: string;
    private channel: any = {};
    async created() {
        console.log(this.communityId);
        this.$api.group.channel
            .info(this.communityId, this.channelId)
            .then((res) => {
                console.log(res);
                this.channel = res;
            })
            .catch((err) => {
                console.log(err);
            });
    }
   
   
}
</script>

<style scoped lang="scss">
.row {
    margin-top: 8px;
}
</style>
