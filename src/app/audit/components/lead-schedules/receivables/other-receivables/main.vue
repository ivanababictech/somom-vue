<template>
    <v-flex xs10 offset-xs1 class="mt-4">
        <v-layout row class="success-text title" v-if="matchSubAccount">
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
            <span class="subheading">1. Reviewed supporting documentation to determine whether payables are correctly stated.</span>
        </v-layout>


        <template v-if="checkSubaccount('Prepayments')">
            <v-layout mt-4>
                    <span class="subheading grey--text text--darken-3">
                        <strong>Prepayments</strong>
                    </span>
            </v-layout>
            <prepayments-table :prepayments="prepayments" @prepayment="prepayment"></prepayments-table>
        </template>

        <template v-if="checkSubaccount('Accrued income')">
            <v-layout mt-4>
                    <span class="subheading grey--text text--darken-3">
                        <strong>Accrued income</strong>
                    </span>
            </v-layout>
            <prepayments-table :prepayments="accruedIncomes" @prepayment="accruedIncome"></prepayments-table>
        </template>

        <template v-if="checkSubaccount('Advance payments')">
            <v-layout mt-4>
                    <span class="subheading grey--text text--darken-3">
                        <strong>Advance payments</strong>
                    </span>
            </v-layout>
            <v-layout row>
                <v-flex xs9>
                    <v-flex xs11>
                        <v-text-field hide-details label="Advance payments details"></v-text-field>
                    </v-flex>
                </v-flex>
                <v-flex xs3>
                        <v-text-field
                                hide-details
                                label="Amount"
                                v-model="getSubaccount('Advance payments').amount.value"
                                type="number">
                        </v-text-field>
                </v-flex>
            </v-layout>
        </template>

        <template v-if="checkSubaccount('Other receivables')">
            <v-layout mt-4>
                    <span class="subheading grey--text text--darken-3">
                        <strong>Other receivables</strong>
                    </span>
            </v-layout>
            <v-layout row>
                <v-flex xs9>
                    <v-flex xs11>
                        <v-text-field hide-details label="Other receivables details"></v-text-field>
                    </v-flex>
                </v-flex>
                <v-flex xs3>
                    <v-text-field
                            hide-details
                            label="Amount"
                            v-model="getSubaccount('Other receivables').amount.value"
                            type="number">
                    </v-text-field>
                </v-flex>
            </v-layout>
        </template>

        <v-layout mt-4>
            <span class="subheading">2. Obtained supporting documentation related to payables.</span>
        </v-layout>

        <template v-for="subAccount in subAccounts" v-if="checkSubaccount(subAccount.name)">
            <v-btn class="success">{{ subAccount.buttonName }}</v-btn>
            <br/>
        </template>

        <v-layout row mt-4>
            <v-flex xs8>
                <span class="primary-text subheading" style="font-weight: 700">Additional comments</span>
                <v-textarea label="Enter comments (optional)"></v-textarea>
            </v-flex>
        </v-layout>
        <v-layout row mt-4>
            <v-flex xs8>
                <span class="primary-text subheading" style="font-weight: 700">Conclusion</span><br/>
                <span class="subheading">Test satisfactorily</span>
            </v-flex>
        </v-layout>
    </v-flex>
</template>

<script>
    import isAccount from '../../mixins/isAccount'
    import prepaymentsTable from './tables/prepayments.vue'

    export default {
        mixins: [isAccount],
        components: {
            prepaymentsTable
        },
        data: () => ({
            subAccounts: [
                {
                    name: 'Prepayments',
                    buttonName: 'Prepayments invoices/client workings',
                    amount: {
                        name: '',
                        value: 0
                    }
                },
                {
                    name: 'Accrued income',
                    buttonName: 'Accrued income invoices/client workings',
                    amount: {
                        name: '',
                        value: 0
                    }
                },
                {
                    name: 'Advance payments',
                    buttonName: 'Advance payments',
                    amount: {
                        name: '',
                        value: 0
                    }
                },
                {
                    name: 'Other receivables',
                    buttonName: 'Other receivables',
                    amount: {
                        name: '',
                        value: 0
                    }
                }
            ],
            prepayments: [
                {
                    account_name: 'Audit fee',
                    date_of_invoice: '15/07/2017',
                    details: 'Audit fee for 2016',
                    amount: 700
                },
                {
                    account_name: 'Audit fee',
                    date_of_invoice: '15/07/2017',
                    details: 'Audit fee for 2016',
                    amount: 700
                },
                {
                    account_name: 'Audit fee',
                    date_of_invoice: '15/07/2017',
                    details: 'Audit fee for 2016',
                    amount: 700
                }
            ],
            accruedIncomes: [
                {
                    account_name: 'Audit fee',
                    date_of_invoice: '15/07/2017',
                    details: 'Audit fee for 2016',
                    amount: 700
                },
                {
                    account_name: 'Audit fee',
                    date_of_invoice: '15/07/2017',
                    details: 'Audit fee for 2016',
                    amount: 700
                },
                {
                    account_name: 'Audit fee',
                    date_of_invoice: '15/07/2017',
                    details: 'Audit fee for 2016',
                    amount: 700
                }
            ],
        }),
        created () {
          let accounts = this.addAccounts();
          this.accounts.push(...accounts);
        },
        methods: {
            accruedIncome (value) {
                this.getSubaccount('Accrued income').amount.value = value
            },
            prepayment (value) {
                this.getSubaccount('Prepayments').amount.value = value
            },
            addAccounts () {
                return [
                    {
                        sub_account: {
                            name: 'Prepayments'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Accrued income'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Advance payments'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Other receivables'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    }
                ]
            }
        }
    }
</script>