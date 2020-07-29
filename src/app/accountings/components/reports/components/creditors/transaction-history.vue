<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="creditors.data"
                hide-actions
                item-key="id"
                class="table-reports"
                :disable-initial-sort="true">

            <template slot="items" slot-scope="props">
                <tr @click="selectedSupplierId = props.item.id;getItems(props)">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.country_code }}</td>
                    <td>{{ formatMoney(props.item.balance.payment) }}</td>
                    <td>{{ formatMoney(props.item.balance.debit) }}</td>
                    <td>{{ formatMoney(props.item.balance.balance) }}</td>
                </tr>
            </template>
            <template slot="expand" slot-scope="props">
                <v-data-table :headers="itemHeaders" :items="items.data" item-key="ii_id" hide-actions :disable-initial-sort="true">
                    <template slot="items" slot-scope="props">
                        <tr>
                            <td>{{ props.item.date }}</td>
                            <td>{{ props.item.type }}</td>
                            <td>{{ props.item.invoice ? props.item.invoice.no : ''}}</td>
                            <td>{{ props.item.description }}</td>
                            <td class="text-xs-left">{{ formatMoney(props.item.balance ? props.item.balance.credit : 0) }}</td>
                            <td class="text-xs-left">{{ formatMoney(props.item.balance ? props.item.balance.debit : 0) }}</td>
                            <td class="text-xs-left">{{ getForeignAmount(props.item) }} {{ props.item.currency }}</td>
                        </tr>
                    </template>
                </v-data-table>

                <div class="text-xs-center" v-if="items.last_page > 1">
                    <v-pagination :length="items.last_page" v-model="invoiceCurrentPage" :total-visible="7"></v-pagination>
                </div>
            </template>
        </v-data-table>

        <div class="text-xs-center" v-if="creditors.last_page > 1">
            <v-pagination :length="creditors.last_page" v-model="currentPage" :total-visible="7"></v-pagination>
        </div>
    </div>
</template>

<script>
    import * as vatService from './service'

    export default {

        data: () => ({
            headers: [
                {text: 'Id', align: 'left', value: 'id'},
                {text: 'Supplier Name', value: 'name'},
                {text: 'Country', value: 'country'},
                {text: 'Total payments', value: 'total_payments'},
                {text: 'Total invoices', value: 'total_invoices'},
                {text: 'Balance', value: 'balance'},
            ],
            itemHeaders: [
                {text: 'Type', value: 'type'},
                {text: 'Date', value: 'name'},
                {text: 'Inv No', value: 'no'},
                {text: 'Description', value: 'description'},
                {text: 'Payments', align: 'left',value: 'debit'},
                {text: 'Invoices', align: 'left',value: 'credit'},
                {text: 'Foreign amount', align: 'left',value: 'foreign_amount'},
            ],
            currentPage: 1,
            invoiceCurrentPage: 1,
            selectedSupplierId: 0,
            type: 'transaction-history'
        }),

        props: ['creditors', 'items'],

        mounted() {
            this.getVatCodes()
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

                this.$emit('get-items', this.selectedSupplierId, 'suppliers', params)
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