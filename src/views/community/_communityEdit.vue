<template>
    <div class="q-pa-md" style="background-color: #fff">
        <q-form class="q-gutter-md" @submit="createCommunity" @reset="onReset">
            <div class="q-gutter-md">
                <q-input
                    label="Title"
                    :rules="[
                        (title) => !!title || '커뮤니티 이름을 입력해주세요',
                    ]"
                    maxlength="50"
                    v-model="title"
                />
                <q-input
                    type="textarea"
                    label="Description"
                    :rules="[
                        (desc) => !!desc || '커뮤니티 설명을 입력해주세요',
                    ]"
                    maxlength="2000"
                    v-model="description"
                />

                <div class="image-uploader-container">
                    <ImgSelector :accept="'image/*'" :label="'Profile Image'" :imgSrc='profileImgSrc'
                                 @imgFile="(file) => {profileImg = file}"/>
                    <ImgSelector :accept="'image/*'" :label="'Banner Image' " :imgSrc='bannerImgSrc'
                                 @imgFile="(file) => {bannerImg = file}"/>
                </div>
                <q-toggle
                    false-value="PRIVATE"
                    :label="state === 'PUBLIC' ? '공개' : '비공개'"
                    true-value="PUBLIC"
                    color="red"
                    v-model="state"
                />
            </div>
            <div>
                <q-btn label="수정" type="submit" color="primary"/>
                <!-- <q-btn
                    label="초기화"
                    type="reset"
                    color="primary"
                    flat
                    class="q-ml-sm"
                    
                /> -->
            </div>
        </q-form>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import ImgSelector from "@/views/community/file/_imgSelector.vue";
import {AxiosError, AxiosResponse} from "axios";
import {Notify} from "quasar";

@Component({
    components: {ImgSelector},
})
export default class CommunityEdit extends Vue {
    @Prop() community!: any;
    private title = "";
    private description = "";
    private profileImg: File = null;
    private bannerImg: File = null;
    private state = "PUBLIC";

    private profileImgSrc: string = '';
    private bannerImgSrc: string = '';

    created() {
        console.log(this.community);
        if (this.community) {
            this.title = this.community.name;
            this.description = this.community.description;
            this.profileImgSrc = this.community.profile_img;
            this.bannerImgSrc = this.community.banner_img;
        }
    }

    async createCommunity() {
        let profileImg: { url: string } = '';
        let bannerImg: { url: string } = '';


        if (this.profileImg) {
            profileImg = await this.$api.fileUploader(this.profileImg)
            this.profileImgSrc = profileImg.url
        }
        //todo:bannerImg update 반영 안됨
        if (this.bannerImg) {
            bannerImg = await this.$api.fileUploader(this.bannerImg)
            this.bannerImgSrc = bannerImg.url
            console.log('bannerImg', this.bannerImgSrc)
        }


        const obj = {
            id: this.community.id,
            community_name: this.title,
            community_desc: this.description,
            community_profile_img: this.profileImgSrc,
            community_banner_img: this.bannerImgSrc,
            community_state: this.state,
        };

        this.$api.group.edit(obj)
            .then((res: AxiosResponse) => {
                this.$emit('closeModal')
                Notify.create({
                    type: "positive",
                    message: "해당 커뮤니티가 수정되었습니다.",
                    position: "top",
                });
            })
            .catch((err: AxiosError) => {
                Notify.create({
                    type: "negative",
                    message: "커뮤니티 수정에 실패했습니다. 다시 시도해주세요.",
                    position: "top",
                });
            })
    }

    onReset() {
        this.title = "";
        this.description = "";
        this.profileImg = null;
        this.bannerImg = null;
        this.state = "PUBLIC";
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
</style>

