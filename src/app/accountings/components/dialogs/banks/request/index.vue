<template>
    <v-dialog v-model="dialog" fullscreen>
        <v-btn slot="activator" color="primary" dark>Reviews</v-btn>
        <v-card>

            <v-toolbar dense color="accent">
                <v-btn icon @click="dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Reviews</v-toolbar-title>
            </v-toolbar>
            <v-container fluid grid-list-md>
                <v-card-text>
                    <v-tabs v-model="currentStatus">
                        <v-tab
                                v-for="status in statuses"
                                :key="status"
                                :href="'#' + status"
                        >
                            {{ status }}
                        </v-tab>
                        <v-tab-item
                                v-for="status in statuses"
                                :key="status"
                                :id="status"
                                v-if="currentStatus == status"
                        >
                            <v-layout wrap>
                                <v-flex xs6 md2>
                                    <date-picker label="Entry Date From" v-model="filters.entry_date_from" full-width hide-details clearable></date-picker>
                                </v-flex>
                                <v-flex xs6 md2>
                                    <date-picker label="Entry Date To" v-model="filters.entry_date_to" full-width hide-details clearable></date-picker>
                                </v-flex>
                                <v-flex xs6 md2>
                                    <date-picker label="Review Date From" v-model="filters.created_at_from" full-width hide-details clearable></date-picker>
                                </v-flex>
                                <v-flex xs6 md2>
                                    <date-picker label="Review Date To" v-model="filters.created_at_to" full-width hide-details clearable></date-picker>
                                </v-flex>
                                <v-flex xs6 md4>
                                    <v-btn
                                            v-for="type in types"
                                            :key="type"
                                            :color="issetFilterType(type) ? 'primary' : ''"
                                            @click="setFilterType(type)"
                                    >{{ type }}</v-btn>
                                </v-flex>
                            </v-layout>

                            <v-data-table
                                    :headers="headers"
                                    :items="requests.data"
                                    hide-actions
                                    class="elevation-1 mt-4"
                            >
                                <template slot="items" slot-scope="props">
                                    <td>{{ props.item.account.name }}</td>
                                    <td>
                                        <v-chip color="teal" small text-color="white" v-if="props.item.clarification" @click="setFilterType('clarification')">clarification</v-chip>
                                        <v-chip color="secondary" small text-color="white" v-if="props.item.invoice" @click="setFilterType('invoice')">invoice</v-chip>
                                        <v-chip color="pink" small text-color="white" v-if="props.item.contract" @click="setFilterType('contract')">contract</v-chip>
                                    </td>
                                    <td>
                                        <v-tooltip right max-width="300">
                                            <a href="#" slot="activator">{{ props.item.subject }}</a>
                                            <span>{{ props.item.message }}</span>
                                        </v-tooltip>
                                    </td>
                                    <td>{{ formatMoney(props.item.amount) }}</td>
                                    <td>Glen Azzopardi</td>
                                    <td>{{ props.item.date | formatDate }}</td>
                                    <td>{{ props.item.created_at }}</td>
                                    <td>{{ props.item.due_date | formatDate }}</td>
                                    <td>
                                        <v-btn outline small color="primary" @click="viewBankRequest(props.item)">View</v-btn>
                                        <v-btn small color="warning" class="white--text" v-if="!props.item.closed" @click="closeBankRequest(props.item)">close</v-btn>
                                        <v-btn small color="success" v-else @click="openBankRequest(props.item)">re-open</v-btn>
                                        <view-bank-request :entry="props.item" v-if="props.item.viewBankRequest"></view-bank-request>
                                    </td>
                                </template>
                            </v-data-table>

                            <div class="text-xs-center mt-2" v-if="requests.last_page > 1">
                                <v-pagination :length="requests.last_page" v-model="currentPage" :total-visible="7"></v-pagination>
                            </div>
                        </v-tab-item>
                    </v-tabs>
                </v-card-text>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    import * as requestService from './service'
    import ViewBankRequest from './view'

    export default {
        data() {
            return {
                headers: [
                    {text: 'Company Name', value: 'company_date'},
                    {text: 'Type', value: 'type', width: 320},
                    {text: 'Subject', value: 'subject', width: 250},
                    {text: 'Amount', value: 'amount'},
                    {text: 'Bank officer', value: 'bank_officer'},
                    {text: 'Entry Date', value: 'date'},
                    {text: 'Review date', value: 'created_at'},
                    {text: 'Due date', value: 'due_date'},
                    {text: 'Actions', value: 'actions', width: 300},
                ],
                dialog: false,
                requests: [],
                search: '',
                filters: {
                    closed: null,
                    types: []
                },
                types: ['clarification', 'invoice', 'contract'],
                currentPage: 1,
                currentStatus: 'open',
                statuses: ['open', 'closed']
            }
        },

        props: ['accountId'],

        methods: {
            getRequests() {
                const params = {
                    page: this.currentPage,
                    filters: this.filters,
                }

                params.filters.closed = this.currentStatus == 'open' ? false : true

                requestService.get(this.accountId, params)
                    .then(response => {
                        this.requests = response.data
                    })
            },

            closeDialog() {
                this.dialog = false
            },

            closeBankRequest(bankRequest) {
                requestService.close(this.accountId, bankRequest.id)
                    .then(response => this.getRequests())
            },

            openBankRequest(bankRequest) {
                requestService.open(this.accountId, bankRequest.id)
                    .then(response => this.getRequests())
            },

            view(bankRequest) {
                requestService.resend(this.accountId, bankRequest.id)
                    .then(response => this.getRequests())
            },

            resetCurrentPage() {
                this.currentPage = 1
            },

            issetFilterType(type) {
                return this.filters.types.indexOf(type) != -1
            },

            setFilterType(type) {
                if(this.filters.types.indexOf(type) == -1) {
                    this.filters.types.push(type)
                } else {
                    this.filters.types.splice(this.filters.types.indexOf(type), 1)
                }
            },

            viewBankRequest(entry) {
                this.$set(entry, 'viewBankRequest', true)
            }
        },

        watch: {
            currentPage: 'getRequests',
            dialog: 'getRequests',
            filters: {
                handler: 'getRequests',
                deep: true
            },
            currentStatus() {
                this.resetCurrentPage()
                this.getRequests()

            },
        },

        components: { ViewBankRequest }
    }
</script>