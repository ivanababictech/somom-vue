<template>
    <section>
        <v-card class="grey lighten-4 elevation-0">
            <v-subheader>
                <span class="subheading">Opening balances</span>
                    <v-btn flat small color="primary" @click="toggleDialog('inventory')" v-if="inventoryAccount">INVENTORY</v-btn>
                    <v-btn flat small color="primary" @click="toggleDialog('cheque_accounts')" v-if="chequeAccounts.length">CHEQUE</v-btn>
                    <v-btn flat small color="primary" @click="toggleDialog('customers')" v-if="debtorAccount">CUSTOMERS</v-btn>
                    <v-btn flat small color="primary" @click="toggleDialog('suppliers')" v-if="tradePayablesAccount">SUPPLIERS</v-btn>
                    <v-btn flat small color="primary" @click="toggleDialog('asset_registrar')" v-if="propertyPlantAccount">ASSET REGISTRAR</v-btn>

                <v-text-field
                        append-icon="search"
                        label="Search"
                        single-line
                        v-model="search"
                ></v-text-field>
                <v-btn fab dark small color="primary" @click="toggleDialog('balances')" :disabled="isFirstPeriodLocked">
                    <v-icon dark>add</v-icon>
                </v-btn>
            </v-subheader>

            <v-data-table
                    :headers="headers"
                    :items="openingBalancesAccounts"
                    :search="search"
                    :loading="!accountingLoaded"
                    hide-actions
                    class="reports-table v-form-table fixed-layout"
            >
                <template slot="items" slot-scope="props" v-if="props.item.balance">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.assigned_account ? props.item.assigned_account.name : 'unknown'}}</td>
                    <td>{{ props.item.sub_account ? props.item.sub_account.name : 'unknown'}}</td>
                    <td>{{ props.item.fs_title }}</td>
                    <td>{{ formatMoney(props.item.transaction_account ? props.item.transaction_account.debit : 0) }}</td>
                    <td>{{ formatMoney(props.item.transaction_account ? props.item.transaction_account.credit : 0) }}</td>
                    <td>{{ props.item.balance.prev_year_amount }}</td>
                    <td>{{ props.item.transaction_account.transaction.date | formatDate }}</td>
                    <td>
                        <v-btn icon flat small color="primary" @click="edit(props.item)" :disabled="isFirstPeriodLocked">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </td>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="100%">
            <v-card v-if="account">
                <v-card-title>
                    <span class="headline">Edit opening balance account</span>
                </v-card-title>
                <v-card-text>
                    <v-container fluid grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 lg3>
                                <v-combobox
                                        label="Account name"
                                        :items="systemAccounts"
                                        :value="account.name"
                                        @input="accountNameChange($event)"
                                        item-text="name"
                                        item-value="name"
                                ></v-combobox>
                            </v-flex>
                            <v-flex xs12 sm6 lg3>
                                <v-autocomplete
                                        label="Assigned account"
                                        :items="assignedAccounts"
                                        v-model="account.assigned_account"
                                        @input="assignedAccountChange"
                                        item-text="name"
                                        item-value="id"
                                        return-object
                                        required
                                ></v-autocomplete>
                            </v-flex>
                            <v-flex xs12 sm6 lg3>
                                <v-autocomplete
                                        label="Sub account"
                                        :items="account.assigned_account ? account.assigned_account.sub_accounts : []"
                                        v-model="account.sub_account_id"
                                        item-text="name"
                                        item-value="id"
                                        no-data-text="No sub account available"
                                        required
                                ></v-autocomplete>
                            </v-flex>
                            <v-flex xs12 sm6 lg3>
                                <v-text-field
                                        label="FS Title"
                                        v-model="account.fs_title"
                                        required>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 lg2>
                                <v-text-field
                                        label="Debit"
                                        :value="formatMoney(account.balance.debit)"
                                        :disabled="true"
                                        type="text"
                                        required>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 lg2>
                                <v-text-field
                                        label="Credit"
                                        :value="formatMoney(account.balance.credit)"
                                        :disabled="true"
                                        @blur="creditChange"
                                        type="text"
                                        required>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 lg2>
                                <v-text-field
                                        label="Last year amount"
                                        :value="account.balance.prev_year_amount"
                                        :disabled="true"
                                        type="number"
                                        required>
                                </v-text-field>
                            </v-flex>
                        </v-layout>
                        <small>*indicates required field</small>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat @click="dialog = false">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </section>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import {saveAccount, deleteAccount} from '@/api/accounting'

    export default {
        data: () => ({
            loading: true,
            search: '',
            dialog: false,
            headers: [
                {text: 'Account', value: 'name'},
                {text: 'Assigned account', value: 'assigned_account.name'},
                {text: 'Sub account', value: 'sub_account.name'},
                {text: 'FS title', value: 'fs_title'},
                {text: 'Debit', value: 'balance.debit'},
                {text: 'Credit', value: 'balance.credit'},
                {text: 'Previous year', value: 'balance.prev_year_amount'},
                {text: 'Date', value: 'balance.date'},
                {text: 'Actions', value: null, sortable: false},
            ],
            account: {
                balance: {},
            },
            openingBalancesAccounts: []
        }),

        mounted() {
            let self = this
            this.$bus.$on('load-opening-balances', function () {
                self.getOpeningBalancesAccounts()
            })

            this.getOpeningBalancesAccounts()
        },

        computed: {
            ...mapGetters({
                systemAccounts: 'settings/accounts',
                accounts: 'accounting/accounts',
                company: 'accounting/company',
                firstLockPeriod: 'accounting/firstLockPeriod',
                vatRates: 'settings/vatRates',
                assignedAccounts: 'assignedAccounts',
                obAccounts: 'accounting/obAccounts',
                accountingLoaded: 'accounting/loaded',
                inventoryAccount: 'accounting/inventoryAccount',
                chequeAccounts: 'accounting/chequeAccounts',
                debtorAccount: 'accounting/debtorAccount',
                tradePayablesAccount: 'accounting/tradePayablesAccount',
                propertyPlantAccount: 'accounting/propertyPlantAccount',
            }),

            isFirstPeriodLocked() {
                if(this.firstLockPeriod.locked) {
                    return true
                }

                return false
            }
        },

        methods: {
            getOpeningBalancesAccounts() {
                const {accounting_id} =  this.$route.params
                this.$http.get('accountings/' + accounting_id + '/opening-balances').then(response => {
                    this.openingBalancesAccounts = response.data.data
                })
            },

            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog',
            }),

            edit(account) {
                this.account = JSON.parse(JSON.stringify(account))
                this.dialog = true
            },

            accountNameChange($event) {
                if (typeof $event == 'string') {
                    this.account.name = $event
                }
                if (typeof $event == 'object') {
                    Object.assign(this.account, _.pick($event, ['name', 'assigned_account', 'assigned_account_id', 'sub_account_id']))
                }
            },

            assignedAccountChange() {
                this.account.assigned_account_id = this.account.assigned_account.id
                this.account.sub_account_id = this.account.assigned_account.sub_accounts[0].id
            },

            debitChange() {
                if (this.account.balance.debit) {
                    this.account.balance.credit = 0
                }
            },

            creditChange() {
                if (this.account.balance.credit) {
                    this.account.balance.debit = 0
                }
            },

            save() {
                saveAccount(this.account, 'accounting').then(({data}) => {
                    if (data.success) {
                        this.dialog = false
                        this.getOpeningBalancesAccounts()
                    }
                })
            },

            destroy: deleteAccount
        },
    }
</script>