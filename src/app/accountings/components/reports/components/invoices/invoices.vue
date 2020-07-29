<template>
    <div>

        <v-layout wrap>
            <v-flex xs12 sm4 md3>
                <v-autocomplete
                        v-if="type == 'sale'"
                        :items="customers"
                        v-model="filters.customer_id"
                        label="Customer"
                        item-text="name"
                        item-value="id"
                        hide-details
                        clearable
                        dense
                ></v-autocomplete>
                <v-autocomplete
                        v-else
                        :items="suppliers"
                        v-model="filters.supplier_id"
                        label="Supplier"
                        item-text="name"
                        item-value="id"
                        hide-details
                        clearable
                        dense
                ></v-autocomplete>
            </v-flex>

            <v-flex xs12 sm4 md3 class="mx-3">
                <v-autocomplete
                        :items="saleAccounts"
                        v-model="filters.account_id"
                        label="Account"
                        item-text="name"
                        item-value="id"
                        hide-details
                        clearable
                        dense
                ></v-autocomplete>
            </v-flex>

            <v-flex xs12 sm4 md3>
                <v-autocomplete
                        :items="saleItems"
                        @change="itemChanged"
                        label="Item"
                        item-text="name"
                        item-value="ii_id"
                        return-object
                        hide-details
                        clearable
                        dense
                ></v-autocomplete>
            </v-flex>
        </v-layout>
        <v-layout wrap>
            <v-flex xs6 sm4 md3>
                <date-picker label="From" v-model="filters.date_from" full-width hide-details
                             clearable></date-picker>
            </v-flex>
            <v-flex xs6 sm4 md3 mx-3>
                <date-picker label="To" v-model="filters.date_to" full-width hide-details clearable></date-picker>
            </v-flex>
            <v-flex xs12 sm4 md3>
                <v-text-field
                        append-icon="search"
                        label="Search"
                        v-model="search"
                        hide-details
                        clearable
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-data-table
                :headers="type == 'sale' ? saleHeaders : purchaseHeaders"
                :items="invoices.data"
                hide-actions
                item-key="id"
                class="table-reports mt-3">

            <template slot="items" slot-scope="props">
                <tr @click="getItems(props)">
                    <td>{{ props.item.date | formatDate }}</td>
                    <td>{{ props.item.no }}</td>
                    <td>
                        <span v-if="type == 'sale'">{{ props.item.customer.name }}</span>
                        <span v-else>{{ props.item.supplier.name }}</span>
                    </td>
                    <td>{{ props.item.due_date | formatDate }}</td>
                    <td>{{ formatMoney(props.item.base_net) }}</td>
                    <td>{{ formatMoney(props.item.base_vat) }}</td>
                    <td>{{ formatMoney(props.item.base_gross) }}</td>
                    <td>{{ props.item.currency }} {{ formatMoney(props.item.gross) }}</td>
                </tr>
            </template>

            <template slot="expand" slot-scope="props">
                <v-data-table :headers="itemHeaders" :items="items.data" item-key="id" hide-actions>
                    <template slot="items" slot-scope="props">
                        <tr @click="props.expanded = !props.expanded">
                            <td>{{ props.item.name }}</td>
                            <td>{{ props.item.description }}</td>
                            <td>{{ props.item.account.name }}</td>
                            <td>{{ props.item.qty }}</td>
                            <td>{{ formatMoney(props.item.base_price) }}</td>
                            <td>{{ props.item.vat_rate }}%</td>
                            <td>{{ formatMoney(itemBaseGross(props.item)) }}</td>
                            <td>{{ formatMoney(itemGross(props.item)) }}</td>
                        </tr>
                    </template>
                </v-data-table>
            </template>

            <template slot="footer">
                <td><strong>Total</strong></td>
                <td></td>
                <td></td>
                <td></td>
                <td><strong>{{ formatMoney(invoices.totals.net) }}</strong></td>
                <td><strong>{{ formatMoney(invoices.totals.vat) }}</strong></td>
                <td><strong>{{ formatMoney(invoices.totals.gross) }}</strong></td>
                <td></td>
            </template>
        </v-data-table>
        <div class="text-xs-center" v-if="invoices.last_page > 1">
            <v-pagination :length="invoices.last_page" v-model="currentPage" :total-visible="7"></v-pagination>
        </div>

    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import * as reportService from '../../service'
    import * as invoiceService from '../../../dialogs/invoices/service'

    export default {
        data: () => ({
            saleHeaders: [
                {text: 'Date', value: 'date'},
                {text: 'Inv no', value: 'no'},
                {text: 'Customer', value: 'customer.name'},
                {text: 'Due date', value: 'due_date'},
                {text: 'Net', value: 'net'},
                {text: 'Vat', value: 'vat'},
                {text: 'Gross', value: 'gross'},
                {text: 'Foreign gross', value: 'base_gross'},
            ],
            purchaseHeaders: [
                {text: 'Date', value: 'date'},
                {text: 'Inv no', value: 'no'},
                {text: 'Supplier', value: 'supplier.name'},
                {text: 'Due date', value: 'due_date'},
                {text: 'Net', value: 'net'},
                {text: 'Vat', value: 'vat'},
                {text: 'Gross', value: 'gross'},
                {text: 'Foreign gross', value: 'base_gross'},
            ],
            itemHeaders: [
                {text: 'Item', value: 'name'},
                {text: 'Description', value: 'description'},
                {text: 'Account', value: 'account.account_name'},
                {text: 'Qty', value: 'qty'},
                {text: 'Unit price', value: 'base_price'},
                {text: 'Vat rate', value: 'vat_rate'},
                {text: 'Gross', value: null},
                {text: 'Foreign gross', value: null},
            ],
            search: '',
            filters: {},
            invoices: {
                data: [],
                totals: {}
            },
            items: {
                data: []
            },
            currentPage: 1,
        }),

        mounted() {
            this.getInvoices()
        },

        props: ['type'],

        computed: {
            ...mapGetters({
                suppliers: 'accounting/suppliers',
                customers: 'accounting/customers',
                accounts: 'accounting/accounts',
                saleItems: 'accounting/saleItems',
            }),

            saleAccounts() {
                return this.accounts.filter(({assigned_account_id}) => [12, 14, 15].indexOf(assigned_account_id) !== -1)
            },
        },

        methods: {
            ...mapActions(['setFetching']),

            itemBaseGross({qty, base_price, vat_rate}) {
                const base_net = parseFloat(base_price) * qty
                const base_vat = base_net * vat_rate / 100
                return base_net + base_vat
            },
            itemGross({qty, price, vat_rate}) {
                const net = parseFloat(price) * qty
                const vat = net * vat_rate / 100
                return net + vat
            },

            getInvoices() {
                const params = {
                    type: this.type,
                    page: this.currentPage,
                    filters: this.filters
                }

                reportService.getReports('invoices', params)
                    .then(response => {
                        this.invoices = response.data
                    })
            },

            resetCurrentPage() {
                this.currentPage = 1
            },
            itemChanged(event) {
                if(event) {
                    this.filters.item_id = event.id
                    this.filters.item_type = event.type
                } else {
                    this.filters.item_id = null
                    this.filters.item_type = null
                }

                this.getInvoices()
            },

            getItems(item) {
                item.expanded = !item.expanded


                const params = {
                    page: this.currentPage,
                    filters: this.filters
                }

                invoiceService.getItems(item.item.id, params)
                    .then(response => {
                        this.items = response.data
                    })
            },

            exportReporting(format) {
                const params = {
                    format,
                    type: this.type,
                    page: this.currentPage,
                    filters: this.filters
                }

                reportService.exportReport('invoices', params)
            }
        },

        watch: {
            currentPage: 'getInvoices',
            filters: {
                handler() {
                    this.resetCurrentPage()
                    this.getInvoices()
                },
                deep: true
            },
        }
    }
</script>