<template>
    <div>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";


@Component({
    components: {
    },
})
export default class extends Vue {
    columns = [
        { name: "번호", label: "번호", field: "번호", align: "left" },
        { name: "아이디", label: "아이디", field: "아이디", align: "left" },
        { name: "게임 제목", label: "게임 제목", field: "게임 제목", align: "left" },
        { name: "버전", label: "버전", field: "버전", align: "left" },
        { name: "상태", label: "상태", field: "상태", align: "left" },
        { name: "신청일", label: "신청일", field: "신청일", align: "left" },
        { name: "심사일", label: "심사일", field: "심사일", align: "left" },
        { name: "반려 사유", label: "반려 사유", field: "반려 사유", align: "left" },
    ];

}
</script>
