<template>
    <v-card flat>
        <rules
                v-if="ruleDialog"
                @close="ruleDialog = false"
                @updated-rules="getAllRules"
                :rules="rules">
        </rules>
        <create-suspense
                v-if="showCreateSuspenseDialog"
                :account="account"
                :entries="entries"
                @close="showCreateSuspenseDialog = false"
                @submit="suspenseSubmitted"
        ></create-suspense>

        <list-suspense
                v-if="showListSuspenseDialog"
                :account="account"
                @close="showListSuspenseDialog = false"
                @submit="suspenseSubmitted"
        ></list-suspense>

        <bank-requests
                v-if="showReviewsDialog"
                :account="account"
                @close="showReviewsDialog = false"
        ></bank-requests>
        <v-layout row wrap>
            <v-flex md10 mt-2>
                <v-layout>
                    <div>
                        <upload-btn
                                title="UPLOAD BANK STATEMENT"
                                :fileChangedCallback="uploadFile"
                                color="primary"
                                class="white--text custom-upload-button">
                        </upload-btn>
                    </div>
                    <v-btn color="primary" @click="ruleDialog = true">RULES</v-btn>
                    <v-btn color="primary" @click="showReviewsDialog = true">Reviews</v-btn>
                    <v-badge
                            color="danger"
                            right
                            overlap
                    >
                        <v-btn color="primary" @click="showListSuspenseDialog = true">Suspense</v-btn>
                        <span slot="badge">{{ countSuspense }}</span>
                    </v-badge>
                </v-layout>
            </v-flex>
            <v-flex md2>
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
                            <date-picker v-model="props.item.date" full-width hide-details placeholder="25/03/2018" clearable></date-picker>
                        </td>
                        <td class="px-1">
                            <v-textarea
                                    v-model="props.item.description"
                                    hide-details
                                    auto-grow
                                    rows="1"
                                    class="mb-2"
                                    @blur="populateAllocation(props.item)">
                            </v-textarea>
                        </td>
                        <td class="px-1">
                            <v-text-field
                                    v-model.number="props.item.debit"
                                    @change="debitChanged(props.item, $event)"
                                    @blur="if(props.item.debit) props.item.credit = 0"
                                    hide-details>
                            </v-text-field>
                        </td>
                        <td class="px-1">
                            <v-text-field
                                    v-model.number="props.item.credit"
                                    @change="creditChanged(props.item, $event)"
                                    @blur="if(props.item.credit) props.item.debit = 0"
                                    hide-details>
                            </v-text-field>
                        </td>
                        <td class="text-xs-center px-1">{{ formatMoney(runningBalance(props.index)) }}</td>
                        <td class="px-1">
                            <v-autocomplete
                                    :disabled="!props.item.description"
                                    :items="availableBankCorporateSections"
                                    @change="allocationTypeChanged(props.item)"
                                    v-model="props.item.allocation_type"
                                    hide-details
                                    clearable
                                    dense
                            ></v-autocomplete>
                        </td>
                        <td class="px-1">
                            <template v-if="props.item.allocation_type">
                                <v-layout row>
                                    <v-autocomplete
                                            :items="allocationsByType(props.item.allocation_type)"
                                            v-model="props.item.allocation_id"
                                            @input="allocationDataChanged(props.item)"
                                            item-text="text"
                                            item-value="value"
                                            hide-details
                                            clearable
                                            dense
                                    >
                                        <v-icon
                                                slot="append-outer"
                                                @click="showAllocationsData(props.item)"
                                                color="primary"
                                        >add</v-icon>
                                    </v-autocomplete>

                                    <allocations-data v-if="props.item.showAllocationsData && props.item.allocation_type"
                                                      :item="props.item"
                                    ></allocations-data>
                                </v-layout>
                            </template>
                        </td>
                        <td class="px-1">
                            <v-text-field v-model="props.item.reference" hide-details></v-text-field>
                        </td>
                        <td class="table__actions">
                            <v-btn v-if="entries.length > 1" icon flat small @click="deleteRow(props.index)">
                                <v-icon color="danger">clear</v-icon>
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
    </v-card>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import * as bankService from '../service'
    import * as rulesService from './rules/service'
    import Rules from './rules/index'
    import * as draftService from '@/app/corporates/draftService'
    import AllocationsMixin from '@/app/corporates/mixins/allocations';
    import CreateBankRequest from './request/create'
    import BankRequests from './request/list'
    import * as corporateService from '@/app/corporates/service'
    import AllocationsData from './allocations-data'
    import CreateSuspense from './suspense/create'
    import ListSuspense from './suspense/index'
    const uuidv4  = require('uuid/v4');

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
                    {text: 'Actions', value: null, align: 'left', sortable: false, width: '200'},
                ],
                allocations: [],
                latestEntry: null,
                data: [],
                rules: [],
                ruleDialog: false,
                reviewsDialog: false,
                currentSection: null,
                showCreateSuspenseDialog: null,
                showListSuspenseDialog: null,
                showReviewsDialog: null,
                countSuspense: 0
            }
        },

        mixins: [AllocationsMixin],

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
                accounts: 'corporate/accounts',
                company: 'corporate/company',
                corporate: 'corporate/data',
                bankAccounts: 'corporate/bankAccounts',
                materialityRule: 'corporate/materialityRule',
                corporateSections: 'settings/corporateSections'
            }),

            balance() {
                if (!this.latestEntry) return 0
                return this.latestEntry.account.balance.debit - this.latestEntry.account.balance.credit
            },

            defaultEntry() {
                return {
                    account_id: this.account.id,
                    date: null,
                    description: null,
                    amount: null,
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

            getLatestBankEntry() {
                bankService.getLatestEntry(this.account.id)
                    .then(response => {
                        this.latestEntry = response.data
                    })
            },

            getSuspenseCount() {
                bankService.getCountSuspense(this.account.id)
                    .then(response => {
                        this.countSuspense = response.data
                    })
            },

            init() {
                this.getLatestBankEntry()
                this.getSuspenseCount()
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
            addRow() {
                this.defaultEntry.uuid = uuidv4();

                this.entries.push(JSON.parse(JSON.stringify(this.defaultEntry)));
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
                    })
            },

            importEntries(data) {
                this.entries = []
                data.map(row => {
                    let rowData = this.defaultEntry

                    rowData.uuid = uuidv4();
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

            runningBalance(index) {
                let balance = this.balance
                let count = 0
                while (count <= index) {
                    let entry = this.entries[count];
                    balance -= this.formatToInteger(entry.debit);
                    balance += this.formatToInteger(entry.credit);
                    count++
                }

                return balance
            },
            getSummary() {
                const summaries = []
                summaries[0] = 'Ending balance'
                summaries[4] = this.runningBalance(this.entries.length - 1)
                return summaries
            },
            save() {
                let errors = false
                let showSuspenseDialog = false

                this.entries = this.entries.reduce((filtered, entry, index) => {
                    if (entry.date && (entry.debit || entry.credit)) {
                        filtered.push(entry)
                    }
                    return filtered
                }, []);

                if (errors) {
                    return false
                }

                this.entries.map(entry => {
                    if(!entry.allocation_type || entry.allocation_type === corporateService.SECTION_SUSPENSE) {
                        showSuspenseDialog = true;
                    }
                });

                if(showSuspenseDialog) {
                    this.showCreateSuspenseDialog = true;
                    return
                }
                this.create()
            },

            create() {
                return bankService.create(this.entries)
                    .then(response => {
                        this.reset();
                        return response;
                    })
            },

            reset() {
                this.entries = [];
                this.addRows();
            },

            viewBankRequest(entry) {
                this.$set(entry, 'viewBankRequest', true)
            },

            creditChanged(item) {
                item.amount = item.credit || item.debit

                this.setMaterialityAllocationType(item)
            },

            debitChanged(item) {
                item.amount = item.credit || item.debit

                this.setMaterialityAllocationType(item)
            },

            setMaterialityAllocationType(item) {
                if((item.debit && this.materialityRule && this.materialityRule.debit >= item.debit) ||
                    (item.credit && this.materialityRule && this.materialityRule.credit >= item.credit)) {
                    item.allocation_type = corporateService.SECTION_IMMATERIAL
                } else {
                    item.allocation_type = null
                }
            },

            suspenseSubmitted() {
                this.reset();
                this.showCreateSuspenseDialog = false
                this.getSuspenseCount()
            }
        },
        components: {
            Rules,
            CreateBankRequest,
            BankRequests,
            AllocationsData,
            ListSuspense,
            CreateSuspense,
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