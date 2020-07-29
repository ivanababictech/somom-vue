<template>
    <v-card class="px-3">
        <v-card-title>
            <h3 class="title">Cheque</h3>
            <export-button @export="exportReporting"></export-button>
        </v-card-title>

        <v-container fluid grid-list-md>
            <v-layout wrap>
                <v-flex xs12 sm4 md3>
                    <v-autocomplete
                            :items="allocationTypes"
                            v-model="filters.allocation_type"
                            label="Allocation type"
                            hide-details
                            clearable
                            dense
                    ></v-autocomplete>
                </v-flex>

                <v-flex xs12 sm4 md3 mx-3>
                    <v-autocomplete
                            :items="filters.allocation_type ? allocationsByType(filters.allocation_type) : []"
                            v-model="filters.allocation_id"
                            :placeholder="allocationPlaceholderByType(filters.allocation_type)"
                            hide-details
                            clearable
                            dense
                    ></v-autocomplete>
                </v-flex>

                <v-flex xs12 sm4 md3 v-if="type != 'cheque_received'">
                    <v-autocomplete
                            :items="chequeAccounts"
                            v-model="filters.cheque_account"
                            label="Cheque account"
                            item-text="name"
                            item-value="id"
                            hide-details
                            clearable
                            dense
                    ></v-autocomplete>
                </v-flex>

            </v-layout>

            <v-layout wrap>
                <v-flex xs6 sm4 md3>
                    <date-picker label="From" v-model="filters.dates.from" full-width hide-details
                                 clearable></date-picker>
                </v-flex>
                <v-flex xs6 sm4 md3 mx-3>
                    <date-picker label="To" v-model="filters.dates.to" full-width hide-details clearable></date-picker>
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
                <v-tab-item :key="tab.type" v-for="tab in tabs">
                    <v-data-table
                            :headers="headers"
                            :items="cheques.data"
                            hide-actions
                            item-key="id"
                            class="table-reports mt-3">

                        <template slot="items" slot-scope="props">
                            <tr @click="props.expanded = !props.expanded">
                                <td>{{ props.item.date | formatDate }}</td>
                                <td>{{ props.item.invoice_no }}</td>
                                <td>{{ props.item.allocation }}</td>
                                <td>{{ props.item.account.name }}</td>
                                <td>{{ props.item.account.name }}</td>
                                <td>{{ props.item.description }}</td>
                                <td>{{ formatMoney(props.item.amount) }}</td>
                            </tr>
                        </template>

                        <template slot="footer">
                            <td><strong>Total</strong></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><strong>{{ formatMoney(cheques.totals.amount) }}</strong></td>
                        </template>
                    </v-data-table>
                </v-tab-item>
            </v-tabs>

            <div class="text-xs-center" v-if="cheques.last_page > 1">
                <v-pagination :length="cheques.last_page" v-model="currentPage" :total-visible="7"></v-pagination>
            </div>
        </v-container>
    </v-card>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import * as reportService from '../service'
    import {fetchChequeEntryTypes} from '@/api/settings'
    import ChequeMixin from '@/mixins/accounting/cheque'

    export default {
        data: () => ({
            tabs: [
                {
                    type: 'cheque_paid',
                    name: 'Cheque paid'
                },
                {
                    type: 'cheque_received',
                    name: 'Cheque received'
                }
            ],
            type: 'cheque_paid',
            headers: [
                {text: 'Date', value: 'date'},
                {text: 'Cheque no', value: 'cheque_no'},
                {text: 'Supplier', value: 'supplier.name'},
                {text: 'Account', value: 'account.name'},
                {text: 'Cheque account', value: 'cheque_account.name'},
                {text: 'Description', value: 'description'},
                {text: 'Amount', value: 'amount'},
            ],
            search: '',
            filters: {
                dates: {}
            },
            currentPage: 1,
            cheques: {
                data: [],
                totals: {}
            }
        }),

        mixins: [ChequeMixin],

        asyncComputed: {
            allocationTypes: {
                default: [],
                get: () => fetchChequeEntryTypes(),
            },
        },

        computed: {
            ...mapGetters({
                suppliers: 'accounting/suppliers',
                customers: 'accounting/customers',
                accounts: 'accounting/accounts',
                accountById: 'accounting/accountById',
                bankAccounts: 'accounting/bankAccounts',
                chequeAccounts: 'accounting/chequeAccounts',
                tradeReceivablesAccount: 'accounting/tradeReceivablesAccount',
                tradePayablesAccount: 'accounting/tradePayablesAccount',
                donationsControlAccount: 'accounting/donationsControlAccount',
                donors: 'accounting/donors',
            }),
        },

        mounted() {
            this.getCheques()
        },

        methods: {
            ...mapActions(['setFetching']),


            selectType(tab) {
                this.resetData()
                this.type = tab.type
            },

            getCheques() {
                const params = {
                    type: this.type,
                    page: this.currentPage,
                    filters: this.filters
                }

                reportService.getReports('cheques', params)
                    .then(response => {
                        this.cheques = response.data
                    })
            },

            resetData() {
                this.cheques.data = []
                this.cheques.totals = {}
            },

            resetCurrentPage() {
                this.currentPage = 1
            },

            exportReporting(format) {
                const params = {
                    format,
                    type: this.type,
                    page: this.currentPage,
                    filters: this.filters
                }

                reportService.exportReport('cheques', params)
            }
        },

        watch: {
            currentPage: 'getCheques',
            type: 'getCheques',
            filters: {
                handler() {
                    this.resetCurrentPage()
                    this.getCheques()
                },
                deep: true
            },
        }
    }
</script>