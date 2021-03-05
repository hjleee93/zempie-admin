<template>
    <div>
        <GraphqlTable
            :query="Query.getForbiddenWordTable"
            :columns="columns"
            rowKey="id"
            columnName="forbiddenWords"
            @subEvent="subEvent"
            selection="multiple"
            @selectEvent="selectEvent"
        >
            <PopupForm
                btn-label="금지어 추가하기"
                btn-color="primary"
            >
                <q-input v-model="word" label="Word" class="q-mb-md" />
                <q-btn label="단어 추가" color="positive" @click="addWord" :disable="!wordCheck" />
            </PopupForm>
            <PopupForm
                btn-label="엑셀 파일로 추가하기"
                btn-color="primary"
            >
                <ExcelUploader :schema="schema" @upload="upload" />
            </PopupForm>
            <q-btn label="일괄 삭제" color="red"  class="q-ml-md" @click="deleteWords" />
        </GraphqlTable>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GraphqlTable, {TableBus} from "@/components/GraphqlTable.vue";
import PopupForm, { PopupBus } from '@/components/PopupForm.vue';
import ExcelUploader from "@/components/ExcelUploader.vue";
import Query from '@/util/Query';
import {Dialog, Notify} from "quasar";
import Api from "@/util/Api";

@Component({
    components: {
        GraphqlTable,
        PopupForm,
        ExcelUploader
    },
    apollo: {
    }
})
export default class extends Vue {
    Query = Query;
    columns = [
        { field: "id", name: "id", label: "#", align: "left", sortable: true, sort: () => null },
        { field: "word", name: "word", label: "단어", align: "left", sortable: true, sort: () => null },
        {
            field: "activated", name: "activated", label: "활성화 상태", align: "left", event: true,
            format: (data : any) => data ? '활성화' : '비활성화',
            eventButton: true,
            eventButtonColor: (data : any) => data ? 'positive': 'red'
        },
        { field: "created_at", name: "created_at", label: "생성일", align: "left", sortable: true, sort: () => null },
    ];
    word = '';

    selected: any = [];
    selectEvent( selected: any ) {
        this.selected = selected;
    }

    async subEvent( row: any ) {
        if( row.activated ) {
            const result = await Api.updateForbiddenWord( row.id, false );

            if( result ) {
                this.$q.notify({
                    type: "positive",
                    message: "성공적으로 비활성화되었습니다.",
                    position: "top"
                })

                TableBus.$emit('reload');
            }
        }else{
            const result = await Api.updateForbiddenWord( row.id, true );
            if( result ) {
                this.$q.notify({
                    type: "positive",
                    message: "성공적으로 활성화되었습니다.",
                    position: "top"
                })
                TableBus.$emit('reload');
            }
        }
    }

    get wordCheck() {
        return !!this.word;
    }

    async addWord() {
        if( this.word.trim().length == 0 ) {
            this.$q.notify({
                type: "negative",
                message: "단어를 입력해주세요.",
                position: "top"
            });
            return;
        }

        const result = await Api.addForbiddenWord( this.word );
        if( result ) {
            Notify.create({
                type: "positive",
                message: "금지어가 성공적으로 추가되었습니다.",
                position: "top",
            });
            this.word = '';
            TableBus.$emit('reload');
            PopupBus.$emit('close');
        }
    }

    schema = {
        '단어' : {
            prop: "word",
            type: String
        }
    }

    async upload( data : any ) {
        const { rows } = data;

        for ( let i = 0; i < rows.length; i++ ) {
            await Api.addForbiddenWord( rows[i].word );
        }

        this.$q.notify({
            type: "positive",
            message: "성공적으로 추가되었습니다.",
            position: "top"
        })

        TableBus.$emit('reload');
        TableBus.$emit('selectClear');
        PopupBus.$emit('close');
    }

    async deleteWords() {
        if( this.selected.length == 0 ) {
            this.$q.notify({
                type: "negative",
                message: "선택된 단어가 없습니다.",
                position: "top"
            })
        } else {
            Dialog.create({
                title: '비활성화',
                message: '정말로 삭제하겠습니까?',
                cancel: true,
                persistent: true
            }).onOk(async () => {
                for( let i = 0; i < this.selected.length; i++ ) {
                    await Api.deleteForbiddenWord( this.selected[i].id );
                }
                this.$q.notify({
                    type: "positive",
                    message: "성공적으로 삭제되었습니다.",
                    position: "top"
                })

                TableBus.$emit('reload');
            });
        }
    }
}
</script>
