<template>
    <v-card flat>
        <v-layout row wrap>
            <v-flex xs10>
                <reconciliation :reconciliations="reconciliations" :account="account"></reconciliation>
            </v-flex>
            <v-flex xs2>
                <v-autocomplete
                        label="Currency"
                        :value="account.currency"
                        :items="currencies"
                        :disabled="true"
                        dense
                ></v-autocomplete>
            </v-flex>
        </v-layout>

        <v-card-text>
            <p v-if="latestEntry">Current balance as of {{ latestEntry.transaction.date | formatDate }} :
                <strong>{{ formatMoney(balance) }}</strong> {{ account.currency }}
            </p>

            <v-data-table
                    :headers="headers"
                    :items="entries"
                    :pagination.sync="pagination"
                    :rows-per-page-items="rowsPerPageItems">

                <template slot="items" slot-scope="props">
                    <td class="px-1">
                        <div>
                            <v-text-field
                                    v-model="props.item.date"
                                    mask="##/##/####"
                                    placeholder="29/01/1999"
                                    hint="For example, 04/11/1989"
                                    :return-masked-value="true"
                                    hide-details
                                    class="mt-0"
                            ></v-text-field>
                        </div>
                    </td>
                    <td class="px-1">
                        <div>
                            <v-text-field
                                    auto-grow
                                    rows="1"
                                    v-model="props.item.description"
                                    hide-details
                                    class="mt-0">
                            </v-text-field>
                        </div>
                    </td>
                    <td class="px-1">
                        <v-autocomplete
                                :items="allocationTypes"
                                v-model="props.item.allocation_type"
                                @input="allocationTypeChange(props.item)"
                                hide-details
                                dense
                                class="mt-0"
                        ></v-autocomplete>
                    </td>
                    <td class="px-1">
                        <v-combobox
                                :items="props.item.allocation_type ? allocationsByType(props.item.allocation_type) : []"
                                :disabled="props.item.disabled.allocation"
                                :placeholder="allocationPlaceholderByType(props.item.allocation_type)"
                                @change="selectedAllocation(props.item, $event)"
                                return-object
                                hide-details
                                dense
                                class="mt-0"
                        ></v-combobox>
                    </td>
                    <td class="px-1">
                        <v-autocomplete
                                :items="props.item.allocation_type ? accountsByAllocationType(props.item.allocation_type) : []"
                                @input="accountChange(props.item, $event)"
                                :disabled="props.item.disabled.account_id"
                                v-model.number="props.item.account_id"
                                return-object
                                item-text="name"
                                item-value="id"
                                hide-details
                                dense
                                class="mt-0"
                        ></v-autocomplete>
                    </td>
                    <td class="px-1">
                        <v-autocomplete
                                :items="props.item.allocation_type ? entryVatRates(props.item) : []"
                                v-model.number="props.item.vat_rate_id"
                                @input="vatRateChange(props.item)"
                                item-text="name"
                                item-value="id"
                                hide-details
                                dense
                                class="mt-0"
                        ></v-autocomplete>
                    </td>
                    <td class="px-1">
                        <v-text-field
                                v-model.number="props.item.debit"
                                @blur="if(props.item.debit) props.item.credit = null"
                                :disabled="props.item.disabled.debit"
                                hide-details
                                class="mt-0">
                        </v-text-field>
                    </td>
                    <td class="px-1">
                        <v-text-field
                                v-model.number="props.item.credit"
                                @blur="if(props.item.credit) props.item.debit = null"
                                :disabled="props.item.disabled.credit"
                                hide-details
                                class="mt-0">
                        </v-text-field>
                    </td>
                    <td class="px-1">
                        <invoices-dialog
                                v-if="props.item.allocation && isInvoiceAllocation(props.item)"
                                :currency="account.currency"
                                :item="props.item"
                                v-model="props.item.invoices"
                                :maxAmount="parseFloat(props.item.credit || props.item.debit)"
                        ></invoices-dialog>
                        <v-text-field
                                v-else
                                v-model="props.item.invoice_no"
                                :disabled="props.item.disabled.invoice_no"
                                hide-details
                                class="mt-0">
                        </v-text-field>
                    </td>
                    <td class="text-xs-center px-1">
                        {{ formatMoney(runningBalance(props.index, props.item)) }}
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

                <template slot="footer">
                    <td colspan="9"><strong>Ending balance</strong></td>
                    <td class="text-xs-center"><strong>{{ formatMoney(runningBalance(entries.length - 1)) }}</strong>
                    </td>
                </template>

            </v-data-table>

        </v-card-text>

        <v-card-actions>
            <v-btn @click="save" color="primary">Submit</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import {$axios} from '@/api'
    import {fetchLatestCashEntry, saveAccount, updateAccountOptions} from '@/api/accounting'
    import _ from 'lodash'
    import {mapGetters, mapMutations} from 'vuex'
    import InvoicesDialog from '../banks/invoices-dialog'
    import {fetchCashEntryTypes} from '@/api/settings'
    import * as allocationTypeService from '@/app/settings/accounting/allocation-types/service'
    import * as cashService from './service'
    import Reconciliation from '@/components/accounting/reconciliation'
    import * as reconciliationService from '@/components/accounting/reconciliation/service'
    import * as draftService from './../draftService'
    import CashMixin from '@/mixins/accounting/cash'

    export default {
        props: ['account'],
        data: () => ({
            entries: [],
            headers: [
                {text: 'Date', value: 'date', align: 'left', sortable: false, width: '225'},
                {text: 'Description', value: 'description', align: 'left', sortable: false, width: '225'},
                {
                    text: 'Allocation type',
                    value: 'allocation_type',
                    align: 'left',
                    sortable: false,
                    width: '150'
                },
                {text: 'Allocation', value: 'allocation', align: 'left', sortable: false, width: '150'},
                {text: 'Account', value: 'account_id', align: 'left', sortable: false, width: '150'},
                {text: 'Vat rate', value: 'vat_rate', align: 'left', sortable: false, width: '150'},
                {text: 'Amount paid', value: 'debit', align: 'left', sortable: false, width: '50'},
                {text: 'Amount received', value: 'credit', align: 'left', sortable: false, width: '50'},
                {text: 'Invoice no.', value: 'invoice_no', align: 'left', sortable: false, width: '75'},
                {text: 'Running balance', value: null, align: 'left', sortable: false, width: '75'},
                {text: 'Actions', value: null, align: 'left', sortable: false, width: '75'},
            ],
            reconciliations: [
                reconciliationService.availableType.bank,
                reconciliationService.availableType.cash,
            ],
            latestEntry: null,
            pagination: {
                rowsPerPage: 7,
            },
            rowsPerPageItems: [7, 10, 20, 50],
        }),

        mixins: [CashMixin],

        asyncComputed: {
            allocationTypes: {
                default: [],
                get: () => fetchCashEntryTypes(),
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
                cashAccounts: 'accounting/cashAccounts',
                tradeReceivablesAccount: 'accounting/tradeReceivablesAccount',
                tradePayablesAccount: 'accounting/tradePayablesAccount',
                donationsControlAccount: 'accounting/donationsControlAccount',
                donors: 'accounting/donors',
                vatRateById: 'settings/vatRateById'
            }),

            balance() {
                if (!this.latestEntry) {
                    return 0
                }
                return this.latestEntry.account.balance.debit - this.latestEntry.account.balance.credit
            },

            otherCashAccounts() {
                return this.cashAccounts.filter(({id}) => this.account.id != id)
            },
        },

        methods: {
            async fetchLatestEntry() {
                this.latestEntry = await fetchLatestCashEntry(this.account.id)
            },
            init() {
                this.fetchLatestEntry()
                setTimeout(() => {
                    this.addRows()
                }, 500)
            },
            defaultEntry() {
                return {
                    cash_account_id: this.account.id,
                    account_balance_id: null,
                    date: null,
                    description: null,
                    invoice_no: null,
                    debit: null,
                    credit: null,
                    currency: this.account.currency,
                    exchange_rate: 1,
                    allocation_type: null,
                    allocation: null,
                    allocation_id: null,
                    vat_code: null,
                    disabled: {},
                    data: {
                        running_balance: 0
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

            allocationTypeChange(entry) {
                // reset allocation
                entry.allocation = null
                switch (entry.allocation_type) {
                    case allocationTypeService.TYPE_DONATIONS_RECEIVED:
                        // set defaults
                        entry.invoice_no = null
                        entry.account_id = this.donationsControlAccount ? this.donationsControlAccount.id : null
                        entry.vat_rate_id = 7
                        entry.vat_code = 34
                        entry.debit = null
                        entry.disabled = {invoice_no: true, debit: true}
                        break
                    case allocationTypeService.TYPE_CUSTOMERS_PAYMENT:
                        entry.account_id = this.tradeReceivablesAccount ? this.tradeReceivablesAccount.id : null
                        entry.vat_rate_id = 7
                        entry.vat_code = 34
                        entry.debit = null
                        entry.disabled = {account_id: true}
                        break
                    case allocationTypeService.TYPE_SUPPLIERS_PAYMENT:
                        entry.account_id = this.tradePayablesAccount ? this.tradePayablesAccount.id : null
                        entry.vat_rate_id = 7
                        entry.vat_code = 34
                        entry.credit = null
                        entry.disabled = {account_id: true}
                        break
                    case allocationTypeService.TYPE_PETTY_CASH:
                        entry.account_id = null
                        entry.vat_rate_id = 1
                        entry.vat_code = null
                        entry.credit = null
                        entry.disabled = {}
                        break
                    case allocationTypeService.TYPE_INTERNAL_CASH_TRANSFERS:
                        entry.account_id = null
                        entry.vat_rate_id = 7
                        entry.vat_code = 34
                        entry.disabled = {allocation: true, invoice_no: true}
                        break
                    case allocationTypeService.TYPE_INTERNAL_BANK_TRANSFERS:
                        entry.account_id = null
                        entry.vat_rate_id = 7
                        entry.vat_code = 34
                        entry.disabled = {allocation: true, invoice_no: true}
                        break
                    case allocationTypeService.TYPE_ACCOUNT_NAMES:
                        entry.account_id = null
                        entry.vat_rate_id = 7
                        entry.vat_code = 34
                        entry.disabled = {allocation: true, invoice_no: true}
                        break
                    case allocationTypeService.TYPE_PLEDGES_REVEIVED:
                        entry.account_id = this.getDefaultAccount(entry.allocation_type)
                        entry.vat_rate_id = 7
                        entry.vat_code = 34
                        entry.disabled = {allocation: true, invoice_no: true}
                        break
                    case allocationTypeService.TYPE_WAGES:
                        entry.account_id = this.getDefaultAccount(entry.allocation_type)
                        entry.vat_rate_id = 7
                        entry.vat_code = 34
                        entry.disabled = {allocation: true, invoice_no: true}
                        break
                    case allocationTypeService.TYPE_RELATED_PARTIES:
                        entry.account_id = this.getDefaultAccount(entry.allocation_type)
                        entry.vat_rate_id = 7
                        entry.vat_code = 34
                        entry.disabled = {allocation: true, invoice_no: true}
                        break
                    default:
                        console.warn('Invalid allocation type: ', entry.allocation_type)
                        entry.disabled = {}
                }
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
                        accounts = this.cashAccounts.filter(({id}) => id != this.account.id)
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
            accountChange(entry, account) {
                if ([allocationTypeService.TYPE_CUSTOMERS_PAYMENT, allocationTypeService.TYPE_SUPPLIERS_PAYMENT].indexOf(entry.allocation_type) === -1) {
                    if (entry.allocation_type !== allocationTypeService.TYPE_PETTY_CASH) {
                        entry.allocation = account.name
                    }
                    entry.allocation_id = account.id
                    entry.account_id = account.id
                }

                if (this.tradePayablesAccount && entry.account_id == this.tradePayablesAccount.id) {
                    entry.vat_rate_id = 7
                    entry.vat_code = '34'
                } else {
                    this.updateEntryVatCode(entry)
                }
            },
            entryVatRates(entry) {
                let vat_rates = this.vatRates.filter(({id}) => id == 7)
                if (entry.allocation_type == 'Petty cash') {
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
            vatRateChange(entry) {
                this.updateEntryVatCode(entry)
            },
            updateEntryVatCode(entry) {
                if (entry.allocation_type === allocationTypeService.TYPE_PETTY_CASH) {
                    const {account_id, vat_rate_id} = entry
                    const {assigned_account_id} = this.accountById(account_id)
                    let vat_code = '11' // default non EU
                    let vat_rate = 0

                    switch (assigned_account_id) {
                        case 13: // Direct cost
                            switch (vat_rate_id) {
                                case 1: // Normal @ 18%
                                    vat_code = '27'
                                    break
                                case 3: // Reduced @ 5%
                                    vat_code = '28'
                                    break
                                case 4: // Exempt with credit
                                    vat_code = '29'
                                    break
                                default:
                                    console.warn('Vat rate id (%s) not matching any of the expected values.', vat_rate_id)
                            }
                            break

                        case 16: // Property, plant and equipment
                            vat_code = '30'
                            break

                        case 14: // 14 selling & distribution,
                        case 15: // 15 admin expenses
                            switch (vat_rate_id) {
                                case 1: // Normal @ 18%
                                    vat_code = '31'
                                    break
                                case 2: // Reduced @ 7%
                                    vat_code = '31A'
                                    break
                                case 3: // Reduced @ 5%
                                    vat_code = '32'
                                    break
                                case 6: // Blocked vat
                                    vat_code = '33'
                                    break
                                case 7: // No vat
                                    vat_code = '34'
                                    break
                                default:
                                    console.warn('Vat rate id (%s) not matching any of the expected values.', vat_rate_id)
                            }
                            break
                    }
                    vat_rate = this.vatRateById(entry.vat_rate_id).vat

                    entry.vat_rate = vat_rate
                    entry.vat_code = vat_code
                }
            },
            runningBalance(index, item) {
                let balance = this.balance
                let count = 0
                while (count <= index) {
                    let entry = this.entries[count]
                    balance -= this.formatToInteger(entry.debit)
                    balance += this.formatToInteger(entry.credit)
                    count++
                }

                return balance
            },
            save() {
                const entries = this.entries.reduce((filtered, entry, index) => {
                    if (entry.date && entry.allocation_type && entry.account_id && entry.vat_rate_id && (entry.debit || entry.credit)) {
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

                cashService.create(entries)
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
                if (typeof allocation === 'object') {
                    item.allocation = allocation.text
                    item.allocation_id = allocation.value
                    item.data.check_number = allocation.check_number
                } else {
                    item.allocation = allocation
                }
            },

            isInvoiceAllocation(item) {
                return [allocationTypeService.TYPE_CUSTOMERS_PAYMENT, allocationTypeService.TYPE_SUPPLIERS_PAYMENT].indexOf(item.allocation_type) != -1
            },
            setItems() {
                while (this.entries.length < this.pagination.rowsPerPage) {
                    this.entries.push(JSON.parse(JSON.stringify(this.defaultEntry())))
                }
            },
        },

        mounted() {
            this.init()
            this.$bus.$on('saveAsDraftCash', () => {
                draftService.createAsDraft(this.entries, 'cash', this.account.id)
            });
        },

        created() {
            draftService.getDraft('cash', this.account.id)
                .then((response) => {
                    if (response.data) {
                        this.entries = response.data.data || []
                    }
                })
        },
        watch: {
            pagination: {
                handler: 'setItems',
                deep: true
            },
        },
        components: {Reconciliation, InvoicesDialog}
    }
</script>
