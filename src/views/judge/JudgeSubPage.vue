<template>
    <q-card>
        <q-card-section>
            <q-expansion-item v-model="titleOption" :label="title" switch-toggle-side class="q-mb-md">
                <q-card>
                    <q-card-section>
                        <div class="q-mb-md">
                            <div class="text-weight-bold text-h6">
                                개발자
                            </div>

                            <div>
                                <router-link :to="`/user/list/sub/${userId}`">
                                    유저 정보로 이동
                                </router-link>
                            </div>
                        </div>

                        <div class="q-mb-md">
                            <div class="text-weight-bold text-h6">
                                자세한 설명
                            </div>

                            <div>
                                <q-input v-model="description" filled type="textarea" readonly />
                            </div>
                        </div>

                        <div class="q-mb-md">
                            <div class="text-weight-bold text-h6">
                                썸네일 이미지
                            </div>

                            <div>
                                <q-img :src="imgLink" :ratio="1" style="width:200px;" />
                            </div>
                        </div>

                        <div class="q-mb-md" v-if="imgLink2 != null">
                            <div class="text-weight-bold text-h6">
                                움직이는 썸네일 이미지
                            </div>

                            <div>
                                <q-img :src="imgLink2" :ratio="1" style="width:200px;" />
                            </div>
                        </div>

                        <div>
                            <div class="text-weight-bold text-h6">
                                자동 배포 여부
                            </div>

                            <div>
                                {{ autoDeploy }}
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </q-expansion-item>

            <div>
                <iframe ref="game" :src="iframeLink" frameborder="0" width="100%" height="1000px"></iframe>
            </div>
            
            <div class="q-mt-md q-mb-md">
                <div class="row justify-start items-center">
                    <div class="col-12 col-md-2 text-weight-bold">
                        반려 사유
                    </div>

                    <div class="col-12 col-md-10">
                        <q-input v-model="rejectReason" type="text" placeholder="Reject Reason" >
                            <!-- <q-tooltip>
                                반려 사유가 있어야 반려 처리할 수 있습니다.
                            </q-tooltip> -->
                        </q-input>
                    </div>
                </div>
            </div>
            
            <!-- <div class="q-mt-md q-mb-md">
                <div class="row justify-start items-center">
                    <div class="col-12 col-md-2 text-weight-bold">
                        제재 사유
                    </div>

                    <div class="col-12 col-md-10">
                        <q-input v-model="sanctionReason" type="text" placeholder="Sanction Reason" >
                            <q-tooltip>
                        </q-input>
                    </div>
                </div>
            </div> -->

            <!-- <q-expansion-item v-model="judgeOption" label="심사 옵션" switch-toggle-side class="q-mb-md">
                <q-card>
                    <q-card-section>
                        <div class="row q-mb-md">
                            <q-option-group inline v-model="selectedOption" :options="options" color="primary" type="checkbox" />
                        </div>
                    </q-card-section>
                </q-card>
            </q-expansion-item> -->
        </q-card-section>
        
        <q-separator />

        <q-card-section>
            <div class="row q-gutter-md justify-end">
                <q-btn class="q-pl-md q-pr-md" color="grey" outline label="취소" @click="cancel" />
                <!-- <q-btn class="q-pl-md q-pr-md" :disable="!isSanction" color="red" @click="sanction" >
                    제재
                    <q-tooltip v-if="!isSanction">
                        제재 사유가 있어야만 제재 처리를 진행할 수 있습니다.
                    </q-tooltip>
                </q-btn> -->
                <q-btn class="q-pl-md q-pr-md" :disable="!isReject" color="red" @click="reject" >
                    반려
                    <q-tooltip v-if="!isReject">
                        반려 사유가 있어야만 반려 처리를 진행할 수 있습니다.
                    </q-tooltip>
                </q-btn>
                <q-btn class="q-pl-md q-pr-md" :disable="isReject || isSanction" color="positive" label="승인" @click="submit" />
            </div>
        </q-card-section>

        
    </q-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Api from "@/util/Api";
import { Notify } from "quasar";

@Component({
    components: {},
})
export default class extends Vue {
    index = 0;

    gameWindow: Window | null = null;
    iframeLink = "";

    title = "게임 제목";
    titleOption = false;
    description = "게임 설명입니다.";
    autoDeploy = false;
    userId = "";

    imgLink = "";
    imgLink2 : null | string = null;

    controllerOption = false;
    selectedOption = [];
    options = [
        { label: "폭력적", value: "op1" },
        { label: "약물", value: "op2" },
        { label: "선정성", value: "op3" },
        { label: "비속한 표현", value: "op4" },
        { label: "비정상적인 플레이", value: "op5" },
    ];
    judgeOption = false;

    rejectReason = "";
    sanctionReason = "";


    get isReject() {
        return this.selectedOption.length > 0 || this.rejectReason.length > 0;
    }

    get isSanction() {
        return this.sanctionReason.length > 0;
    }

    async created(){
        this.index = parseInt(this.$route.params.index) || 0;
        const result = await Api.getProjectItem(this.index);
        if(result === false){
            Notify.create({
                type: "negative",
                message: "존재하지 않는 프로젝트입니다.",
                position: "top",
            });
            this.$router.go(-1);
        }
        
        console.log( result );
        
        this.iframeLink = process.env.VUE_APP_LAUNCHER_LINK + '?z_test_url=' + encodeURIComponent(result.version.url)
        this.title = result.project.name;
        this.description = result.project.description;
        this.imgLink = result.project.picture;
        this.imgLink2 = result.project.picture2;
        this.autoDeploy = result.version.autoDeploy;
        this.userId = result.project.user_id;
    }


    async sanction() {
        if(this.isSanction){
            // 제재 처리

            // const result = await Api.JudgeProject("fail", this.index, this.sanctionReason);
            // if(result){
            //     this.$router.push("/judge/game");
            // }
        }
    }

    async reject(){
        if(this.isReject){
            const result = await Api.JudgeProject("fail", this.index, this.rejectReason);
            if(result){
                this.$router.push("/judge/game");
            }
        }
    }

    async submit(){
        if(!this.isReject){
            const result = await Api.JudgeProject("passed", this.index, "");
            if(result){
                this.$router.push("/judge/game");
            }
        }
    }

    cancel(){
        this.$router.go(-1);
    }
}
</script>
