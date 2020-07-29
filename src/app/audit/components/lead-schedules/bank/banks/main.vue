<template>
    <v-flex xs10 offset-xs1 class="mt-4">
        <v-layout row class="primary-text title" v-if="matchSubAccount">
            <v-flex xs3>
                <span>Sub-account name</span>
            </v-flex>
            <v-flex xs3 ml-3>
                <span>Balance as per Trail balance</span>
            </v-flex>
            <v-flex xs3 ml-3>
                <span>Balance as per audit testing</span>
            </v-flex>
            <v-flex xs3 ml-3>
                <span>Difference</span>
            </v-flex>
        </v-layout>

        <template v-for="subAccount in subAccounts">
            <v-layout row mt-2 align-center mt-3 v-if="checkSubaccount(subAccount.name)">
                <v-flex xs3>
                    <span class="subheading grey--text text--darken-3"><strong>{{ subAccount.name }}</strong></span>
                </v-flex>
                <v-flex xs3 ml-3>
                    <v-flex xs6>
                        <v-text-field
                                hide-details
                                readonly
                                class="mt-0 pt-0"
                                :value="checkSubaccount(subAccount.name).amount + checkSubaccount(subAccount.name).audit_adjustments">
                        </v-text-field>
                    </v-flex>
                </v-flex>
                <v-flex xs3 ml-3>
                    <v-flex xs6>
                        <v-text-field
                                hide-details
                                readonly
                                class="mt-0 pt-0"
                                v-model="subAccount.amount.value"></v-text-field>
                    </v-flex>
                </v-flex>
                <v-flex xs3 ml-3>
                    <v-flex xs6>
                        <v-text-field
                                hide-details
                                readonly
                                class="mt-0 pt-0"
                                :value="checkSubaccount(subAccount.name).amount + checkSubaccount(subAccount.name).audit_adjustments - subAccount.amount.value">
                        </v-text-field>
                    </v-flex>
                </v-flex>
            </v-layout>
        </template>

        <v-layout row mt-2 align-center v-if="matchSubAccount">
            <v-flex xs3>
                <span class="subheading grey--text text--darken-3"><strong>Total</strong></span>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-flex xs6>
                    <v-text-field hide-details readonly class="mt-0 pt-0" :value="totalBalancePerTrail"></v-text-field>
                </v-flex>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-flex xs6>
                    <v-text-field hide-details readonly class="mt-0 pt-0" :value="totalBalancePerAudit"></v-text-field>
                </v-flex>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-flex xs6>
                    <v-text-field hide-details readonly class="mt-0 pt-0" :value="totalDifference"></v-text-field>
                </v-flex>
            </v-flex>
        </v-layout>

        <v-layout mt-4>
            <span class="subheading">1. Obtained copy of the bank documents to verifiy the balances stated in the accounts.</span>
        </v-layout>

        <template v-if="checkSubaccount('Bank balance')">
            <v-layout mt-4>
                    <span class="subheading grey--text text--darken-3">
                        <strong>Bank balance</strong>
                    </span>
            </v-layout>
            <balances-table :balances="balances"></balances-table>
        </template>

        <template v-if="checkSubaccount('Cash balance')">
            <v-layout mt-4>
                    <span class="subheading grey--text text--darken-3">
                        <strong>Cash balance</strong>
                    </span>
            </v-layout>
            <v-layout row>
                <v-flex xs5>
                    <v-flex xs11>
                        <v-text-field hide-details label="Reason for such cash balance"></v-text-field>
                    </v-flex>
                </v-flex>
                <v-flex xs5>
                    <v-text-field
                            hide-details
                            label="Cash balance as per management count"
                            v-model="getSubaccount('Cash balance').amount.value"
                            type="number">
                    </v-text-field>
                </v-flex>
            </v-layout>
        </template>

        <template v-if="checkSubaccount('Bank loan')">
            <v-layout mt-4>
                    <span class="subheading grey--text text--darken-3">
                        <strong>Bank loan</strong>
                    </span>
            </v-layout>
            <loans-table :loans="loans"></loans-table>
        </template>

        <template v-if="checkSubaccount('Bank overdraft')">
            <v-layout mt-4>
                    <span class="subheading grey--text text--darken-3">
                        <strong>Bank overdraft</strong>
                    </span>
            </v-layout>
            <overdrafts-table :overdrafts="overdrafts"></overdrafts-table>
        </template>

        <v-layout mt-4>
            <span class="subheading">2. Obtained supporting documentation related to payables.</span>
        </v-layout>

            <v-btn class="success">Bank statements</v-btn>
            <br/>
            <v-btn class="success">Audit bank letter</v-btn>
            <br/>
            <v-btn class="success">Sanction letters</v-btn>
            <br/>
            <v-btn class="success">Other documents</v-btn>

        <v-layout row :mt-4="matchSubAccount">
            <v-flex xs8>
                <span class="primary-text subheading"><strong>Additional comments</strong></span>
                <v-textarea label="Enter comments (optional)"></v-textarea>
            </v-flex>
        </v-layout>
        <v-layout row mt-4>
            <v-flex xs8>
                <span class="primary-text subheading"><strong>Conclusion</strong></span><br/>
                <span class="subheading">Test satisfactorily</span>
            </v-flex>
        </v-layout>
    </v-flex>
</template>

<script>
    import isAccount from '../../mixins/isAccount'
    import balancesTable from './tables/balances.vue'
    import loansTable from './tables/loans.vue'
    import overdraftsTable from './tables/overdrafts.vue'

    export default{
        mixins: [isAccount],
        components: {
            balancesTable,
            loansTable,
            overdraftsTable
        },
        data: () => ({
            balanceCreditorList: 0,
            subAccounts: [
                {
                    name: 'Bank balance',
                    amount: {
                        name: '',
                        value: 0
                    }
                },
                {
                    name: 'Cash balance',
                    amount: {
                        name: '',
                        value: 0
                    }
                },
                {
                    name: 'Bank loan',
                    amount: {
                        name: '',
                        value: 0
                    }
                },
                {
                    name: 'Bank overdraft',
                    amount: {
                        name: '',
                        value: 0
                    }
                }
            ],
            balances: [
                {
                    bank_name: 'Sata bank',
                    bank_statement_balance: 10000,
                    currency: 'Euro',
                    rate: 1.05,
                    converted_amount: 10500,
                    unpresented_cheques: 500,
                    income_not_deposited: 0
                },
                {
                    bank_name: 'BOV',
                    bank_statement_balance: 10000,
                    currency: 'Euro',
                    rate: 1.05,
                    converted_amount: 10500,
                    unpresented_cheques: 0,
                    income_not_deposited: 0
                },
                {
                    bank_name: 'HSBC',
                    bank_statement_balance: 10000,
                    currency: 'Euro',
                    rate: 1.05,
                    converted_amount: 10500,
                    unpresented_cheques: 500,
                    income_not_deposited: 0
                },
            ],
            loans: [
                {
                    bank_name: 'Sata bank',
                    bank_statement_balance: 10000,
                    currency: 'Euro',
                    rate: 1.05,
                    converted_amount: 10500,
                    interest_rate: 6,
                    monthly_repayment: 10000,
                    repayment_date: '18/10/2018'
                },
                {
                    bank_name: 'BOV',
                    bank_statement_balance: 10000,
                    currency: 'Euro',
                    rate: 1.05,
                    converted_amount: 10500,
                    interest_rate: 6,
                    monthly_repayment: 10000,
                    repayment_date: '18/10/2018'
                },
                {
                    bank_name: 'HSBC',
                    bank_statement_balance: 10000,
                    currency: 'Euro',
                    rate: 1.05,
                    converted_amount: 10500,
                    interest_rate: 6,
                    monthly_repayment: 10000,
                    repayment_date: '18/10/2018'
                },
            ],
            overdrafts: [
                {
                    bank_name: 'Sata bank',
                    bank_statement_balance: 10000,
                    currency: 'Euro',
                    rate: 1.05,
                    converted_amount: 10500,
                    interest_rate: 6,
                },
                {
                    bank_name: 'BOV',
                    bank_statement_balance: 10000,
                    currency: 'Euro',
                    rate: 1.05,
                    converted_amount: 10500,
                    interest_rate: 6,
                },
                {
                    bank_name: 'HSBC',
                    bank_statement_balance: 10000,
                    currency: 'Euro',
                    rate: 1.05,
                    converted_amount: 10500,
                    interest_rate: 6,
                },
            ],
        }),
        created () {
            let accounts = this.addAccounts();
            this.accounts.push(...accounts);
        },
        methods: {
            addAccounts () {
                return [
                    {
                        sub_account: {
                            name: 'Bank balance'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Cash balance'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Bank loan'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Bank overdraft'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    }
                ]
            }
        }
    }
</script>