<template>
    <q-card class="uploader q-mr-lg">
        <q-card-section>
            <div
                :style="{ 'background-image': `url(${imageData})` }"
                @click="selectImg"
            >
                <span v-if="!imageData" style="cursor: pointer">
                    {{ label }}
                </span>
                <input
                    hidden
                    ref="fileInput"
                    type="file"
                    @input="onSelectFile"
                    :accept="accept"
                />
            </div>
            <q-img
                :src="imageData"
                style="cursor: pointer"
                @click="selectImg"
            />
        </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {},
})
export default class ImgSelector extends Vue {
    @Prop() accept!: string;
    @Prop() label!: string;
    @Prop() imgSrc!: string;

    imageData: any = this.imgSrc || "";

    onSelectFile() {
        const input: any = this.$refs.fileInput;
        const files = input.files;
        if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.imageData = e.target!.result;
            };
            reader.readAsDataURL(files[0]);

            this.$emit("imgFile", files[0]);
        }
    }

    selectImg() {
        (this.$refs.fileInput as any).click();
    }
}
</script>

<style scoped lang="scss">
.uploader {
    max-width: 250px;
    height: auto;
}
</style>
