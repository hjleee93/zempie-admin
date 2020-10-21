<template>
    <MainLayout>
        유저 리스트
    </MainLayout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MainLayout from "../../components/MainLayout.vue";

@Component({
    components: {
        MainLayout
    }
})
export default class UserList extends Vue {
    
}
</script>
