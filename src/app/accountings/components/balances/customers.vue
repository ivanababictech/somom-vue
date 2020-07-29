<template>
    <v-card>
        <v-toolbar dense color="accent">
            <v-btn icon @click="toggleDialog('customers')">
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Add Customer</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn flat @click="saveAsDraft">Save as draft</v-btn>
        </v-toolbar>

        <v-card-text>
            <v-data-table
                    :headers="headers"
                    :items="items"
                    :pagination.sync="pagination"
                    :rows-per-page-items="rowsPerPageItems"
                    class="v-form-table">

                <template slot="items" slot-scope="props">
                    <td class="px-1">
                        <v-combobox
                                :items="accounts"
                                :value="props.item.name"
                                @input="accountChange(props.item, $event)"
                                item-text="name"
                                item-value="name"
                                hide-details
                                dense
                        ></v-combobox>
                    </td>
                    <td class="px-1">
                        <countries v-model="props.item.country_code" :hide-details="true" label=""></countries>
                    </td>
                    <td class="text-xs-center px-1">
                        <template v-if="checkEUCountry(props.item.country_code)">
                            <v-btn-toggle v-model="props.item.has_vat" v-if="!props.item.has_vat">
                                <v-btn flat :value="true">
                                    <span>Y</span>
                                </v-btn>
                                <v-btn flat :value="false">
                                    <span>N</span>
                                </v-btn>
                            </v-btn-toggle>

                            <v-text-field
                                    v-else
                                    v-model="props.item.vat_no"
                                    hide-details
                            ></v-text-field>
                        </template>
                    </td>
                    <td class="px-1">
                        <v-text-field
                                v-model="props.item.date"
                                mask="##/##/####"
                                :return-masked-value="true"
                                placeholder="29/01/1999"
                                hide-details
                        ></v-text-field>
                    </td>
                    <td class="px-1">
                        <v-text-field
                                v-model="props.item.due_date"
                                mask="##/##/####"
                                :return-masked-value="true"
                                placeholder="29/01/1999"
                                hide-details
                        ></v-text-field>
                    </td>
                    <td class="px-1">
                        <v-text-field
                                v-model="props.item.no"
                                hide-details
                        ></v-text-field>
                    </td>
                    <td class="px-1">
                        <v-text-field
                                type="number"
                                v-model="props.item.base_gross"
                                hide-details
                        ></v-text-field>
                    </td>
                    <td class="table__actions px-1">
                        <v-btn v-if="items.length > 1" icon flat small @click="deleteRow(props.index)">
                            <v-icon color="pink">clear</v-icon>
                        </v-btn>
                    </td>
                </template>
                <template slot="footer">
                    <td colspan="6"><strong>Total</strong></td>
                    <td class="text-xs-center"><strong>{{ formatMoney(total) }}</strong></td>
                    <td></td>
                </template>
            </v-data-table>
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
    import * as balanceService from './service'
    import {isEUCountry, isMTVATNo, isEUVATNo} from '@/util'

    export default {
        data: () => ({
            pagination: {
                rowsPerPage: 15,
            },
            rowsPerPageItems: [15, 30, 50],
            headers: [
                {text: 'Customer name', value: 'name', sortable: false, width: '300'},
                {text: 'Country', value: 'country', sortable: false, width: '300'},
                {text: 'Vat number', value: 'vat_number', sortable: false, width: '250'},
                {text: 'Invoice Date', value: 'date', sortable: false, width: '200'},
                {text: 'Invoice Due Date', value: 'date', sortable: false, width: '200'},
                {text: 'Invoice number', value: 'number', sortable: false, width: '250'},
                {text: 'Gross Amount', value: 'credit', sortable: false},
                {text: 'Action', value: 'action', sortable: false},
            ],
            search: '',
            date: null,
            items: [],
            customerStructure: {
                id: null,
                name: null,
                type: 'purchase',
                status: 'invoice',
                has_vat: null,
                vat_no: null,
                no: null,
                base_gross: null,
                data: {
                    contactDetails: {},
                    clientAddress: {},
                    relationship: {},
                }
            }
        }),

        mounted() {
            this.getLatestRecords()
            this.setItems()
        },

        computed: {
            ...mapGetters({
                accounts: 'accounting/itemAccounts',
                vatRates: 'settings/vatRates',
                debtorAccount: 'accounting/debtorAccount',
            }),


            accounts() {
                return this.items.filter(item => item.name)
            },

            total() {
                return this.items.reduce((a, b) => {
                    return a + this.formatToInteger(b.base_gross)
                }, 0)
            }
        },

        methods: {
            ...mapActions(['setMessage']),

            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog',
            }),

            accountChange(customer, $event) {
                if (typeof $event === 'string') {
                    customer.name = $event
                }
                if (typeof $event === 'object') {
                    customer.name = $event.name
                    customer.country_code = $event.country_code
                    customer.data = $event.data
                    customer.vat_no = $event.vat_no
                    customer.has_vat = $event.has_vat
                }
            },

            setItems() {
                while (this.items.length < this.pagination.rowsPerPage) {
                    this.items.push(JSON.parse(JSON.stringify(this.customerStructure)))
                }
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

                const items = this.items.reduce((filtered, item, index) => {
                    if (item.name) {
                        filtered.push(item)
                    }
                    return filtered
                }, [])

                inventoryService.createCustomers({items})
                    .then(() => {
                        this.toggleDialog('customers')
                    })
            },
            saveAsDraft() {
                draftService.createAsDraft(this.items, 'customers')
            },
            getLatestRecords() {
                balanceService.getLatestRecords('customers')
                    .then((response) => {
                        if(!response.length) {
                            return this.getDrafts()
                        }

                        response.map(item => {
                            let data = item.data

                            this.items.unshift({
                                id: item.item_id,
                                transaction_id: data.transaction_id,
                                name: data.name,
                                country_code: data.country_code,
                                has_vat: data.has_vat,
                                vat_no: data.vat_no,
                                date: data.date,
                                due_date: data.due_date,
                                no: data.no,
                                base_gross: data.base_gross,
                                data: data.data,

                            })
                        })
                        while (this.items.length < this.pagination.rowsPerPage) {
                            this.items.push(JSON.parse(JSON.stringify(this.customerStructure)))
                        }
                    })
            },

            getDrafts() {
                draftService.getDraft('customers')
                    .then((response) => {
                        if(response.data) {
                            this.items = response.data.data || []
                        }
                    })
            },

            deleteRow(index) {
                this.items.splice(index, 1)
            },
            checkEUCountry(countryCode) {
                if(countryCode) {
                    return isEUCountry(countryCode)
                }

                return true
            },

            isValidateTotalAmounts() {
                var valid = true

                if(!this.debtorAccount.transaction) {
                    return true
                }

                let accountAmount = this.debtorAccount.transaction.credit || this.debtorAccount.transaction.debit

                // if debtors control a/c is on the credit
                // for validation purposes it means -3,000 and not 3,000
                if(this.debtorAccount.transaction.credit) {
                    accountAmount = accountAmount * -1
                }

                if(accountAmount != this.total) {
                    this.setMessage({ type: 'error', message: 'Total amount must be equal ' + this.formatMoney(accountAmount) })
                    valid = false
                }

                return valid
            },
        },

        watch: {
            pagination: {
                handler: 'setItems',
                deep: true
            },
        },
    }
</script>