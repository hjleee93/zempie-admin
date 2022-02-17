<template>
    <div class="q-pa-md" style="background-color: #fff">
        <q-form class="q-gutter-md" @submit="createCommunity" >
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
                    <ImgSelector :accept="'image/*'" :label="'Profile Image'" @imgFile="(file) => {profileImg = file}"/>
                    <ImgSelector :accept="'image/*'" :label="'Banner Image' " @imgFile="(file) => {bannerImg = file}"/>
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
                <q-btn label="만들기" type="submit" color="primary"/>
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
export default class CommunityCreate extends Vue {
    @Prop() community!: any;
    private title = "";
    private description = "";
    private profileImg!: File;
    private bannerImg!: File;
    private state = "PUBLIC";

    created() {
        if (this.community) {
            this.title = this.community.name;
            this.description = this.community.description;
        }
    }

    async createCommunity() {
        let profileImg:any = '';
        let bannerImg:any ='';

        console.log(this.profileImg)

        if (this.profileImg) {
            const result = await this.$api.fileUploader(this.profileImg)
            profileImg = result[0]
        }
        if (this.bannerImg) {
            const result = await this.$api.fileUploader(this.bannerImg)
            
            bannerImg = result[0]
        }


        const obj = {
            owner_id: 0,
            community_name: this.title,
            community_desc: this.description,
            community_profile_img: profileImg.url,
            community_banner_img: bannerImg.url,
            community_state: this.state,
        };

        this.$api.group.create(obj)
            .then((res: any) => {
                this.$router.push(`/community/sub/${res.id}`)
                Notify.create({
                    type: "positive",
                    message: "커뮤니티가 생성되었습니다.",
                    position: "top",
                });
            })
            .catch((err: any) => {
                Notify.create({
                    type: "negative",
                    message: "커뮤니티 생성에 실패했습니다. 다시 시도해주세요.",
                    position: "top",
                });
            })
    }


}
</script>

<style scoped lang="scss">
.image-uploader-container {
    display: flex;

    .uploader {
        width: 48%;
    }
}
</style>

