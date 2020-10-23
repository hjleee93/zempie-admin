<template>
    <div>
        <CheckTable :rows="rows" rowKey="아이디" :columns="columns" link="/user/list/sub/" @selectEvent="selectItem" >
                
        </CheckTable>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CheckTable from "../../components/CheckTable.vue";

@Component({
    components: {CheckTable},
})
export default class extends Vue {
    selectedItem = null;
    rows = [
        {
            "아이디" : "Admin Master",
            "닉네임" : "Admin",
            "상태" : "정상",
            "젬" : 0,
            "생성일" : "2020.10.24 11:03:49",
            "최종 방문일" : "2020.10.24 11:03:50",
        },
        {
            "아이디" : "Admin Master2",
            "닉네임" : "Admin123",
            "상태" : "정상",
            "젬" : 12231,
            "생성일" : "2020.10.24 11:03:49",
            "최종 방문일" : "2020.10.24 11:03:50",
        }
    ]

    columns = [
        { name: '아이디', label:"아이디", field: '아이디', sortable: true },
        { name: '닉네임', label: '닉네임', field: '닉네임', sortable: true },
        { name: '상태', label: '상태', field: '상태', sortable: true },
        { name: '젬', label: '젬', field: '젬', sortable: true },
        { name: '생성일', label: "생성일", field: '생성일', sortable: true },
        { name: '최종 방문일', label: "최종 방문일", field: '최종 방문일', sortable: true },
        { name: 'detail', label: "상세 보기"}
    ];

    selectItem(item: any){
        this.selectedItem = item;
    }
}
</script>
