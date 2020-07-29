<template>
    <v-card class="px-3">
        <v-card-title>
            <h3 class="title">Purchases</h3>
            <export-button @export="exportReporting"></export-button>
        </v-card-title>

        <invoices ref="purchase" type="purchase"></invoices>
    </v-card>
</template>

<script>
    import Invoices from './invoices'

    export default {
        components: { Invoices },

        methods: {
            exportReporting(format) {
                this.$refs.purchase.exportReporting(format)
            }
        }
    }
</script>