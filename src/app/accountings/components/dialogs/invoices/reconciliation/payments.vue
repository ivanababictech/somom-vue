<template>
    <v-dialog lazy v-model="dialog" scrollable class="fluid" max-width="800">
        <v-btn flat small block slot="activator" @click="getPayments">{{ total }}</v-btn>
        <v-card v-if="invoice">
            <v-card-title> Payments of &nbsp; <b>{{ invoice.no }}</b></v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;">

                <v-data-table
                        :headers="headers"
                        :items="payments"
                        :search="search"
                        hide-actions
                        item-key="id"
                        class="v-form-table">
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.transaction.id }}</td>
                        <td>{{ props.item.transaction.date }}</td>
                        <td>{{ props.item.transaction.type_text }}</td>
                        <td>{{ getName(props.item) }}</td>
                        <td>{{ formatMoney(props.item.foreign_amount) }} {{ props.item.transaction.currency }}</td>
                        <td class="text-xs-right">
                            {{ formatMoney(props.item.amount) }}
                            {{ props.item.transaction.base_currency }}
                        </td>
                        <td>
                            <v-tooltip top>
                                <v-btn icon slot="activator" class="mx-0" @click="cancelPayment(props.item)">
                                    <v-icon color="warning">cancel</v-icon>
                                </v-btn>
                                <span>Cancel payment</span>
                            </v-tooltip>
                        </td>
                    </template>
                </v-data-table>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click.native="dialog = false">Cancel</v-btn>
                <v-btn color="primary" flat @click.native="dialog = false">OK</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import * as invoiceService from '../service'

    export default {
        props: ['invoice', 'total'],

        data: () => ({
            dialog: false,
            search: '',
            headers: [
                {text: 'Id', value: null, align: 'left', sortable: false},
                {text: 'Date', value: 'date', align: 'left'},
                {text: 'Type', value: 'no', align: 'left'},
                {text: 'Name', value: 'no', align: 'left'},
                {text: 'Amount', value: 'no', align: 'left'},
                {text: 'Base Amount', value: 'no', align: 'right'},
                {text: 'Actions', value: 'actions'},
            ],
            payments: []
        }),

        mounted() {
            //this.getPayments()
        },

        methods: {
            getPayments() {
                invoiceService.getPayments(this.invoice.id)
                    .then(response => {
                        this.payments = response.data
                    })
            },

            getName(item) {
                return item.transaction.account ? item.transaction.account.name : ''
            },

            cancelPayment(payment) {
                invoiceService.cancelPayment(this.invoice.id, payment.id)
                    .then(response => {
                        this.getPayments()

                        this.$emit('payment-canceled')
                    })
            }
        },
    }
</script>