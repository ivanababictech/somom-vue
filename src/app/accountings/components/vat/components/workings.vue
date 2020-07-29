<template>
    <v-dialog
            v-model="dialog"
            width="900"
            persistent
    >
        <v-card>
            <v-card-title
                    class="headline grey lighten-4"
                    primary-title
            >
                <v-layout justify-center>
                    Workings for the period from {{ vat.start_date }} to {{ vat.end_date }}
                </v-layout>
            </v-card-title>

            <v-card-text>
                <vat-return :vatReports="vatReports" :items="items" @get-vat-reports="getVatReports" @get-items="getItems"></vat-return>
            </v-card-text>

            <v-card-actions>
                <v-btn color="primary" flat @click.stop="vat.showWorkings = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import * as vatService from '../../reports/components/vat/service'
    import VatReturn from '../../reports/components/vat/vat-return'

    export default {
        data() {
            return {
                dialog: true,
                vatReports: {
                    data: [],
                    totals: {}
                },
                items: {
                    data: []
                },
                filters: {
                    date_from: this.vat.start_date,
                    date_to: this.vat.end_date,
                },
                search: '',
                currentPage: 1
            }
        },

        props: ['vat'],

        mounted() {
            this.getVatReports()
        },

        methods: {
            getVatReports(data = []) {
                vatService.getVatReports('vat-return', this.getPrams(data))
                    .then(response => {
                        this.vatReports = response.data
                    })

            },

            getItems(typeId, type, data) {
                vatService.getItems(typeId, type, this.getPrams(data))
                    .then(response => {
                        this.items = response.data
                    })
            },

            getPrams(data = []) {
                return {
                    page: this.currentPage,
                    filters: this.filters,
                    search: this.search,
                    ...data
                }
            },

            submit() {
                this.$emit('vat', this.vat)
                this.dialog = false
            }
        },

        components: { VatReturn }
    }
</script>