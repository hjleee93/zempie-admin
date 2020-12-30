<template>
    <div class="faq-create">
        <div class="q-mb-md">
            <q-input outlined v-model="title" placeholder="Title" />
        </div>

        <div class="row justify-start q-mb-md items-center">
            <div class="col-12 col-md-2 text-weight-bold text-h6">
                카테고리
            </div>

            <div class="col-12 col-md-10">
                <q-select outlined v-model="category" :options="options" />
            </div>
        </div>

        <div class="q-mb-md">
            <q-editor v-model="content" min-height="10rem" />
        </div>

        <div class="row justify-between">
            <q-btn class="q-pl-md q-pr-md" color="grey" outline label="취소" @click="cancel" />
            <q-btn class="q-pl-md q-pr-md" color="primary" label="등록" @click="submit" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {},
})
export default class extends Vue {
    title = "";
    category = "계정"
    options = [
        "계정",
        "결제/환불",
        "불량 유저",
        "버그",
        "이벤트",
        "건의",
        "기타"
    ];
    content = "";

    cancel(){
        this.$router.go(-1);
    }
    
    submit(){
        // console.log(this.title, this.category, this.content);
    }
}
</script>

<style lang="scss">
</style>
