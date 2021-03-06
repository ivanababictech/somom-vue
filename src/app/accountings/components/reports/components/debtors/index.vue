<template>
    <v-card>
        <v-card-title>
            <h3 class="title">Debtors</h3>
            <export-button @export="exportReporting"></export-button>
        </v-card-title>
        <v-container fluid grid-list-md>
            <v-layout wrap>
                <v-flex xs6 sm4 md3>
                    <v-autocomplete
                            :items="customers"
                            v-model="filters.customer_id"
                            label="Customer"
                            item-text="name"
                            item-value="id"
                            hide-details
                            clearable
                            dense
                    ></v-autocomplete>
                </v-flex>
                <v-flex xs6 sm4 md3>
                    <date-picker label="From" v-model="filters.date_from" full-width hide-details
                                 clearable
                    ></date-picker>
                </v-flex>
                <v-flex xs6 sm4 md3>
                    <date-picker label="To" v-model="filters.date_to" full-width hide-details clearable></date-picker>
                </v-flex>
                <v-flex xs12 sm4 md3>
                    <v-text-field
                            append-icon="search"
                            label="Search"
                            v-model="search"
                            hide-details
                            clearable
                    ></v-text-field>
                </v-flex>
            </v-layout>

        </v-container>

        <v-container fluid grid-list-md>
            <v-tabs color="accent" grow>
                <v-tab v-for="tab in tabs" :key="tab.type" @click="selectType(tab)">
                    {{ tab.name }}
                </v-tab>
                <v-tab-item key="list">
                    <list v-if="type == 'list'" :debtors="debtors" :items="items" @get-reports="getReports" @get-items="getItems"></list>
                </v-tab-item>
                <v-tab-item key="recap-transaction-history">
                    <transaction-history v-if="type == 'transaction-history'" :debtors="debtors" :items="items" @get-reports="getReports" @get-items="getItems"></transaction-history>
                </v-tab-item>
            </v-tabs>

            <div class="text-xs-center" v-if="debtors.last_page > 1">
                <v-pagination :length="debtors.last_page" v-model="currentPage" :total-visible="7"></v-pagination>
            </div>
        </v-container>
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex'
    import * as reportService from '../../service'
    import * as debtorsService from './service'
    import TransactionHistory from "./transaction-history";
    import List from "./list";

    export default {
        data: () => ({
            type: 'list',
            tabs: [
                {
                    name: 'List',
                    type: 'list',
                },
                {
                    name: 'Transaction history',
                    type: 'transaction-history',
                },
            ],
            debtors: {
                data: [],
                totals: {}
            },
            items: {
                data: []
            },
            filters: {},
            search: '',
            currentPage: 1
        }),

        computed: {
            ...mapGetters({
                customers: 'accounting/customers',
            }),
        },

        methods: {
            getReports() {
                const params = {
                    type: this.type,
                    page: this.currentPage,
                    filters: this.filters
                }

                reportService.getReports('debtors', params)
                    .then(response => {
                        this.debtors = response.data
                    })
            },

            getItems(typeId, type, data) {
                debtorsService.getItems(typeId, type, this.getPrams(data))
                    .then(response => {
                        this.items = response.data
                    })
            },

            selectType(tab) {
                if(this.type != tab.type) {
                    this.resetData()
                    this.type = tab.type
                }
            },

            resetData() {
                this.items.data = []
                this.debtors.data = []
                this.debtors.totals = {}
            },

            resetCurrentPage() {
                this.currentPage = 1
            },

            getPrams(data = []) {
                return {
                    page: this.currentPage,
                    filters: this.filters,
                    search: this.search,
                    ...data
                }
            },

            exportReporting(format) {
                const params = {
                    format,
                    type: this.type,
                    page: this.currentPage,
                    filters: this.filters
                }

                debtorsService.exportReport(params)
            }
        },

        watch: {
            filters: {
                handler() {
                    this.resetCurrentPage()
                    this.getReports()
                },
                deep: true
            },
            currentPage() {
                this.getReports()
            },
            search() {
                this.resetCurrentPage()
                this.getReports()
            },
            type() {
                this.resetCurrentPage()
            }
        },

        components: { List, TransactionHistory },
    }
</script>