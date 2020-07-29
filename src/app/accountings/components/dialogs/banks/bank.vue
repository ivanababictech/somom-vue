<template>
    <v-card flat>
        <rules
                v-if="ruleDialog"
                @close="ruleDialog = false"
                @updated-rules="getAllRules"
                :rules="rules">
        </rules>
        <v-layout row wrap>
            <v-flex xs12 sm8>
                <v-layout>
                    <reconciliation :reconciliations="reconciliations" :account="account"></reconciliation>
                    <v-btn color="primary" @click="ruleDialog = true">RULES</v-btn>
                    <div>
                        <upload-btn
                                title="UPLOAD BANK STATEMENT"
                                :fileChangedCallback="uploadFile"
                                color="primary"
                                class="white--text custom-upload-button">
                        </upload-btn>
                    </div>
                    <bank-requests :accountId="account.id"></bank-requests>
                </v-layout>
            </v-flex>
            <v-flex xs6 sm3 lg2>
                <v-autocomplete
                        :label="'Link' + (account.options.cheque_account_id ? 'ed' : '') + ' cheque account'"
                        :value="account.options.cheque_account_id"
                        :items="availableChequeAccounts"
                        @input="chequeChange"
                        item-text="name"
                        item-value="id"
                        :disabled="true"
                        dense
                ></v-autocomplete>
            </v-flex>
            <v-flex xs6 sm3 lg2>
                <v-autocomplete
                        label="Currency"
                        :value="account.currency"
                        :items="currencies"
                        @input="currencyChange"
                        :disabled="true"
                        dense
                ></v-autocomplete>
            </v-flex>
        </v-layout>

        <v-card-text>
            <p v-if="latestEntry">
                Current balance as of {{ latestEntry.transaction.date | formatDate }} :
                <strong>{{ formatMoney(balance) }}</strong> {{ account.currency }}
            </p>

            <v-data-table
                    :headers="headers"
                    :items="entries"
                    :rows-per-page-items="rowsPerPageItems"
            >

                <template slot="items" slot-scope="props">
                    <tr>
                        <td class="px-1">
                            <v-text-field
                                    v-model="props.item.date"
                                    mask="##/##/####"
                                    placeholder="29/01/1999"
                                    hint="For example, 04/11/1989"
                                    :return-masked-value="true"
                                    hide-details
                                    size="50"
                            ></v-text-field>
                        </td>
                        <td class="px-1">
                            <div>
                                <v-textarea
                                        v-model="props.item.description"
                                        hide-details
                                        auto-grow
                                        rows="1"
                                        class="mb-2"
                                        @blur="populateAllocation(props.item)">
                                </v-textarea>
                            </div>
                        </td>
                        <td class="px-1">
                            <v-text-field
                                    v-model.number="props.item.debit"
                                    @blur="if(props.item.debit) props.item.credit = 0"
                                    hide-details>
                            </v-text-field>
                        </td>
                        <td class="px-1">
                            <v-text-field
                                    v-model.number="props.item.credit"
                                    @blur="if(props.item.credit) props.item.debit = 0"
                                    hide-details>
                            </v-text-field>
                        </td>
                        <td class="text-xs-center px-1">{{ formatMoney(runningBalance(props.index)) }}</td>
                        <td class="px-1">
                            <v-autocomplete
                                    :disabled="!props.item.description"
                                    :items="allocationTypes"
                                    v-model="props.item.allocation_type"
                                    hide-details
                                    dense
                            ></v-autocomplete>
                        </td>
                        <td class="px-1">
                            <template v-if="props.item.allocation_type">
                                <v-text-field v-if="isAllocationTypeChequePayment(props.item.allocation_type) === 34"
                                              v-model.number="props.item.allocation"
                                              type="number"
                                              placeholder="input cheque no"
                                              hide-details
                                ></v-text-field>
                                <v-autocomplete v-else
                                                :items="allocationsByType(props.item.allocation_type)"
                                                v-model="props.item.allocation_bank"
                                                :placeholder="allocationPlaceholderByType(props.item.allocation_type)"
                                                :multiple="allocationIsMultiple(props.item.allocation_type)"
                                                @change="selectedAllocation(props.item, $event)"
                                                return-object
                                                hide-details
                                                :append-icon="isAllocationTypeChequePayment(props.item.allocation_type) ? 'info' : 'arrow_drop_down'"
                                                @click:append="() => openInfo(props.item)"
                                                dense
                                ></v-autocomplete>
                            </template>
                        </td>
                        <td class="px-1">
                            <invoices-dialog
                                    v-if="props.item.allocation && isInvoiceAllocation(props.item)"
                                    :currency="account.currency"
                                    :item="props.item"
                                    v-model="props.item.invoices"
                                    :maxAmount="parseFloat(props.item.credit || props.item.debit)"
                            ></invoices-dialog>
                            <v-text-field v-else v-model="props.item.reference" hide-details></v-text-field>
                        </td>
                        <td class="table__actions">
                            <v-btn v-if="entries.length > 1" icon flat small @click="deleteRow(props.index)">
                                <v-icon color="pink">clear</v-icon>
                            </v-btn>
                            <v-btn v-if="props.index + 1 == entries.length" icon flat small @click="addRow">
                                <v-icon color="teal">add</v-icon>
                            </v-btn>
                            <v-btn icon small @click="viewBankRequest(props.item)">
                                <img src="/static/img/icons/polygon.png" width="24px" alt="">
                                <create-bank-request :entry="props.item"></create-bank-request>
                            </v-btn>
                        </td>
                    </tr>
                </template>

                <template slot="footer">
                    <td colspan="4"><strong>Ending balance</strong></td>
                    <td class="text-xs-center"><strong>{{ formatMoney(runningBalance(entries.length - 1)) }}</strong>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                </template>

            </v-data-table>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="save" color="primary">Submit</v-btn>
        </v-card-actions>
        <cheque-info :cheque="cheque" v-if="cheque"></cheque-info>
    </v-card>
</template>

<script>
    import {fetchLatestBankEntry, saveAccount, updateAccountOptions, fetchChequeEntries} from '@/api/accounting'
    import {fetchBankAllocationTypes} from '@/api/settings'
    import {mapActions, mapGetters} from 'vuex'
    import InvoicesDialog from './invoices-dialog'
    import * as bankService from './service'
    import * as allocationTypeService from '@/app/settings/accounting/allocation-types/service'
    import Reconciliation from '@/components/accounting/reconciliation'
    import * as reconciliationService from '@/components/accounting/reconciliation/service'
    import * as rulesService from './rules/service'
    import Rules from './rules/index'
    import ChequeInfo from './cheque-info'
    import * as draftService from './../draftService'
    import BankMixin from '@/mixins/accounting/bank'
    import CreateBankRequest from './request/create'
    import BankRequests from './request/list'
    import ClientInbox from './request/client-inbox'

    export default {

        props: ['account'],
        data() {
            return {
                entries: [],
                rowsPerPageItems: [7, 10, 20, 50],
                headers: [
                    {text: 'Date', value: 'date', align: 'left', sortable: false, width: '160'},
                    {text: 'Description', value: 'description', align: 'left', sortable: false, width: '225'},
                    {text: 'Debit', value: 'debit', align: 'left', sortable: false, width: '75'},
                    {text: 'Credit', value: 'credit', align: 'left', sortable: false, width: '75'},
                    {text: 'Running balance', value: 'balance', align: 'left', sortable: false, width: '75'},
                    {text: 'Allocation Type', value: 'allocation_type', align: 'left', sortable: false, width: '150'},
                    {text: 'Allocation', value: 'allocation', align: 'left', sortable: false, width: '150'},
                    {text: 'Reference', value: 'reference', align: 'left', sortable: false, width: '150'},
                    {text: 'Actions', value: null, align: 'left', sortable: false, width: '150'},
                ],
                reconciliations: [
                    reconciliationService.availableType.bank,
                    reconciliationService.availableType.cash,
                    reconciliationService.availableType.cheque_paid,
                    reconciliationService.availableType.cheque_received,
                ],
                allocations: [],
                latestEntry: null,
                cheque: null,
                showChequeInfo: false,
                data: [],
                rules: [],
                ruleDialog: false,
                reviewsDialog: false,
            }
        },

        mixins: [BankMixin],

        asyncComputed: {
            chequeEntries: {
                default: [],
                get: () => fetchChequeEntries({reconciliation: 'purchase'}),
            },

            allocationTypes: {
                default: [],
                get: () => fetchBankAllocationTypes(),
            },
        },

        mounted() {
            this.init()
        },

        created() {
            draftService.getDraft('bank', this.account.id)
                .then((response) => {
                    if (response.data) {
                        this.entries = response.data.data || []
                    }
                })
        },

        computed: {
            ...mapGetters({
                currencies: 'settings/currencies',
                baseCurrency: 'accounting/currency',
                customers: 'accounting/customers',
                suppliers: 'accounting/suppliers',
                directEntrySuppliers: 'accounting/directEntrySuppliers',
                accounts: 'accounting/accounts',
                bankAccounts: 'accounting/bankAccounts',
                chequeAccounts: 'accounting/chequeAccounts',
                cashAccounts: 'accounting/cashAccounts',
                donationAccounts: 'accounting/donationAccounts',
                accountById: 'accounting/accountById',
                vatRateById: 'settings/vatRateById',
                vatRateByCode: 'settings/vatRateByCode',
            }),

            availableChequeAccounts() {
                return this.chequeAccounts.filter(account => {
                    let cheques = this.accounts.map(account => {
                        return account.options
                    }).filter(account => account.cheque_account_id).map(account => account.cheque_account_id)

                    return ((cheques).indexOf(account.id) === -1 || account.id === this.account.options.cheque_account_id)
                })
            },

            balance() {
                if (!this.latestEntry) return 0
                return this.latestEntry.account.balance.debit - this.latestEntry.account.balance.credit
            },
            otherBankAccounts() {
                return this.bankAccounts.filter(({id}) => this.account.id !== id)
            },
        },
        methods: {
            saveAsDraft() {
                draftService.createAsDraft(this.entries, 'bank', this.account.id);
            },

            populateAllocations() {
                this.entries.map(entry => {
                    return this.populateAllocation(entry)
                })
            },
            populateAllocation(entry) {
                entry.allocation_type = null
                entry.allocation = null
                entry.allocation_id = null
                this.rules.forEach(rule => {
                    if (!entry.description) {
                        return false
                    }
                    let target = rule.keywords.find(keyword => entry.description.toString().includes(keyword))
                    if (target) {
                        entry.allocation_type = rule.allocation_type
                        entry.allocation_id = rule.allocation_id
                        entry.allocation = rule.allocation
                        entry.allocation_bank = {value: rule.allocation_id, text: rule.allocation}
                    }
                })

                return entry
            },

            ...mapActions(['setMessage', 'setFetching']),

            async fetchLatestEntry() {
                this.latestEntry = await fetchLatestBankEntry(this.account.id)
            },

            init() {
                this.fetchLatestEntry()
                this.getAllRules()
                setTimeout(() => {
                    this.addRows()
                }, 500)
            },

            getAllRules() {
                rulesService.get(null, true)
                    .then(response => {
                        this.rules = response.data
                    })
            },

            defaultEntry() {
                return {
                    account_id: this.account.id,
                    date: null,
                    description: null,
                    debit: 0,
                    credit: 0,
                    currency: this.account.currency,
                    exchange_rate: 1,
                    allocation_type: null,
                    allocation_id: null,
                    allocation: null,
                    data: {}
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

            uploadFile() {
                let formData = new FormData()
                const pdfFile = document.querySelector('#uploadFile')
                formData.append('bank_statement', pdfFile.files[0])
                bankService.uploadBankStatement(this.account, formData)
                    .then(response => {
                        this.importEntries(response.data)

                        this.setMessage({type: 'success', message: response.message})
                        this.setFetching({fetching: false})
                    })
            },

            importEntries(data) {
                this.entries = []
                data.map(row => {
                    let rowData = this.defaultEntry()

                    rowData.date = row['date'].trim().replace(/\./g, '/')
                    rowData.description = row['description']
                    rowData.debit = row['debit']
                    rowData.credit = row['credit']

                    this.entries.push(rowData)
                })
                this.populateAllocations()
            },

            deleteRow(index) {
                this.entries.splice(index, 1)
            },
            chequeChange(cheque_account_id) {
                updateAccountOptions(this.account, {cheque_account_id})
            },
            currencyChange(currency) {
                const account = Object.assign({}, this.account, {currency})
                saveAccount(account).then(({data}) => {
                    if (data.success) {
                        this.entries.forEach(entry => {
                            this.$set(entry, 'currency', currency)
                        })
                    }
                })
            },
            runningBalance(index) {
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
            allocationIsMultiple(allocationType) {
                return [allocationTypeService.TYPE_CHEQUES_RECEIVED, allocationTypeService.TYPE_CHEQUES_PAYMENT].indexOf(allocationType) !== -1
            },
            getSummary() {
                const summaries = []
                summaries[0] = 'Ending balance'
                summaries[4] = this.runningBalance(this.entries.length - 1)
                return summaries
            },
            save() {
                let errors = false

                const entries = this.entries.reduce((filtered, entry, index) => {
                    if (entry.date && (entry.debit || entry.credit) && entry.allocation_type) {
                        if (this.checkCustomerSupplier(entry)) {
                            filtered.push(entry)
                        }
                    }
                    return filtered
                }, [])

                entries.map(entry => {
                    if (!this.validateBank(entry)) {
                        errors = true
                    }
                })

                if (errors) {
                    return false
                }

                bankService.create(entries)
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

            isAllocationTypeChequePayment(allocationType) {
                return allocationType === allocationTypeService.TYPE_CHEQUES_PAYMENT
            },

            openInfo(item) {
                this.cheque = this.chequeEntries.find(cheque => cheque.id == item.allocation_id)
                if (this.cheque) {
                    this.$set(this.cheque, 'showInfo', true)
                }
            },

            selectedAllocation(item, allocation) {
                this.$set(item, 'data', {})

                switch (item.allocation_type) {
                    case allocationTypeService.TYPE_CHEQUES_PAYMENT:
                        //item.data.cheque_number = allocation.data.cheque_number
                        //item.data.maxAmount = allocation.amount
                        //item.allocation_id = allocation.account.id
                        //item.allocation = allocation.text
                        item.data.cheques = allocation.map(cheque => cheque.id)
                        item.data.maxAmount = allocation.reduce((a, b) => {
                            return a + b.amount
                        }, 0)
                        break;

                    case allocationTypeService.TYPE_CHEQUES_RECEIVED:
                        item.allocation = allocation.map(cheque => {
                            return 'Cheque no. ' + cheque.data.cheque_number + ' - ' + cheque.currency + ' ' + this.formatMoney(cheque.amount)
                        })
                        item.data.cheques = allocation.map(cheque => cheque.id)

                        item.data.maxAmount = allocation.reduce((a, b) => {
                            return a + b.amount
                        }, 0)
                        break;

                    case allocationTypeService.TYPE_DIRECT_ENTRIES:
                        const directSupplier = this.directEntrySuppliers.find(supplier => supplier.id == item.allocation_bank.value)


                        const {vat_rate_id} = directSupplier
                        const {assigned_account_id} = this.accountById(directSupplier.account_id)
                        let vat_code = '11' // default non EU
                        let vat_rate = 0


                        if (directSupplier.ic_acquisition) {
                            switch (assigned_account_id) {
                                case 13: // Direct cost
                                    vat_code = '9'
                                    break
                                case 14: // Selling and distribution expenses
                                case 15: // Administrative expenses
                                    vat_code = '9A'
                                    break
                                case 16: // Property, plant & equipment
                                    vat_code = '10'
                                    break
                                default:
                                    console.warn('The assigned account id is not matching any vat code: ', assigned_account_id)
                            }
                        } else if (!directSupplier.ic_acquisition && !directSupplier.vat_claimable) {
                            vat_code = '33'
                        } else if (!directSupplier.ic_acquisition && directSupplier.vat_claimable) {
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
                        }
                        vat_rate = this.vatRateByCode(vat_code)
                        //vat_rate = this.vatRateById(vat_rate_id).vat

                        item.allocation = allocation.text
                        item.allocation_id = allocation.value

                        this.$set(item, 'vat_rate', vat_rate)
                        this.$set(item, 'vat_code', vat_code)
                        break;

                    default:
                        item.allocation = allocation.text
                        item.allocation_id = allocation.value
                }
            },

            validateBank(item) {
                let message = false;

                switch (item.allocation_type) {
                    case allocationTypeService.TYPE_CHEQUES_PAYMENT:
                        if (!item.data.maxAmount) {
                            message = 'Please select the cheque payment!'
                        } else if (item.data.maxAmount !== this.formatToInteger(item.debit)) {
                            message = item.date + ' - Debit column amount must equal to ' + this.formatMoney(item.data.maxAmount) + ' ' + this.account.currency
                        }
                        break

                    case allocationTypeService.TYPE_CHEQUES_RECEIVED:
                        if (!item.data.maxAmount) {
                            message = 'Please select the cheque received!'
                        } else if (item.data.maxAmount !== this.formatToInteger(item.credit)) {
                            message = item.date + ' - Credit  column amount must equal to ' + this.formatMoney(item.data.maxAmount) + ' ' + this.account.currency
                        }
                        break
                }

                if (message) {
                    this.setMessage({type: 'warning', message: message})
                    return false
                }

                return true
            },

            isInvoiceAllocation(item) {
                return [allocationTypeService.TYPE_CUSTOMERS_PAYMENT, allocationTypeService.TYPE_SUPPLIERS_PAYMENT].indexOf(item.allocation_type) != -1
            },

            viewBankRequest(entry) {
                this.$set(entry, 'viewBankRequest', true)
            }
        },
        components: {
            InvoicesDialog,
            Reconciliation,
            ChequeInfo,
            Rules,
            CreateBankRequest,
            BankRequests,
            ClientInbox
        }
    }
</script>

<style scoped>
    span.strong {
        font-size: 14px;
        font-weight: 400;
        color: #606266;
        line-height: 50px;
    }
</style>