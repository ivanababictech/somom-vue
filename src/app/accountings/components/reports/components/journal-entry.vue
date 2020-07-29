<template>
    <v-card class="px-3">
        <v-card-title>
            <h3 class="title">Journal entries</h3>
        </v-card-title>

        <v-layout wrap>
            <v-flex xs12 md2 lg1 class="bottom-align-content">
                <span>Filter by</span>
            </v-flex>

            <v-flex xs12 sm4 md3>
                <v-autocomplete
                        :items="accounts"
                        v-model="filters.account_id"
                        label="Account"
                        item-text="name"
                        item-value="id"
                        hide-details
                        clearable
                        dense
                ></v-autocomplete>
            </v-flex>

        </v-layout>

        <v-layout wrap>
            <v-flex xs12 md2 lg1 class="bottom-align-content">
                <span class="mr-2">Date Range</span>
            </v-flex>

            <v-flex xs6 sm4 md3>
                <date-picker label="From" v-model="filters.dates.from" full-width hide-details clearable></date-picker>
            </v-flex>
            <v-flex xs6 sm4 md3 mx-3>
                <date-picker label="To" v-model="filters.dates.to" full-width hide-details clearable></date-picker>
            </v-flex>
            <v-flex xs12 sm4 md3>
                <v-text-field
                        append-icon="search"
                        label="Search"
                        v-model="search"
                        hide-details
                        clearable
                ></v-text-field>
            </v-flex>
        </v-layout>

        <v-data-table
                :headers="headers"
                :items="filteredEntries"
                hide-actions
                item-key="id"
                class="table-reports mt-3">

            <template slot="items" slot-scope="props">
                <tr @click="props.expanded = !props.expanded">
                    <td class="text-xs-right">{{ props.item.date | formatDate }}</td>
                    <td class="text-xs-right">{{ props.item.no }}</td>
                    <td class="text-xs-right">{{ props.item.account.account_name }}</td>
                    <td class="text-xs-right">{{ props.item.description }}</td>
                    <td class="text-xs-right">{{ props.item.debit }}</td>
                    <td class="text-xs-right">{{ props.item.credit }}</td>
                </tr>
            </template>

            <template slot="no-data">
                <v-alert :value="true" color="grey lighten-4">
                    <p class="grey--text">No data</p>
                </v-alert>
            </template>

            <template slot="footer">
                <td class="text-xs-right"><strong>Total</strong></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="text-xs-right"><strong>{{ totals.debit | n }}</strong></td>
                <td class="text-xs-right"><strong>{{ totals.credit | n }}</strong></td>
            </template>

        </v-data-table>

    </v-card>
</template>

<script>
    import _ from 'lodash'
    import {fetchJournalEntries} from '@/api/accounting'
    import {searchArrayItems} from '@/util'

    export default {
        data: () => ({
            headers: [
                {text: 'Date', value: 'date'},
                {text: 'Journal no.', value: 'invoice_no'},
                {text: 'Account', value: 'account.account_name'},
                {text: 'Description', value: 'description'},
                {text: 'Debit', value: 'debit'},
                {text: 'Credit', value: 'credit'},
            ],
            journal_entries: [],
            search: '',
            filters: {
                account: null,
                dates: {
                    from: null,
                    fromFormatted: null,
                    fromMenu: null,
                    to: null,
                    toFormatted: null,
                    toMenu: null
                }
            },
        }),

        computed: {
            accounts() {
                const uniqByAccount = _.uniqBy(this.journal_entries, 'account_id')
                return uniqByAccount.map(entry => entry.account)
            },
            filteredEntries() {
                const filters = this.filters
                const filteredEntries = this.journal_entries.filter(entry => {
                    let condition = true

                    if (filters.account_id) {
                        condition = Boolean(filters.account_id == entry.account_id)
                    }

                    const dateTime = new Date(entry.date).getTime()

                    if (condition && filters.dates.from) {
                        const fromDateTime = new Date(filters.dates.from).getTime()
                        condition = Boolean(fromDateTime <= dateTime)
                    }

                    if (condition && filters.dates.to) {
                        const toDateTime = new Date(filters.dates.to).getTime()
                        condition = Boolean(dateTime <= toDateTime)
                    }

                    return condition
                })
                if (this.search) {
                    return searchArrayItems(filteredEntries, this.search, ['date', 'no', 'account.account_name', 'description', 'debit', 'credit'])
                }
                return filteredEntries
            },
            totals() {
                let totals = {debit: 0, credit: 0}
                this.filteredEntries.forEach(({debit, credit}) => {
                    if (debit) {
                        totals.debit += parseFloat(debit)
                    }
                    if (credit) {
                        totals.credit += parseFloat(credit)
                    }
                })
                return totals
            },
        },

        mounted() {
            fetchJournalEntries().then(({data}) => {
                if (data) {
                    this.journal_entries = data
                }
            })
        }

    }
</script>