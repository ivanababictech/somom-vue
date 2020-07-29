<template>
    <v-data-table
            :headers="headers"
            :items="inventories"
            :search="search"
            :loading="!loaded"
            class="table-reports">

        <template slot="items" slot-scope="props">
            <tr>
                <td>{{ props.item.code }}</td>
                <td>{{ props.item.name }}</td>
                <td>{{ accountNameById(props.item.purchase_account_id) }}</td>
                <td>{{ accountNameById(props.item.sale_account_id) }}</td>
                <td>{{ formatMoney(props.item.unit_cost) }}</td>
                <td>{{ props.item.description }}</td>
                <td>{{ props.item.qty }}</td>
                <td>{{ formatMoney(props.item.unit_cost * props.item.qty) }}</td>
                <td class="table__actions">
                    <item-dialog
                            label="edit"
                            icon
                            flat
                            small
                            :item="props.item">
                    </item-dialog>
                    <v-btn
                            icon
                            flat
                            small
                            color="danger"
                            @click="deleteItem(props.item)">
                        <v-icon>delete</v-icon>
                    </v-btn>
                </td>
            </tr>
        </template>

        <template slot="no-data">
            <v-alert :value="true" color="grey lighten-4">
                <p class="grey--text">No inventory items available.</p>
            </v-alert>
        </template>

    </v-data-table>
</template>

<script>
    import {deleteItem} from '@/api/accounting'
    import {mapGetters} from 'vuex'

    export default {
        props: ['search'],
        data: () => ({
            headers: [
                {text: 'Code', value: 'code'},
                {text: 'Name', value: 'name'},
                {text: 'Purchase Account', value: 'purchase_account_id'},
                {text: 'Sale Account', value: 'sale_account_id'},
                {text: 'Unit cost', value: 'unit_cost'},
                {text: 'Description', value: 'description'},
                {text: 'Qty', value: 'qty'},
                {text: 'Amount', value: 'Amount'},
                {text: 'Actions', value: null, sortable: false},
            ]
        }),
        computed: {
            ...mapGetters({
                loaded: 'accounting/loaded',
                inventories: 'accounting/inventories',
                accountNameById: 'accounting/accountNameById'
            }),
        },
        methods: {
            deleteItem: deleteItem
        }
    }
</script>