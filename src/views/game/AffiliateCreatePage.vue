<template>
    <q-card>
        <q-card-section>
            <div class="q-mb-md full-width">
                <iframe :src="iframeLink" style="width: 100%; height: 1000px; border: none;"></iframe>
            </div>

            <div class="q-mb-md row justify-start items-center">
                <div class="col-12 col-md-2 text-weight-bold">
                    게임 제목 *
                </div>

                <div class="col-12 col-md-10">
                    <q-input type="text" v-model="title" placeholder="Title" />
                </div>
            </div>

            <div class="q-mb-md row justify-start items-center">
                <div class="col-12 col-md-2 text-weight-bold">
                    게임 URL *
                </div>

                <div class="col-12 col-md-10">
                    <q-input type="text" v-model="url" placeholder="URL" />
                </div>
            </div>

            <div class="q-mb-md row justify-start items-center">
                <div class="col-12 col-md-2 text-weight-bold">
                    접속주소 *
                </div>

                <div class="col-12 col-md-10">
                    <q-input type="text" v-model="pathname" placeholder="Pathname"  hint="영문과 숫자로 된 고유한 게임 아이디를 만듭니다. 만들어진 아이디는 게임 접속 주소등으로 사용됩니다." />
                </div>
            </div>

            <div class="q-mb-md row justify-start items-center">
                <div class="col-12 col-md-2 text-weight-bold">
                    자세한 설명
                </div>

                <div class="col-12 col-md-10">
                    <q-input type="textarea" v-model="description" placeholder="Description" />
                </div>
            </div>

            <div class="q-mb-md row justify-start items-center">
                <div class="col-12 col-md-2 text-weight-bold">
                    태그 *
                </div>

                <div class="col-12 col-md-10">
                    <q-input type="text" v-model="tag" placeholder="Tag" hint="게임을 검색할 수 있는 단어를 태그로 설정하세요. 여러개를 사용하는경우 , 로 구분해 주세요." />
                </div>
            </div>

            <div class="q-mb-md row justify-start items-center">
                <div class="col-12 col-md-2 text-weight-bold">
                    썸네일 이미지 *
                </div>

                <div class="col-12 col-md-10">
                    <q-input type="text" v-model="thumb1" placeholder="Thumb1" />
<!--                    <q-file bottom-slots v-model="file1" label="Thumb" counter>-->
<!--                        <template v-slot:append>-->
<!--                            <q-icon name="close" @click.stop="file1 = null" class="cursor-pointer" />-->
<!--                        </template>-->
<!--                    </q-file>-->
                </div>
            </div>

            <div class="q-mb-md row justify-start items-center">
                <div class="col-12 col-md-2 text-weight-bold">
                    썸네일 이미지 webp
                </div>

                <div class="col-12 col-md-10">
                    <q-input type="text" v-model="thumb2" placeholder="Thumb2" />
<!--                    <q-file bottom-slots v-model="file1" label="Thumb" counter>-->
<!--                        <template v-slot:append>-->
<!--                            <q-icon name="close" @click.stop="file1 = null" class="cursor-pointer" />-->
<!--                        </template>-->
<!--                    </q-file>-->
                </div>
            </div>

            <div class="q-mb-md row justify-start items-center">
                <div class="col-12 col-md-2 text-weight-bold">
                    미리보기 이미지
                </div>

                <div class="col-12 col-md-10">
                    <q-input type="text" v-model="thumb3" placeholder="Thumb3" />
<!--                    <q-file bottom-slots v-model="file2" label="Thumb_gif" counter>-->
<!--                        <template v-slot:append>-->
<!--                            <q-icon name="close" @click.stop="file2 = null" class="cursor-pointer" />-->
<!--                        </template>-->
<!--                    </q-file>-->
                </div>
            </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
            <div class="flex justify-end">
                <q-btn color="grey" label="취소" class="q-pl-md q-pr-md q-mr-md" outline @click="cancel" />
                <q-btn color="positive" label="추가" class="q-pl-md q-pr-md" @click="createGame" :disable="!submitCheck" />
            </div>
        </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Api from "@/util/Api";

@Component({

})
export default class AffilcateCreatePage extends Vue {

    iframeLink = process.env.VUE_APP_LAUNCHER_LINK;
    title = '';
    url = '';
    pathname = '';
    description = '';
    tag = '';

    thumb1 = '';
    thumb2 = '';
    thumb3 = '';

    // file1 : File | null = null;
    // file2 : File | null = null;

    cancel() {
        this.$router.go( -1 );
    }

    async createGame() {
        const result = await Api.addAffiliateGame(
            this.pathname,
            this.title,
            this.description,
            this.tag,
            this.url,
            this.thumb1,
            this.thumb2,
            this.thumb3
        );

        if( result ) {
            this.$router.push('/game/affiliate');
        }
    }

    get submitCheck() {
        return this.pathname !== '' &&
            this.title !== '' &&
            this.url !== '' &&
            this.tag !== '' &&
            this.thumb1;
    }
}
</script>

<style scoped>

</style>
