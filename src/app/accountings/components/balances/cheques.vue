<template>
    <v-card>
        <v-toolbar dense color="accent">
            <v-btn icon @click="toggleDialog('cheque_accounts')">
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Add Cheque</v-toolbar-title>
            <v-spacer></v-spacer>
            <account-dialog></account-dialog>
            <v-btn flat @click="saveAsDraft">Save as draft</v-btn>
        </v-toolbar>

        <v-card-text>
            <v-tabs light grow>
                <v-tab v-for="account in chequeAccounts" class="primary-text" :key="account.id" @click="activeAccount = account">
                    {{ account.name }}
                </v-tab>
                <v-tab-item v-for="account in chequeAccounts" :key="account.id">
                    <v-data-table
                            :headers="headers"
                            :items="account.items"
                            :pagination.sync="pagination"
                            :rows-per-page-items="rowsPerPageItems"
                            class="v-form-table">

                        <template slot="items" slot-scope="props">

                            <td class="px-1">
                                <v-text-field
                                        v-model="props.item.data.cheque_number"
                                        hide-details
                                ></v-text-field>
                            </td>
                            <td class="px-1">
                                <v-text-field
                                        v-model="props.item.date"
                                        mask="##/##/####"
                                        placeholder="29/01/1999"
                                        hint="For example, 04/11/1989"
                                        :return-masked-value="true"
                                        hide-details
                                ></v-text-field>
                            </td>
                            <td class="px-1">
                                <v-text-field
                                        v-model="props.item.description"
                                        hide-details
                                ></v-text-field>
                            </td>
                            <td class="px-1">
                                <v-text-field
                                        v-model="props.item.amount"
                                        hide-details
                                ></v-text-field>
                            </td>
                            <td class="table__actions px-1">
                                <v-btn v-if="account.items.length > 1" icon flat small @click="deleteRow(account, props.index)">
                                    <v-icon color="pink">clear</v-icon>
                                </v-btn>
                                <!--<v-btn v-if="props.index + 1 === account.items.length" icon flat small @click="addRow(account)">-->
                                    <!--<v-icon color="teal">add</v-icon>-->
                                <!--</v-btn>-->
                            </td>
                        </template>
                        <template slot="footer">
                            <td colspan="3">
                                <strong>Total</strong>
                            </td>
                            <td>{{ formatMoney(totalAmount(account)) }}</td>
                        </template>
                    </v-data-table>
                </v-tab-item>
            </v-tabs>
        </v-card-text>
        <v-card-actions class="text-xs-left">
            <v-btn color="primary">Import</v-btn>
            <v-btn color="primary" @click="save">Submit</v-btn>
        </v-card-actions>
        <banks :account="activeAccount" @submit="save"></banks>
    </v-card>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import * as balanceService from './service'
    import * as draftService from './../dialogs/draftService'
    import Banks from "@/components/dialogs/account/banks"
    import {updateAccountingAccounts} from '@/api/accounting'

    export default {
        data: () => ({
            pagination: {
                rowsPerPage: 7,
            },
            activeAccount: {},
            rowsPerPageItems: [7, 10, 20, 50],
            headers: [
                {text: 'Cheque number', value: 'data.cheque_number', align: 'left', sortable: false, width: '160'},
                {text: 'Date', value: 'date', align: 'left', sortable: false, width: '90'},
                {text: 'Description', value: 'description', align: 'left', sortable: false, width: '160'},
                {text: 'Amount', value: 'amount', align: 'left', sortable: false, width: '80'},
                {text: 'Actions', value: null, align: 'left', sortable: false, width: '80'},
            ],
            search: '',
            date: null,
            items: [],
            chequeAccounts: [],
            chequeStructure: {
                id: null,
                data: {
                    cheque_number: null
                },
                date: null,
                description: null,
                amount: null,
            },
        }),

        mounted() {
            this.setItems()
        },

        computed: {
            ...mapGetters({
                assignedAccounts: 'assignedAccounts',
                chequeAccountsData: 'accounting/chequeAllAccounts',
                accounts: 'accounting/itemAccounts',
                vatRates: 'settings/vatRates',
            }),
        },

        methods: {
            ...mapActions(['setMessage']),

            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog',
            }),
            addRow(account) {
                account.items.push(this.chequeStructure)
            },
            setItems() {
                this.chequeAccounts = JSON.parse(JSON.stringify(this.chequeAccountsData.filter(account => account.options.opening_balance)))
                this.activeAccount = this.chequeAccounts ? this.chequeAccounts[0] : {}
                this.chequeAccounts.map(account => {
                    this.$set(account, 'items', [])
                    while (account.items.length < this.pagination.rowsPerPage) {
                        account.items.push(JSON.parse(JSON.stringify(this.chequeStructure)))
                    }
                })
            },
            resetForm() {
                this.items = []
                this.date = null
                this.setItems()
            },

            save() {
                if(!this.isValidateTotalAmounts()) {
                    return false
                }

                if(this.activeAccount.assigned_account_id === 20 && !this.activeAccount.options.bank_id) {
                    this.$set(this.activeAccount, 'showBanksAccounts', true)
                    return false
                }

                var account = this.activeAccount

                account.items = account.items.reduce((filtered, item, index) => {
                    if (item.data.cheque_number) {
                        filtered.push(item)
                    }
                    return filtered
                }, [])

                balanceService.createCheques({account})
                    .then(() => {
                        updateAccountingAccounts()
                        this.toggleDialog('cheque_accounts')
                    })
            },

            saveAsDraft() {
                draftService.createAsDraft(this.chequeAccounts, draftService.TYPE_CHEQUES_ACCOUNTS, this.activeAccount.id)
            },

            getLatestRecords() {
                balanceService.getLatestRecords('cheque_accounts', this.activeAccount.id)
                    .then((response) => {
                        if(!response.length) {
                            return this.getDrafts()
                        }

                        this.chequeAccounts.forEach(account => {
                            account.items = []
                            for (let id in response) {
                                let item = response[id]
                                let data = item.data
                                // put only compatible records to account
                                if(account.id != item.account_id) {
                                    continue

                                }

                                account.items.unshift({
                                    id: item.item_id,
                                    date: data.date,
                                    description: data.description,
                                    amount: data.amount,
                                    data: data.data,

                                })
                            }
                            while (account.items.length < this.pagination.rowsPerPage) {
                                account.items.push(JSON.parse(JSON.stringify(this.chequeStructure)))
                            }

                        })
                    })
            },

            deleteRow(account, index) {
                account.items.splice(index, 1)
            },

            totalAmount(account) {
                let total = 0
                account.items.forEach(({amount}) => {
                    total += parseInt(amount || 0)
                })
                return this.formatToInteger(total)
            },

            isValidateTotalAmounts() {
                var valid = true

                this.chequeAccounts.map(account => {
                    let accountAmount = account.transaction.credit || account.transaction.debit
                    let totalAmount = this.totalAmount(account)

                    if(totalAmount > 0 && accountAmount != totalAmount) {
                        this.setMessage({ type: 'error', message: 'Total amount of ' + account.name + ' must be equal ' + this.formatMoney(accountAmount) })
                        valid = false
                    }

                })

                return valid
            },

            getDrafts() {
                draftService.getDraft(draftService.TYPE_CHEQUES_ACCOUNTS, this.activeAccount.id)
                    .then((response) => {
                        if(response.data) {
                            this.chequeAccounts = response.data.data || []
                        }
                    })
            },
        },

        watch: {
            pagination: {
                handler: 'setItems',
                deep: true
            },
            'activeAccount.id': 'getLatestRecords'
        },

        components: { Banks }
    }
</script>