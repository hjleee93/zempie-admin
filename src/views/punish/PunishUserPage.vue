<template>
    <div>
        <q-card class="my-card">
            <q-card-section>
                <div class="q-mb-md">
                    <div class="text-weight-bold">
                        제재
                    </div>
                    <div>
<!--                        <MainTable-->
<!--                            :columns="columns"-->
<!--                            apiLink="punish/user/list"-->
<!--                            :apiParam="{user_id:63}"-->
<!--                        />-->
<!--                            @subEvent="releasePunish"-->
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
import MainTable from "@/components/MainTable.vue";

@Component({
    components: {
        MainTable,
    }
})
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

    columns = [
        { field: 'id', name: 'id', label: "#", align: 'left' },
        { field: 'category', name: 'category', label: "제재 종류", align: 'left' },
        { field: 'reason', name: 'reason', label: "제재 사유", align: 'left' },
        { field: 'created_at', name: 'created_at', label: "제재 시작일", align: 'left' },
        { field: 'end_at', name: 'end_at', label: "제재 종료일", align: 'left' },
        // {
        //     field: 'is_denied', name: 'is_denied', label: "제재 상태", align: 'left',
        //     badge: true,
        //     badgeColor: (text : any) => text == "제재 중" ? 'red' : 'positive',
        //     format: (data : any) => data ? '제재 중' : '제재 풀림'
        // },
        // {
        //     field: 'is_denied', name: 'is_denied', label: "제재 취소", align: 'left',
        //     event: true,
        //     eventButton: true,
        //     eventButtonColor: "positive",
        //     format: (data : any) => data ? '제재 취소' : null
        // },
    ]
}
</script>

<style scoped>

</style>