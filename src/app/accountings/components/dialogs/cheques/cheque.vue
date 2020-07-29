<template>
    <v-card flat>
        <v-card-title>
            <v-layout row>
                <v-flex xs12 sm4 lg8>
                    <reconciliation :reconciliations="[reconciliations]" :account="account"></reconciliation>
                </v-flex>
            </v-layout>
        </v-card-title>

        <v-card-text>
            <p v-if="latestEntry">Current balance as of {{ latestEntry.date | formatDate }} :
                <strong>{{ formatMoney(latestEntry.data.running_balance) }}</strong> {{ account.currency }}
            </p>
            <v-data-table
                    :headers="isChequeReceivedAccount ? headersReceived : headersPaid"
                    :items="entries"
                    no-data-text="Loading"
                    :pagination.sync="pagination"
                    :rows-per-page-items="rowsPerPageItems"
                    class="v-form-table fixed-layout">

                <template slot="items" slot-scope="props">
                    <td class="px-1" v-if="!isChequeReceivedAccount">
                        <v-text-field v-model="props.item.data.cheque_number" class="mt-0" hide-details></v-text-field>
                    </td>
                    <td class="px-1">
                        <v-text-field
                                v-model="props.item.date"
                                mask="##/##/####"
                                placeholder="29/01/1999"
                                hint="For example, 04/11/1989"
                                :return-masked-value="true"
                                class="mt-0"
                                hide-details
                        ></v-text-field>
                    </td>
                    <td class="px-1">
                        <v-textarea auto-grow rows="1" v-model="props.item.description" hide-details
                                    class="mt-0"></v-textarea>
                    </td>
                    <td class="px-1" v-if="isChequeReceivedAccount">
                        <v-text-field v-model="props.item.data.cheque_number" class="mt-0" hide-details></v-text-field>
                    </td>
                    <td class="px-1">
                        <v-autocomplete
                                :items="allocationTypes"
                                v-model="props.item.allocation_type"
                                @input="allocationTypeChange(props.item)"
                                hide-details
                                class="mt-0"
                                dense
                        ></v-autocomplete>
                    </td>
                    <td class="px-1">
                        <v-autocomplete
                                :items="props.item.allocation_type ? allocationsByType(props.item.allocation_type) : []"
                                :disabled="props.item.disabled.allocation_id"
                                :placeholder="allocationPlaceholderByType(props.item.allocation_type)"
                                @change="selectedAllocation(props.item, $event)"
                                return-object
                                class="mt-0"
                                hide-details
                                :combobox="props.item.allocation_type == 'Donations received' || props.item.allocation_type == 'Petty cheque'"
                                dense
                        ></v-autocomplete>
                    </td>
                    <td class="px-1">
                        <v-autocomplete
                                :items="props.item.allocation_type ? accountsByAllocationType(props.item.allocation_type) : []"
                                :disabled="props.item.disabled.account_id"
                                v-model.number="props.item.account_id"
                                @input="accountChange(props.item)"
                                item-text="name"
                                item-value="id"
                                class="mt-0"
                                hide-details
                                dense
                        ></v-autocomplete>
                    </td>
                    <td class="px-1">
                        <v-text-field v-model.number="props.item.amount" hide-details class="mt-0"></v-text-field>
                    </td>
                    <td class="px-1">
                        <invoices-dialog
                                v-if="props.item.allocation && isInvoiceAllocation(props.item)"
                                :currency="account.currency"
                                :item="props.item"
                                v-model="props.item.invoices"
                                :maxAmount="parseFloat(props.item.amount || 0)"
                        ></invoices-dialog>
                        <v-text-field
                                v-else
                                v-model="props.item.invoice_no"
                                :disabled="props.item.disabled.invoice_no"
                                class="mt-0"
                                hide-details>
                        </v-text-field>
                    </td>
                    <td class="px-1">
                        <v-btn v-if="entries.length > 1" icon flat small @click="deleteRow(props.index)">
                            <v-icon color="pink">clear</v-icon>
                        </v-btn>
                        <v-btn v-if="props.index + 1 === entries.length" icon flat small @click="addRow">
                            <v-icon color="teal">add</v-icon>
                        </v-btn>
                    </td>
                </template>

            </v-data-table>

        </v-card-text>

        <v-card-actions>
            <v-btn @click="save" color="primary">Submit</v-btn>
        </v-card-actions>
        <banks :account="chequeAccount"></banks>
    </v-card>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import {fetchChequeEntryTypes} from '@/api/settings'
    import * as allocationTypeService from '@/app/settings/accounting/allocation-types/service'
    import * as chequeService from './service'
    import Reconciliation from '@/components/accounting/reconciliation'
    import * as reconciliationService from '@/components/accounting/reconciliation/service'
    import InvoicesDialog from '../banks/invoices-dialog'
    import * as draftService from './../draftService'
    import Banks from "@/components/dialogs/account/banks"
    import ChequeMixin from '@/mixins/accounting/cheque'

    export default {
        props: ['account'],
        data: () => ({
            entries: [],
            pagination: {
                rowsPerPage: 7,
            },
            rowsPerPageItems: [7, 10, 20, 50],
            headersPaid: [
                {text: 'Cheque number', value: 'data.cheque_number', align: 'left', sortable: false, width: '150'},
                {text: 'Date', value: 'date', align: 'left', sortable: false, width: '160'},
                {text: 'Description', value: 'description', align: 'left', sortable: false, width: '225'},
                {text: 'Allocation type', value: 'allocation_type', align: 'left', sortable: false, width: '150'},
                {text: 'Allocation', value: 'allocation', align: 'left', sortable: false, width: '150'},
                {text: 'Account', value: 'account_id', align: 'left', sortable: false, width: '150'},
                {text: 'Amount', value: 'amount', align: 'left', sortable: false, width: '75'},
                {text: 'Invoice no.', value: 'invoice_no', align: 'left', sortable: false, width: '75'},
            ],
            headersReceived: [
                {text: 'Date', value: 'date', align: 'left', sortable: false, width: '150'},
                {text: 'Description', value: 'description', align: 'left', sortable: false, width: '160'},
                {text: 'Cheque number', value: 'data.cheque_number', align: 'left', sortable: false, width: '225'},
                {text: 'Allocation type', value: 'allocation_type', align: 'left', sortable: false, width: '150'},
                {text: 'Allocation', value: 'allocation', align: 'left', sortable: false, width: '150'},
                {text: 'Account', value: 'account_id', align: 'left', sortable: false, width: '150'},
                {text: 'Amount', value: 'amount', align: 'left', sortable: false, width: '75'},
                {text: 'Invoice no.', value: 'invoice_no', align: 'left', sortable: false, width: '75'},
                {text: 'Actions', value: null, align: 'left', sortable: false, width: '75'},
            ],
            latestEntry: null,
            chequeAccount: {},
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
                currencies: 'settings/currencies',
                vatRates: 'settings/vatRates',
                baseCurrency: 'accounting/currency',
                customers: 'accounting/customers',
                suppliers: 'accounting/suppliers',
                accounts: 'accounting/accounts',
                accountById: 'accounting/accountById',
                bankAccounts: 'accounting/bankAccounts',
                chequeAccounts: 'accounting/chequeAccounts',
                tradeReceivablesAccount: 'accounting/tradeReceivablesAccount',
                tradePayablesAccount: 'accounting/tradePayablesAccount',
                donationsControlAccount: 'accounting/donationsControlAccount',
                donors: 'accounting/donors',
            }),
            balance() {
                const {total_debit, total_credit} = this.account
                return total_credit - total_debit
            },

            isChequeReceivedAccount() {
                return this.account.assigned_account_id === 34
            },
            reconciliations() {
                return this.isChequeReceivedAccount ? reconciliationService.availableType.cheque_received : reconciliationService.availableType.cheque_paid
            }
        },

        methods: {
            setItems() {
                while (this.entries.length < this.pagination.rowsPerPage) {
                    this.entries.push(JSON.parse(JSON.stringify(this.defaultEntry())))
                }
            },
            init() {
                this.chequeAccount = JSON.parse(JSON.stringify(this.account))

                // show bank only for Cheques paid control a/c
                if (this.chequeAccount.assigned_account_id === 20 && !this.chequeAccount.options.bank_id) {
                    this.$set(this.chequeAccount, 'showBanksAccounts', true)
                }

                setTimeout(() => {
                    this.addRows()
                }, 500)
            },

            selectedBank() {
                chequeService.assignBankAccountToCheque(this.chequeAccount, this.chequeAccount.bank_id)
            },

            defaultEntry() {
                return {
                    cheque_account_id: this.account.id,
                    cheque_assigned_account_id: this.account.assigned_account_id,
                    date: null,
                    description: null,
                    invoice_no: null,
                    debit: null,
                    credit: null,
                    amount: null,
                    currency: this.account.currency,
                    exchange_rate: 1,
                    allocation_type: null,
                    allocation: null,
                    allocation_id: null,
                    account_id: null,
                    vat_code: null,
                    disabled: {},
                    data: {
                        cheque_number: null
                    }
                }
            },
            addRow() {
                this.entries.push(this.defaultEntry())
            },
            addRows(no = 10) {
                while (this.entries.length < no) {
                    this.addRow()
                }
            },
            deleteRow(index) {
                this.entries.splice(index, 1)
            },

            getDefaultAccount(allocationType) {
                return this.accountsByAllocationType(allocationType).length ? this.accountsByAllocationType(allocationType)[0].id : null
            },


            accountsByAllocationType(allocation_type) {
                let accounts = []
                switch (allocation_type) {
                    case allocationTypeService.TYPE_DONATIONS_RECEIVED:
                        accounts = this.accounts.filter(({assigned_account_id}) => assigned_account_id === 6)
                        break
                    case allocationTypeService.TYPE_CUSTOMERS_PAYMENT:
                        accounts = this.accounts.filter(({assigned_account_id}) => assigned_account_id === 4)
                        break
                    case allocationTypeService.TYPE_SUPPLIERS_PAYMENT:
                        accounts = this.accounts.filter(({assigned_account_id}) => assigned_account_id === 5)
                        break
                    case allocationTypeService.TYPE_PETTY_CASH:
                        accounts = this.accounts.filter(({assigned_account_id}) => [14, 15, 16].indexOf(assigned_account_id) !== -1)
                        break
                    case allocationTypeService.TYPE_ACCOUNT_NAMES:
                        accounts = this.accounts.filter(({assigned_account_id}) => [7, 8, 9, 10, 11, 17, 18, 22, 23, 24, 25, 26, 27, 28].indexOf(assigned_account_id) !== -1)
                        break
                    case allocationTypeService.TYPE_INTERNAL_CASH_TRANSFERS:
                        accounts = this.chequeAccounts.filter(({id}) => id != this.account.id)
                        break
                    case allocationTypeService.TYPE_INTERNAL_BANK_TRANSFERS:
                        accounts = this.bankAccounts
                        break
                    case allocationTypeService.TYPE_PLEDGES_REVEIVED:
                        accounts = this.accounts.filter(({assigned_account_id}) => [31].indexOf(assigned_account_id) !== -1)
                        break
                    case allocationTypeService.TYPE_WAGES:
                        accounts = this.accounts.filter(({assigned_account_id}) => [32].indexOf(assigned_account_id) !== -1)
                        break
                    case allocationTypeService.TYPE_RELATED_PARTIES:
                        accounts = this.accounts.filter(({assigned_account_id}) => [33].indexOf(assigned_account_id) !== -1)
                        break
                    default:
                        console.warn('Invalid allocation type: ', allocation_type)
                }
                return accounts
            },
            accountChange(entry) {
                if (entry.account_id == this.tradePayablesAccount.id) {
                } else {
                    this.updateEntryVatCode(entry)
                }
            },
            entryVatRates(entry) {
                let vat_rates = this.vatRates.filter(({id}) => id == 7)
                if (entry.allocation_type == 'Petty cheque') {
                    vat_rates = this.vatRates.filter(({id}) => [1, 2, 3, 6, 7].indexOf(id) >= 0)
                    if (entry.account_id) {
                        const {assigned_account_id} = this.accountById(entry.account_id)
                        if (assigned_account_id == 16) { // Property, plant & equipment
                            vat_rates = vat_rates.filter(({id}) => [1, 7].indexOf(id) >= 0)
                        }
                    }
                }
                return vat_rates
            },
            save() {
                const entries = this.entries.reduce((filtered, entry, index) => {
                    if (entry.date && entry.allocation_type && entry.account_id && (entry.debit || entry.credit || entry.amount)) {
                        if (entry.debit === null) {
                            entry.debit = 0
                        }
                        if (entry.credit === null) {
                            entry.credit = 0
                        }
                        if (this.checkCustomerSupplier(entry)) {
                            filtered.push(entry)
                        }
                    }
                    return filtered
                }, [])

                chequeService.create(entries)
                    .then(response => {
                        this.reset()
                    })
            },

            checkCustomerSupplier(entry) {
                if ([
                        allocationTypeService.TYPE_SUPPLIERS_PAYMENT,
                        allocationTypeService.TYPE_CUSTOMERS_PAYMENT,
                    ].indexOf(entry.allocation_type) !== -1) {
                    return entry.allocation_id
                }

                return true
            },

            reset() {
                this.entries.forEach((entry, index) => {
                    this.$set(this.entries, index, this.defaultEntry())
                })
            },

            selectedAllocation(item, allocation) {
                item.allocation = allocation.text
                item.allocation_id = allocation.value
            },

            isInvoiceAllocation(item) {
                return [allocationTypeService.TYPE_CUSTOMERS_PAYMENT, allocationTypeService.TYPE_SUPPLIERS_PAYMENT].indexOf(item.allocation_type) != -1
            }
        },

        mounted() {
            this.init()

            this.$bus.$on('saveAsDraftCheque', () => {
                draftService.createAsDraft(this.entries, 'cheque', this.account.id)
            });
        },

        watch: {
            pagination: {
                handler: 'setItems',
                deep: true
            },
        },
        created() {
            draftService.getDraft('cheque', this.account.id)
                .then((response) => {
                    if (response.data) {
                        this.entries = response.data.data || []
                    }
                })
        },

        components: {Reconciliation, InvoicesDialog, Banks}
    }
</script>
