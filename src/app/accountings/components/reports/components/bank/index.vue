<template>
    <v-card class="px-3">
        <v-card-title>
            <h3 class="title">Bank</h3>
            <export-button @export="exportReporting"></export-button>
        </v-card-title>

        <v-layout wrap>
            <v-flex xs12 md2 lg1 class="bottom-align-content">
                <span>Filter by</span>
            </v-flex>

            <v-flex xs12 sm4 md3>
                <v-autocomplete
                        :items="allocationTypes"
                        v-model="filters.allocation_type"
                        label="Allocation type"
                        @change="filters.allocation = null"
                        hide-details
                        clearable
                        dense
                ></v-autocomplete>
            </v-flex>

            <v-flex xs12 sm4 md3 mx-3>
                <v-autocomplete
                        :items="allocationsByType(filters.allocation_type)"
                        v-model="filters.allocation_id"
                        :placeholder="allocationPlaceholderByType(filters.allocation_type)"
                        item-text="text"
                        item-value="value"
                        hide-details
                        clearable
                        dense
                ></v-autocomplete>
            </v-flex>

            <v-flex xs12 sm4 md3>
                <v-autocomplete
                        :items="bankAccounts"
                        v-model="filters.account_id"
                        label="Bank account"
                        item-text="name"
                        item-value="id"
                        hide-details
                        clearable
                        dense
                ></v-autocomplete>
            </v-flex>

        </v-layout>

        <v-layout wrap>
            <v-flex xs12 md2 lg1 class="bottom-align-content">
                <span class="mr-2">Date Range</span>
            </v-flex>

            <v-flex xs6 sm4 md3>
                <date-picker label="From" v-model="filters.date_from" full-width hide-details
                             clearable></date-picker>
            </v-flex>
            <v-flex xs6 sm4 md3 mx-3>
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


        <v-data-table
                :headers="headers"
                :items="reports.data"
                hide-actions
                item-key="id"
                class="table-reports mt-3">

            <template slot="items" slot-scope="props">
                <tr>
                    <td>{{ props.item.transaction.date | formatDate }}</td>
                    <td>{{ props.item.account.name }}</td>
                    <td>{{ props.item.transaction.allocation_type }}</td>
                    <td>{{ getAllocation(props.item.transaction) }}</td>
                    <td>{{ props.item.transaction.description }}</td>
                    <td>{{ formatMoney(props.item.debit) }}</td>
                    <td>{{ formatMoney(props.item.credit) }}</td>
                    <td>
                        {{ props.item.transaction.currency }}
                        {{ formatMoney(props.item.foreign_credit || props.item.foreign_debit) }}
                    </td>
                </tr>
            </template>

            <template slot="no-data">
                <v-alert :value="true" color="grey lighten-4">
                    <p class="grey--text">No data</p>
                </v-alert>
            </template>

            <template slot="footer">
                <td><strong>Total</strong></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><strong>{{ formatMoney(reports.totals.debit) }}</strong></td>
                <td><strong>{{ formatMoney(reports.totals.credit) }}</strong></td>
                <td></td>
            </template>

        </v-data-table>

        <div class="text-xs-center" v-if="reports.last_page > 1">
            <v-pagination :length="reports.last_page" v-model="currentPage" :total-visible="7"></v-pagination>
        </div>
    </v-card>
</template>

<script>
    import _ from 'lodash'
    import {mapGetters} from 'vuex'
    import {fetchBankAllocationTypes} from '@/api/settings'
    import * as reportService from '../../service'
    import BankMixin from '@/mixins/accounting/bank'

    export default {
        data: () => ({
            headers: [
                {text: 'Date', value: 'date'},
                {text: 'Bank account', value: 'bank_account.name'},
                {text: 'Allocation type', value: 'allocation_type'},
                {text: 'Allocation', value: 'allocation'},
                {text: 'Description', value: 'description'},
                {text: 'Debit', value: 'debit'},
                {text: 'Credit', value: 'credit'},
                {text: 'Base amount', value: null},
            ],
            search: '',
            filters: {
                dates: {}
            },
            currentPage: 1,
            reports: {
                data: [],
                totals: {}
            },
            type: 'banks'
        }),

        mixins: [BankMixin],

        computed: {
            ...mapGetters({
                customers: 'accounting/customers',
                customerById: 'accounting/customerById',
                suppliers: 'accounting/suppliers',
                supplierById: 'accounting/supplierById',
                directEntrySuppliers: 'accounting/directEntrySuppliers',
                directEntrySupplierById: 'accounting/directEntrySupplierById',
                accounts: 'accounting/accounts',
                accountById: 'accounting/accountById',
                bankAccounts: 'accounting/bankAccounts',
                chequeAccounts: 'accounting/chequeAccounts',
                cashAccounts: 'accounting/cashAccounts',
                donationAccounts: 'accounting/donationAccounts',
            }),

            otherBankAccounts() {
                return this.bankAccounts
            },
        },

        asyncComputed: {
            allocationTypes: {
                default: [],
                get: () => fetchBankAllocationTypes(),
            },
        },

        mounted() {
            this.getReports()
        },

        methods: {
            getReports() {
                const params = {
                    type: this.type,
                    page: this.currentPage,
                    filters: this.filters
                }

                reportService.getReports(this.type, params)
                    .then(response => {
                        this.reports = response.data
                    })
            },

            getAllocation({allocation_type, allocation_id}) {
                let allocation = this.allocationsByType(allocation_type)
                allocation = allocation.find(item => item.value === allocation_id)

                if(allocation) {
                    return allocation.text
                }
                return ''
            },

            resetCurrentPage() {
                this.currentPage = 1
            },

            exportReporting(format) {
                const params = {
                    format,
                    page: this.currentPage,
                    filters: this.filters
                }

                reportService.exportReport(this.type, params)
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
        },
    }
</script>