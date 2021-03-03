<template>
    <q-card>
        <q-card-section>
            <div class="row q-mb-md items-center">
                <div class="col-12 col-md-2 text-weight-bold">
                    카테고리
                </div>

                <div class="col-12 col-md-10">
                    <q-select v-model="category" :options="options" />
                </div>
            </div>
            
            <q-input v-model="Qcontent" type="textarea" placeholder="Q." class="q-mb-md" />
            <q-input v-model="Acontent" type="textarea" placeholder="A." />
        </q-card-section>

        <q-separator />

        <q-card-section>
            <div class="row justify-end">
                <q-btn class="q-pl-md q-pr-md q-mr-md" color="grey" outline label="취소" @click="cancel" />
                <q-btn class="q-pl-md q-pr-md" color="positive" label="등록" @click="submit" />
            </div>
        </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Config from "@/util/Config";
import Query from "@/util/Query";

@Component({
    components: {},
})
export default class extends Vue {
    category = Config.faqCategory[0]
    options = Config.faqCategory;
    Qcontent = "";
    Acontent = "";

    cancel(){
        this.$router.go(-1);
    }
    
    async submit(){
        try{
            const result = await this.$apollo.mutate({
                mutation: Query.addFaq,
                variables: {
                    category: this.options.indexOf(this.category),
                    q: this.Qcontent,
                    a: this.Acontent,
                    url_img: ""
                }
            });

            this.$q.notify({
                type: "positive",
                message: "성공적으로 생성되었습니다.",
                position: "top"
            })

            this.$router.push("/support/faq");
        }catch(error){
            this.$q.notify({
                type: "negative",
                message: "생성하는 도중에 문제가 발생하였습니다.",
                position: "top"
            })
        }
    }
}
</script>

<style lang="scss">
</style>
