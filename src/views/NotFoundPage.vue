<template>
    <div class="fit row wrap justify-center items-center content-center">
        <div class="text-center">
            <div class="text-h4 q-mb-md">
                404 not found
            </div>

            <div>
                <q-btn color="primary" @click="moveBack" label="돌아가기" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class extends Vue {
        moveBack(){
            this.$router.go(-1);
        }
    }
</script>

<style scoped>
.not-found-page{
    width:100%;
    height:100%;
}
</style>