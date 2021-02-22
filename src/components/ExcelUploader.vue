<template>
    <div class="full-width">
        <q-file filled bottom-slots v-model="file" label="File" counter max-files="1" :disable="waiting">
            <template v-slot:append>
                <q-icon v-if="file !== null" name="close" @click.stop="file = null" class="cursor-pointer" />
            </template>

            <template v-slot:after>
                <q-btn :disable="file == null || waiting" class="q-pa-sm" color="primary" @click="upload" >
                    <div v-if="!waiting">
                        업로드
                    </div>
                    <q-spinner
                        color="white"
                        size="1em"
                        v-else
                    />
                </q-btn>
            </template>
        </q-file>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
// @ts-ignore
import readXlsxFile from 'read-excel-file';


@Component({})
export default class extends Vue {
    file : File | null = null
    waiting = false;

    @Prop()
    schema : any;

    async upload() {
        if( this.file == null ) {
            return;
        }
        if( this.schema == null ) {
            return;
        }
        this.waiting = true;

        const result = await readXlsxFile( this.file, { schema : this.schema } );
        this.$emit( 'upload', result );
        this.waiting = false;
    }
}
</script>
