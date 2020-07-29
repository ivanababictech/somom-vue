<template>
    <v-data-table
            :headers="headers"
            :items="debtors.data"
            hide-actions
            item-key="account_id"
            class="table-reports"
            :disable-initial-sort="true">

        <template slot="items" slot-scope="props">
            <tr @click="selectedAccountId = props.item.account_id;getItems(props)">
                <td>{{ props.item.account.name }}</td>
                <td>{{ formatMoney(props.item.cost_amount) }}</td>
            </tr>
        </template>
        <template slot="expand" slot-scope="props">
            <v-data-table :headers="itemHeaders" :items="items.data" item-key="ii_id" dark hide-actions :disable-initial-sort="true">
                <template slot="items" slot-scope="props">
                    <tr>
                        <td>{{ props.item.item.name }}</td>
                        <td>{{ props.item.invoice.date | formatDate }}</td>
                        <td>{{ props.item.invoice ? props.item.invoice.no : '' }}</td>
                        <td>{{ props.item.description }}</td>
                        <td>{{ formatMoney(props.item.price) }}</td>
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
    import * as vatService from './service'

    export default {

        data: () => ({
            headers: [
                {text: 'Account Name', value: 'name'},
                {text: 'Invoices', value: 'qty'},
            ],
            itemHeaders: [
                {text: 'Type', value: 'type'},
                {text: 'Date', value: 'name'},
                {text: 'Inv No', value: 'no'},
                {text: 'Description', value: 'description'},
                {text: 'Amount', value: 'amount'},
            ],
            currentPage: 1,
            selectedCustomerId: 0,
            type: 'transaction-history'
        }),

        props: ['debtors', 'items'],

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
                    page: this.currentPage
                }

                this.$emit('get-items', this.selectedAccountId, 'accounts', params)
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