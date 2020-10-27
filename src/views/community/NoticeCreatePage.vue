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

@Component({
    components: {},
})
export default class extends Vue {
    title = "";
    content = "";

    cancel(){
        this.$router.go(-1);
    }
    
    submit(){
        // console.log(this.title, this.content);
    }
}
</script>

<style lang="scss">
</style>
