<template>
    <v-dialog lazy v-model="dialog" scrollable class="fluid" max-width="900">
        <v-btn flat small block slot="activator">Select invoice</v-btn>
        <v-card>
            <v-card-title>
                Select one or many invoices
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;">

                <v-data-table
                        :headers="headers"
                        :items="invoices"
                        :search="search"
                        item-key="id"
                        class="v-form-table">

                    <template slot="headerCell" slot-scope="props">
                        <v-tooltip bottom>
                            <span slot="activator">
                                {{ props.header.text }}
                            </span>
                            <span>
                                {{ props.header.text }}
                          </span>
                        </v-tooltip>
                    </template>

                    <template slot="items" slot-scope="props">
                        <td>
                            <v-checkbox
                                    primary
                                    hide-details
                                    v-model="props.item.selected"
                            ></v-checkbox>
                        </td>
                        <td>{{ props.item.date }}</td>
                        <td class="text-xs-right">{{ props.item.invoice.no }}</td>
                        <td class="text-xs-right">{{ props.item.base_currency }} {{ formatMoney(props.item.amount) }}</td>
                        <td class="text-xs-right">
                            {{ currencySymbol(props.item.base_currency) }}
                            {{ formatMoney(props.item.amount - props.item.invoice.total_payment) }} /
                            ( {{ currencySymbol(currency) }} {{ formatMoney(props.item.foreign_max_amount) }})
                        </td>
                        <td class="text-xs-right">
                            <v-text-field placeholder="Amount" :suffix="currencySymbol(item.currency)"
                                          v-model.number="props.item.invoice_amount"
                                          :disabled="!props.item.selected"
                            ></v-text-field>
                        </td>
                    </template>

                    <template slot="footer">
                        <td colspan="4">
                            <strong>Total</strong>
                        </td>
                        <td class="text-xs-right" colspan="2">
                            {{ formatMoney(totalPayments) }} {{ currencySymbol(item.currency) }} /
                            ({{ maxAmount + ' ' + currencySymbol(item.currency) }})
                        </td>
                    </template>
                </v-data-table>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click.native="dialog = false">Cancel</v-btn>
                <v-btn color="primary" flat @click.native="submit">OK</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import * as allocationTypeService from '@/app/settings/accounting/allocation-types/service'
    import * as invoiceService from '../invoices/service'
    import * as currencyService from '@/app/settings/currencies/service'

    export default {
        props: {
            item: Object,
            currency: String,
            maxAmount: Number
        },

        data: () => ({
            dialog: false,
            transactions: {
                data: []
            },
            search: '',
            headers: [
                {text: null, value: null, align: 'left', sortable: false},
                {text: 'Date', value: 'date', align: 'left'},
                {text: 'Invoice no', value: 'no', align: 'right'},
                {text: 'Invoice amount', value: 'base_gross', align: 'right'},
                {text: 'Amount outstanding', value: 'base_gross', align: 'right'},
                {text: 'Payment', value: 'amount', align: 'right', sortable: false}
            ],
        }),

        mounted() {
            this.getInvoices()
        },

        computed: {
            ...mapGetters({
                currencySymbol: 'settings/currencySymbol',
            }),
            invoices() {
                return this.transactions.data
                    .filter(transaction => transaction.amount > 0 && transaction.type != 'credit_note' && transaction.type != 'debit_note')
                    .map(transaction => {
                        transaction.max_amount = transaction.amount - transaction.invoice.total_payment
                        return transaction
                    })
                },
            selected() {
                return this.invoices.filter(({selected}) => selected)
            },
            totalPayments() {
                let total = 0
                this.selected.forEach(({invoice_amount}) => {
                    total += parseFloat(invoice_amount)
                })

                return this.formatToInteger(total)
            }
        },

        methods: {
            ...mapActions(['setMessage']),

            getInvoices() {
                const {allocation_type, allocation_id} = this.item
                var response = false
                let params = {
                    typeReconciled: 0
                }
                switch (allocation_type) {
                    case allocationTypeService.TYPE_SUPPLIERS_PAYMENT:
                        response = invoiceService.getInvoicesBySupplier(allocation_id, params)
                        break
                    case allocationTypeService.TYPE_CUSTOMERS_PAYMENT:
                        response = invoiceService.getInvoicesByCustomer(allocation_id, params)
                        break
                    default:
                        throw 'Allocation type is not valid: ' + allocation_type
                }

                response.then(response => {
                        this.transactions = response.data
                        this.transactions.data.map(transaction => {
                            this.getCurrencyEquivalent(transaction)
                        })
                    })

            },

            getCurrencyEquivalent(transaction) {
                currencyService.convertFromDB(this.item.date, this.currency, transaction.currency)
                    .then(response => {
                        this.$set(transaction, 'foreign_max_amount', transaction.max_amount * response.data)
                        this.$set(transaction, 'invoice_amount', this.formatMoney(transaction.max_amount * response.data, 2, 3, '',))
                    })
            },

            submit() {
                if(this.totalPayments != this.formatToInteger(this.maxAmount)) {
                    this.setMessage({ type: 'warning', message: 'The total must be equal ' + this.maxAmount })
                    return
                }

                const selected = this.selected.map(({invoice, invoice_amount}) => {
                    return {
                        invoice_id: invoice.id,
                        amount: invoice_amount
                    }
                })
                this.$emit('input', selected)
                this.dialog = false
            },
        },

        watch: {
            'item.allocation_id': {
                handler: 'getInvoices',
                deep: true

            }
        }
    }
</script>