<template>
    <section>
        <v-card class="grey lighten-4 elevation-0">
            <v-subheader>
                <span class="subheading">Charter of accounts</span>
                <account-dialog v-if="account && account !== 'empty'" :item="{type: account}"></account-dialog>
                <v-text-field
                        append-icon="search"
                        label="Search"
                        single-line
                        v-model="search"
                ></v-text-field>
            </v-subheader>

            <v-data-table
                    :headers="headers"
                    :items="charterOfAccounts"
                    :search="search"
                    :loading="!accountingLoaded"
                    hide-actions
                    class="reports-table v-form-table fixed-layout"
            >
                <template slot="items" slot-scope="props" v-if="props.item.total_debit || props.item.total_credit">
                    <tr @dblclick="$set(props.item, 'editable', !props.item.editable)" style="cursor: pointer">
                        <td>
                            <span v-if="!props.item.editable">
                                {{ props.item.name }}
                            </span>
                            <v-text-field
                                    v-else
                                    v-model="props.item.name"
                                    hide-details
                                    :disabled="!props.item.editable"
                            ></v-text-field>
                        </td>
                        <td>
                            <span v-if="!props.item.editable">
                                {{ props.item.assigned_account ? props.item.assigned_account.name : 'unknown'}}
                            </span>
                            <v-autocomplete
                                    v-else
                                    :items="assignedAccountsByType(props.item.type)"
                                    v-model="props.item.assigned_account"
                                    @input="assignedAccountChange($event)"
                                    item-text="name"
                                    item-value="id"
                                    return-object
                                    required
                            ></v-autocomplete>

                        </td>
                        <td>
                            <span  v-if="!props.item.editable">
                                {{ props.item.sub_account ? props.item.sub_account.name : 'unknown'}}
                            </span>
                            <v-autocomplete
                                    v-else
                                    :items="props.item.assigned_account ? props.item.assigned_account.sub_accounts || [] : []"
                                    v-model="props.item.sub_account_id"
                                    @input="subAccountChange($event)"
                                    item-text="name"
                                    item-value="id"
                                    no-data-text="No sub account available"
                                    required
                            ></v-autocomplete>
                        </td>
                        <td>
                            <span v-if="!props.item.editable">
                                {{ props.item.fs_title }}
                            </span>
                            <v-text-field
                                    v-else
                                    v-model="props.item.fs_title"
                                    hide-details
                                    :disabled="!props.item.editable"
                            ></v-text-field>
                        </td>
                        <td>
                            <span v-if="!props.item.editable">
                                {{ getVatRate(props.item.options.vat_rate_id) }}
                            </span>
                            <v-autocomplete
                                    :items="vatRates"
                                    v-else-if="availableVarRate(props.item)"
                                    v-model.number="props.item.options.vat_rate_id"
                                    item-text="name"
                                    item-value="id"
                                    hide-details
                                    dense
                            ></v-autocomplete>
                        </td>
                        <td>
                            <v-btn icon flat small color="success" @click="save(props.item)" v-if="props.item.editable">
                                <v-icon>check</v-icon>
                            </v-btn>
                            <v-btn icon flat small color="primary" @click="$set(props.item, 'editable', !props.item.editable)" :disabled="isFirstPeriodLocked" v-else>
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn icon flat small color="info" @click="cancelEditingAccount(props.item)" v-if="props.item.editable">
                                <v-icon>cancel</v-icon>
                            </v-btn>
                            <v-btn icon flat small color="info" @click="archiveAccount(props.item)" :disabled="isFirstPeriodLocked" v-else>
                                <v-icon>archive</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
            <div class="text-xs-center" v-if="charterOfAccounts.last_page > 1">
                <v-pagination :length="charterOfAccounts.last_page" v-model="currentPage" :total-visible="7"></v-pagination>
            </div>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="800">
            <v-card v-if="account">
                <v-card-title>
                    <span class="headline">Edit account</span>
                </v-card-title>
                <v-card-text>
                    <v-container fluid grid-list-md>
                        <v-layout wrap>
                            <v-flex xx12 sm6 lg4>
                                <v-combobox
                                        label="Account name"
                                        :items="accounts"
                                        :value="account.name"
                                        @input="accountChange"
                                        item-text="name"
                                        item-value="name"
                                ></v-combobox>
                            </v-flex>
                            <v-flex xs12 sm6 lg4>
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
                            <v-flex xs12 sm6 lg4>
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
    import AccountingToolbar from '../../../dialogs/components/toolbar.vue'
    import * as charterOfAcounts from './service'
    import {updateAccountingAccounts} from '@/api/accounting'

    export default {
        data: () => ({
            loading: true,
            search: '',
            dialog: false,
            headers: [
                {text: 'Account', value: 'name', width: '200'},
                {text: 'Assigned account', value: 'assigned_account.name', width: '200'},
                {text: 'Sub account', value: 'sub_account.name', width: '300'},
                {text: 'FS title', value: 'fs_title', width: '300'},
                {text: 'Vat rate', value: 'vat_rate_id', width: '200'},
                {text: 'Actions', value: null, sortable: false},
            ],
            account: {
                balance: {},
            },
            currentPage: 1,
            charterOfAccounts: []
        }),

        mounted() {
            this.getCharterOfAccounts()
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
                assignedAccountsByType: 'assignedAccountsByType',
                vatRateById: 'settings/vatRateById'
            }),

            isFirstPeriodLocked() {
                if(this.firstLockPeriod.locked) {
                    return true
                }

                return false
            },

        },

        methods: {
            getCharterOfAccounts() {
                var accounts = JSON.parse(JSON.stringify(this.accounts))

                this.charterOfAccounts = accounts
            },

            archiveAccount(account) {
                charterOfAcounts.archive(account)
                    .then(response => {
                        this.getCharterOfAccounts()
                        updateAccountingAccounts()
                    })
            },

            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog',
            }),

            edit(account) {
                this.account = JSON.parse(JSON.stringify(account))
                this.dialog = true
            },

            accountChange($event) {
                if (typeof $event === 'string') {
                    this.account.name = $event
                }
                if (typeof $event === 'object') {
                    this.account.name = $event.name
                    // TODO - when account name suggestion implemented
                    // Object.assign(this.account, _.pick($event, ['name', 'assigned_account_id', 'sub_account_id']))
                }
            },
            assignedAccountChange(account) {
                this.account.assigned_account_id = id

                if(account.sub_accounts.length) {
                    this.account.sub_account_id = account.sub_accounts[0].id
                }

                if(this.availableVarRate(account)) {
                    this.account.options.vat_rate_id = 1
                } else {
                    this.account.options.vat_rate_id = null
                }
            },

            availableVarRate(account) {
                let assignedAccounts = [12, 13, 14, 15]

                if (account.assigned_account) {
                    return assignedAccounts.indexOf(account.assigned_account.id) != -1
                }

                return []
            },

            subAccountChange(subAccount) {
                this.account.sub_account_id = subAccount.id
                this.account.sub_account = subAccount
            },

            accountNameChange($event) {
                if (typeof $event == 'string') {
                    this.account.name = $event
                }
                if (typeof $event == 'object') {
                    Object.assign(this.account, _.pick($event, ['name', 'assigned_account', 'assigned_account_id', 'sub_account_id']))
                }
            },

            save(account = null) {
                account = account || this.account

                saveAccount(account, 'accounting').then(({data}) => {
                    if (data.success) {
                        this.dialog = false
                        account.editable = false
                    }
                })
            },

            getVatRate(vatRateId) {
                var vatRate = this.vatRateById(vatRateId)
                if(vatRate) {
                    return vatRate.name
                }

                return ''

            },

            cancelEditingAccount(account) {
                const originalAccount = this.accounts.find(item => account.id === item.id)

                account.editable = false
                account.assigned_account_id = originalAccount.assigned_account_id
                account.assigned_account = originalAccount.assigned_account
                account.name = originalAccount.name
                account.sub_account_id = originalAccount.sub_account_id
                account.fs_title = originalAccount.fs_title
                account.vat_rate_id = originalAccount.vat_rate_id
            },


            destroy: deleteAccount
        },

        watch: {
            currentPage: 'getCharterOfAccounts',
            accounts: 'getCharterOfAccounts'
        },

        components: { AccountingToolbar }
    }
</script>