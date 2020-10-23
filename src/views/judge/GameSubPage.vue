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

            <q-expansion-item v-model="controllerOption" label="컨트롤러 옵션" switch-toggle-side class="q-mb-md">
                <q-card>
                    <q-card-section>
                        <q-btn class="q-mr-md" color="primary" label="시작" @click="startGame" />
                        <q-btn class="q-mr-md" color="primary" label="재시작" @click="restartGame" />
                        <q-btn class="q-mr-md" color="primary" label="일시정지" @click="pauseGame" />
                        <q-btn class="q-mr-md" color="primary" label="일시정지 해제" @click="resumeGame" />
                        <q-btn class="q-mr-md" color="primary" label="사운드 온" @click="soundOnGame" />
                        <q-btn class="q-mr-md" color="primary" label="사운드 오프" @click="soundOffGame" />
                    </q-card-section>
                </q-card>
            </q-expansion-item>
        </div>

        <q-expansion-item v-model="judgeOption" label="심사 옵션" switch-toggle-side class="q-mb-md">
            <q-card>
                <q-card-section>
                    <div class="row q-mb-md">
                        <q-option-group inline v-model="selectedOption" :options="options" color="primary" type="checkbox" />
                    </div>

                    <div class="row justify-start items-center">
                        <div class="col-12 col-md-2 text-weight-bold text-h6">
                            반려 사유
                        </div>

                        <div class="col-12 col-md-10">
                            <q-input v-model="reason" outlined type="text" />
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </q-expansion-item>

        <div class="row justify-between">
            <q-btn class="q-pl-md q-pr-md" :disable="!isReject" color="primary" label="반려" @click="reject" />
            <q-btn class="q-pl-md q-pr-md" :disable="isReject" color="primary" label="승인" @click="submit" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {},
})
export default class extends Vue {
    gameWindow: Window|null = null;
    iframeLink = "";

    title = "게임 제목";
    titleOption = false;
    description = "게임 설명입니다.";

    imgLink = "https://s3.ap-northeast-2.amazonaws.com/zeminiplay.com/games/imgs/LEGP-r3SX.png";

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

    startGame(){
        // if (this.status == STATUS.READY || this.status == STATUS.END) {
            // this.status = STATUS.START;
            // this.score = 0;
            this.gameWindow && this.gameWindow.postMessage({
                type: "@gamePlay",
            },"*");
        // }
    }

    restartGame(){
        // if (this.status == STATUS.END || this.status == STATUS.PAUSE) {
            // this.status = STATUS.START;
            // this.score = 0;
            this.gameWindow && this.gameWindow.postMessage({
                type: "@gameRetry",
            },"*");
        // }
    }

    pauseGame() {
        // if (this.status == STATUS.START) {
            // this.status = STATUS.PAUSE;
            this.gameWindow && this.gameWindow.postMessage({
                type: "@gamePause",
            },"*");
        // }
    }

    resumeGame() {
        // if (this.status == STATUS.PAUSE) {
            // this.status = STATUS.START;
            this.gameWindow && this.gameWindow.postMessage({
                type: "@gameResume",
            },"*");
        // }
    }

    soundOnGame(){
        this.gameWindow && this.gameWindow.postMessage({
            type: "@soundOn",
        },"*");
    }

    soundOffGame(){
        this.gameWindow && this.gameWindow.postMessage({
            type: "@soundOff",
        },"*");
    }

    reject(){
        if(!this.isReject){
            return;
        }
    }

    submit(){
        if(this.isReject){
            return;
        }
    }

    created(){
        this.iframeLink = "http://zeminiplay.com/games/data/papa/index.html";
    }

    mounted(){
        window.addEventListener("message", (event) => {
            switch (event.data.type) {
                case "@gameReady":
                    // this.status = STATUS.READY;
                    this.gameWindow = (this.$refs.game as HTMLIFrameElement).contentWindow;
                    break;
                // case "@updateScore":
                    // this.score = event.data.score;
                    // break;
                // case "@gameOver":
                    // this.status = STATUS.END;
                    // this.score = event.data.score;
                    // break;
            }
        });
    }
}
</script>
