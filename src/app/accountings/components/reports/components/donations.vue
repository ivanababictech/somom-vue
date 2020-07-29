<template>
    <v-card class="px-3">
        <v-card-title>
            <h3 class="title">Donations</h3>
        </v-card-title>

        <v-layout wrap>
            <v-flex xs12 md2 lg1 class="bottom-align-content">
                <span>Filter by</span>
            </v-flex>

            <v-flex xs12 sm4 md3>
                <v-autocomplete
                        :items="donors"
                        v-model="filters.donor"
                        label="Donor"
                        item-text="name"
                        item-value="id"
                        hide-details
                        clearable
                        dense
                ></v-autocomplete>
            </v-flex>

            <v-flex xs12 sm4 md3 mx-3>
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
                :items="filteredDonations"
                hide-actions
                item-key="id"
                class="table-reports mt-3">

            <template slot="items" slot-scope="props">
                <tr>
                    <td class="text-xs-right">{{ props.item.date | formatDate }}</td>
                    <td class="text-xs-right">{{ props.item.receipt_no }}</td>
                    <td class="text-xs-right">{{ props.item.donor.name }}</td>
                    <td class="text-xs-right">{{ props.item.account.account_name }}</td>
                    <td class="text-xs-right">{{ props.item.amount }}</td>
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
                <td class="text-xs-right"><strong>{{ total | n }}</strong></td>
            </template>

        </v-data-table>

    </v-card>
</template>

<script>
    import _ from 'lodash'
    import {fetchDonations} from '@/api/accounting'
    import {searchArrayItems} from '@/util'

    export default {
        data: () => ({
            headers: [
                {text: 'Date', value: 'date'},
                {text: 'Receipt no.', value: 'receipt_no'},
                {text: 'Donor', value: 'donor.name'},
                {text: 'Account', value: 'account.account_name'},
                {text: 'Amount', value: 'amount'},
            ],
            donations: [],
            search: '',
            filters: {
                account: null,
                donor: null,
                dates: {
                    from: null,
                    to: null,
                }
            },
        }),

        computed: {
            accounts() {
                const uniqByAccount = _.uniqBy(this.donations, 'account_id')
                return uniqByAccount.map(donation => donation.account)
            },
            donors() {
                const uniqByAccount = _.uniqBy(this.donations, 'donor_id')
                return uniqByAccount.map(donation => donation.donor)
            },
            filteredDonations() {
                const filters = this.filters
                const filteredDonations = this.donations.filter(donation => {
                    let condition = true

                    if (filters.donor) {
                        condition = Boolean(filters.donor == donation.donor_id)
                    }

                    if (condition && filters.account_id) {
                        condition = Boolean(filters.account_id == donation.account_id)
                    }

                    const dateTime = new Date(donation.date).getTime()

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
                    return searchArrayItems(filteredDonations, this.search, ['date', 'receipt_no', 'donor.name', 'account.account_name', 'amount'])
                }
                return filteredDonations
            },
            total() {
                let total = 0
                this.filteredDonations.forEach(({amount}) => {
                    total += parseFloat(amount)
                })
                return total
            },
        },

        mounted() {
            fetchDonations().then(({data}) => {
                if (data) {
                    this.donations = data
                }
            })
        }

    }
</script>