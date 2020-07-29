<template>
    <div>
        <v-card>
            <v-card-title>
                <h4 class="card-title">Assigned accounts</h4>
                <v-spacer></v-spacer>

                <v-text-field
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                        v-model="search">
                </v-text-field>

                <v-btn fab small class="primary" dark :to="{ name: 'global.assigned-accounts.create' }">
                    <v-icon dark>add</v-icon>
                </v-btn>

            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="filteredAssignedAccounts"
                    :search="search"
                    :pagination.sync="pagination"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.description }}</td>
                    <td>
                        <v-btn icon
                               :to="{name: 'global.assigned-account', params: { assigned_account_id: props.item.id } }">
                            <v-icon>open_in_new</v-icon>
                        </v-btn>
                    </td>
                </template>
                <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                    From {{ pageStart }} to {{ pageStop }}
                </template>
            </v-data-table>
        </v-card>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data: () => ({
            search: '',
            pagination: {
                rowsPerPage: -1
            },
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Assigned account name', value: 'name'},
                {text: 'Description', value: 'description'},
                {text: 'Actions', sortable: false}
            ],
            removeIds: [2, 3, 4, 5, 12, 14, 15, 16, 19, 20, 21, 34]
        }),
        computed: {
            ...mapGetters([
                'assignedAccounts'
            ]),
            filteredAssignedAccounts () {
                return JSON.parse(JSON.stringify(this.assignedAccounts)).filter(account => this.removeIds.indexOf(account.id) === -1)
            }
        },
    }
</script>
