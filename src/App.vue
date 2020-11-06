<template>
    <MainLayout v-if="this.$route.path != '/login' && this.$route.name != 'notFoundPage'">
        <router-view></router-view>
    </MainLayout>
    <router-view v-else></router-view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainLayout from "./components/MainLayout.vue";

@Component({
    components: {
        MainLayout
    }
})
export default class extends Vue {
}
</script>

<style>
html, body{
    width: 100%;
    height: 100%;
}
</style>
