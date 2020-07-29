<template>
    <v-toolbar dense :fixed="fixed" color="accent">
        <v-btn icon @click="toggleDialog">
            <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <account-dialog :item="{type: account}"></account-dialog>
            <customer-dialog v-if="customer"></customer-dialog>
            <supplier-dialog v-if="supplier"></supplier-dialog>
            <direct-entry-supplier-dialog v-if="directEntrySupplier"></direct-entry-supplier-dialog>
            <item-dialog :item="{ type: item }" v-if="item"></item-dialog>
            <v-btn flat @click="saveAsDraft" :disabled="disabled" v-if="saveDraft">Save as draft</v-btn>
            <v-btn flat @click="save" :disabled="disabled" v-if="saveNormal">Save</v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    export default{
        props: {
            title: {
                type: String,
                required: true
            },
            account: {
                required: false
            },
            disabled: {
                type: Boolean,
                required: false,
                default: false
            },
            fixed: {
                type: Boolean,
                required: false,
                default: true
            },
            customer: {
                type: Boolean,
                required: false,
                default: false
            },
            supplier: {
                type: Boolean,
                required: false,
                default: false
            },
            directEntrySupplier: {
                type: Boolean,
                required: false,
                default: false
            },
            item: {
                type: String,
                required: false,
                default: ''
            },
            saveDraft: {
                type: Boolean,
                required: false,
                default: true
            },
            saveNormal: {
                type: Boolean,
                required: false,
                default: false
            },
        },
        methods: {
            toggleDialog () {
                this.$emit('toggleDialog')
            },
            save () {
                this.$emit('save')
            },
            saveAsDraft () {
                this.$emit('saveAsDraft')
            }
        }
    }
</script>