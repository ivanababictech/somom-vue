<template>
    <v-card>
        <accounting-toolbar
                title="Queries"
                :saveDraft="false"
                @toggleDialog="toggleDialog('queries')">
        </accounting-toolbar>

        <v-toolbar dense color="accent">
            <v-btn icon @click="toggleDialog('queries')">
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Queries</v-toolbar-title>
        </v-toolbar>

        <v-card-title primary-title>
            Submit a query
        </v-card-title>

        <v-card-text>
            <v-container fluid grid-list-md>
                <v-layout wrap>
                    <v-flex xs3>
                        <v-autocomplete
                                label="Account name"
                                :items="accounts"
                                v-model="query.account_id"
                                item-text="account_name"
                                item-value="account_id"
                        ></v-autocomplete>
                    </v-flex>

                    <v-flex xs6>
                        <v-text-field
                                label="Details"
                                v-model="query.details"
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs3>
                        <v-radio-group v-model="query.type" hide-details row>
                            <v-radio label="Client" value="client"></v-radio>
                            <v-radio label="ToDo" value="todo"></v-radio>
                        </v-radio-group>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-btn color="primary" @click="submit">submit</v-btn>
        </v-card-text>

        <v-card-title>
            LIST OF ALL OPEN QUERIES
        </v-card-title>

        <v-card-text>

            <label>View: </label>
            <v-btn-toggle v-model="openQueriesView">
                <v-btn>Client</v-btn>
                <v-btn>ToDo</v-btn>
            </v-btn-toggle>

            <v-divider class="mt-3"></v-divider>

            <v-data-table
                    :headers="headers"
                    :items="openQueries">

                <template slot="items" slot-scope="props">
                    <tr>
                        <td>
                            <v-checkbox
                                    hide-details
                                    v-model="props.item.completed"
                                    @change="updateQuery(props.item)"
                            ></v-checkbox>
                        </td>
                        <td>
                            <v-autocomplete
                                    label="Account name"
                                    :items="accounts"
                                    v-model="props.item.account_id"
                                    item-text="account_name"
                                    item-value="account_id"
                                    single-line
                                    hide-details
                                    :disabled="!Boolean(props.item.edit)"
                            ></v-autocomplete>
                        </td>
                        <td>
                            <v-text-field
                                    label="Details"
                                    v-model="props.item.details"
                                    hide-details
                                    single-line
                                    :readonly="!Boolean(props.item.edit)"
                            ></v-text-field>
                        </td>
                        <td>
                            <v-select
                                    :items="queryTypes"
                                    v-model="props.item.type"
                                    single-line
                                    hide-details
                                    :disabled="!Boolean(props.item.edit)"
                            ></v-select>
                        </td>
                        <td>
                            <v-btn flat dark color="primary" @click="edit(props.item)">
                                {{ props.item.edit ? 'Update' : 'Edit' }}
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card-text>

        <v-card-title>
            LIST OF ALL COMPLETED QUERIES
        </v-card-title>

        <v-card-text>

            <label>View: </label>
            <v-btn-toggle v-model="completeQueriesView">
                <v-btn>Client</v-btn>
                <v-btn>ToDo</v-btn>
            </v-btn-toggle>

            <v-divider class="mt-3"></v-divider>

            <v-data-table
                    :headers="headers"
                    :items="completeQueries"
            >

                <template slot="items" slot-scope="props">
                    <tr>
                        <td>
                            <v-checkbox
                                    hide-details
                                    v-model="props.item.completed"
                                    @change="updateQuery(props.item)"
                            ></v-checkbox>
                        </td>
                        <td>
                            <v-autocomplete
                                    label="Account name"
                                    :items="accounts"
                                    v-model="props.item.account_id"
                                    item-text="name"
                                    item-value="id"
                                    single-line
                                    hide-details
                                    :disabled="!Boolean(props.item.edit)"
                            ></v-autocomplete>
                        </td>
                        <td>
                            <v-text-field
                                    label="Details"
                                    v-model="props.item.details"
                                    hide-details
                                    single-line
                                    :readonly="!Boolean(props.item.edit)"
                            ></v-text-field>
                        </td>
                        <td>
                            <v-select
                                    :items="queryTypes"
                                    v-model="props.item.type"
                                    single-line
                                    hide-details
                                    :disabled="!Boolean(props.item.edit)"
                            ></v-select>
                        </td>
                        <td>
                            <v-btn flat dark color="primary" @click="edit(props.item)">
                                {{ props.item.edit ? 'Update' : 'Edit' }}
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card-text>

    </v-card>
</template>

<script>
    import { http } from '@/plugins/http/index';
    import {mapGetters, mapMutations} from 'vuex';
    import AccountingToolbar from './components/toolbar.vue'

    export default {
        components: {
            AccountingToolbar
        },
        data: () => ({
            search: null,
            headers: [
                {text: 'Account Name', value: 'account'},
                {text: 'Details', value: 'details'},
                {text: 'Type', value: 'type'},
            ],
            query: {},
            queries: [],
            openQueriesView: null,
            completeQueriesView: null,
            queryTypes: ['client', 'todo']
        }),

        computed: {
            ...mapGetters({
                accounts: 'accounting/accounts',
            }),

            completeQueries({queries}) {
                return queries.filter(query => {
                    if (this.completeQueriesView !== null) {
                        return query.completed && query.type == this.queryTypes[this.completeQueriesView]
                    }
                    return query.completed
                })
            },

            openQueries({queries}) {
                return queries.filter(query => {
                    if (this.openQueriesView !== null) {
                        return !query.completed && query.type == this.queryTypes[this.openQueriesView]
                    }
                    return !query.completed
                })
            }
        },

        methods: {
            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog'
            }),
            resetQuery() {
                this.query = {}
            },

            updateQuery(query) {
                const url = `accountings/${this.$route.params.accounting_id}/queries/${query.query_id}`
                return http.put(url, query).then(({data}) => {
                    // show notification
                    this.$store.dispatch('snackbar/update', {
                        visible: true,
                        success: data.success,
                        text: data.message
                    });
                })
            },

            edit(query) {
                if (query.edit) {
                    this.updateQuery(query).then(() => {
                        this.$set(query, 'edit', false)
                    })
                } else {
                    this.$set(query, 'edit', true)
                }
            },

            submit() {
                const url = `accountings/${this.$route.params.accounting_id}/queries`
                http.post(url, this.query)
                    .then(({data}) => {
                        if (data.success) {
                            this.queries.push(Object.assign({}, data.query))
                            this.resetQuery()
                        }
                        // show notification
                        this.$store.dispatch('snackbar/update', {
                            visible: true,
                            success: data.success,
                            text: data.message
                        });
                    })
            },
        },

        mounted() {
            const url = `accountings/${this.$route.params.accounting_id}/queries`
            http.get(url).then(({data}) => {
                if (data.success) {
                    this.queries = data.queries
                }
            })
        }

    }
</script>