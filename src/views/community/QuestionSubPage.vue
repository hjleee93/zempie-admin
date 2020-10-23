<template>
    <div>
        <div class="row q-mb-md">
            <div class="col text-weight-bold">
                {{ data.category }}
            </div>
        </div>
        <div class="row q-mb-md">
            <div class="col text-weight-bold">
                {{ data.ID }}
            </div>
        </div>
        <div class="row q-mb-md">
            <div class="col text-weight-bold">
                {{ data.date }}
            </div>
        </div>
        <div class="row q-mb-md">
            <div class="col text-weight-bold">
                <q-input
                    v-model="data.text"
                    filled
                    type="textarea"
                    readonly
                    />
            </div>
        </div>

        <div class="row q-mb-md">
            <div class="col">
                <q-editor v-model="text" min-height="10rem" />
            </div>
        </div>

        <div class="row justify-between">
            <q-btn color="primary" label="취소" @click="cancel" />
            <q-btn color="primary" label="등록" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {
    }
})
export default class extends Vue {
    index = this.$route.params.index;
    data = {
        category: "결제",
        ID: "qqqwwweee",
        date: "2020.10.24 11:22:33",
        text: "테스트"
    }

    text = ""

    cancel(){
        this.$router.go(-1);
    }
}
</script>

