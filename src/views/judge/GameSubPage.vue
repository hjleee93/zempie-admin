<template>
    <div>
        <q-expansion-item v-model="titleOption" :label="title" switch-toggle-side class="q-mb-md">
            <q-card>
                <q-card-section>
                    <div class="row q-mb-md">
                        <div class="text-weight-bold text-h6 col-12">
                            자세한 설명
                        </div>

                        <div class="col-12">
                            <q-input v-model="description" filled type="textarea" readonly />
                        </div>
                    </div>

                    <div class="row">
                        <div class="text-weight-bold text-h6 col-12">
                            썸네일 이미지
                        </div>

                        <div class="col-12">
                            <q-img :src="imgLink" :ratio="1" style="width:200px;" />
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </q-expansion-item>

        <div>
            <iframe ref="game" :src="iframeLink" frameborder="0" width="600px" height="800px"></iframe>
        </div>

        <div class="q-mt-md q-mb-md">
            <div class="row justify-start items-center">
                <div class="col-12 col-md-2 text-weight-bold text-h6">
                    반려 사유
                </div>

                <div class="col-12 col-md-10">
                    <q-input v-model="reason" outlined type="text" />
                </div>
            </div>
        </div>

        <!-- <q-expansion-item v-model="judgeOption" label="심사 옵션" switch-toggle-side class="q-mb-md">
            <q-card>
                <q-card-section>
                    <div class="row q-mb-md">
                        <q-option-group inline v-model="selectedOption" :options="options" color="primary" type="checkbox" />
                    </div>
                </q-card-section>
            </q-card>
        </q-expansion-item> -->

        <div class="row q-gutter-md">
            <q-btn class="q-pl-md q-pr-md" color="grey" outline label="취소" @click="cancel" />
            <q-btn class="q-pl-md q-pr-md" :disable="!isReject" color="red" label="반려" @click="reject" />
            <q-btn class="q-pl-md q-pr-md" :disable="isReject" color="positive" label="승인" @click="submit" />
        </div>
    </div>
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

    gameWindow: Window|null = null;
    iframeLink = "";

    title = "게임 제목";
    titleOption = false;
    description = "게임 설명입니다.";

    imgLink = "";

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
    reason = "";

    get isReject(){
        return this.selectedOption.length > 0 || this.reason.length > 0;
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
        this.iframeLink = process.env.VUE_APP_LAUNCHER_LINK + encodeURIComponent(result.version.url);
        this.title = result.project.name;
        this.description = result.project.description;
        this.imgLink = result.project.picture;

        // (this.$refs.game as HTMLIFrameElement).onload = () => {
        //     let childWindow = (this.$refs.game as HTMLIFrameElement).contentWindow;
        //     if(childWindow != null){
        //         childWindow.addEventListener("keydown", (event) => {
        //             console.log(event);
        //             if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        //                 event.preventDefault();
        //             }
        //         });
        //     }
        // }
        

        // window.addEventListener("keydown", (event) => {
        //     if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        //         event.preventDefault();
        //     }
        // });
    }

    async reject(){
        if(this.isReject){
            const result = await Api.JudgeProject("fail", this.index, this.reason);
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
