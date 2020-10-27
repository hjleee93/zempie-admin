<template>
    <div>
        <!-- <div class="row q-mb-md">
            <div class="col-12">
                <q-option-group
                    v-model="option"
                    :options="options"
                    color="primary"
                    inline
                />
            </div>

            <div class="col-12 row">
                <q-select outlined v-model="option2" :options="options2" label="Outlined" style="width: 300px;" class="q-mr-md" />
                <q-btn color="primary" class="q-mr-sm" label="정지" />
            </div>
        </div>
         -->

        <CheckTable :rows="rows" rowKey="id" :columns="columns" link="/user/list/sub/" @selectEvent="selectItem" >
                <q-btn color="primary" class="q-mr-sm" label="정지" />
                <q-btn color="primary" class="q-mr-sm" label="삭제" />
                <q-btn color="primary" class="q-mr-sm" label="정지 취소" />
        </CheckTable>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CheckTable from "../../components/CheckTable.vue";
import Api from "../../util/Api";

@Component({
    components: {CheckTable},
})
export default class extends Vue {
    selectedItem = null;
    
    rows = []

    columns = [
        { name: '아이디', label:"아이디", field: 'id', sortable: true },
        { name: '닉네임', label: '닉네임', field: 'name', sortable: true },
        // { name: '상태', label: '상태', field: '상태', sortable: true },
        // { name: '젬', label: '젬', field: '젬', sortable: true },
        { name: '생성일', label: "생성일", field: 'created_at', sortable: true },
        { name: '최종 방문일', label: "최종 방문일", field: 'updated_at', sortable: true },
        { name: 'detail', label: "상세 보기"},
    ];

    selectItem(item: any){
        this.selectedItem = item;
    }

    async mounted(){
        if(this.$store.getters.isLogin){
            this.rows = await Api.getUserList();
        }
    }
}
</script>
