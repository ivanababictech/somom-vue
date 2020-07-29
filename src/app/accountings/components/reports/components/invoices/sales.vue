<template>
    <v-card class="px-3">
        <v-card-title>
            <h3 class="title">Sales</h3>
            <export-button @export="exportReporting"></export-button>
        </v-card-title>

        <invoices ref="sale" type="sale"></invoices>
    </v-card>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import Invoices from './invoices'

    export default {
        components: { Invoices },

        methods: {
            exportReporting(format) {
                this.$refs.sale.exportReporting(format)
            }
        }
    }
</script>