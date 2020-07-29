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
                <td>{{ getAllocation(props.item) }}</td>
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
    import * as allocationTypeService from '@/app/settings/accounting/allocation-types/service'

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

            getAllocation(item) {
                let {allocation_id, allocation_type} = item
                let allocation = null

                switch (allocation_type) {
                    case allocationTypeService.TYPE_CUSTOMERS_PAYMENT:
                        let customer = this.customers.find(customer => customer.id == allocation_id)

                        if(customer) {
                            allocation = customer.name
                        }
                        break
                    case allocationTypeService.TYPE_SUPPLIERS_PAYMENT:
                        let supplier = this.suppliers.find(supplier => supplier.id == allocation_id)

                        if(supplier) {
                            allocation = supplier.name
                        }
                        break
                    case allocationTypeService.TYPE_DIRECT_ENTRIES:
                        let directEntrySupplier = this.directEntrySuppliers.find(directEntrySupplier => directEntrySupplier.id == allocation_id)

                        if(directEntrySupplier) {
                            allocation = directEntrySupplier.name
                        }
                        break
                    case allocationTypeService.TYPE_INTERNAL_BANK_TRANSFERS:
                        let otherBankAccount = this.bankAccounts.find(otherBankAccount => otherBankAccount.id == allocation_id)

                        if(otherBankAccount) {
                            allocation = otherBankAccount.name
                        }
                        break
                    case allocationTypeService.TYPE_INTERNAL_CASH_TRANSFERS:
                        let cashAccount = this.cashAccounts.find(cashAccount => cashAccount.id == allocation_id)

                        if(cashAccount) {
                            allocation = cashAccount.name
                        }
                        break
                    case allocationTypeService.TYPE_DONATIONS_RECEIVED:
                        let donationAccount = this.donationAccounts.find(donationAccount => donationAccount.id == allocation_id)

                        if(donationAccount) {
                            allocation = donationAccount.name
                        }
                        break
                    case allocationTypeService.TYPE_ACCOUNT_NAMES:
                        let account = this.accounts.find(account => account.id == allocation_id)

                        if(account) {
                            allocation = account.name
                        }
                        break
                    case allocationTypeService.TYPE_CHEQUES_PAYMENT:
                        let chequeEntry = this.chequeEntries.find(chequeEntry => chequeEntry.id == allocation_id)

                        if(chequeEntry) {
                            allocation = chequeEntry.data.cheque_number
                        }
                        break
                    case allocationTypeService.TYPE_CHEQUES_RECEIVED:
                        let cheque = this.chequeEntries.find(cheque => cheque.id == allocation_id)

                        if(cheque) {
                            allocation = cheque.data.cheque_number
                        }
                        break
                }

                if(allocation) {
                    return allocation
                }

                switch (item.type) {
                    case 'credit_note':
                    case 'sale':
                        let customer = this.customers.find(customer => customer.id == allocation_id)

                        if(customer) {
                            allocation = customer.name
                        }
                        break

                    case 'debit_note':
                    case 'purchase':
                        let supplier = this.suppliers.find(supplier => supplier.id == allocation_id)

                        if(supplier) {
                            allocation = supplier.name
                        }
                        break

                }

                return allocation
            }
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