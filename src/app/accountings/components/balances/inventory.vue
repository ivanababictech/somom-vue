<template>
    <v-card>
        <v-toolbar dense color="accent">
            <v-btn icon @click="toggleDialog('inventory')">
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Add Inventory</v-toolbar-title>
            <v-spacer></v-spacer>
            <account-dialog></account-dialog>
            <v-btn flat @click="saveAsDraft">Save as draft</v-btn>
        </v-toolbar>

        <v-card-text>
            <v-tabs grow>
                <v-tab v-for="account in inventoryAccounts" :key="account.id" @click="activeAccount = account">
                    {{ account.name }}
                </v-tab>
                <v-tab-item v-for="account in inventoryAccounts" :key="account.id">
                    <v-data-table
                            :headers="headers"
                            :items="account.items"
                            :rows-per-page-items="rowsPerPageItems"
                            class="v-form-table">

                        <template slot="items" slot-scope="props">

                            <td class="px-1">
                                <v-text-field
                                        v-model="props.item.code"
                                        hide-details
                                ></v-text-field>
                            </td>
                            <td class="px-1">
                                <v-text-field
                                        v-model="props.item.name"
                                        hide-details
                                ></v-text-field>
                            </td>
                            <td class="px-1">
                                <v-text-field
                                        v-model="props.item.purchase_price"
                                        hide-details
                                ></v-text-field>
                            </td>
                            <td class="px-1">
                                <v-layout align-end>
                                    <v-autocomplete
                                            :items="accounts(props.item, 'purchase')"
                                            v-model="props.item.purchase_account_id"
                                            item-text="name"
                                            item-value="id"
                                            hide-details
                                            dense>
                                    </v-autocomplete>
                                    <v-icon color="primary">add</v-icon>
                                </v-layout>
                            </td>
                            <td class="px-1">
                                <v-text-field
                                        v-model="props.item.sale_price"
                                        hide-details
                                ></v-text-field>
                            </td>
                            <td class="px-1">
                                <v-autocomplete
                                        :items="accounts(props.item, 'sale')"
                                        v-model="props.item.sale_account_id"
                                        item-text="name"
                                        item-value="id"
                                        hide-details
                                        dense
                                ></v-autocomplete>
                            </td>
                            <td class="px-1">
                                <v-autocomplete
                                        :items="vatRates"
                                        v-model="props.item.vat_rate_id"
                                        item-text="name"
                                        item-value="id"
                                        hide-details
                                        dense
                                ></v-autocomplete>
                            </td>
                            <td class="px-1">
                                <v-text-field
                                        v-model="props.item.qty"
                                        hide-details
                                ></v-text-field>
                            </td>
                            <td class="px-1">
                                <v-text-field
                                        v-model="props.item.unit_cost"
                                        hide-details
                                ></v-text-field>
                            </td>
                            <td class="px-1">
                                {{ cost(props.item) }}
                            </td>
                            <td class="table__actions px-1">
                                <v-btn v-if="account.items.length > 1" icon flat small @click="deleteRow(account, props.index)">
                                    <v-icon color="pink">clear</v-icon>
                                </v-btn>
                            </td>
                        </template>
                        <template slot="footer">
                            <td colspan="7">
                                <strong>Total</strong>
                            </td>
                            <td>{{ totalQty(account) }}</td>
                            <td></td>
                            <td>{{ formatMoney(totalCost(account)) }}</td>
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
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import * as inventoryService from './service'
    import * as draftService from './../dialogs/draftService'

    export default {
        data: () => ({
            activeAccount: {},
            pagination: {
                rowsPerPage: 15,
            },
            rowsPerPageItems: [7, 10, 20, 50],
            headers: [
                {text: 'Code', value: 'account_name', sortable: false},
                {text: 'Inventory name', value: 'assigned_account_id', sortable: false},
                {text: 'Purchase unit price', value: 'balance.vat_rate_id', sortable: false},
                {text: 'Purchases account', value: 'sub_account_id', sortable: false, width: '250'},
                {text: 'Sales unit price', value: 'fs_title', sortable: false},
                {text: 'Sales account', value: 'debit', sortable: false, width: '250'},
                {text: 'VAT Rate', value: 'credit', sortable: false, width: '250'},
                {text: 'Starting qty', value: 'credit', sortable: false},
                {text: 'Unit price', value: 'credit', sortable: false},
                {text: 'Cost', value: 'cost', sortable: false},
                {text: 'Action', sortable: false},
            ],
            search: '',
            date: null,
            items: [],
            inventoryAccounts: [],
            inventoryStructure: {
                id: null,
                type: 'inventory',
                code: null,
                name: null,
                purchases_unit_price: null,
                purchases_account: null,
                sales_unit_price: null,
                sales_account: null,
                vat_rate_id: 1,
                qty: null,
                unit_price: null
            }
        }),

        mounted() {
            this.getDrafts()
            this.setItems()
        },

        computed: {
            ...mapGetters({
                assignedAccounts: 'assignedAccounts',
                inventoryAccountsData: 'accounting/inventoryAccounts',
                accounts: 'accounting/itemAccounts',
                vatRates: 'settings/vatRates',
            }),
        },

        methods: {
            ...mapActions(['setMessage']),

            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog',
            }),
            setItems() {

                this.inventoryAccounts = JSON.parse(JSON.stringify(this.inventoryAccountsData.filter(account => account.options.opening_balance)))
                this.activeAccount = this.inventoryAccounts ? this.inventoryAccounts[0] : {}

                this.inventoryAccounts.map(account => {
                    this.$set(account, 'items', [])

                    while (account.items.length < this.pagination.rowsPerPage) {
                        account.items.push(JSON.parse(JSON.stringify(this.inventoryStructure)))
                    }
                })
            },

            resetForm() {
                this.items = []
                this.date = null
                this.setItems()
            },

            deleteRow(account, index) {
                account.items.splice(index, 1)
            },

            save() {
                if(!this.isValidateTotalAmounts()) {
                    return false
                }

                var account = this.activeAccount

                account.items = account.items.reduce((filtered, item, index) => {
                    if (item.name) {
                        filtered.push(item)
                    }
                    return filtered
                }, [])

                inventoryService.createInventories({account})
                    .then(() => {
                        this.resetForm()
                        this.toggleDialog('inventory')
                    })
            },

            saveAsDraft() {
                draftService.createAsDraft(this.inventoryAccounts, draftService.TYPE_INVENTORIES)
            },

            getLatestRecords() {
                inventoryService.getLatestRecords('inventories', this.activeAccount.id)
                    .then((response) => {
                        this.inventoryAccounts.forEach(account => {
                            account.items = []
                            for (let id in response) {
                                let item = response[id]
                                let data = item.data

                                account.items.unshift({
                                    code: data.code,
                                    id: item.item_id,
                                    name: data.name,
                                    purchase_account_id: data.purchase_account_id,
                                    purchase_price: data.purchase_price,
                                    qty: data.qty,
                                    unit_cost: data.unit_cost,
                                    sale_account_id: data.sale_account_id,
                                    sale_price: data.sale_price,
                                    type: data.type,
                                    vat_rate_id: data.vat_rate_id

                                })
                            }
                            while (account.items.length < this.pagination.rowsPerPage) {
                                account.items.push(JSON.parse(JSON.stringify(this.inventoryStructure)))
                            }
                        })
                    })
            },

            cost(item) {
                return (item.qty || 0) * (item.unit_cost || 0)
            },

            totalAmount(account) {
                let total = 0
                account.items.forEach(({unit_cost}) => {
                    total += parseInt(unit_cost || 0)
                })
                return this.formatToInteger(total)
            },

            totalQty(account) {
                let total = 0
                account.items.forEach(({qty}) => {
                    total += parseInt(qty || 0)
                })
                return total
            },

            totalCost(account) {
                let total = 0
                account.items.forEach(item => {
                    total += parseInt(this.cost(item))
                })

                return this.formatToInteger(total)
            },

            getDrafts() {
                draftService.getDraft(draftService.TYPE_INVENTORIES)
                    .then((response) => {
                        if(response.data) {
                            this.inventoryAccounts = response.data.data || []
                        } else {
                            this.getLatestRecords()
                        }
                    })
            },

            isValidateTotalAmounts() {
                var valid = true

                this.inventoryAccounts.map(account => {
                    let accountAmount = account.transaction.credit || account.transaction.debit
                    let totalAmount = this.totalCost(account)

                    if(totalAmount > 0 && accountAmount != totalAmount) {
                        this.setMessage({ type: 'error', message: 'Total amount of ' + account.name + ' must be equal ' + this.formatMoney(accountAmount) })
                        valid = false
                    }

                })

                return valid
            },
        },

        watch: {
            pagination: {
                handler: 'setItems',
                deep: true
            },
            'activeAccount.id': 'getDrafts'
        },
    }
</script>