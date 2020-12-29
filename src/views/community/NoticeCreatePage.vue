<template>
    <div class="notice-create">
        <div class="q-mb-md row justify-start items-center">
            <div class="col-12 col-md-2 text-weight-bold text-h6">
                제목
            </div>
            
            <div class="col-12 col-md-10">
                <q-input outlined v-model="title" label="제목" />
            </div>
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

        <div class="row">
            <q-btn class="q-pl-md q-pr-md q-mr-md" color="grey" outline label="취소" @click="cancel" />
            <q-btn class="q-pl-md q-pr-md" color="positive" label="등록" @click="submit" :disable="submitDisble" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Api from "@/util/Api";

@Component({
    components: {},
})
export default class extends Vue {
    title = "";
    content = "";
    category = "공지";
    options = [
        "공지", "점검", "업데이트", "이벤트", "기타"
    ];

    submitDisble = true;

    cancel() {
        this.$router.go(-1);
    }

    @Watch("title")
    onChangeTitle(){
        this.onChange();
    }

    @Watch("content")
    onChangeContent(){
        this.onChange();
    }

    onChange(){
        if(this.title.trim() == "" || this.content.trim() == ""){
            this.submitDisble = true;
        }else{
            this.submitDisble = false;
        }
    } 

    async submit() {
        const result = await Api.addNotice(this.title, this.content, this.options.indexOf(this.category));
        if (result) {
            this.$router.push("/community/notice");
        }
    }
}
</script>

<style lang="scss"></style>
