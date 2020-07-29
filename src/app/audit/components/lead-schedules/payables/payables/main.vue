<template>
    <v-flex xs10 offset-xs1 class="mt-4">
        <template  v-if="checkSubaccount('Balance as per Lead Schedule')">
            <v-layout row mt-2 align-center mt-3>
                <v-flex xs3>
                    <span class="subheading grey--text text--darken-3"><strong>Balance as per Lead Schedule</strong></span>
                </v-flex>
                <v-flex xs3 ml-3>
                    <v-flex xs6>
                        <v-text-field
                                hide-details
                                readonly
                                class="mt-0 pt-0"
                                :value="checkSubaccount('Balance as per Lead Schedule').amount + checkSubaccount('Balance as per Lead Schedule').audit_adjustments">
                        </v-text-field>
                    </v-flex>
                </v-flex>
            </v-layout>
            <v-layout row mt-2 align-center mt-3>
                <v-flex xs3>
                    <span class="subheading grey--text text--darken-3"><strong>Balance as per creditors list</strong></span>
                </v-flex>
                <v-flex xs3 ml-3>
                    <v-flex xs6>
                        <v-text-field
                                hide-details
                                class="mt-0 pt-0"
                                v-model="balanceCreditorList">
                        </v-text-field>
                    </v-flex>
                </v-flex>
            </v-layout>
            <v-layout row mt-2 align-center>
                <v-flex xs3>
                    <span class="subheading grey--text text--darken-3"><strong>Difference</strong></span>
                </v-flex>
                <v-flex xs3 ml-3>
                    <v-flex xs6>
                        <v-text-field
                                hide-details
                                readonly
                                class="mt-0 pt-0"
                                :value="checkSubaccount('Balance as per Lead Schedule').amount + checkSubaccount('Balance as per Lead Schedule').audit_adjustments - balanceCreditorList">
                        </v-text-field>
                    </v-flex>
                </v-flex>
            </v-layout>
        </template>

        <v-layout mt-4>
            <span class="subheading">1. Obtained the details of the main creditors and tested for understatement.</span>
        </v-layout>
        <creditors-table :creditors="creditors"></creditors-table>

        <v-layout mt-4>
            <span class="subheading">2. Obtained supporting documentation related to payables.</span>
        </v-layout>

            <v-btn class="success">Creditors list</v-btn>
            <br/>
            <v-btn class="success">Creditors transaction history</v-btn>
            <br/>
            <v-btn class="success">Creditors after year end activity</v-btn>

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
    import creditorsTable from './tables/creditors.vue'

    export default{
        mixins: [isAccount],
        components: {
            creditorsTable
        },
        data: () => ({
            balanceCreditorList: 0,
            subAccounts: [
                {
                    name: 'Balance as per Lead Schedule',
                    value: 0
                }
            ],
            creditors: [
                {
                    creditor_name: 'ABC Ltd',
                    balance_at_year_end: 10000,
                    after_year_end_payables: 5000,
                    balance_as_per_debtors_circularisation: ''
                },
                {
                    creditor_name: 'ABC Ltd',
                    balance_at_year_end: 10000,
                    after_year_end_payables: 5000,
                    balance_as_per_debtors_circularisation: ''
                },
            ]
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
                            name: 'Balance as per Lead Schedule'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Balance as per creditors list'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    }
                ]
            }
        }
    }
</script>