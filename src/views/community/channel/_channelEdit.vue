<template>
    <div class="q-pa-md" style="background-color: #fff">
        <q-form class="q-gutter-md" @submit="editChannel">
            <div class="q-gutter-md">
                <q-input
                    label="Title"
                    :rules="[(title) => !!title || '채널 이름을 입력해주세요']"
                    maxlength="50"
                    v-model="title"
                />
                <q-input
                    type="textarea"
                    label="Description"
                    :rules="[(desc) => !!desc || '채널 설명을 입력해주세요']"
                    maxlength="2000"
                    v-model="description"
                />

                <div class="image-uploader-container">
                    <ImgSelector
                        :accept="'image/*'"
                        :label="'Profile Image'"
                        :imgSrc="profileImgSrc"
                        @imgFile="
                            (file) => {
                                profileImg = file;
                            }
                        "
                    />
                </div>
                <q-toggle
                    false-value="PRIVATE"
                    :label="state === 'PUBLIC' ? '공개' : '비공개'"
                    true-value="PUBLIC"
                    color="red"
                    v-model="state"
                />
            </div>
            <div class="btn-container">
                <q-btn
                    label="취소"
                    class="q-mr-sm"
                    type="submit"
                    color="negative"
                    @click="hideModal"
                />
                <q-btn label="수정" type="submit" color="primary" />
            </div>
        </q-form>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import ImgSelector from "@/views/community/file/_imgSelector.vue";
import { AxiosError, AxiosResponse } from "axios";
import { Notify } from "quasar";

@Component({
    components: { ImgSelector },
})
export default class ChannelEdit extends Vue {
    @Prop() channel!: any;
    title = "";
    description = "";
    profileImgSrc: string = "";
    profileImg: any = null;

    private state = "PUBLIC";

    created() {
        if (this.channel) {
            this.title = this.channel.title;
            this.description = this.channel.description;
            this.profileImgSrc = this.channel.profile_img;
        }
    }

    async editChannel() {
        let profileImg: any = "";

        profileImg = await this.$api.fileUploader(this.profileImg);
        console.log("profileImg", profileImg[0].url);
        this.profileImgSrc = profileImg[0].url;

        const obj = {
            community_id: this.channel.community_id,
            channel_id: this.channel.id,
            title: this.title,
            description: this.description,
            profile_img: this.profileImgSrc,
            is_private: this.state === "PUBLIC" ? false : true,
        };
        console.log(obj);

        this.$api.group.channel
            .edit(obj)
            .then((res: AxiosResponse) => {
                this.$emit("closeModal");
                Notify.create({
                    type: "positive",
                    message: "해당 채널이 수정되었습니다.",
                    position: "top",
                });
            })
            .catch((err: AxiosError) => {
                Notify.create({
                    type: "negative",
                    message: "채널 수정에 실패했습니다. 다시 시도해주세요.",
                    position: "top",
                });
            });
    }

    hideModal() {
        this.$emit("closeModal");
    }
}
</script>

<style scoped lang="scss">
.image-uploader-container {
    display: flex;
    justify-content: space-between;

    .uploader {
        width: 48%;
    }
}

.btn-container {
    float: right;
    margin-bottom: 16px;
}
</style>

