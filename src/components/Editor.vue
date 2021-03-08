<template>
    <div class="full-width">
        <q-editor
            v-model="content"
            min-height="10rem"
            ref="editor"
            :toolbar="[['left', 'center', 'right', 'justify'],['bold', 'italic', 'strike', 'underline'],['token'], ['removeFormat', 'undo', 'redo']]"
        >
            <template v-slot:token>
                <q-btn-dropdown dense no-caps ref="token" no-wrap unelevated color="white" text-color="primary" label="Text Color" size="sm">
                    <q-list dense>
                        <q-item tag="label">
                            <q-item-section>
                                <div>
                                    <q-color
                                        v-model="foreColor"
                                        class="my-picker"
                                    />
                                </div>

                                <div>
                                    <q-btn color="positive" label="적용" @click="color('foreColor', foreColor)" class="full-width" />
                                </div>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
            </template>
        </q-editor>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class extends Vue {

    @Prop()text! : string;
    @Watch('text')
    onChangeText() {
        if( !!this.text ) {
            this.content = this.text;
        }
    }

    content = '';
    foreColor = '#000000'
    highlight = '#ffff00aa'

    color ( cmd : string, name : string ) {
        const edit = this.$refs.editor as any;
        (this.$refs.token as any).hide();
        edit.caret.restore()
        edit.runCmd(cmd, name)
        edit.focus()
    }

    @Watch('content')
    onChangeContent() {
        this.$emit( 'text', this.content );
    }
}
</script>
