<template>
    <v-data-table
            :headers="headers"
            :items="debtors.data"
            hide-actions
            item-key="account_id"
            class="table-reports"
            :disable-initial-sort="true">

        <template slot="items" slot-scope="props">
            <tr @click="selectedCustomerId = props.item.id;getItems(props)">
                <td>{{ props.item.account.name }}</td>
                <td>{{ formatMoney(props.item.cost_amount) }}</td>
                <td>{{ props.item.sales_qty }}</td>
                <td>{{ props.item.sales_qty }}</td>
            </tr>
        </template>
        <template slot="expand" slot-scope="props">
            <v-data-table :headers="itemHeaders" :items="items.data" item-key="id" dark hide-actions>
                <template slot="items" slot-scope="props">
                    <tr>
                        <td>{{ props.item.invoice.date | formatDate }}</td>
                        <td>{{ props.item.invoice.no }}</td>
                        <td>{{ props.item.invoice.comment }}</td>
                        <td>{{ formatMoney(props.item.amount) }}</td>
                    </tr>
                </template>
            </v-data-table>

            <div class="text-xs-center" v-if="items.last_page > 1">
                <v-pagination :length="items.last_page" v-model="currentPage" :total-visible="7"></v-pagination>
            </div>
        </template>
    </v-data-table>
</template>

<script>
    export default {

        data: () => ({
            headers: [
                {text: 'Account Name', value: 'customer_name'},
                {text: 'Cost Amount', value: 'cost_amount'},
                {text: 'Depreciation', value: 'depreciation'},
                {text: 'Net Book Value', value: 'net_book_value'},
            ],
            itemHeaders: [
                {text: 'Date', value: 'name'},
                {text: 'Inv No', value: 'no'},
                {text: 'Description', value: 'description'},
                {text: 'Amount', value: 'amount'},
            ],
            currentPage: 1,
            selectedCustomerId: 0,
            type: 'vat-return'
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
                    page: this.currentPage
                }

                this.$emit('get-items', this.selectedCustomerId, 'customers', params)
            },
        },

        watch: {
            currentPage() {
                this.getItems()
            },
        },
    }
</script>

<style scoped>

</style>