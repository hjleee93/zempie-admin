<template>
    <q-btn @click="cancelBan">제재 취소 </q-btn>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import moment from "moment";
@Component({
    components: {},
})
export default class reportCancelBtn extends Vue {
    @Prop() row!: any;
    moment = moment;

    cancelBan() {
        const obj = {
            report_id: this.row.id,
            user_id: this.row.target_user.id,
        };
        this.$api.cancelUserBan(obj)
        .then((res)=>{
            alert('제재가 취소되었습니다.')
        })
    }
}
</script>
<style scoped lang="scss">
.red {
    color: red;
}
</style>
