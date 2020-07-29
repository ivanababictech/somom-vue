<template>
    <div>
        <v-card>
            <accounting-toolbar
                    :fixed="false"
                    title="Add Asset Registrar"
                    supplier
                    @toggleDialog="toggleDialog('asset_registrar')"
                    @saveAsDraft="saveAsDraft">
            </accounting-toolbar>

            <v-card-text>
                <v-tabs class="accent" grow>
                    <v-tab
                            v-for="account in filteredAccounts"
                            :key="account.id"
                            @click="activeAccount = account"
                            class="black--text">
                        {{ account.name }}
                    </v-tab>
                    <v-tab-item v-for="account in accounts" :key="account.id">
                        <v-data-table
                                :headers="headers"
                                :items="account.items"
                                :pagination.sync="pagination"
                                :rows-per-page-items="rowsPerPageItems"
                                class="v-form-table">

                            <template slot="items" slot-scope="props">

                                <td>
                                    <v-text-field
                                            v-model="props.item.name"
                                            hide-details
                                    ></v-text-field>
                                </td>
                                <td>
                                    <v-text-field
                                            v-model="props.item.annum"
                                            mask="####"
                                            placeholder="1999"
                                            hint="For example, 1989"
                                            :return-masked-value="true"
                                            hide-details
                                    ></v-text-field>
                                </td>
                                <td>
                                    <v-text-field
                                            v-model="props.item.description"
                                            hide-details
                                    ></v-text-field>
                                </td>
                                <td>
                                    <v-text-field
                                            v-model="props.item.no"
                                            hide-details
                                    ></v-text-field>
                                </td>
                                <td>
                                    <v-text-field
                                            v-model="props.item.amount"
                                            hide-details
                                    ></v-text-field>
                                </td>
                                <td class="table__actions">
                                    <v-btn v-if="account.items.length > 1" icon flat small
                                           @click="deleteRow(account, props.index)">
                                        <v-icon color="pink">clear</v-icon>
                                    </v-btn>
                                </td>
                            </template>
                            <template slot="footer">
                                <td colspan="4">
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
        </v-card>
        <credit-ppe-accounts :accounts="creditPpeAccounts"></credit-ppe-accounts>
    </div>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import * as balanceService from '../service'
    import * as draftService from '../../dialogs/draftService'
    import {updateAccountingAccounts} from '@/api/accounting'
    import CreditPpeAccounts from './credit-ppe-accounts'
    import AccountingToolbar from '@/app/accountings/components/dialogs/components/toolbar.vue'

    export default {
        data: () => ({
            pagination: {
                rowsPerPage: 10,
            },
            activeAccount: {},
            rowsPerPageItems: [10, 20, 50],
            headers: [
                {text: 'Supplier name', value: 'data.cheque_number', align: 'left', sortable: false, width: '160'},
                {text: 'Annum', value: 'annum', align: 'left', sortable: false, width: '90'},
                {text: 'Description', value: 'description', align: 'left', sortable: false, width: '160'},
                {text: 'Invoice number', value: 'no', align: 'left', sortable: false, width: '80'},
                {text: 'Cost amount', value: 'amount', align: 'left', sortable: false, width: '80'},
                {text: 'Actions', value: null, align: 'left', sortable: false, width: '80'},
            ],
            search: '',
            items: [],
            chequeAccounts: [],
            assetRegistrarStructure: {
                id: null,
                data: {
                    cheque_number: null
                },
                annual: null,
                description: null,
                amount: null,
            },
            accounts: [],

        }),

        mounted() {
            this.setItems()
        },

        computed: {
            ...mapGetters({
                vatRates: 'settings/vatRates',
                debtorAccount: 'accounting/debtorAccount',
                propertyPlantAccounts: 'accounting/propertyPlantAccounts',
            }),

            filteredAccounts() {
                return this.accounts.filter(account => account.transaction.debit)
            },

            creditPpeAccounts() {
                return this.accounts.filter(account => account.transaction.credit)
            }
        },

        methods: {
            ...mapActions(['setMessage']),

            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog',
            }),
            setItems() {

                this.accounts = JSON.parse(JSON.stringify(this.propertyPlantAccounts))
                this.activeAccount = this.accounts ? this.accounts[0] : {}

                this.accounts.map(account => {
                    this.$set(account, 'items', [])

                    while (account.items.length < this.pagination.rowsPerPage) {
                        account.items.push(JSON.parse(JSON.stringify(this.assetRegistrarStructure)))
                    }
                })
            },

            resetForm() {
                this.items = []
                this.setItems()
            },

            save() {
                if (!this.isValidateTotalAmounts()) {
                    return false
                }

                var account = this.activeAccount

                account.items = account.items.reduce((filtered, item, index) => {
                    if (item.name && item.amount) {
                        filtered.push(item)
                    }
                    return filtered
                }, [])

                balanceService.createAssetRegistrars({account})
                    .then(() => {
                        updateAccountingAccounts()
                        this.toggleDialog('asset_registrar')
                    })
            },

            saveAsDraft() {
                draftService.createAsDraft(this.accounts, draftService.TYPE_ASSET_REGISTRARS, this.activeAccount.id)
            },

            getLatestRecords() {
                balanceService.getLatestRecords('asset_registrars', this.activeAccount.id)
                    .then((response) => {
                        if (!response.length) {
                            return this.getDrafts()
                        }

                        this.accounts.forEach(account => {
                            account.items = []
                            for (let id in response) {
                                let item = response[id]
                                let data = item.data
                                // put only compatible records to account
                                if (account.id != item.account_id) {
                                    continue

                                }

                                account.items.unshift({
                                    id: item.item_id,
                                    name: data.name,
                                    annual: data.annual,
                                    description: data.description,
                                    no: data.no,
                                    amount: data.amount,
                                    depreciation: data.depreciation,

                                })
                            }
                            while (account.items.length < this.pagination.rowsPerPage) {
                                account.items.push(JSON.parse(JSON.stringify(this.assetRegistrarStructure)))
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

                this.accounts.map(account => {
                    let accountAmount = account.transaction.credit || account.transaction.debit
                    let totalAmount = this.totalAmount(account)

                    if (totalAmount > 0 && accountAmount != totalAmount) {
                        this.setMessage({
                            type: 'error',
                            message: 'Total amount of ' + account.name + ' must be equal ' + this.formatMoney(accountAmount)
                        })
                        valid = false
                    }

                })

                return valid
            },

            getDrafts() {
                draftService.getDraft(draftService.TYPE_ASSET_REGISTRARS, this.activeAccount.id)
                    .then((response) => {
                        if (response.data) {
                            this.accounts = response.data.data || []
                        }
                    })
            },
        },

        watch: {
            'activeAccount.id': 'getLatestRecords'
        },

        components: { AccountingToolbar, CreditPpeAccounts }
    }
</script>