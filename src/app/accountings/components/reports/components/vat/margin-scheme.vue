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
                <tr>
                    <td>{{ props.item.item.code }}</td>
                    <td>{{ props.item.item.name }}</td>
                    <td>{{ props.item.sales_qty }}</td>
                    <td>{{ formatMoney(props.item.sales_amount) }}</td>
                    <td>{{ props.item.purchases_qty }}</td>
                    <td>{{ formatMoney(props.item.purchases_amount) }}</td>
                    <td>{{ props.item.item.qty }}</td>
                    <td>{{ formatMoney(props.item.item.total_cost) }}</td>
                    <td>{{ formatMoney(getProfit(props.item)) }}</td>
                    <td>{{ formatMoney(getProfit(props.item) * tax / 100) }}</td>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    export default {

        data: () => ({
            headers: [
                {text: 'Item Code', value: 'id'},
                {text: 'Item Name', value: 'name'},
                {text: 'Sales Quantity', value: 'name'},
                {text: 'Sales Amount', value: 'qty'},
                {text: 'Purchase Quantity', value: 'qty'},
                {text: 'Purchase Amount', value: 'qty'},
                {text: 'Inventory Quantity', value: 'qty'},
                {text: 'Inventory Cost', value: 'qty'},
                {text: 'Profit (Loss)', value: 'qty'},
                {text: 'Vat', value: 'qty'},
            ],
            tax: 18
        }),

        props: ['vatReports'],

        mounted() {
            this.getVatReports()
        },

        methods: {
            getVatReports() {
                this.$emit('get-vat-reports')
            },

            getProfit(item) {
                return item.sales_amount - item.purchases_amount + item.item.total_cost
            }
        },


        watch: {
            currentPage() {
                this.getVatReports()
            },
        },
    }
</script>

<style scoped>

</style>