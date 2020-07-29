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
            <span class="subheading">1. Reviewed supporting documentation to determine if finance cost is correctly stated.</span>
        </v-layout>

        <template v-for="subAccount in subAccounts">
            <template v-if="checkSubaccount(subAccount.name)">
                <v-layout mt-4>
                    <span class="subheading grey--text text--darken-3">
                        <strong>{{ subAccount.name }}</strong>
                    </span>
                </v-layout>
                <template v-if="subAccount.name === 'Retained earnings/(Accumulated loss)'">
                    <v-layout row>
                        <v-flex xs6>
                            <v-text-field
                                    hide-details
                                    :label="subAccount.openingBalance.name"
                                    v-model="subAccount.openingBalance.value"
                                    type="number">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs6>
                            <v-text-field
                                    hide-details
                                    :label="subAccount.profitLoss.name"
                                    v-model="subAccount.profitLoss.value"
                                    type="number">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs6>
                            <v-text-field
                                    hide-details
                                    :label="subAccount.interimDividendsPaid.name"
                                    v-model="subAccount.interimDividendsPaid.value"
                                    type="number">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs6>
                            <v-text-field
                                    hide-details
                                    :label="subAccount.finalDividendsPaid.name"
                                    v-model="subAccount.finalDividendsPaid.value"
                                    type="number">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs6>
                            <v-text-field
                                    hide-details
                                    :label="subAccount.amount.name"
                                    :value="retainedEarnings"
                                    read-only
                                    type="number">
                            </v-text-field>
                        </v-flex>
                    </v-layout>
                </template>
                <v-layout row v-else>
                    <v-flex xs6>
                        <v-text-field
                                hide-details
                                :label="subAccount.amount.name"
                                v-model="subAccount.amount.value"
                                type="number">
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-layout row v-if="subAccount.additional">
                    <v-flex xs6>
                        <v-text-field
                                hide-details
                                label="Additional comments"
                                type="number">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </template>
        </template>

        <v-layout column mt-4 v-if="matchSubAccount">
            <p class="subheading">1. Agreed the company details with MFSA records</p>
            <p class="subheading">2. Obtained the latest annual return</p>
            <p class="subheading">3. Obtained documents filed with MFSA during the period under review</p>
        </v-layout>

        <!--<template v-for="subAccount in subAccounts" v-if="checkSubaccount(subAccount.name)">-->
            <!--<v-btn class="success">{{ subAccount.name }}</v-btn>-->
            <v-btn class="success">MFSA search results</v-btn><br/>
            <v-btn class="success">Annual return</v-btn><br/>
            <v-btn class="success">Documents submitted with MFSA during the year</v-btn><br/>
            <v-btn class="success">Dividend warrants</v-btn><br/>
            <v-btn class="success">Other documents</v-btn>
            <!--<br/>-->
        <!--</template>-->

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

    export default{
        mixins: [isAccount],
        data: () => ({
            subAccounts: [
                {
                    name: 'Share capital',
                    amount: {
                        value: 0,
                        name: 'Share capital as per MFSA records'
                    }
                },
                {
                    name: 'Retained earnings/(Accumulated loss)',
                    amount: {
                        value: 0,
                        name: 'Closing balance as per last year financial statements'
                    },
                    openingBalance: {
                        name: 'Opening balance as per last year financial statements',
                        value: 0
                    },
                    profitLoss: {
                        name: 'Profit/(loss for the year)',
                        value: 0
                    },
                    interimDividendsPaid: {
                        name: 'Interim dividends paid',
                        value: 0
                    },
                    finalDividendsPaid: {
                        name: 'Final dividends paid',
                        value: 0
                    }
                },
                {
                    name: 'Dividends interim',
                    amount: {
                        value: 0,
                        name: 'Dividend as per resoution.dividend warrant'
                    }
                },
                {
                    name: 'Dividends final',
                    amount: {
                        value: 0,
                        name: 'Dividend as per resoution.dividend warrant'
                    }
                },
                {
                    name: 'Share premium',
                    amount: {
                        value: 0,
                        name: 'Share premium value as per documents'
                    },
                    additional: true
                },
                {
                    name: 'Revaluation reserve',
                    amount: {
                        value: 0,
                        name: 'Revaluation reserve value as per documents'
                    },
                    additional: true
                },
                {
                    name: 'Capital contribution',
                    amount: {
                        value: 0,
                        name: 'Capital contribution reserve value as per documents'
                    },
                    additional: true
                },
                {
                    name: 'Other reserves',
                    amount: {
                        value: 0,
                        name: 'Other reserves value as per documents'
                    },
                    additional: true
                }
            ]
        }),
        mounted () {
            let accounts = this.addAccounts();
            this.accounts.push(...accounts);
        },
        methods: {
            addAccounts () {
                return [
                    {
                        sub_account: {
                            name: 'Share capital'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Retained earnings/(Accumulated loss)'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Dividends interim'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Dividends final'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Share premium'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Revaluation reserve'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Capital contribution'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Other reserves'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    }
                ]
            }
        },
        computed: {
            retainedEarnings () {
                let retainedEarnings = this.subAccounts.find(subAccount => subAccount.name === 'Retained earnings/(Accumulated loss)')
                let total = 0;
                if (retainedEarnings) {
                    let openingBalance = parseInt(retainedEarnings.openingBalance.value)
                    let profitLoss = parseInt(retainedEarnings.profitLoss.value)
                    let interimDividendsPaid = parseInt(retainedEarnings.interimDividendsPaid.value)
                    let finalDividendsPaid = parseInt(retainedEarnings.finalDividendsPaid.value)
                    total = openingBalance + profitLoss + interimDividendsPaid + finalDividendsPaid
                    retainedEarnings.amount.value = total
                }
                return total;
            }
        }
    }
</script>