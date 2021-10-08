<template>
    <div class="q-pa-md">
        <q-form class="q-gutter-md">
            <div class="q-gutter-md" style="max-width: 300px">
                <q-input v-model="$v.form.groupName.$model" label="title" />
                <q-input v-model="$v.form.groupUrl.$model" label="url" />
                <q-input
                    v-model="$v.form.description.$model"
                    type="textarea"
                    label="description"
                />

                <q-file
                @change="val => { imgUpload() }"
                    v-model="bannerImg"
                    label="Banner Image"
                >
                   
                </q-file>

                <q-file outlined v-model="$v.form.profileImgSrc">
                    <template v-slot:prepend>
                        <q-icon name="attach_file" />
                    </template>
                </q-file>

                <q-toggle
                    :false-value="true"
                    label="공개여부"
                    :true-value="false"
                    color="red"
                    v-model="isPrivate"
                />
            </div>
            <div>
                <q-btn
                    label="Submit"
                    type="submit"
                    color="primary"
                    @click="createCommunity"
                />
                <q-btn
                    label="Reset"
                    type="reset"
                    color="primary"
                    flat
                    class="q-ml-sm"
                />
            </div>
        </q-form>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

@Component({
    components: {},
    mixins: [validationMixin],
    validations: {
        form: {
            groupName: {
                required,
                maxLength: maxLength(50),
            },
            groupUrl: {
                required,
                maxLength: maxLength(50),
            },
            description: {
                required,
                maxLength: maxLength(2000),
            },
        },
    },
})
export default class CommunityCreate extends Vue {
    private form = {
        groupName: "",
        groupUrl: "",
        description: "",
    };
    private bannerImg: File | null = null;
    private isPrivate: boolean = false;

    validateState(name: any) {
        const { $dirty, $error } = this.$v.form[name]!;
        return $dirty ? !$error : null;
    }

    async createCommunity() {
        console.log("submit");
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
            return;
        }

        // const result = await this.$api.group.create(
        //     this.user.uid,
        //     this.form.groupName,
        //     this.form.groupUrl,
        //     this.form.description,
        //     this.isPrivate,
        //     this.form.profileImgSrc,
        //     this.form.bannerImgSrc
        // );
    }

    imgUpload(e: any) {
        console.log(e);
    }
}
</script>

<style scoped lang="scss">
</style>

