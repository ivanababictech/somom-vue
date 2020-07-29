<template>
    <v-dialog v-model="dialog.visible" absolute width="600">
        <v-card>
            <v-card-title class="headline">{{ dialog.type }} a {{ type }}</v-card-title>
            <v-card-text>
                <slot name="form"></slot>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions class="grey lighten-4">
                <v-spacer></v-spacer>
                <v-btn color="primary" outline @click="closeDialog">Cancel</v-btn>
                <v-btn
                        color="primary"
                        :dark="!invalid"
                        :disabled="invalid"
                        @click.native="isUpdate ? update() : add()">
                    {{ isUpdate ? 'Update' : 'Add' }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default{
        props: {
            dialog: {
                type: Object,
                required: true
            },
            invalid: {
                type: Boolean,
                required: true
            },
            isUpdate: {
                type: Boolean,
                required: true
            },
            type: {
                type: String,
                required: true
            }
        },
        methods: {
            add () {
                this.$emit('add')
            },
            update () {
                this.$emit('update')
            },
            closeDialog () {
                this.$emit('closeDialog')
            }
        }
    }
</script>