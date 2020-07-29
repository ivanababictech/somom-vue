<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="vatReports.data"
                hide-actions
                item-key="id"
                class="table-reports"
                :disable-initial-sort="true">

            <template slot="items" slot-scope="props">
                <tr @click="selectedVatCodeId = props.item.id;getItems(props)"
                    v-if="props.item.sales_services_amount || props.item.sales_goods_amount">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.vat_no }}</td>
                    <td>{{ formatMoney(props.item.sales_services_amount) }}</td>
                    <td>{{ formatMoney(props.item.sales_goods_amount) }}</td>
                </tr>
            </template>
            <template slot="footer">
                <td colspan="2">
                    <strong>Total</strong>
                </td>
                <td>{{ formatMoney(totals.sales_services_amount) }}</td>
                <td>{{ formatMoney(totals.sales_goods_amount) }}</td>
            </template>
            <template slot="expand" slot-scope="props">
                <v-data-table :headers="itemHeaders" :items="items.data" item-key="ii_id" dark hide-actions :disable-initial-sort="true">
                    <template slot="items" slot-scope="props">
                        <tr>
                            <td>{{ props.item.invoice_id }}</td>
                            <td>{{ props.item.invoice.date | formatDate }}</td>
                            <td>{{ props.item.invoice.no }}</td>
                            <td>{{ props.item.account.sub_account.name }}</td>
                            <td>{{ props.item.invoice.comment }}</td>
                            <td>{{ formatMoney(props.item.total_amount) }}</td>
                        </tr>
                    </template>
                </v-data-table>

                <div class="text-xs-center" v-if="items.last_page > 1">
                    <v-pagination :length="items.last_page" v-model="currentPage" :total-visible="7"></v-pagination>
                </div>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    export default {

        data: () => ({
            headers: [
                {text: 'Customer Name', value: 'customer_name'},
                {text: 'Vat Number', value: 'vat_number'},
                {text: 'Amount services', value: 'services'},
                {text: 'Amount goods', value: 'goods'},
            ],
            itemHeaders: [
                {text: 'Id', value: 'id'},
                {text: 'Date', value: 'name'},
                {text: 'Inv No', value: 'no'},
                {text: 'Type', value: 'type'},
                {text: 'Description', value: 'description'},
                {text: 'Amount', value: 'amount'},
            ],
            currentPage: 1,
            selectedVatCodeId: 0,
            type: 'recap-statement'
        }),

        props: ['vatReports', 'items'],

        computed: {
            totals() {
                let sales_services_amount = 0
                let sales_goods_amount = 0
                /*this.vatReports.forEach((report) => {
                    sales_services_amount += report.sales_services_amount || 0
                    sales_goods_amount += report.sales_goods_amount || 0
                })*/

                return {sales_services_amount, sales_goods_amount}
            },
        },

        mounted() {
            this.getVatReports()
        },

        methods: {
            getVatReports() {
                this.$emit('get-vat-reports', this.type)
            },

            getItems(item) {
                if(item) {
                    item.expanded = !item.expanded
                }

                const params = {
                    page: this.currentPage
                }

                this.$emit('get-items', this.selectedVatCodeId, 'customers', params)
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