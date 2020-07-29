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


        <template v-if="checkSubaccount('Accruals')">
            <v-layout mt-4>
                    <span class="subheading grey--text text--darken-3">
                        <strong>Accruals</strong>
                    </span>
            </v-layout>
            <accruals-table :accruals="accruals" @accrual="accrual"></accruals-table>
        </template>
        <template v-if="checkSubaccount('Advance deposit')">
            <v-layout mt-4>
                    <span class="subheading grey--text text--darken-3">
                        <strong>Advance deposit</strong>
                    </span>
            </v-layout>
            <v-layout row>
                <v-flex xs9>
                    <v-flex xs11>
                        <v-text-field hide-details label="Advance deposit details"></v-text-field>
                    </v-flex>
                </v-flex>
                <v-flex xs3>
                        <v-text-field
                                hide-details
                                label="Amount"
                                v-model="getSubaccount('Advance deposit').amount.value"
                                type="number">
                        </v-text-field>
                </v-flex>
            </v-layout>
        </template>
        <template v-if="checkSubaccount('Other payables')">
            <v-layout mt-4>
                    <span class="subheading grey--text text--darken-3">
                        <strong>Other payables</strong>
                    </span>
            </v-layout>
            <v-layout row>
                <v-flex xs9>
                    <v-flex xs11>
                        <v-text-field hide-details label="Other payable details"></v-text-field>
                    </v-flex>
                </v-flex>
                <v-flex xs3>
                    <v-text-field
                            hide-details
                            label="Amount"
                            v-model="getSubaccount('Other payables').amount.value"
                            type="number">
                    </v-text-field>
                </v-flex>
            </v-layout>
        </template>
        <template v-if="checkSubaccount('Payroll taxes payable')">
            <v-layout mt-4>
                    <span class="subheading grey--text text--darken-3">
                        <strong>Payroll taxes payable</strong>
                    </span>
            </v-layout>
            <taxes-table :taxes="taxes" @tax="tax"></taxes-table>
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
    import accrualsTable from './tables/accruals.vue'
    import taxesTable from './tables/taxes.vue'

    export default {
        mixins: [isAccount],
        components: {
            accrualsTable,
            taxesTable,
        },
        data: () => ({
            subAccounts: [
                {
                    name: 'Accruals',
                    buttonName: 'Accruals invoices/client workings',
                    amount: {
                        name: '',
                        value: 0
                    }
                },
                {
                    name: 'Advance deposit',
                    buttonName: 'Advance deposit',
                    amount: {
                        name: '',
                        value: 0
                    }
                },
                {
                    name: 'Other payables',
                    buttonName: 'Other payables',
                    amount: {
                        name: '',
                        value: 0
                    }
                },
                {
                    name: 'Payroll taxes payable',
                    buttonName: 'Payroll taxes payable',
                    amount: {
                        name: '',
                        value: 0
                    }
                },
            ],
            accruals: [
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
            taxes: [
                {
                    month: 'October',
                    year: '2016',
                    receipt_no: 'AF2314',
                    fss_tax: 100,
                    ssc: 100,
                    maternity_fund: 100
                },
                {
                    month: 'November',
                    year: '2016',
                    receipt_no: 'AF2545',
                    fss_tax: 100,
                    ssc: 100,
                    maternity_fund: 100
                },
                {
                    month: 'December',
                    year: '2016',
                    receipt_no: 'GY2154',
                    fss_tax: 100,
                    ssc: 100,
                    maternity_fund: 100
                },
            ]
        }),
        created () {
          let accounts = this.addAccounts();
          this.accounts.push(...accounts);
        },
        methods: {
            tax (value) {
                this.getSubaccount('Payroll taxes payable').amount.value = value
            },
            accrual (value) {
                this.getSubaccount('Accruals').amount.value = value
            },
            addAccounts () {
                return [
                    {
                        sub_account: {
                            name: 'Accruals'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Advance deposit'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Other payables'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Payroll taxes payable'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    }
                ]
            }
        }
    }
</script>