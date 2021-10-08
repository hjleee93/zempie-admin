<template>
    <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 100%">
            <q-card>
                <q-tabs
                    v-model="tab"
                    dense
                    class="text-grey"
                    active-color="primary"
                    indicator-color="primary"
                    align="justify"
                    narrow-indicator
                >
                    <q-tab name="info" label="정보" />
                    <q-tab name="channels" label="채널" />
                    <q-tab name="subscribers" label="가입 유저" />
                    <q-tab name="blocks" label="블락 유저" />
                    <q-tab name="kicks" label="강퇴 유저" />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="info">
                    <CommunityInfo :communityId="communityId"></CommunityInfo>
                    </q-tab-panel>
                   
                    <q-tab-panel name="channels" class="table-panel" >
                       <ChannelList :communityId="communityId"></ChannelList>
                    </q-tab-panel>

                    <q-tab-panel name="subscribers" class="table-panel" >
                      <Subscribers :communityId="communityId"></Subscribers>
                    </q-tab-panel>
                    <q-tab-panel name="blocks" class="table-panel" >
                      <BlockMembers :communityId="communityId"></BlockMembers>
                    </q-tab-panel>
                    <q-tab-panel name="kicks" class="table-panel" >
                      <KickMembers :communityId="communityId"></KickMembers>
                    </q-tab-panel>
                </q-tab-panels>
            </q-card>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CommunityInfo from "./CommunityInfo.vue"
import ChannelList from "./channel/ChannelList.vue"
import Subscribers from "./Subscribers.vue"
import BlockMembers from "./_blockMembers.vue"
import KickMembers from "./_kickMembers.vue"

@Component({
    components: {CommunityInfo, ChannelList, Subscribers, BlockMembers, KickMembers},
})
export default class CommunityDetail extends Vue {
    private communityId: string = this.$route.params.community_id; 
    private tab: string = "info";

}
</script>

<style scoped lang="scss">
.table-panel{
padding:0px;
}
</style>
