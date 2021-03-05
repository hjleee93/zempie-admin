<template>
    <div>
<!--        <div class="q-mb-md">-->
        <MainTable
            :columns="punishColumns"
            apiLink="punish/user/list"
            :data="{user_id : userData.id}"
            @subEvent="releasePunish"
        >
            <PopupForm btnLabel="제재 추가" btn-color="red">
                <div class="row">
                    <div class="col-12 q-mb-md">
                        <q-select v-model="category" :options="categoryList" />
                    </div>

                    <div class="col-12 q-mb-md">
                        <q-select v-model="reason" :options="reasonList" />
                    </div>

                    <div class="col-12 q-mb-md flex items-center">
                        <q-input v-model="day" type="number" class="full-width" />
                    </div>

                    <div class="col-12 q-mb-md flex items-center">
                        정지 해제일 : {{ punishDate.toLocaleString() }}
                    </div>

                    <div>
                        <q-btn color="red" label="적용" @click="onClickPunishBtn" />
                    </div>
                </div>
            </PopupForm>
        </MainTable>
<!--        </div>-->
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import MainTable, {TableBus} from "@/components/MainTable.vue";
import PopupForm, {PopupBus} from "@/components/PopupForm.vue";
import Api from "@/util/Api";

@Component({
    components : {
        MainTable,
        PopupForm,
    }
})
export default class  extends Vue {

    punishColumns = [
        { field: 'id', name: 'id', label: "#", align: 'left' },
        { field: 'category', name: 'category', label: "제재 종류", align: 'left' },
        { field: 'reason', name: 'reason', label: "제재 사유", align: 'left' },
        { field: 'created_at', name: 'created_at', label: "제재 시작일", align: 'left' },
        {
            field: 'end_at', name: 'end_at', label: "제재 종료일", align: 'left',
            format: (data : any) => new Date(data).toLocaleString()
        },
        { field: 'is_denied', name: 'is_denied', label: "제재 상태", align: 'left', badge: true, badgeColor: (text:string) => {return text == "제재 중" ? 'red' : 'positive'} },
        { field: 'release_punish', name: 'release_punish', label: "제재 취소", align: 'left', event: true, eventButton: true, eventButtonColor: "positive" },
    ];

    @Prop()
    userData : any;

    category = {label : '게임 업로드 제한', option : 'game'};
    categoryList = [
        {label : '게임 업로드 제한', option : 'game upload'},
        {label : '댓글 작성 제한', option : 'reply'},
        {label : '랭킹 기록 제한', option : 'ranking'},
    ]


    reason = '불건전한 콘텐츠';
    reasonList = [
        '불건전한 콘텐츠',
        '저작권 위반',
        '어뷰징',
        '점수조작',
    ];

    day = 1;
    get punishDate() {
        return new Date(new Date().getTime() + this.day * 1000 * 60 * 60 * 24);
    }

    @Watch('day')
    onChangeDay() {
        if( this.day <= 0 ) {
            this.day = 1;
        }

        this.day = Math.floor(this.day);
    }

    mounted() {
    }

    async onClickPunishBtn() {
        this.onChangeDay();
        let result = await Api.punishUser( this.userData.id, this.category.option, this.reason, this.punishDate.getTime() );
        if( result ) {
            TableBus.$emit('reload');
            PopupBus.$emit('close');
        }
    }

    async releasePunish( row : any ) {
        const result = await Api.releasePunishUser( row.id );
        if( result ) {
            TableBus.$emit('reload');
        }
    }
}
</script>

<style scoped>

</style>