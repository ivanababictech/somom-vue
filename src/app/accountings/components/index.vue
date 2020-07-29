<template>
    <div>
        <v-card>
            <v-card-title>
                <v-btn icon to="/settings/accounting">
                    <v-icon>settings</v-icon>
                </v-btn>

                <start-accounting></start-accounting>

                <v-spacer></v-spacer>

                <v-text-field
                        append-icon="search"
                        label="Search company"
                        v-model="search"
                ></v-text-field>

                <v-btn fab dark small color="primary" :to="{ name: 'companies.create' }">
                    <v-icon dark>add</v-icon>
                </v-btn>

            </v-card-title>

            <v-data-table
                    :headers="headers"
                    :items="accountings"
                    hide-actions
                    :search="search"
            >
                <template slot="items" slot-scope="props">
                    <td>
                        <router-link :to="{ name: 'AccountingNominalActivity', params: { accounting_id: props.item.id } }" class="black--text">
                            <b>{{ props.item.company.name }}</b>
                        </router-link>
                    </td>
                    <td>{{ props.item.company.registration_number }}</td>
                    <td>{{ props.item.company.details.vatNumber }}</td>
                </template>
                <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                    From {{ pageStart }} to {{ pageStop }}
                </template>
            </v-data-table>

        </v-card>
    </div>
</template>

<script>
    import StartAccounting from './start-accounting'
    import * as accountingService from '../service'
    export default {
        data: () => ({
            search: '',
            headers: [
                {text: 'Company Name', value: 'name'},
                {text: 'Co. reg. no', value: 'registration_number'},
                {text: 'VAT number', value: 'vat'},
            ],
            accountings: []
        }),

        mounted() {
            this.getAccountings()
        },

        methods: {
            getAccountings() {
                accountingService.getAccountings()
                    .then(response => this.accountings = response)
            }

        },

        components: { StartAccounting }
    }
</script>
