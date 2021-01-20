<template>
    <div>
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
                    <q-btn class="q-pl-md q-pr-md q-mr-md" color="red" label="삭제" @click="deleteItem" />
                    <q-btn class="q-pl-md q-pr-md" color="positive" label="수정" @click="modify" />
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { Dialog } from "quasar";
import Config from "@/util/Config";
import Query from "@/query/FaqQuery";

@Component({
    apollo: {
        faqGet: {
            query: Query.faqGetById,
            variables: {
            }
        }
    }
})
export default class extends Vue {
    options = Config.faqCategory

    category = "";
    Qcontent = "";
    Acontent ="";
    faqGet: any;
    
    async created(){
        await this.$apollo.queries.faqGet.setVariables({id: Math.round((Number(this.$route.params.index)))});
        await this.$apollo.queries.faqGet.refetch();

        this.category = this.options[this.faqGet[0].category];
        this.Qcontent = this.faqGet[0].q;
        this.Acontent = this.faqGet[0].a;
    }

    cancel(){
        this.$router.go(-1);
    }

    deleteItem(){
        Dialog.create({
            title: '삭제',
            message: '정말로 삭제하겠습니까?',
            cancel: true,
            persistent: true
        }).onOk(async () => {
            const data = await this.$apollo.mutate({
                mutation: Query.faqDelete,
                variables: {
                    id: Math.round(this.faqGet[0].id),
                },
            })

            this.$q.notify({
                type: "positive",
                message: "성공적으로 삭제되었습니다.",
                position: "top"
            })

            this.$router.push("/support/faq");
        });
    }

    async modify(){
        Dialog.create({
            title: '수정',
            message: '정말로 수정하겠습니까?',
            cancel: true,
            persistent: true
        }).onOk(async () => {
            const data = await this.$apollo.mutate({
                mutation: Query.faqEdit,
                variables: {
                    id: Math.round(this.faqGet[0].id),
                    category: this.options.indexOf(this.category),
                    q: this.Qcontent,
                    a: this.Acontent
                },
            })

            this.$q.notify({
                type: "positive",
                message: "성공적으로 수정되었습니다.",
                position: "top"
            })

            await this.$apollo.queries.faqGet.refetch();
        });
    }
}
</script>

<style scoped>

</style>