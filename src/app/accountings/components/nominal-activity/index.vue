<template>
    <v-card class="px-3">

        <google2fa @verified="google2faVerified"></google2fa>
        <v-layout wrap>
            <v-flex xs12 md2 lg1 ml-2 class="bottom-align-content">
                <span>Filter by</span>
            </v-flex>

            <v-flex xs12 sm4 md3 ml-2>
                <v-autocomplete
                        :items="accounts"
                        v-model="filters.account_id"
                        label="Account"
                        item-text="account.name"
                        item-value="account_id"
                        hide-details
                        clearable
                        dense
                ></v-autocomplete>
            </v-flex>

            <v-flex xs12 sm4 md3 ml-2>
                <v-autocomplete
                        :items="filteredAssignedAccounts"
                        v-model="filters.assigned_account_id"
                        label="Assigned account"
                        item-text="name"
                        item-value="id"
                        hide-details
                        clearable
                        dense
                ></v-autocomplete>
            </v-flex>

            <v-spacer></v-spacer>
            <export-button @export="exportReporting"></export-button>

        </v-layout>
        <v-layout wrap>
            <v-flex xs12 md2 lg1 ml-2 class="bottom-align-content">
                <span class="mr-2">Date Range</span>
            </v-flex>

            <v-flex xs6 sm4 md3 ml-2>
                <date-picker label="From" v-model="filters.date_from" full-width hide-details clearable></date-picker>
            </v-flex>
            <v-flex xs6 sm4 md3 ml-2>
                <date-picker label="To" v-model="filters.date_to" full-width hide-details clearable></date-picker>
            </v-flex>
            <v-flex xs12 sm4 md3 ml-2>
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
                :items="filteredAccounts"
                :search="search"
                hide-actions
                item-key="account_id"
                class="table-reports mt-4">

            <template slot="items" slot-scope="props">
                <tr @click="props.expanded = !props.expanded">
                    <td>{{ props.item.account.name }}</td>
                    <td>{{ props.item.account.assigned_account ? props.item.account.assigned_account.name : '' }}
                    </td>
                    <td>{{ props.item.account.sub_account ? props.item.account.sub_account.name : '' }}</td>
                    <td>{{ props.item.account.fs_title }}</td>
                    <td class="text-xs-right">{{ formatMoney(props.item.total_debit) }}</td>
                    <td class="text-xs-right">{{ formatMoney(props.item.total_credit) }}</td>
                    <td class="text-xs-right">{{ formatMoney(props.item.total_debit - props.item.total_credit) }}
                    </td>
                </tr>
            </template>

            <template slot="expand" slot-scope="props">
                <account-activity :account="props.item.account" :filters="filters"></account-activity>
            </template>

            <template slot="no-data">
                <v-alert :value="true" color="grey lighten-4">
                    <p class="grey--text">No data</p>
                </v-alert>
            </template>

            <template slot="footer">
                <td colspan="4"><strong>Total</strong></td>
                <td class="text-xs-right white--text" :class="[isTotalCorrect ? 'primary' : 'error']">
                    <strong>{{ formatMoney(totals.debit) }}</strong>
                </td>
                <td class="text-xs-right white--text" :class="[isTotalCorrect ? 'primary' : 'error']">
                    <strong>{{ formatMoney(totals.credit) }}</strong>
                </td>
            </template>
        </v-data-table>

    </v-card>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import AccountActivity from './account-activity'
    import * as nominalActivityService from './service'

    export default {
        data () {
            return {
                headers: [
                    {text: 'Account', value: 'account_name'},
                    {text: 'Assigned account', value: 'assigned_account.assigned_account_name'},
                    {text: 'Sub account', value: 'sub_account.sub_account_name'},
                    {text: 'Fs title', value: 'fs_title'},
                    {text: 'Debit', value: 'balance.debit', align: 'right'},
                    {text: 'Credit', value: 'balance.credit', align: 'right'},
                    {text: 'Running balance', sortable: false, align: 'right'},
                ],
                search: '',
                filters: {
                    dates: {}
                },
                totalIsWrong: false,
                accounts: []
            }

        },

        created() {
            let self = this

            this.$bus.$on('updated-accounts', () => {
                self.getAccounts()
            })
        },

        beforeDestroy() {
            this.$bus.$off('updated-accounts');
        },

        mounted() {
            this.getAccounts()
        },

        methods: {
            ...mapActions(['setMessage']),

            getAccounts() {
                const params = {
                    filters: this.filters
                }

                nominalActivityService.getAccounts(params)
                    .then(response => {
                        this.accounts = response.data
                    })
            },

            exportReporting(format) {
                const params = {
                    format,
                    filters: this.filters
                }

                nominalActivityService.exportReport(params)
            },

            google2faVerified() {
                console.log('good')
            }
        },

        computed: {
            ...mapGetters({
                assignedAccounts: 'assignedAccounts',
            }),

            filteredAccounts() {
                return this.accounts.filter((account) => {
                    let condition = true

                    if (condition && (!account.total_credit && !account.total_debit)) {
                        condition = false
                    }
                    return condition
                })
            },

            filteredAssignedAccounts() {
                var assignedAccountIds = this.accounts.map(account => account.account.assigned_account_id)

                return this.assignedAccounts.filter(account => assignedAccountIds.indexOf(account.id) !== -1)
            },

            totals() {
                let debit = 0
                let credit = 0
                this.filteredAccounts.forEach((account) => {
                    debit += account.total_debit || 0
                    credit += account.total_credit || 0
                })

                return {debit, credit}
            },

            isTotalCorrect() {
                if(this.filters) {
                    return true
                }
                let totalCorrect = this.totals.credit == this.totals.debit

                if (!totalCorrect && !this.totalIsWrong) {
                    this.totalIsWrong = true
                    this.setMessage({type: 'error', message: 'The total is not valid'})
                }

                return totalCorrect
            },

            resetCurrentPage() {
                this.currentPage = 1
            },
        },

        watch: {
            filters: {
                handler() {
                    this.getAccounts()
                },
                deep: true
            },
        },

        components: { AccountActivity },

    }
</script>