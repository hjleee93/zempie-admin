<template>
    <div>
        <q-card v-if="!$apollo.queries.userGet.loading">
            <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
            >
                <q-tab name="data" label="정보" />
                <q-tab name="game" label="업로드 게임" />
                <q-tab name="inquiry" label="1 : 1 문의" />
                <q-tab name="ban" label="제재" />
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="tab">
                <q-tab-panel name="data">
                    <div class="text-h5 q-mb-md">
                        정보
                    </div>
                    <div class="row q-mb-md">
                        <div class="col-12 text-h6">
                            이름
                        </div>

                        <div class="col-12">
                            {{ user.name }}
                        </div>
                    </div>
                    <div class="row q-mb-md">
                        <div class="col-12 text-h6">
                            가입일
                        </div>

                        <div class="col-12">
                            {{ new Date(user.created_at).toLocaleString() }}
                        </div>
                    </div>
                    <div class="row q-mb-md">
                        <div class="col-12 text-h6">
                            이메일
                        </div>

                        <div class="col-12">
                            {{ user.email }}
                        </div>
                    </div>
                    <div class="row q-mb-md">
                        <div class="col-12 text-h6">
                            이메일 인증 여부
                        </div>

                        <div class="col-12">
                            {{ user.email_verified ? '인증 완료' : '' }}
                        </div>
                    </div>
                    <div class="row q-mb-md">
                        <div class="col-12 text-h6">
                            로그인 플랫폼
                        </div>

                        <div class="col-12">
                            {{ user.provider }}
                        </div>
                    </div>
                    <!-- <div class="row q-mb-md">
                        <div class="col-12 text-h6">
                            개발자 여부
                        </div>

                        <div class="col-12">
                            {{ user.is_developer }}
                        </div>
                    </div> -->
                    <div class="row q-mb-md">
                        <div class="col-12 text-h6">
                            채널
                        </div>

                        <div class="col-12">
                            <a :href="channelLink" target="_blank">
                                채널 열기
                            </a>
                        </div>
                    </div>
                    <!-- <div class="row q-mb-md">
                        <div class="col-12 text-h6">
                            정지 횟수
                        </div>

                        <div class="col-12">
                            {{ user.banned }}
                        </div>
                    </div> -->
                </q-tab-panel>

                <q-separator />

                <q-tab-panel name="game">
                    <div class="text-h5 q-mb-md">
                        게임 목록

                    </div>

                    <q-table
                        :data="user.devGames"
                        :columns="gamesColumns"
                        row-key="id"
                    >
                        <template v-slot:body-cell="props">
                            <q-td :props="props">
                                <div v-if="props.col.event">
                                    <a href="#" @click="(event)=>{event.preventDefault();subEvent(props.row)}">{{user.devGames[props.rowIndex][props.col.field]}}</a>
                                </div>
                                <div v-else>
                                    {{user.devGames[props.rowIndex][props.col.field]}}
                                </div>
                            </q-td>
                        </template>
                    </q-table>
                </q-tab-panel>

                <q-separator />

                <q-tab-panel v-if="!$apollo.queries.userInquiryGet.loading" name="inquiry">
                    <div class="text-h5 q-mb-md">
                        문의 목록
                    </div>

                    <q-table
                        :data="inquiryList"
                        :columns="columns"
                        row-key="id"
                    >
                        <template v-slot:body-cell="props">
                            <q-td :props="props">
                                <div v-if="props.col.event">
                                    <a href="#" @click="(event)=>{event.preventDefault();subEvent2(props.row)}">{{userInquiryGet[props.rowIndex][props.col.field]}}</a>
                                </div>
                                <div v-else>
                                    {{userInquiryGet[props.rowIndex][props.col.field]}}
                                </div>
                            </q-td>
                        </template>
                    </q-table>
                </q-tab-panel>

                <q-tab-panel name="ban">
                    <div class="text-h5 q-mb-md">
                        제재
                    </div>

                    <UserPunish :user-data="user" />
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LineChart from "@/components/LineChart.vue";
import MainTable from "@/components/MainTable.vue";
import UserPunish from "@/components/pageSub/userPunish.vue";
import Config from "@/util/Config";
import Query from "@/query/UserQuery";


@Component({
    components: {
        LineChart,
        MainTable,
        UserPunish,
    },
    apollo: {
        userGet: {
            query: Query.userGetById,
            variables: {}
        },
        userInquiryGet: {
            query: Query.userInquiryGetByUserId,
            variables: {}
        }
    }
})
export default class extends Vue {
    tab = "data";
    userGet: any
    userInquiryGet: any

    get user(){
        return this.userGet[0];
    }

    get inquiryList(){
        return this.userInquiryGet.map((inquiry: any) => {
            inquiry.categoryName = Config.inquiryCategory[inquiry.category];
            inquiry.state = inquiry.response == null ? '대기' : '답변 완료';
            inquiry.created_date = new Date(inquiry.created_at).toLocaleString();

            return inquiry;
        });
    }

    // rows = [];

    columns = [
        { field: 'id', name: 'id', label: "#", align: 'left' },
        { field: 'title', name: 'title', label: "제목", align: 'left', event: true },
        { field: 'categoryName', name: 'categoryName', label: "카테고리", align: 'left' },
        { field: 'created_date', name: 'created_date', label: "질문일", align: 'left' },
        { field: 'state', name: 'state', label: "상태", align: 'left' },
    ];

    gamesColumns = [
        { field: 'id', name: 'id', label: "#", align: 'left' },
        { field: 'title', name: 'title', label: "제목", align: 'left', event: true },
        { field: 'official', name: 'official', label: "정식게임 여부", align: 'left' },
        { field: 'version', name: 'version', label: "버전", align: 'left' },
        { field: 'enabled', name: 'enabled', label: "상태", align: 'left' },
    ]

    subEvent( row: any ){
        if(row.official){
            this.$router.push("/game/official/sub/" + row.id);
        }else{
            this.$router.push("/game/challenge/sub/" + row.id);
        }
    }

    subEvent2( row: any ){
        this.$router.push("/community/inquiry/sub/" + row.id);
    }

    async created(){
        await this.$apollo.queries.userGet.setVariables({id: Math.round((Number(this.$route.params.index)))});
        await this.$apollo.queries.userGet.refetch();
        await this.$apollo.queries.userInquiryGet.setVariables({user_id: Math.round((Number(this.$route.params.index)))});
        await this.$apollo.queries.userInquiryGet.refetch();
    }

    get channelLink(){
        return process.env.VUE_APP_ZEMPIE_LINK + '/channel/' + this.user.channel_id
    }

    punishColumns = [
        { field: 'id', name: 'id', label: "#", align: 'left' },
        { field: 'category', name: 'category', label: "제재 종류", align: 'left' },
    ];
}
</script>
