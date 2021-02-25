<template>
    <div>
        <div v-if="$store.state.level >= 3" class="q-ml-md">
            <q-btn :color="btnColor" :label="btnLabel" @click="openPopup" />
        </div>

        <q-dialog v-model="popupOpened" persistent>
            <q-card class="my-card dialog-size">
                <q-card-section>
                    <slot></slot>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn v-close-popup color="red" label="닫기" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

export const PopupBus = new Vue();

@Component
export default class extends Vue {
    @Prop()
    btnLabel!: string;

    @Prop()
    btnColor!: string;

    popupOpened = false;

    openPopup(){
        this.$emit( 'open' );
        this.popupOpened = true;
    }

    created() {
        PopupBus.$on("close", () => {
            this.popupOpened = false;
        });
    }
}
</script>

<style lang="scss" scoped>
.dialog-size{
    max-width: 1200px;
    width: 800px;
}
</style>