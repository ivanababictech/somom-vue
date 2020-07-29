<template>
    <v-data-table
            :headers="headers"
            :items="products.data"
            hide-actions
            item-key="id"
            class="table-reports"
            :disable-initial-sort="true">

        <template slot="items" slot-scope="props">
            <tr @click="getItems(props)">
                <td>{{ props.item.code }}</td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.total_qty }}</td>
                <td>{{ formatMoney(props.item.total_amount) }}</td>
                <td>{{ props.item.vat_rate ? props.item.vat_rate.name : '' }}</td>
                <td>{{ props.item.description }}</td>
            </tr>
        </template>

        <template slot="expand" slot-scope="props">
            <v-data-table :headers="itemHeaders" :items="items.data" item-key="ii_id" dark hide-actions>
                <template slot="items" slot-scope="props">
                    <tr>
                        <td>{{ props.item.invoice.date | formatDate }}</td>
                        <td>{{ props.item.invoice.no }}</td>
                        <td>{{ props.item.invoice.supplier ? props.item.invoice.supplier.name : ''}}</td>
                        <td>{{ props.item.qty }}</td>
                        <td>{{ formatMoney(props.item.price) }}</td>
                        <td>{{ formatMoney(props.item.qty * props.item.price) }}</td>
                        <td>{{ props.item.vat_rate.name }}</td>
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
    import * as itemService from './service'
    export default {

        data: () => ({
            headers: [
                {text: 'Code', value: 'code'},
                {text: 'Name', value: 'name'},
                {text: 'Purchase quantity', value: 'vat'},
                {text: 'Purchase amount', value: 'vat'},
                {text: 'Vat Rate', value: 'vat'},
                {text: 'Description', value: 'description'},
            ],
            itemHeaders: [
                {text: 'Date', value: 'name'},
                {text: 'Inv No', value: 'description'},
                {text: 'Supplier', value: 'account.account_name'},
                {text: 'Quantity', value: 'qty'},
                {text: 'Unit price', value: 'unit_price'},
                {text: 'Amount', value: 'base_price'},
                {text: 'Vat Rate', value: 'vat_rate'},
            ],
            currentPage: 1,
            items: {
                data: []
            }
        }),

        props: ['products'],

        methods: {
            getItems(item) {
                item.expanded = !item.expanded

                itemService.getItems(item.item.id, 'products')
                    .then(response => {
                        this.items = response.data
                    })

            }
        }
    }
</script>

<style scoped>

</style>