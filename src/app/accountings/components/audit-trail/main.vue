<template>
    <div>
        <v-layout align-center mt-4>
            <span>Filters</span>
            <div class="ml-4">
                <v-text-field
                        v-model="filters.type"
                        label="Type"
                        hide-details
                        class="mt-0 py-0">
                </v-text-field>
            </div>
            <div class="ml-4">
                <v-text-field
                        v-model="filters.reference"
                        label="Reference"
                        hide-details
                        class="mt-0 py-0">
                </v-text-field>
            </div>
            <div class="ml-4">
                <v-text-field
                        v-model="filters.accountName"
                        label="Account name"
                        hide-details
                        class="mt-0 py-0">
                </v-text-field>
            </div>
            <div class="ml-4">
                <v-text-field
                        v-model="filters.user"
                        label="User"
                        hide-details
                        class="mt-0 py-0">
                </v-text-field>
            </div>
        </v-layout>
        <v-layout mt-4 align-end>
            <div>Date Range</div>
            <div class="mx-4">
                <date-picker
                        label="Start date"
                        v-model="picker.from"
                        color="primary"
                        full-width
                        hide-details>
                </date-picker>
            </div>
            <div>to</div>
            <div class="ml-4">
                <date-picker
                        label="End date"
                        v-model="picker.to"
                        full-width
                        color="primary"
                        hide-details>
                </date-picker>
            </div>
            <div class="ml-4">
                <v-text-field
                        v-model="filters.search"
                        label="Search"
                hide-details>
                </v-text-field>
            </div>
        </v-layout>

        <v-toolbar dense flat height="38" class="mt-3">
            <v-toolbar-items>
                <v-btn flat>All transactions</v-btn>
                <v-btn flat>Amended transactions</v-btn>
                <v-btn flat>Deleted transactions</v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-data-table
                :headers="headers"
                :items="filteredTransactions"
                hide-actions
                :search="filters.search"
                class="elevation-1 mt-4"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.date | moment("DD/MM/YYYY") }}</td>
                <td>{{ props.item.type }}</td>
                <td>{{ props.item.reference }}</td>
                <td>{{ props.item.details }}</td>
                <td>{{ props.item.accountName }}</td>
                <td>{{ props.item.user }}</td>
                <td>{{ props.item.transactionTime }}</td>
                <td>
                    <v-btn outline flat color="primary">Edit</v-btn>
                    <v-btn outline flat color="danger">Delete</v-btn>
                </td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    export default {
        data: () => ({
            picker: {
                from: null,
                to: null
            },
            modal: false,
            modal2: false,
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Date', value: 'date'},
                {text: 'Type', value: 'type'},
                {text: 'Reference', value: 'reference'},
                {text: 'Details', value: 'details'},
                {text: 'Account name', value: 'accountName'},
                {text: 'User', value: 'user'},
                {text: 'Transaction time', value: 'transactionTime'},
                {text: 'Actions'}
            ],
            transactions: [
                {
                    id: '1',
                    date: '2018-09-26T20:39:24+02:00',
                    type: 'Transactions',
                    reference: 'Reference',
                    details: 'Transaction details',
                    accountName: 'mileStojko',
                    user: 'Milan Stojkovic',
                    transactionTime: '15:43'
                },

                {
                    id: '2',
                    date: '2018-09-26T20:39:24+02:00',
                    type: 'Transactions',
                    reference: 'Reference',
                    details: 'Transaction details',
                    accountName: 'perica226',
                    user: 'Perica',
                    transactionTime: '15:43'
                },

                {
                    id: '3',
                    date: '2018-09-26T20:39:24+02:00',
                    type: 'Transactions',
                    reference: 'Reference',
                    details: 'Transaction details',
                    accountName: 'perica226',
                    user: 'Perica',
                    transactionTime: '15:43'
                }
            ],
            filters: {
                search: '',
                type: '',
                reference: '',
                accountName: '',
                user: ''
            }
        }),
        methods: {
            matchData(transaction, column) {
                return transaction[column].toLowerCase().indexOf(this.filters[column].toLowerCase())
            }
        },
        computed: {
            filteredTransactions() {
                return this.transactions
                    .filter(transaction => this.matchData(transaction, 'type')> -1)
                    .filter(transaction => this.matchData(transaction, 'reference')> -1)
                    .filter(transaction => this.matchData(transaction, 'accountName')> -1)
                    .filter(transaction => this.matchData(transaction, 'user')> -1)
                    .filter(transaction => !this.picker.from || transaction.date > this.picker.from)
                    .filter(transaction => !this.picker.to || transaction.date < this.picker.to)
            }
        }
    }
</script>