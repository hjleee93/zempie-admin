<template>
    <div>
        <div class="row q-mb-md">
            <div class="col text-weight-bold text-h6">
                {{ data.title }}
            </div>
        </div>
        <div class="row q-mb-md">
            <div class="col text-weight-bold">
                {{ data.category }}
            </div>
        </div>
        <div class="row q-mb-md">
            <div class="col text-weight-bold">
                {{ data.date }}
            </div>
        </div>
        <div class="row q-mb-md">
            <div class="col text-weight-bold">
                {{ data.userName }}
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
        <div class="row q-mb-md" v-if="data.response != null">
            <div class="col text-weight-bold">
                답변인 : {{ data.admin.name }}
            </div>
        </div>
        <div class="row q-mb-md" v-if="data.response != null">
            <div class="col text-weight-bold">
                답변일 : {{ data.responseDate }}
            </div>
        </div>

        <div class="row q-mb-md">
            <div class="col">
                <q-editor v-model="text" min-height="10rem" />
            </div>
        </div>

        <div class="row">
            <q-btn class="q-pl-md q-pr-md q-mr-md" color="grey" outline label="취소" @click="cancel" />
            <q-btn class="q-pl-md q-pr-md" color="positive" label="등록" :disable="!submitCheck" @click="submit" />
        </div>
    </div>
</template>

<script lang="ts">
import Api from '@/util/Api';
import { Component, Vue } from "vue-property-decorator";
import { Notify } from "quasar";

@Component({
    components: {
    }
})
export default class extends Vue {
    data: any = {}

    category = [
        "버그/기술",
        "불량 유저",
        "계정",
        "스튜디오",
        "저작권",
        "이벤트",
        "기타"
    ]

    text = ""

    get submitCheck(){
        return this.text.trim() != "";
    }

    cancel(){
        this.$router.go(-1);
    }

    async created(){
        const result = await Api.getInquiryItem(parseInt(this.$route.params.index));
        if(result == false){
            Notify.create({
                type: "negative",
                message: "존재하지 않는 문의입니다.",
                position: "top",
            });
            this.$router.go(-1);
        }else{
            this.data = result.inquiry;
            this.data.category = this.category[this.data.category];
            this.data.date = new Date(this.data.created_at).toLocaleString();
            this.data.responseDate = new Date(this.data.updated_at).toLocaleString();
            this.data.userName = this.data.user.name;
            this.text = this.data.response || "";
        }
        
    }

    async submit(){
        const result = await Api.responseInquiry(parseInt(this.$route.params.index), this.text);
        if(result){
            this.$router.push("/community/inquiry");
        }
    }
}
</script>

