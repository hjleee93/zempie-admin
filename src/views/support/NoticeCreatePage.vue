<template>
    <q-card>
        <q-card-section>
            <div class="q-mb-md row justify-start items-center">
                <div class="col-12 col-md-2 text-weight-bold">
                    제목
                </div>
                
                <div class="col-12 col-md-10">
                    <q-input v-model="title" placeholder="Title" />
                </div>
            </div>

            <div class="row justify-start q-mb-md items-center">
                <div class="col-12 col-md-2 text-weight-bold">
                    카테고리
                </div>

                <div class="col-12 col-md-10">
                    <q-select v-model="category" :options="options" />
                </div>
            </div>

            <div>
                <q-editor v-model="content" min-height="10rem" />
            </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
            <div class="row justify-end">
                <q-btn class="q-pl-md q-pr-md q-mr-md" color="grey" outline label="취소" @click="cancel" />
                <q-btn class="q-pl-md q-pr-md" color="positive" label="등록" @click="submit" :disable="submitDisable" />
            </div>
        </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Api from "@/util/Api";
import Config from "@/util/Config";

@Component({
    components: {},
})
export default class extends Vue {
    title = "";
    content = "";
    category = "공지";

    submitDisable = true;

    get options(){
        return Config.noticeCategory;
    }

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
        this.submitDisable = this.title.trim() == "" || this.content.trim() == "";
    } 

    async submit() {
        const result = await Api.addNotice(this.title, this.content, Config.noticeCategory.indexOf(this.category));
        if (result) {
            await this.$router.push("/support/notice");
        }
    }
}
</script>

<style lang="scss"></style>
