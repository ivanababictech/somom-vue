<template>
    <v-data-table
            :headers="headers"
            :items="products"
            :search="search"
            :loading="!loaded"
            class="table-reports">

        <template slot="items" slot-scope="props">
            <tr>
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.code }}</td>
                <td>{{ props.item.name }}</td>
                <td>{{ accountNameById(props.item.account_id) }}</td>
                <td>{{ formatMoney(props.item.price) }}</td>
                <td>{{ props.item.description }}</td>
                <td class="table__actions">
                    <item-dialog label="edit" icon flat small :key="props.item.id" :item="props.item"></item-dialog>
                    <v-btn icon flat small color="warning" @click="deleteItem(props.item)">
                        <v-icon>delete</v-icon>
                    </v-btn>
                </td>
            </tr>
        </template>

        <template slot="no-data">
            <v-alert :value="true" color="grey lighten-4">
                <p class="grey--text">No products available.</p>
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
                {text: '#ID', value: 'id'},
                {text: 'Code', value: 'code'},
                {text: 'Name', value: 'name'},
                {text: 'Account', value: 'account_id'},
                {text: 'Price', value: 'price'},
                {text: 'Description', value: 'description'},
                {text: 'Actions', value: null, sortable: false},
            ]
        }),
        computed: {
            ...mapGetters({
                loaded: 'accounting/loaded',
                products: 'accounting/products',
                accountNameById: 'accounting/accountNameById'
            }),
        },
        methods: {
            deleteItem: deleteItem
        }
    }
</script>