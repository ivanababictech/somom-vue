<template>
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" lazy :overlay="false">
        <v-btn outline color="primary" slot="activator">
            {{ title || 'Issued Invoices' }}
        </v-btn>
        <v-card>
            <v-toolbar dense color="accent">
                <v-btn icon @click.native="dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>{{ title || 'Issued Invoices' }}</v-toolbar-title>
            </v-toolbar>
            <issued-invoices-table
                    v-if="dialog"
                    :type="type"
                   @edit-invoice="editInvoice"
            ></issued-invoices-table>
        </v-card>
    </v-dialog>
</template>

<script>
    import IssuedInvoicesTable from './table'

    export default {
        data() {
            return {
                dialog: false,
            }
        },

        props: ['type', 'title'],

        methods: {
            editInvoice(invoice) {
                this.dialog = false
                this.$emit('edit-invoice', invoice)
            }
        },

        components: { IssuedInvoicesTable }
    }
</script>