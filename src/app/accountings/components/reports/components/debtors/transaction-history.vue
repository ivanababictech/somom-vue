<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="debtors.data"
                hide-actions
                item-key="id"
                class="table-reports"
                :disable-initial-sort="true">

            <template slot="items" slot-scope="props">
                <tr @click="selectedCustomerId = props.item.id;getItems(props)">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.country_code }}</td>
                    <td>{{ formatMoney(props.item.balance.debit) }}</td>
                    <td>{{ formatMoney(props.item.balance.credit) }}</td>
                    <td>{{ formatMoney(props.item.balance.balance) }}</td>
                </tr>
            </template>
            <template slot="expand" slot-scope="props">
                <v-data-table :headers="invoiceHeaders" :items="items.data" item-key="id" hide-actions :disable-initial-sort="true">
                    <template slot="items" slot-scope="props">
                        <tr>
                            <td>{{ props.item.date }}</td>
                            <td>{{ props.item.type }}</td>
                            <td>{{ props.item.invoice ? props.item.invoice.no : ''}}</td>
                            <td>{{ props.item.description }}</td>
                            <td class="text-xs-left">{{ formatMoney(props.item.balance ? props.item.balance.debit : 0) }}</td>
                            <td class="text-xs-left">{{ formatMoney(props.item.balance ? props.item.balance.credit : 0) }}</td>
                            <td class="text-xs-left">{{ formatMoney(props.item.balance ? props.item.balance.balance : 0) }}</td>
                            <td class="text-xs-left">{{ getForeignAmount(props.item) }} {{ props.item.currency }}</td>
                        </tr>
                    </template>
                </v-data-table>

                <div class="text-xs-center" v-if="items.last_page > 1">
                    <v-pagination :length="items.last_page" v-model="invoiceCurrentPage" :total-visible="7"></v-pagination>
                </div>
            </template>
        </v-data-table>

        <div class="text-xs-center" v-if="debtors.last_page > 1">
            <v-pagination :length="debtors.last_page" v-model="currentPage" :total-visible="7"></v-pagination>
        </div>
    </div>
</template>

<script>
    export default {

        data: () => ({
            currentPage: 1,
            invoiceCurrentPage: 1,
            headers: [
                {text: 'Id', align: 'left', value: 'id'},
                {text: 'Name', align: 'left', value: 'name'},
                {text: 'Country', align: 'left', value: 'country_code'},
                {text: 'Total payments', align: 'left', value: 'total_payments'},
                {text: 'Total invoices', align: 'left', value: 'total_invoices'},
                {text: 'Balance', align: 'left', value: 'balance'},
            ],
            invoiceHeaders: [
                {text: 'Date', align: 'left', value: 'date'},
                {text: 'Type', align: 'left', value: 'type'},
                {text: 'Invoice number', align: 'left', value: 'invoice_number'},
                {text: 'Description', align: 'left', value: 'description'},
                {text: 'Payments', align: 'left',value: 'debit'},
                {text: 'Invoices', align: 'left',value: 'credit'},
                {text: 'Foreign amount', align: 'left',value: 'foreign_amount'},
            ],
            selectedCustomerId: 0,
            type: 'transaction-history'
        }),

        props: ['debtors', 'items'],

        mounted() {
            this.getReports()
        },

        methods: {
            getReports() {
                this.$emit('get-reports', this.type)
            },

            getItems(item) {
                if(item) {
                    item.expanded = !item.expanded
                }

                const params = {
                    page: this.invoiceCurrentPage
                }

                this.$emit('get-items', this.selectedCustomerId, 'customers', params)
            },

            isSale(item) {
                return item.type === 'sale'
            },

            isPurchase(item) {
                return item.type === 'purchase'
            },

            getForeignAmount(item) {
                return item.base_currency != item.currency ? this.formatMoney(item.foreign_amount) : ''
            },
        },


        watch: {
            currentPage() {
                this.getReports()
            },
            invoiceCurrentPage() {
                this.getItems()
            },
        },
    }
</script>

<style scoped>

</style>