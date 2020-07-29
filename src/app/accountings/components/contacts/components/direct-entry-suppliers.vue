<template>

    <v-data-table
            :headers="headers"
            :items="suppliers"
            :search="search"
            :loading="!loaded"
            class="table-reports">

        <template slot="items" slot-scope="props">
            <tr>
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.name }}</td>
                <td>{{ accountNameById( props.item.account_id ) }}</td>
                <td>{{ props.item.vat_code }}</td>
                <td class="table__actions">
                    <direct-entry-supplier-dialog label="edit" icon flat small
                                                  :item="props.item"></direct-entry-supplier-dialog>
                    <v-btn icon flat small color="warning" @click="destroy(props.item)">
                        <v-icon>delete</v-icon>
                    </v-btn>
                </td>
            </tr>
        </template>

        <template slot="no-data">
            <v-alert :value="true" color="grey lighten-4">
                <p class="grey--text">No direct entry suppliers available.</p>
            </v-alert>
        </template>

    </v-data-table>

</template>

<script>
    import {deleteDirectEntrySupplier} from '@/api/accounting'
    import {mapGetters} from 'vuex'

    export default {
        props: ['search'],
        data: () => ({
            headers: [
                {text: '#ID', value: 'id'},
                {text: 'Name', value: 'name'},
                {text: 'Account', value: 'account_id'},
                {text: 'Vat rate', value: 'vat_rate'},
                {text: 'Operations', value: null, sortable: false},
            ]
        }),
        computed: {
            ...mapGetters({
                loaded: 'accounting/loaded',
                suppliers: 'accounting/directEntrySuppliers',
                accountNameById: 'accounting/accountNameById'
            }),
        },
        methods: {
            destroy: deleteDirectEntrySupplier,
        }
    }
</script>