<template>
    <div>
        <q-select
            @input="reportHandle()"
            v-model="handlingResult"
            :options="options"
            outlined
        >
        </q-select>
        <q-dialog ref="isHandlingModalOpen" @hide="onHandlingModalHide">
            <q-card>
                <q-card-section>
                    <div class="text-h6">제재</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <p>유저아이디 : {{ selectedUser.name }}</p>
                    <p>
                        제재 사유 :
                        <q-select
                            @input="isSelectedReasonErr = false"
                            v-model="selectedReason"
                            :options="handlingOptions"
                            outlined
                        >
                        </q-select>
                    </p>
                    <p class="red" v-if="isSelectedReasonErr">
                        제재 사유를 선택하세요
                    </p>
                    <p>
                        제재 기간 :
                        <q-select
                            @input="isSelectedPeriodErr = false"
                            v-model="selectedPeriod"
                            :options="periodgOptions"
                            outlined
                        >
                        </q-select>
                    </p>
                    <p class="red" v-if="isSelectedPeriodErr">
                        제재 기간을 선택하세요
                    </p>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn
                        color="primary"
                        label="Cancel"
                        @click="onCancelClick"
                    />
                    <q-btn
                        color="primary"
                        label="적용"
                        @click="submitUserHandling"
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-dialog ref="pendingReport">
            <q-card>
                <q-card-section>
                    <div class="text-h6">보류</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <p>유저아이디 : {{ selectedUser.name }}</p>
                    <p>제재를 보류 하시겟습니까?</p>

                    <q-btn class="q-mr-sm" @click="pendingReport">네</q-btn>
                    <q-btn @click="closePendingModal">아니오</q-btn>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import moment from "moment";
@Component({
    components: {},
})
export default class reportHadlingBtn extends Vue {
    @Prop() row!: any;
    moment = moment;
    handlingResult = {
        label: "처리방식을 선택하세요",
        value: 0,
    };
    options = [
        {
            value: 1,
            label: "제재",
        },
        {
            value: 2,
            label: "보류",
        },
        { value: 3, label: "문제없음" },
    ];

    handlingOptions = [
        {
            value: 1,
            label: "해킹 당한 계정입니다.",
        },
        {
            value: 2,
            label: "사칭하는 계정입니다.",
        },
        {
            value: 3,
            label: "프로필 정보 또는 이미지가 혐오스러운 내용을 포함하고 있습니다.",
        },
    ];

    selectedReason = {
        label: "제재 사유를 선택하세요",
        value: null,
    };

    isSelectedReasonErr = false;

    selectedPeriod = {
        label: "제재 기간을 선택하세요",
        value: null,
    };

    periodgOptions = [
        {
            value: 1,
            label: "1일(24시간)",
        },
        {
            value: 7,
            label: "7일",
        },
        {
            value: 30,
            label: "30일",
        },
        {
            value: 999999,
            label: "영구",
        },
    ];

    selectedReportingId = null;

    isSelectedPeriodErr = false;

    selectedUser: any = {};

    isHandlingModalOpen = false;

    reportHandle() {
        this.selectedUser = this.row.target_user;
        this.selectedReportingId = this.row.id;

        switch (this.handlingResult.value) {
            case 1:
                (this.$refs.isHandlingModalOpen as any).show();
                this.isHandlingModalOpen = true;
                break;
            case 2:
                (this.$refs.pendingReport as any).show();
                break;
        }
    }
    closePendingModal(){
           (this.$refs.pendingReport as any).hide();
    }

    pendingReport() {
        
        const obj = {
            report_id: this.selectedReportingId,
            user_id: this.selectedUser.id,
        };

        this.$api
            .userBan(obj)
            .then((res) => {
                alert("보류되었습니다.");
            })
            .catch((e) => {
                alert(e.response.data.error.message);
            })
            .finally(() => {
                (this.$refs.pendingReport as any).hide();
                this.$emit("refresh");
            });
    }

    submitUserHandling() {
        if (!this.selectedReason.value) {
            this.isSelectedReasonErr = true;
        } else if (!this.selectedPeriod.value) {
            this.isSelectedPeriodErr = true;
        } else {
            const obj = {
                report_id: this.selectedReportingId,
                user_id: this.selectedUser.id,
                reason: this.selectedReason.value,
                period: moment().add(this.selectedPeriod.value, "days"),
            };

            this.$api
                .userBan(obj)
                .then((res) => {
                    alert("제재가 완료되었습니다.");
                })
                .catch((e) => {
                    alert(e.response.data.error.message);
                })
                .finally(() => {
                    (this.$refs.isHandlingModalOpen as any).hide();
                    this.$emit("refresh");
                });
        }
    }

    onCancelClick() {
        (this.$refs.isHandlingModalOpen as any).hide();
    }

    onHandlingModalHide() {
        this.initStatus();
    }

    initStatus() {
        this.isSelectedReasonErr = false;
        this.isSelectedPeriodErr = false;

        this.selectedReason = {
            label: "제재 사유를 선택하세요",
            value: null,
        };

        this.selectedPeriod = {
            label: "제재 기간을 선택하세요",
            value: null,
        };

        this.handlingResult = {
            label: "처리방식을 선택하세요",
            value: 0,
        };
    }
}
</script>
<style scoped lang="scss">
.red {
    color: red;
}
</style>
