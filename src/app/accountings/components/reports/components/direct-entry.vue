<template>
    <v-card class="px-3">
        <v-card-title>
            <h3 class="title">Direct entry</h3>
        </v-card-title>

        <v-layout wrap>
            <v-flex xs12 md2 lg1 class="bottom-align-content">
                <span>Filter by</span>
            </v-flex>

            <v-flex xs12 sm4 md3>
                <v-autocomplete
                        :items="suppliers"
                        v-model="filters.supplier"
                        label="Direct entry supplier"
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
                    <td>{{ props.item.date | formatDate }}</td>
                    <td>{{ props.item.invoice_no }}</td>
                    <td>{{ props.item.supplier.name }}</td>
                    <td>{{ props.item.description }}</td>
                    <td>{{ props.item.amount }}</td>
                    <td>{{ props.item.currency }}</td>
                </tr>
            </template>

            <template slot="no-data">
                <v-alert :value="true" color="grey lighten-4">
                    <p class="grey--text">No data</p>
                </v-alert>
            </template>

            <template slot="footer">
                <td><strong>Total</strong></td>
                <td></td>
                <td></td>
                <td></td>
                <td><strong>{{ total | n }}</strong></td>
                <td></td>
            </template>

        </v-data-table>

    </v-card>
</template>

<script>
    import _ from 'lodash'
    import {fetchDirectEntries} from '@/api/accounting'
    import {searchArrayItems} from '@/util'

    export default {
        data: () => ({
            headers: [
                {text: 'Date', value: 'date'},
                {text: 'Inv no', value: 'invoice_no'},
                {text: 'Direct entry supplier', value: 'supplier.name'},
                {text: 'Description', value: 'description'},
                {text: 'Gross amount', value: 'amount'},
                {text: 'Currency', value: 'currency'},
            ],
            direct_entries: [],
            search: '',
            filters: {
                supplier: null,
                dates: {
                    from: null,
                    to: null,
                }
            },
        }),

        computed: {
            suppliers() {
                const uniqBySupplier = _.uniqBy(this.direct_entries, 'supplier_id')
                return uniqBySupplier.map(entry => entry.supplier)
            },
            filteredEntries() {
                const filters = this.filters
                const filteredEntries = this.direct_entries.filter(entry => {
                    let condition = true

                    if (filters.supplier) {
                        condition = Boolean(filters.supplier == entry.supplier_id)
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
                    return searchArrayItems(filteredEntries, this.search, ['date', 'invoice_no', 'supplier.name', 'description', 'amount', 'currency'])
                }
                return filteredEntries
            },
            total() {
                let total = 0
                this.filteredEntries.forEach(({amount}) => {
                    total += parseFloat(amount)
                })
                return total
            },
        },

        mounted() {
            fetchDirectEntries().then(({data}) => {
                if (data) {
                    this.direct_entries = data
                }
            })
        }

    }
</script>