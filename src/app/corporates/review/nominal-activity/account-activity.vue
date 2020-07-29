<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="items.data"
                hide-actions
                class="elevation-1">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.type_text }}</td>
                <td>{{ props.item.date | formatDate }}</td>
                <td>{{ props.item.reference }}</td>
                <td>some allocation</td>
                <td>{{ props.item.description }}</td>
                <td>{{ formatMoney(props.item.debit) }}</td>
                <td>{{ formatMoney(props.item.credit) }}</td>
                <td>
                    {{ props.item.currency }}
                    {{ formatMoney(props.item.foreign_credit || props.item.foreign_debit) }}
                </td>
                <td>{{ formatMoney(props.item.exchange_rate, 4) }}</td>
            </template>
        </v-data-table>

        <div class="text-xs-center" v-if="items.last_page > 1">
            <v-pagination :length="items.last_page" v-model="currentPage" :total-visible="7"></v-pagination>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import * as nominalActivityService from './service'

    export default {
        data: () => ({
            headers: [
                {text: 'Type', value: 'type'},
                {text: 'Date', value: 'date'},
                {text: 'Reference', value: 'reference'},
                {text: 'Details', value: 'details'},
                {text: 'Description', value: 'description', width: 250},
                {text: 'Debit', value: 'base_debit'},
                {text: 'Credit', value: 'base_credit'},
                {text: 'Foreign Amount', value: 'amount'},
                {text: 'Exchange rate', value: 'exchange_rate'},
            ],
            currentPage: 1,
            items: [],
        }),

        props: {
            account: Object,
            filters: Object,
        },

        mounted() {
            this.getTransactions()
        },

        computed: {
            ...mapGetters({
                currency: 'accounting/currency',
                customers: 'accounting/customers',
                suppliers: 'accounting/suppliers',
                directEntrySuppliers: 'accounting/directEntrySuppliers',
                accounts: 'accounting/accounts',
                bankAccounts: 'accounting/bankAccounts',
                chequeAccounts: 'accounting/chequeAccounts',
                cashAccounts: 'accounting/cashAccounts',
                donationAccounts: 'accounting/donationAccounts',
            }),
        },

        methods: {
            getTransactions() {
                let params = {
                    page: this.currentPage,
                    filters: this.filters
                }

                nominalActivityService.getTransactions(this.account.id, params)
                    .then(response => {
                        this.items = response.data;
                    })
            },

            resetCurrentPage() {
                this.currentPage = 1
            },
        },

        watch: {
            currentPage: 'getTransactions',
            filters: {
                handler() {
                    this.resetCurrentPage()
                    this.getTransactions()
                },
                deep: true
            },
        }
    }
</script>