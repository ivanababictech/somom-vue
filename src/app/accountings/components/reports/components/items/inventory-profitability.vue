<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="inventories.data"
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
                    <td>{{ props.item.opening_qty }}</td>
                    <td>{{ formatMoney(props.item.opening_cost) }}</td>
                    <td>{{ props.item.item.qty }}</td>
                    <td>{{ formatMoney(getInventoryCost(props.item.item)) }}</td>
                    <td>{{ formatMoney(getProfit(props.item)) }}</td>
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
                {text: 'Opening Quantity', value: 'opening_quantity'},
                {text: 'Opening Cost', value: 'opening_cost'},
                {text: 'Inventory Quantity', value: 'qty'},
                {text: 'Inventory Cost', value: 'qty'},
                {text: 'Profit (Loss)', value: 'qty'},
            ],
            type: 'margin-scheme',
            filters: {},
            search: '',
            currentPage: 1
        }),

        props: ['inventories'],

        methods: {
            getVatReports() {
                this.$emit('get-vat-reports')
            },

            getInventoryCost(item) {
                return item.qty * item.unit_cost
            },

            getProfit(item) {
                return parseInt(item.sales_amount || 0) - parseInt(item.purchases_amount || 0) - parseInt(item.opening_cost || 0) + this.getInventoryCost(item.item)
            },
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