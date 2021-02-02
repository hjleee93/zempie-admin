<template>
    <div>
        <div v-if="!$apollo.queries.itemGet.loading">
            <div class="q-mt-md q-mb-md">
                <div class="text-h6">
                    아이템 생성
                </div>

                <q-input v-model="addName" type="text" label="아이템 이름" />
                <q-input v-model="addType" type="number" label="아이템 타입" />
                <q-input v-model="addPeriod" type="number" label="아이템 기간" />
                <div>
                    <q-checkbox left-label v-model="addUsed" label="사용 여부" />
                </div>

                <q-btn color="primary" label="아이템 생성" @click="addItem" />
            </div>

            <q-separator spaced />

            <div class="q-mt-md q-mb-md">
                <div class="text-h6">
                    아이템 삭제
                </div>

                <q-input v-model="deletedIdx" type="number" label="삭제할 #" />

                <q-btn color="red" label="아이템 삭제" @click="deleteItem" />
            </div>

            <q-separator spaced />

            <div class="q-mt-md q-mb-md">
                <div class="text-h6">
                    아이템 수정
                </div>

                <q-input v-model="editId" type="number" label="아이템 #" />
                <q-input v-model="editName" type="text" label="아이템 이름" />
                <q-input v-model="editType" type="number" label="아이템 타입" />
                <q-input v-model="editPeriod" type="number" label="아이템 기간" />
                <div>
                    <q-checkbox left-label v-model="editUsed" label="사용 여부" />
                </div>

                <q-btn color="primary" label="아이템 수정" @click="updateItem" />
            </div>

            <q-separator spaced />

            <q-btn color="primary" icon="refresh" @click="refreshItem" />

            <div v-for="item in itemGet" :key="item.id">
                {{ item.id }}
                {{ item.name }}
                {{ item.used_type }}
                {{ item.period }}
                {{ item.is_used }}
            </div>
        </div>

        <div v-else>
            <q-spinner
                color="primary"
                size="3em"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Query from "../../query/ItemQuery";


@Component({
    components: {
    },
    apollo: {
        itemGet: Query.itemGet
    }
})
export default class extends Vue {
    columns = [
        { name: "번호", label: "번호", field: "번호", align: "left" },
        { name: "아이디", label: "아이디", field: "아이디", align: "left" },
        { name: "게임 제목", label: "게임 제목", field: "게임 제목", align: "left" },
        { name: "버전", label: "버전", field: "버전", align: "left" },
        { name: "상태", label: "상태", field: "상태", align: "left" },
        { name: "신청일", label: "신청일", field: "신청일", align: "left" },
        { name: "심사일", label: "심사일", field: "심사일", align: "left" },
        { name: "반려 사유", label: "반려 사유", field: "반려 사유", align: "left" },
    ];

    addName = "";
    addType = 0;
    addPeriod = 0;
    addUsed = false;
    async addItem(){
        const data = await this.$apollo.mutate({
            mutation: Query.itemAdd,
            variables: {
                name: this.addName,
                used_type: Math.round(this.addType),
                period: Math.round(this.addPeriod),
                is_used: this.addUsed
            },
        })

        await this.refresh();
    }

    deletedIdx = 0;
    async deleteItem(){
        const data = await this.$apollo.mutate({
            mutation: Query.itemDelete,
            variables: {
                id: Math.round(this.deletedIdx),
            },
        })

        await this.refresh();
    }


    editId = 0;
    editName = "";
    editType = 0;
    editPeriod = 0;
    editUsed = false;
    async updateItem(){
        const data : any = await this.$apollo.mutate({
            mutation: Query.itemEdit,
            variables: {
                id: Math.round(this.editId),
                name: this.editName,
                used_type: Math.round(this.editType),
                period: Math.round(this.editPeriod),
                is_used: this.editUsed
            },
        })

        if(data.itemEdit != null){
            for(let i = 0; i < this.itemGet.length; i++){
                if(this.itemGet[i].id == this.editId){
                    this.itemGet[i].name = this.editName;
                    this.itemGet[i].used_type = this.editType;
                    this.itemGet[i].period = this.editPeriod;
                    this.itemGet[i].is_used = this.editUsed;
                }
            }
        }

        // await this.refresh();
    }

    async refreshItem(){
        await this.refresh();
    }

    itemGet: any;
    async refresh(){
        this.$apollo.queries.itemGet.refetch();
    }
}
</script>
