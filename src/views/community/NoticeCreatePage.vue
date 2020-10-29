<template>
    <div class="notice-create">
        <div class="q-mb-md">
            <q-input outlined v-model="title" label="제목" />
        </div>

        <div class="q-mb-md">
            <q-editor v-model="content" min-height="10rem" />
        </div>

        <div class="row justify-between">
            <q-btn class="q-pl-md q-pr-md" color="primary" label="취소" @click="cancel" />
            <q-btn class="q-pl-md q-pr-md" color="primary" label="등록" @click="submit" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Notify } from "quasar";
import Api from "../../util/Api";

@Component({
    components: {},
})
export default class extends Vue {
    title = "";
    content = "";

    cancel() {
        this.$router.go(-1);
    }

    async submit() {
        if(this.title.trim() == "" || this.content.trim() == ""){
            Notify.create({
                type: "negative",
                message: "내용을 전부 채워주시기 바랍니다.",
                position: "top",
            });
        }
        const result = await Api.addNotice(this.title, this.content);
        if (result) {
            Notify.create({
                type: "positive",
                message: "공지사항이 성공적으로 작성되었습니다.",
                position: "top",
            });
            this.$router.push("/community/notice");
        } else {
            Notify.create({
                type: "negative",
                message: "공지사항을 작성하는 도중에 문제가 발생하였습니다.",
                position: "top",
            });
        }
    }
}
</script>

<style lang="scss"></style>
