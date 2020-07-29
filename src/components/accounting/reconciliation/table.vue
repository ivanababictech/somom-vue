<template>
    <v-card>
        <v-layout wrap>
            <v-flex xs12 md2 lg1 ml-2 class="bottom-align-content">
                <span class="mr-2">Date Range</span>
            </v-flex>

            <v-flex xs6 sm4 md3 ml-2>
                <date-picker label="To" v-model="filters.date_from" full-width hide-details clearable></date-picker>
            </v-flex>
            <v-flex xs6 sm4 md3 ml-2>
                <date-picker label="To" v-model="filters.date_to" full-width hide-details clearable></date-picker>
            </v-flex>
        </v-layout>

        <v-data-table
                v-model="selected"
                :headers="headers"
                :items="items.data"
                select-all
                hide-actions
                item-key="id"
                class="table-reports fixed-layout">

            <template slot="headers" slot-scope="props">
                <tr>
                    <th
                            v-for="header in props.headers"
                            :key="header.text"
                            class="text-xs-center"
                    >
                        <v-icon small>arrow_upward</v-icon>
                        {{ header.text }}
                    </th>
                    <th v-if="!typeReconciled">
                        <v-checkbox
                                primary
                                hide-details
                                @click.native="toggleAll"
                                :input-value="props.all"
                                :indeterminate="props.indeterminate"
                        ></v-checkbox>
                    </th>
                </tr>
            </template>

            <template slot="items" slot-scope="props">
                <tr :active="props.selected" @click="props.selected = !props.selected">
                    <td class="text-xs-center">{{ props.item.transaction.date }}</td>
                    <td class="text-xs-center" v-if="['cheque_paid', 'cheque_received'].indexOf(reconciliation.type) != -1">
                        {{ props.item.transaction.data.cheque_number }}
                    </td>
                    <td class="text-xs-center">{{ props.item.transaction.description }}</td>
                    <td class="text-xs-center">
                        <span v-if="typeReconciled">
                            {{ props.item.transaction.reconcile ? props.item.transaction.reconcile.match_id : '' }}
                        </span>
                    </td>
                    <td class="text-xs-center">
                        {{ getAllocation(props.item.transaction) }}
                    </td>
                    <td class="text-xs-center">{{ formatMoney(getDebit(props.item)) }}</td>
                    <td class="text-xs-center">{{ formatMoney(getCredit(props.item)) }}</td>
                    <template v-if="['bank', 'cash'].indexOf(reconciliation.type) != -1">
                        <td class="text-xs-center">
                            {{ props.item.transaction.currency }}
                            {{ formatMoney(props.item.transaction.foreign_amount) }}
                        </td>
                    </template>
                    <td class="text-xs-center">
                        <v-tooltip top v-if="typeReconciled">
                            <v-btn icon slot="activator" class="mx-0" @click="unmatchReconciles(props.item.transaction.reconcile)">
                                <v-icon color="warning">cancel</v-icon>
                            </v-btn>
                            <span>Unmatch transaction</span>
                        </v-tooltip>
                    </td>
                    <td v-if="!typeReconciled">
                        <v-checkbox
                                primary
                                hide-details
                                :input-value="props.selected"
                        ></v-checkbox>
                    </td>
                </tr>
            </template>

            <template slot="footer">
                <td :colspan="totalColspans"><strong>Total</strong></td>
                <td class="text-xs-center"><strong>{{ formatMoney(items.totals.debit) }}</strong></td>
                <td class="text-xs-center"><strong>{{ formatMoney(items.totals.credit) }}</strong></td>
                <template v-if="['bank', 'cash'].indexOf(reconciliation.type) != -1">
                    <td></td>
                    <td></td>
                </template>
            </template>

        </v-data-table>
        <div class="text-xs-center" v-if="items.last_page > 1">
            <v-pagination :length="items.last_page" v-model="currentPage" :total-visible="7"></v-pagination>
        </div>

        <confirm-reconciling v-if="reconciling.showConfirmation" :reconciling="reconciling"
                             @confirm="reconcileDifference"></confirm-reconciling>
    </v-card>
</template>

<script>
    import {mapGetters} from 'vuex'
    import * as allocationTypeService from '@/app/settings/accounting/allocation-types/service'
    import ConfirmReconciling from '@/app/accountings/components/dialogs/invoices/reconciliation/confirm-reconciling'
    import * as reconciliationService from './service'

    export default {
        props: {
            account: Object,
            reconciliation: Object,
            typeReconciled: Number|String,
        },

        data: () => ({
            filters: {
                date_from: null,
                date_to: null,
            },
            items: {
                totals: {},
                data: []
            },
            currentPage: 1,
            reconciling: {
                typeDifference: false,
                showConfirmation: false,
            },
            selected: [],
            types: ['Bank charges', 'Difference on exchange', 'Provision for bad debts', 'Bad debts'],
            bankHeaders: [
                {text: 'Date', align: 'center', value: 'date'},
                {text: 'Description', align: 'center', value: 'description'},
                {text: 'Matching Id', align: 'center', value: 'matching_id'},
                {text: 'Allocation', align: 'center', value: 'allocation'},
                {text: 'Debit', align: 'center', value: 'debit'},
                {text: 'Credit', align: 'center', value: 'credit'},
                {text: 'Foreign amount', align: 'center', value: 'currency'},
                {text: 'Actions', align: 'center', value: 'actions'},
            ],
            chequeHeaders: [
                {text: 'Date', align: 'center', value: 'date'},
                {text: 'Cheque number', align: 'center', value: 'description'},
                {text: 'Description', align: 'center', value: 'description'},
                {text: 'Matching Id', align: 'center', value: 'matching_id'},
                {text: 'Allocation', align: 'center', value: 'allocation'},
                {text: 'Debit', align: 'center', value: 'debit'},
                {text: 'Credit', align: 'center', value: 'credit'},
                {text: 'Actions', align: 'right', value: 'actions'},
            ],
        }),

        watch: {
            typeReconciled: 'resetPage',
            reconciliation: 'fetchEntries',
            filters: {
                handler: 'fetchEntries',
                deep: true
            },
            currentPage: 'fetchEntries',
        },

        computed: {
            ...mapGetters({
                accountNameById: 'accounting/accountNameById',
            }),

            selectedTotals() {
                let debit = 0
                let credit = 0
                this.selected.forEach(entry => {
                    debit += entry.debit
                    credit += entry.credit
                })
                return {debit, credit}
            },
            reconcileTitle() {
                const {debit, credit} = this.selectedTotals
                let amount = Math.abs(debit - credit)
                amount = this.$helpers.number(amount)
                return `Shall we allocate the difference of €${amount} as a Difference on exchange?`
            },
            headers() {
                let headers = null

                switch (this.reconciliation.type) {
                    case 'bank':
                    case 'cash':
                        headers = this.bankHeaders
                        break
                    case 'cheque_paid':
                    case 'cheque_received':
                        headers = this.chequeHeaders
                        break

                    default:
                        headers = this.bankHeaders
                }

                return headers
            },

            totalColspans() {
                let colspans = 5

                switch (this.reconciliation.type) {
                    case 'bank':
                    case 'cash':
                        colspans = !this.typeReconciled ? 5 : 4
                        break
                    case 'cheque_paid':
                    case 'cheque_received':
                        colspans = !this.typeReconciled ? 6 : 5
                        break
                }
                return colspans
            },
        },

        mounted() {
            this.resetData()
        },

        methods: {
            resetData() {
                this.filters = {}
                this.selected = []
                this.currentPage = 1
            },

            fetchEntries() {
                var params = {
                    filters: this.filters,
                    page: this.currentPage
                }

                reconciliationService.transactions(this.account.id, this.reconciliation.type, this.typeReconciled, params)
                    .then(response => {
                        this.items = response.data
                    })
            },

            toggleAll() {
                if (this.selected.length) {
                    this.selected = []
                } else {
                    this.selected = this.items.data.slice()
                }
            },
            resetPage() {
                this.currentPage = 1;
                this.fetchEntries()
            },

            reconcile() {
                reconciliationService.reconcile(this.reconciliation.type, this.selected)
                    .then(response => {
                        this.resetData()
                        this.$emit('update')
                    })
            },

            reconcileDifference() {
                reconciliationService.reconcileDifference(this.reconciling, this.selected)
                    .then(response => {
                        this.resetData()
                        this.$emit('update')
                    })
            },

            unmatchReconciles(item) {
                reconciliationService.unmatch(item)
                    .then(response => {
                        this.resetData()
                        this.$emit('update')
                    })
            },

            /**
             * Get allocation for reconciliation
             *
             * @param reconciliation
             */
            getAllocation(reconciliation) {
                switch (reconciliation.allocation_type) {
                    case allocationTypeService.TYPE_CHEQUES_PAYMENT:
                        return reconciliation.data.allocation
                        break;
                }
                if (reconciliation.account_id == this.account.id) {
                    return reconciliation.allocation
                }
                return this.accountNameById(reconciliation.account_id)
            },

            /**
             * Get debit
             *
             * @param reconciliation
             */
            getDebit(reconciliation) {
                if (this.isChequeTransaction(reconciliation)) {
                    return reconciliation.credit
                }
                return reconciliation.debit
            },

            /**
             * Get credit
             *
             * @param reconciliation
             */
            getCredit(reconciliation) {
                if (this.isChequeTransaction(reconciliation)) {
                    return reconciliation.debit
                }

                return reconciliation.credit
            },

            /**
             * We invert credit and debit for cheque transactions
             *
             * @param reconciliation
             * @returns {boolean}
             */
            isChequeTransaction(reconciliation) {
                return ['cheque_received', 'cheque_paid'].indexOf(reconciliation.transaction.type) !== -1 ||
                    [20, 34].indexOf(reconciliation.account.assigned_account_id) !== -1
            },

            confirmReconcileDifference(type) {
                let balance = this.selectedTotals.debit - this.selectedTotals.credit

                if (balance === 0) {
                    return this.reconcile()
                }

                this.reconciling.typeDifference = type
                this.reconciling.showConfirmation = true
                this.reconciling.amount = balance
            },
        },

        components: {ConfirmReconciling}
    }
</script>
