<template>
    <v-card class="px-3">
        <v-layout wrap>
            <v-flex xs12 sm4 md3>
                <v-autocomplete
                        v-if="isSaleInvoice"
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

            <v-flex xs12 sm4 md3 mx-3>
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
                :headers="headers"
                :items="invoices.data"
                hide-actions
                item-key="id"
                class="table-reports mt-3">

            <template slot="items" slot-scope="props">
                <tr>
                    <td>{{ props.item.date | formatDate }}</td>
                    <td>{{ props.item.no }}</td>
                    <td>
                        <span v-if="props.item.type == 'sale'">{{ props.item.customer.name }}</span>
                        <span v-else-if="props.item == 'purchase'">{{ props.item.supplier.name }}</span>
                    </td>
                    <td>{{ props.item.due_date | formatDate }}</td>
                    <td>{{ formatMoney(props.item.base_net) }}</td>
                    <td>{{ formatMoney(props.item.base_vat) }}</td>
                    <td>{{ formatMoney(props.item.base_gross) }}</td>
                    <td>{{ props.item.currency }} {{ formatMoney(props.item.gross) }}</td>
                    <td>
                        <v-icon color="info" @click.prevent="getItems(props)">
                            {{ props.expanded ? 'visibility_off' : 'visibility' }}
                        </v-icon>
                        <v-icon color="amber accent-4" @click.prevent="editRecord(props.item)">edit</v-icon>
                        <v-icon color="red darken-2" @click.prevent="deleteRecord(props.item)">delete</v-icon>
                    </td>
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

    </v-card>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import * as reportService from './../../../reports/service'
    import * as invoiceService from '../service'

    export default {
        data: () => ({
            headers: [
                {text: 'Date', value: 'date'},
                {text: 'Inv no', value: 'no'},
                {text: 'Customer', value: 'customer.name'},
                {text: 'Due date', value: 'due_date'},
                {text: 'Net', value: 'net'},
                {text: 'Vat', value: 'vat'},
                {text: 'Gross', value: 'gross'},
                {text: 'Foreign gross', value: 'base_gross'},
                {text: 'Actions', value: 'actions'}
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
            this.getSales()
        },

        props: ['type'],

        computed: {
            ...mapGetters({
                customers: 'accounting/customers',
                suppliers: 'accounting/suppliers',
                accounts: 'accounting/accounts',
                saleItems: 'accounting/saleItems',
            }),

            saleAccounts() {
                return this.accounts.filter(({assigned_account_id}) => [12, 14, 15].indexOf(assigned_account_id) !== -1)
            },

            isSaleOrPurchaseInovice() {
                return this.type == 'sale' || this.type == 'purchase'
            },

            isSaleInvoice() {
                return ['sale', 'payment_request', 'quote', 'credit_note'].indexOf(this.type) != -1
            },

            isPurchaseInvoice() {
                return ['purchase', 'purchase_order', 'purchase_quote', 'debit_note'].indexOf(this.type) != -1
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

            getSales() {
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

            editRecord(item) {
                this.$set(item, 'isEditable', true)

                this.$emit('edit-invoice', item)

                return false
            },

            deleteRecord(item) {
                invoiceService.deleteInvoice(item.id)
                    .then(response => {
                        this.getSales()
                    })
            },

            itemChanged(event) {
                if(event) {
                    this.filters.item_id = event.id
                    this.filters.item_type = event.type
                } else {
                    this.filters.item_id = null
                    this.filters.item_type = null
                }

                this.getSales()
            },

            getItems(item) {
                item.expanded = !item.expanded


                const params = {
                    page: this.currentPage,
                    filters: this.filters
                }

                if(!item.expanded) {
                    return false
                }

                invoiceService.getItems(item.item.id, params)
                    .then(response => {
                        this.items = response.data
                    })

            }
        },

        watch: {
            currentPage: 'getSales',
            filters: {
                handler() {
                    this.resetCurrentPage()
                    this.getSales()
                },
                deep: true
            },
        }
    }
</script>