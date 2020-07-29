<template>
    <v-data-table
            :headers="headers"
            :items="inventories.data"
            hide-actions
            item-key="id"
            class="table-reports"
            :disable-initial-sort="true">

        <template slot="items" slot-scope="props">
            <tr @click="getItems(props)">
                <td>{{ props.item.code }}</td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.qty}}</td>
                <td>{{ formatMoney(props.item.unit_cost) }}</td>
                <td>{{ formatMoney(props.item.unit_cost * props.item.qty) }}</td>
                <td>{{ props.item.vat_rate ? props.item.vat_rate.name : ''}}</td>
            </tr>
        </template>
        <template slot="expand" slot-scope="props">
            <v-data-table :headers="itemHeaders" :items="items.data" item-key="ii_id" dark hide-actions>
                <template slot="items" slot-scope="props">
                    <tr>
                        <td>{{ props.item.invoice.date | formatDate }}</td>
                        <td>{{ props.item.invoice.no }}</td>
                        <td>{{ props.item.account.name }}</td>
                        <td>{{ props.item.invoice.supplier ? props.item.invoice.supplier.name : props.item.invoice.customer ? props.item.invoice.customer.name : ''}}</td>
                        <td>{{ props.item.qty }}</td>
                        <td>{{ formatMoney(props.item.price) }}</td>
                        <td>{{ props.item.vat_rate }}</td>
                        <td>{{ props.item.description }}</td>
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
                {text: 'Code', value: 'id'},
                {text: 'Name', value: 'name'},
                {text: 'Quantity', value: 'qty'},
                {text: 'Average cost/Unit', value: 'average_cost'},
                {text: 'Total cost', value: 'total_cost'},
                {text: 'Vat rate', value: 'vat'},
            ],
            itemHeaders: [
                {text: 'Date', value: 'name'},
                {text: 'Inv No', value: 'no'},
                {text: 'Account', value: 'account'},
                {text: 'Contact', value: 'contact'},
                {text: 'Quantity', value: 'qty'},
                {text: 'Amount', value: 'amount'},
                {text: 'Vat Rate', value: 'vat_rate'},
                {text: 'Description', value: 'description'},
            ],
            currentPage: 1,
            items: {
                data: []
            }
        }),

        props: ['inventories'],

        methods: {
            getItems(item) {
                item.expanded = !item.expanded

                itemService.getItems(item.item.id, 'inventories')
                    .then(response => {
                        this.items = response.data
                    })

            }
        }
    }
</script>

<style scoped>

</style>