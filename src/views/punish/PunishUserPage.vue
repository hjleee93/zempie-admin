<template>
    <div>
        <q-card class="my-card">
            <q-card-section>
                <div class="q-mb-md">
                    <div class="text-weight-bold">
                        제재
                    </div>

                    <div class="row">
                        <div class="col-12 col-sm-4 q-pr-md">
                            <q-select v-model="type" :options="types" />
                        </div>

                        <div class="col-12 col-sm-4 q-pr-md">
                            <q-select v-model="type" :options="types" />
                        </div>

                        <div class="col-12 col-sm-4 flex items-center">
                            <div class="q-mr-md">
                                제재 일 수 : {{ day }}일
                            </div>

                            <div>
                                <q-btn color="red" label="적용" />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="text-weight-bold q-mb-sm ">
                        정지 취소
                    </div>

                    <div>
                        <q-btn color="positive" label="적용" />
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class  extends Vue {
    type = '저작권 위반';
    day = 7;
    types = [
        '불건전한 콘텐츠',
        '저작권 위반',
        '기타',
        '등',
        '등'
    ];
}
</script>

<style scoped>

</style>