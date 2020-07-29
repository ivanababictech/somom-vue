<template>
    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" lazy :overlay="false">
        <v-btn outline color="primary" slot="activator">
            {{ title || 'Received Invoices' }}
        </v-btn>
        <v-card>
            <v-toolbar dense color="accent">
                <v-btn icon @click.native="dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Received Invoices</v-toolbar-title>
            </v-toolbar>
            <received-invoices-table v-if="dialog" :type="type"></received-invoices-table>
        </v-card>
    </v-dialog>
</template>

<script>
    import ReceivedInvoicesTable from './table'

    export default {
        data: () => ({
            dialog: false
        }),
        props: ['type', 'title'],
        mounted() {
            this.$bus.$on('editInvoice', () => {
                this.dialog = false
            })
        },
        components: {ReceivedInvoicesTable}
    }
</script>