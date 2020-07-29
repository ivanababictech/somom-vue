<template>
    <v-card flat>
        <v-container fluid grid-list-md>
        <v-layout wrap>
            <v-flex xs6 sm4 md3 d-flex>
                <date-picker label="From" v-model="filters.date_from" full-width hide-details clearable></date-picker>
            </v-flex>
            <v-flex xs6 sm4 md3>
                <date-picker label="To" v-model="filters.date_to" full-width hide-details clearable></date-picker>
            </v-flex>
            <v-flex xs6 sm4 md3>
                <v-autocomplete
                        v-if="invoiceType == 'sale'"
                        :items="customers"
                        v-model="filters.customer_id"
                        label="Customer"
                        item-text="name"
                        item-value="id"
                        hide-details
                        clearable
                        dense
                ></v-autocomplete>
                <v-autocomplete
                        v-else
                        :items="suppliers"
                        v-model="filters.supplier_id"
                        label="Supplier"
                        item-text="name"
                        item-value="id"
                        hide-details
                        clearable
                        dense
                ></v-autocomplete>
            </v-flex>
            <v-flex xs6 sm4 md3>
                <v-autocomplete
                        :items="transactionTypes"
                        v-model="filters.type"
                        label="Type"
                        item-text="name"
                        item-value="value"
                        hide-details
                        clearable
                        dense
                ></v-autocomplete>
            </v-flex>
        </v-layout>
        <v-data-table
                :headers="headers"
                :items="contacts.data"
                hide-actions
                item-key="id"
                class="table-reports"
                :disable-initial-sort="true">

            <template slot="items" slot-scope="props">
                <tr @click="selectContact(props)">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.country_code }}</td>
                    <td>{{ formatMoney(props.item.balance ? props.item.balance.balance : 0) }}</td>
                </tr>
            </template>
            <template slot="expand" slot-scope="props">
                <v-data-table v-model="selected" :headers="invoiceHeaders" :items="invoices.data" item-key="id" hide-actions>
                    <template slot="items" slot-scope="props">
                        <tr :active="props.selected" @click="props.selected = !props.selected">
                            <td>{{ props.item.date }}</td>
                            <td>{{ props.item.type_text }}</td>
                            <td>{{ props.item.invoice ? props.item.invoice.no : ''}}</td>
                            <td>{{ props.item.description }}</td>
                            <td class="text-xs-left">{{ formatMoney(props.item.balance.debit) }}</td>
                            <td class="text-xs-left">{{ formatMoney(props.item.balance.credit) }}</td>
                            <td class="text-xs-left">
                                <invoice-payments :invoice="props.item.invoice" v-if="props.item.invoice"
                                                  :total="formatMoney(props.item.balance.payment)" @payment-canceled="getInvoices"
                                ></invoice-payments>
                            </td>
                            <td class="text-xs-left">{{ formatMoney(props.item.balance.balance) }}</td>
                            <td class="text-xs-left">{{ getForeignAmount(props.item) }} {{ props.item.currency }}</td>
                            <td v-if="typeReconciled == 0">
                                <v-checkbox
                                        primary
                                        hide-details
                                        :input-value="props.selected"
                                ></v-checkbox>
                            </td>
                        </tr>
                    </template>
                </v-data-table>

                <div class="text-xs-center" v-if="invoices.last_page > 1">
                    <v-pagination :length="invoices.last_page" v-model="invoiceCurrentPage" :total-visible="7"></v-pagination>
                </div>
            </template>
        </v-data-table>

        <div class="text-xs-center" v-if="contacts.last_page > 1">
            <v-pagination :length="contacts.last_page" v-model="currentPage" :total-visible="7"></v-pagination>
        </div>

        <confirm-reconciling v-if="reconciling.showConfirmation" :reconciling="reconciling" @confirm="reconcileDifference"></confirm-reconciling>
    </v-container>
    </v-card>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import InvoicePayments from './payments'
    import * as invoiceService from '../service'
    import ConfirmReconciling from './confirm-reconciling'
    import * as transactionService from '@/services/transaction'

    export default {
        props: {
            invoiceType: '',
            typeReconciled: '',
        },

        data: () => ({
            contacts: {
                data: []
            },
            invoices: {
                data: []
            },
            selectedContact: {},
            currentPage: 1,
            invoiceCurrentPage: 1,
            filters: {
                date_from: null,
                date_to: null,
            },
            reconciling: {
                typeDifference: false,
                showConfirmation: false,
            },
            types: ['Bank charges', 'Difference on exchange', 'Provision for bad debts', 'Bad debts'],
            selected: [],
            headers: [
                {text: 'Id', align: 'left', value: 'id'},
                {text: 'Name', align: 'left', value: 'name'},
                {text: 'Country', align: 'left', value: 'country_code'},
                {text: 'Balance', align: 'left', value: 'balance'},
            ],
            invoiceHeaders: [
                {text: 'Date', align: 'left', value: 'date'},
                {text: 'Type', align: 'left', value: 'type'},
                {text: 'Invoice number', align: 'left', value: 'invoice_number'},
                {text: 'Description', align: 'left', value: 'description'},
                {text: 'Debit', align: 'left',value: 'debit'},
                {text: 'Credit', align: 'left',value: 'credit'},
                {text: 'Payment', align: 'center', value: 'payments'},
                {text: 'Balance', align: 'left',value: 'balance'},
                {text: 'Foreign amount', align: 'left',value: 'foreign_amount'},
                {text: 'Action', align: 'left',value: 'actiont'},
            ],
        }),

        computed: {
            ...mapGetters({
                accountNameById: 'accounting/accountNameById',
                customers: 'accounting/customers',
                suppliers: 'accounting/suppliers',
                customerById: 'accounting/customerById',
                supplierById: 'accounting/supplierById',
            }),

            selectedTotals() {
                let debit = 0
                let credit = 0
                this.selected.forEach(entry => {
                    debit += entry.debit * entry.exchange_rate
                    credit += entry.credit * entry.exchange_rate
                })
                return {debit, credit}
            },
            reconcileTitle() {
                const {debit, credit} = this.selectedTotals
                let amount = Math.abs(debit - credit)
                amount = this.$helpers.number(amount)
                return `Shall we allocate the difference of €${amount} as a Difference on exchange?`
            },

            transactionTypes() {
                return transactionService.TYPES
            }
        },

        mounted() {
            this.getContacts()
            this.currentPage = 1
            this.invoiceCurrentPage = 1
        },

        methods: {
            ...mapActions(['setMessage']),

            /**
             * Get customers or suppliers
             */
            getContacts() {

                if(this.selectedContact.item) {
                    this.getInvoices()
                } else {
                    this.invoices = {
                        data: []
                    }
                }

                let params = {
                    type: this.invoiceType,
                    filters: this.filters,
                    page: this.currentPage,
                    typeReconciled: this.typeReconciled,
                }
                var contacts = ''

                if(this.invoiceType == 'sale') {
                    contacts = invoiceService.getInvoiceCustomers(params)
                } else if (this.invoiceType == 'purchase') {
                    contacts = invoiceService.getInvoiceSupplliers(params)
                }

                contacts.then(response => this.contacts = response.data)
            },

            getInvoices() {
                var params = {
                    type: this.invoiceType,
                    filters: this.filters,
                    page: this.invoiceCurrentPage,
                    typeReconciled: this.typeReconciled,
                }
                var type = 'customers'

                if(this.invoiceType == 'purchase') {
                    type = 'suppliers'
                }

                invoiceService.getTransactions(type, this.selectedContact.item.id, params)
                    .then(response => this.invoices = response.data)
            },

            selectContact(props) {
                this.invoiceCurrentPage  = 1
                this.selectedContact = props
                this.selectedContact.expanded = !this.selectedContact.expanded

                this.getInvoices();
            },

            confirmReconcileDifference(type) {
                this.reconciling.typeDifference = type
                this.reconciling.showConfirmation = true
                this.reconciling.amount = this.selected.map(item => this.getBalance(item)).reduce((a, b) =>  a + b, 0)
            },

            toggleAll(items) {
                if (this.selected.length) {
                    this.selected = []
                } else {
                    this.selected = items
                }
            },
            changeSort(column) {
                if (this.pagination.sortBy === column) {
                    this.pagination.descending = !this.pagination.descending
                } else {
                    this.pagination.sortBy = column
                    this.pagination.descending = false
                }
            },
            reconcile() {
                if(!this.validatedSelectedItems()) {
                    return false
                }

                invoiceService.reconcile(this.selected, this.invoiceType)
                    .then(response => {
                        this.selected = []
                        this.getInvoices();
                        this.getContacts()
                    })
            },

            isSale(item) {
                return ['sale', 'payment_request', 'quote'].indexOf(item.type) != -1
            },

            isPurchase(item) {
                return ['purchase', 'purchase_order', 'purchase_quote'].indexOf(item.type) != -1
            },


            getForeignAmount(item) {
                return item.base_currency != item.currency ? this.formatMoney(item.foreign_amount) : ''
            },

            reconcileDifference() {
                invoiceService.reconcileDifference(this.reconciling, this.selected)
                    .then(response => {
                        this.getInvoices()
                        this.getContacts()
                        this.selected = []
                    })
            },

            validatedSelectedItems() {
                let errors = false
                let message = ''

                if (!this.selected.filter(item => item.type === 'sale' || item.type === 'purchase').length) {
                    errors = true
                    message = 'You must choose one sale type!'
                }

                if (!this.selected.filter(item => item.type !== 'sale' && item.type !== 'purchase').length) {
                    errors = true
                    message = 'You must choose at least one bank, cash or cheque type!'
                }

                if(errors) {
                    this.setMessage({type: 'warning', message: message})
                }

                return !errors
            },
        },

        watch: {
            typeReconciled: 'getContacts',
            filters: {
                handler: 'getContacts',
                deep: true
            },
            currentPage: 'getContacts',
            invoiceCurrentPage: 'getInvoices',
        },

        components: { InvoicePayments, ConfirmReconciling }
    }
</script>
