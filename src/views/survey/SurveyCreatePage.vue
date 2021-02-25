<template>
    <q-card>
        <q-card-section>
            <div class="q-mb-md row justify-start items-center">
                <div class="col-12 col-md-2 text-weight-bold">
                    설문조사 링크
                </div>

                <div class="col-12 col-md-10">
                    <q-input v-model="formUrl" placeholder="FromUrl" />
                </div>
            </div>

            <div class="row justify-start q-mb-md items-center">
                <div class="col-12 col-md-2 text-weight-bold">
                    설문조사 아이디
                </div>

                <div class="col-12 col-md-10">
                    <q-input v-model="formId" placeholder="FormId" />
                </div>
            </div>

            <div class="row justify-start q-mb-md items-center">
                <div class="col-12 col-md-2 text-weight-bold">
                    설문조사 기간
                </div>

                <div class="col-12 col-md-10">
                    <q-date v-model="date" range />

<!--                    <q-input-->
<!--                        filled-->
<!--                        v-model="fromDate"-->
<!--                        label="Special Id"-->
<!--                        mask="####/##/##"-->
<!--                        unmasked-value-->
<!--                        hint="####/##/##"-->
<!--                    />-->

<!--                    <q-input-->
<!--                        filled-->
<!--                        v-model="id"-->
<!--                        label="Special Id"-->
<!--                        mask="####/##/##"-->
<!--                        unmasked-value-->
<!--                        hint="Mask: ###/##"-->
<!--                    />-->
                </div>
            </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
            <div class="row justify-end">
                <q-btn class="q-pl-md q-pr-md q-mr-md" color="grey" outline label="취소" @click="cancel" />
                <q-btn class="q-pl-md q-pr-md" color="positive" label="등록" @click="submit" :disable="submitDisable" />
            </div>
        </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Api from "@/util/Api";
// import Api from "@/util/Api";

const oneDayMilliSecond = 86400000;

@Component({
    components: {
    },
})
export default class extends Vue {
    formUrl = '';
    formId = '';
    fromDate = '';
    date : any = `${new Date().getFullYear()}/${this.dateText(new Date().getMonth() + 1)}/${new Date().getDate()}`;
    //${new Date().getFullYear()}/${this.dateText(new Date().getMonth() + 1)}/${this.dateText(new Date().getDate() + 1)}
    dateText( num : number ) {
        return num < 10 ? '0' + num : num;
    }


    get submitDisable() {
        return this.formUrl == '' || this.formId == '' || this.date == null || this.date == undefined;
    }

    async submit() {
        let startAt : number = 0;
        let endAt : number = 0;

        if( !!this.date.from ) {
            startAt = new Date(this.date.from).getTime();
            endAt = new Date(this.date.to).getTime() + oneDayMilliSecond - 1;
        } else {
            startAt = new Date(this.date).getTime();
            endAt = new Date(this.date).getTime() + oneDayMilliSecond - 1;
        }

        let result = await Api.addSurvey( this.formId, this.formUrl, startAt, endAt );
        if( result ) {
            await this.$router.push( '/survey/developer' );
        }
    }

    cancel() {
        this.$router.go(-1);
    }


}
</script>

<style scoped>

</style>