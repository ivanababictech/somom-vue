<template>
    <v-flex xs10 offset-xs1 class="mt-4">
        <v-layout row class="success-text title">
            <v-flex xs3>
                <span>Sub-account name</span>
            </v-flex>
            <v-flex xs3 ml-3>
                <span>Balance as per Lead Schedule</span>
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
        </v-layout>

        <v-layout mt-4>
            <span class="subheading">1. Compared details declared in the FS7 with the accounts</span>
        </v-layout>

        <v-layout row class="success-text title">
            <v-flex xs3>
                <span>Values as per FS7</span>
            </v-flex>
        </v-layout>

        <v-layout row mt-2 align-center mt-3>
            <v-flex xs3>
                <span class="subheading grey--text text--darken-3"><strong>Gross wages</strong></span>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-flex xs6>
                    <v-text-field
                            hide-details
                            class="mt-0 pt-0"
                            v-model="gross_wages">
                    </v-text-field>
                </v-flex>
            </v-flex>
        </v-layout>
        <v-layout row mt-2 align-center mt-3>
            <v-flex xs3>
                <span class="subheading grey--text text--darken-3"><strong>SSC</strong></span>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-flex xs6>
                    <v-text-field
                            hide-details
                            class="mt-0 pt-0"
                            v-model="ssc">
                    </v-text-field>
                </v-flex>
            </v-flex>
        </v-layout>
        <v-layout row mt-2 align-center mt-3>
            <v-flex xs3>
                <span class="subheading grey--text text--darken-3"><strong>Maternity fund</strong></span>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-flex xs6>
                    <v-text-field
                            hide-details
                            class="mt-0 pt-0"
                            v-model="maternity_fund">
                    </v-text-field>
                </v-flex>
            </v-flex>
        </v-layout>
        <v-layout row mt-2 align-center mt-3>
            <v-flex xs3>
                <span class="subheading grey--text text--darken-3"><strong>Total</strong></span>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-flex xs6>
                    <v-text-field hide-details readonly class="mt-0 pt-0" :value="totalOther"></v-text-field>
                </v-flex>
            </v-flex>
        </v-layout>
        <v-layout row mt-2 align-center mt-4>
            <v-flex xs3>
                <span class="subheading grey--text text--darken-3"><strong>Payroll as per accounts</strong></span>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-flex xs6>
                    <v-text-field
                            hide-details
                            class="mt-0 pt-0"
                            v-model="totalBalancePerTrail">
                    </v-text-field>
                </v-flex>
            </v-flex>
        </v-layout>
        <v-layout row mt-2 align-center mt-4>
            <v-flex xs3>
                <span class="subheading grey--text text--darken-3"><strong>Difference</strong></span>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-flex xs6>
                    <v-text-field
                            hide-details
                            read-only
                            class="mt-0 pt-0"
                            :value="totalOther - totalBalancePerTrail">
                    </v-text-field>
                </v-flex>
            </v-flex>
        </v-layout>

        <v-layout mt-4>
            <span class="subheading">2. Obtained employment details</span>
        </v-layout>
        <v-layout row mt-2 align-center mt-4>
            <v-flex xs3>
                <span class="subheading grey--text text--darken-3"><strong>Number of directors</strong></span>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-flex xs6>
                    <v-text-field
                            hide-details
                            class="mt-0 pt-0"
                            v-model="numberOfDirectors">
                    </v-text-field>
                </v-flex>
            </v-flex>
        </v-layout>
        <v-layout row mt-2 align-center mt-4>
            <v-flex xs3>
                <span class="subheading grey--text text--darken-3"><strong>Number of employees</strong></span>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-flex xs6>
                    <v-text-field
                            hide-details
                            class="mt-0 pt-0"
                            v-model="numberOfEmployees">
                    </v-text-field>
                </v-flex>
            </v-flex>
        </v-layout>

        <v-layout mt-4>
            <span class="subheading">3. Obtained supporting documentation related to payroll.</span>
        </v-layout>

        <v-btn class="success">FS7</v-btn>
        <br/>
        <v-btn class="success">Director FS3</v-btn>
        <br/>
        <v-btn class="success">Other documents</v-btn>

        <v-layout row>
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
                    name: 'Direct- wages',
                    value: 0
                },
                {
                    name: 'Selling & Distribution - wages',
                    value: 0
                },
                {
                    name: 'Gross wages',
                    value: 0
                },
                {
                    name: 'SSC',
                    value: 0
                },
                {
                    name: 'Director fees in FSS',
                    value: 0
                }
            ],
            gross_wages: 0,
            ssc: 0,
            maternity_fund: 0,
            numberOfDirectors: 0,
            numberOfEmployees: 0
        }),
        created () {
            let accounts = this.addAccounts();
            this.accounts.push(...accounts)
        },
        methods: {
            addAccounts () {
                return [
                    {
                        sub_account: {
                            name: 'Direct- wages'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Selling & Distribution - wages'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Gross wages'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'SSC'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Director fees in FSS'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    }
                ]
            }
        },
        computed: {
            totalOther () {
                return parseInt(this.gross_wages) + parseInt(this.ssc) + parseInt(this.maternity_fund)
            }
        }
    }
</script>