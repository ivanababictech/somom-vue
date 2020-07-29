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

        <v-layout mt-4 v-if="matchSubAccount">
            <span class="subheading">1. Reviewed supporting documentation to determine if finance income is correctly stated.</span>
        </v-layout>

        <template v-for="subAccount in subAccounts">
            <template v-if="checkSubaccount(subAccount.name)">
                <v-layout mt-4>
                    <span class="subheading grey--text text--darken-3">
                        <strong>{{ subAccount.name }}</strong>
                    </span>
                </v-layout>
                <v-layout row>
                    <v-flex xs4>
                        <v-flex xs11>
                            <v-text-field hide-details :label="subAccount.title"></v-text-field>
                        </v-flex>
                    </v-flex>
                    <v-flex xs8>
                        <v-flex xs11>
                            <v-text-field
                                    hide-details
                                    :label="subAccount.amount.title"
                                    v-model="subAccount.amount.value"
                                    type="number">
                            </v-text-field>
                        </v-flex>
                    </v-flex>
                </v-layout>
                <v-text-field label="Purpose of such loan" hide-details class="mt-0"
                              v-model="subAccount.purpose"></v-text-field>
                <v-layout row mt-2>
                    <v-flex xs6>
                        <v-layout row align-end fill-height justify-space-between>
                            Is the loan interest free?
                            <v-flex xs3>
                                <v-radio-group v-model="subAccount.interestFree.value" row hide-details class="mt-0 pt-0">
                                    <v-radio label="Yes" :value="1"></v-radio>
                                    <v-radio label="No" :value="0"></v-radio>
                                </v-radio-group>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex xs6 v-if="subAccount.interestFree.value === 0">
                        <v-text-field
                                hide-details
                                label="Enter interest rate"
                                class="mt-0"
                                v-model="subAccount.interestFree.rate"
                                type="number">
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row mt-2>
                    <v-flex xs6>
                        <v-layout row align-end fill-height justify-space-between>
                            Is the loan unsecured?
                            <v-flex xs3>
                                <v-radio-group v-model="subAccount.unsecured.value" row hide-details class="mt-0 pt-0">
                                    <v-radio label="Yes" :value="1"></v-radio>
                                    <v-radio label="No" :value="0"></v-radio>
                                </v-radio-group>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex xs6 v-if="subAccount.unsecured.value === 0">
                        <v-text-field
                                hide-details
                                label="Enter security details"
                                class="mt-0"
                                v-model="subAccount.unsecured.rate"
                                type="number">
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row mt-2>
                    <v-flex xs6>
                        <v-layout row align-end fill-height justify-space-between>
                            Is the loan without repayment date?
                            <v-flex xs3>
                                <v-radio-group v-model="subAccount.withoutRepaymentDate.value" row hide-details class="mt-0 pt-0">
                                    <v-radio label="Yes" :value="1"></v-radio>
                                    <v-radio label="No" :value="0"></v-radio>
                                </v-radio-group>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex xs6 v-if="subAccount.withoutRepaymentDate.value === 0">
                        <v-text-field
                                hide-details
                                label="Enter security details"
                                class="mt-0"
                                v-model="subAccount.withoutRepaymentDate.rate"
                                type="number">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </template>
        </template>

        <v-layout mt-4 v-if="matchSubAccount">
            <span class="subheading">2. Obtained supporting documentation related to finance cost.</span>
        </v-layout>

        <template v-for="subAccount in subAccounts" v-if="checkSubaccount(subAccount.name)">
            <v-btn class="success">{{ subAccount.name }}</v-btn>
            <br/>
        </template>

        <v-layout row :mt-4="matchSubAccount">
            <v-flex xs8>
                <span class="primary-text subheading"><strong>Additional comments</strong></span>
                <v-text-field multiLine label="Enter comments (optional)"></v-text-field>
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

    export default {
        mixins: [isAccount],
        data: () => ({
            subAccounts: [
                {
                    name: 'Director loans',
                    amount: {
                        title: 'Loan amount as per confirmation letter',
                        value: 0
                    },
                    title: 'Director name',
                    purpose: '',
                    interestFree: {
                        value: null,
                        rate: null
                    },
                    unsecured: {
                        value: null,
                        details: ''
                    },
                    withoutRepaymentDate: {
                        value: null,
                        rate: null
                    }
                },
                {
                    name: 'Shareholder loans',
                    amount: {
                        title: 'Loan amount as per confirmation letter',
                        value: 0
                    },
                    title: 'Shareholder name',
                    purpose: '',
                    interestFree: {
                        value: null,
                        rate: null
                    },
                    unsecured: {
                        value: null,
                        details: ''
                    },
                    withoutRepaymentDate: {
                        value: null,
                        rate: null
                    }
                },
                {
                    name: 'Parent company loans',
                    amount: {
                        title: 'Loan amount as per parent company accounts',
                        value: 0
                    },
                    title: 'Parent company name',
                    purpose: '',
                    interestFree: {
                        value: null,
                        rate: null
                    },
                    unsecured: {
                        value: null,
                        details: ''
                    },
                    withoutRepaymentDate: {
                        value: null,
                        rate: null
                    }
                },
                {
                    name: 'Related party loans',
                    amount: {
                        title: 'Loan amount as per related party accounts',
                        value: 0
                    },
                    title: 'Parent company name',
                    purpose: '',
                    interestFree: {
                        value: null,
                        rate: null
                    },
                    unsecured: {
                        value: null,
                        details: ''
                    },
                    withoutRepaymentDate: {
                        value: null,
                        rate: null
                    }
                },
                {
                    name: 'Subsidiary loans',
                    amount: {
                        title: 'Loan amount as per subsidiary company accounts',
                        value: 0
                    },
                    title: 'Subsidiary company name',
                    purpose: '',
                    interestFree: {
                        value: null,
                        rate: null
                    },
                    unsecured: {
                        value: null,
                        details: ''
                    },
                    withoutRepaymentDate: {
                        value: null,
                        rate: null
                    }
                }
            ]
        }),
        created() {
            let accounts = this.addAccounts();
            this.accounts.push(...accounts)
        },
        methods: {
            addAccounts() {
                return [
                    {
                        sub_account: {
                            name: 'Director loans'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Shareholder loans'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Parent company loans'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Related party loans'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Subsidiary loans'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    }
                ]
            }
        }
    }
</script>