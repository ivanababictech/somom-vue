<template>
    <section>
        <v-card class="grey lighten-4 elevation-0">
            <v-subheader>
                <v-text-field
                        append-icon="search"
                        label="Search"
                        single-line
                        v-model="search"
                ></v-text-field>
                <v-btn fab dark small color="primary" @click="toggleDialog('balances')">
                    <v-icon dark>add</v-icon>
                </v-btn>
            </v-subheader>

            <v-data-table
                    :headers="headers"
                    :items="accounts"
                    :search="search"
                    hide-actions
                    class="reports-table v-form-table fixed-layout"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.assigned_account ? props.item.assigned_account.name : 'unknown'}}</td>
                    <td>{{ props.item.sub_account ? props.item.sub_account.name : 'unknown'}}</td>
                    <td>{{ props.item.fs_title }}</td>
                    <td>{{ props.item.amount }}</td>
                    <td>{{ props.item.audit_adjustments }}</td>
                    <td>{{ props.item.amount + props.item.audit_adjustments }}</td>
                    <td></td>
                    <td>
                        <v-btn icon flat small color="primary" @click="edit(props.item)">
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn icon flat small color="warning" @click="destroy(props.item)">
                            <v-icon>delete</v-icon>
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
                                        :items="[]"
                                        :value="account.name"
                                        @change="accountNameChange($event)"
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
                                        v-model.number="account.debit"
                                        @blur="debitChange"
                                        type="number"
                                        required>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 lg2>
                                <v-text-field
                                        label="Credit"
                                        v-model.number="account.credit"
                                        @blur="creditChange"
                                        type="number"
                                        required>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 lg2>
                                <v-text-field
                                        label="Last year amount"
                                        v-model.number="account.prev_year_amount"
                                        type="number"
                                        required>
                                </v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 lg3>
                                <date-picker label="Date" v-model="account.date" full-width hide-details clearable></date-picker>
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
    import * as balanceService from './service'

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
                {text: 'Amount', value: 'balance.amount'},
                {text: 'Audit adjustments', value: 'balance.audit_adjustments'},
                {text: 'Final balance', value: ''},
                {text: 'Date', value: 'balance.date'},
                {text: 'Actions', value: null, sortable: false},
            ],
            account: {
                balance: {},
            },
            openingBalancesAccounts: []
        }),

        computed: {
            ...mapGetters({
                assignedAccounts: 'assignedAccounts',
                accounts: 'audit/accounts',
            }),
        },

        methods: {
            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog',
            }),

            edit(account) {
                this.account = JSON.parse(JSON.stringify(account))
                this.dialog = true
            },

            accountNameChange($event) {
                if (typeof $event === 'string') {
                    this.account.name = $event
                }
                if (typeof $event === 'object') {
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
                balanceService.update(this.account).then(({data}) => {
                    this.dialog = false
                })
            },

            destroy(account) {
                balanceService.remove(account)
            }
        },
    }
</script>