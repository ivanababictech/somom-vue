<template>
    <v-dialog v-model="dialog" flat lazy persistent max-width="80%" class="custom-dialog">
        <v-btn :flat="!button" :color="button ? 'primary' : 'black'" slot="activator">
            <template v-if="label">{{ label }}</template>
            <v-icon v-if="icon">{{ icon }}</v-icon>
        </v-btn>
        <v-card>
            <v-card-title>
                <span v-if="account.id" class="headline">Edit account #{{ account.id }}</span>
                <span v-else class="headline">{{ headline }}</span>
            </v-card-title>
            <v-card-text>
                <v-container fluid grid-list-md>
                    <v-layout wrap>
                        <v-flex xx12 sm6 lg2>
                            <v-text-field
                                    label="Account name"
                                    :value="account.name"
                                    :search-input.sync="account.name"
                                    @input="accountChange">
                            </v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 lg2>
                            <v-autocomplete
                                    label="Assigned account"
                                    :items="assignedAccountsByType(account.type)"
                                    v-model="account.assigned_account"
                                    @input="assignedAccountChange($event)"
                                    item-text="name"
                                    item-value="id"
                                    return-object
                                    required
                            ></v-autocomplete>
                        </v-flex>
                        <v-flex xs12 sm6 lg2>
                            <v-autocomplete
                                    label="Sub account"
                                    :items="account.assigned_account ? account.assigned_account.sub_accounts || [] : []"
                                    v-model="account.sub_account_id"
                                    item-text="name"
                                    item-value="id"
                                    no-data-text="No sub account available"
                                    required
                            ></v-autocomplete>
                        </v-flex>
                        <v-flex xs12 sm6 lg2>
                            <v-autocomplete
                                    :items="availableVatRates"
                                    v-if="availableVarRate()"
                                    v-model.number="account.options.vat_rate_id"
                                    item-text="name"
                                    item-value="id"
                                    hide-details
                                    dense
                            ></v-autocomplete>
                        </v-flex>
                    </v-layout>
                    <small>*indicates required field</small>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="cancel">Cancel</v-btn>
                <v-btn color="primary" flat @click="save">{{ account.id ? 'Save' : 'Add' }}</v-btn>
            </v-card-actions>
        </v-card>
        <banks :account="account"></banks>
        <currencies :account="account"></currencies>
    </v-dialog>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Banks from "./banks"
    import Currencies from "./currencies"
    import * as accountService from "./service"

    export default {
        props: {
            label: {
                type: String | Boolean,
                default: 'Add account'
            },
            headline: {
                type: String,
                default: 'Add new account'
            },
            icon: {
                type: String,
                default: ''
            },
            button: {
                type:  Boolean,
                default: false
            },
            small: {
                type: Boolean,
                default: false
            },
            flat: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: 'accounting'
            },
            item: {
                type: Object,
                default: () => ({
                    name: null,
                    assigned_account: {},
                    options: {}
                })
            },
        },
        data() {
            return {
                dialog: false,
                account: {
                    name: '',
                    options: {},
                },
                accountStructure: {
                    name: null,
                    assigned_account_id: null,
                    sub_account_id: null,
                    showBanksAccounts: false,
                    currency: null,
                    bank_id: null,
                    options: {},
                    isOpeningBalance: false
                }
            }
        },
        computed: {
            ...mapGetters({
                accounts: 'settings/accounts',
                assignedAccountsByType: 'assignedAccountsByType',
                company: 'accounting/company',
                vatRates: 'settings/vatRates',
            }),

            availableVatRates() {
                return this.vatRates.filter(vatRate => [6, 7].indexOf(vatRate.id) === -1)
            }

        },
        mounted() {
            this.$set(this, 'account', Object.assign(this.item, this.accountStructure))
            this.account.options.vat_rate_id = 1
            let assignedAccounts = this.assignedAccountsByType(this.account.type)
            if (assignedAccounts && assignedAccounts.length === 1) {
                this.account.assigned_account = assignedAccounts[0]
                if (assignedAccounts[0].sub_accounts.length === 1) {
                    this.account.sub_account_id = assignedAccounts[0].sub_accounts[0].id
                } else if (assignedAccounts[0].id === 12) {
                    console.log(assignedAccounts[0])
                    assignedAccounts[0].sub_accounts = assignedAccounts[0].sub_accounts.filter(subAccount => subAccount.id === 16)
                }
            }

        },
        watch: {
            'account.name': 'accountChange',
            item(item) {
                //this.account = Object.assign(item, this.accountStructure)
            }
        },
        methods: {
            /**
             * Check available var rate regarding assigned account
             *
             * @returns {boolean}
             */
            availableVarRate() {
                let assignedAccounts = [12, 13, 14, 15]

                if (this.account.assigned_account) {
                    return assignedAccounts.indexOf(this.account.assigned_account.id) !== -1
                }

                return []
            },

            accountChange($event) {
                // if (id === 13) {
                    // this.account.assigned_account.sub_accounts.filter(subAccount => console.log(subAccount))
                // }
                if (typeof $event === 'string') {
                    this.account.name = $event
                }
                if ($event && typeof $event === 'object') {
                    this.account.name = $event.name
                    // TODO - when account name suggestion implemented
                    // Object.assign(this.account, _.pick($event, ['name', 'assigned_account_id', 'sub_account_id']))
                }
            },
            assignedAccountChange({id, sub_accounts}) {
                this.account.assigned_account_id = id
                if (sub_accounts.length) {
                    this.account.sub_account_id = sub_accounts[0].id
                }

                if (this.availableVarRate()) {
                    this.account.options.vat_rate_id = 1
                } else {
                    this.account.options.vat_rate_id = null
                }
            },
            reset() {
                setTimeout(() => {
                    this.account = Object.assign({}, this.accountStructure)
                }, 200)
            },

            cancel() {
                this.dialog = false
                this.reset()
            },

            isChequeAccount() {
                return [20].indexOf(this.account.assigned_account_id) !== -1
            },

            isCashAccount() {
                return [19].indexOf(this.account.assigned_account_id) !== -1
            },

            isBankAccount() {
                return [21].indexOf(this.account.assigned_account_id) !== -1
            },

            save() {
                if (this.isChequeAccount() && !this.account.bank_id) {
                    this.$set(this.account, 'showBanksAccounts', true)
                    return false
                }

                if ((this.isCashAccount() || this.isBankAccount()) && !this.account.currency) {
                    this.$set(this.account, 'showCurrencies', true)
                    this.$set(this.account, 'currency', this.company.currency)
                    return false
                }

                accountService.create(this.account)
                    .then(response => {
                        this.dialog = false
                        if (!this.account.id) {
                            this.reset()
                        }
                    })
            }
        },
        components: {Banks, Currencies},
    }
</script>