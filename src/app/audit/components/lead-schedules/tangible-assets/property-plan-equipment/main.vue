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
                                :value="getInvestmentTotal(subAccount)"></v-text-field>
                    </v-flex>
                </v-flex>
                <v-flex xs3 ml-3>
                    <v-flex xs6>
                        <v-text-field
                                hide-details
                                readonly
                                class="mt-0 pt-0"
                                :value="checkSubaccount(subAccount.name).amount + checkSubaccount(subAccount.name).audit_adjustments - getInvestmentTotal(subAccount)">
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
                    <v-text-field hide-details readonly class="mt-0 pt-0" :value="totalSum"></v-text-field>
                </v-flex>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-flex xs6>
                    <v-text-field hide-details readonly class="mt-0 pt-0"
                                  :value="totalBalancePerTrail - totalSum"></v-text-field>
                </v-flex>
            </v-flex>
        </v-layout>

        <v-layout mt-4 v-if="matchSubAccount">
            <span class="subheading">1. Ensured that the addition,disposals, depreciation rate and closing balances agrees with the financial statements.</span>
        </v-layout>


        <template v-for="subAccount in subAccounts" v-if="!subAccount.parent">
            <v-layout mt-4>
                    <span class="subheading grey--text text--darken-3">
                        <strong>{{ subAccount.name }}</strong>
                    </span>
            </v-layout>
            <v-divider class="grey darken-3 my-2"></v-divider>
            <balance-table :balances="subAccount.balances"></balance-table>
        </template>

        <v-layout mt-4>
            <span class="subheading">2. Traced the additions/disposals for the year, if any to invoices</span>
        </v-layout>
        <invoice-table :invoices="invoices" class="mt-4"></invoice-table>

        <v-layout mt-4>
            <span class="subheading">3. Obtained invoiced copy of the fixed assets additions</span>
        </v-layout>

        <v-btn class="success">PPE additions invoices</v-btn>
        <br/>
        <v-btn class="success">Other document</v-btn>

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
    import balanceTable from './tables/balance.vue'
    import invoiceTable from './tables/invoice.vue'

    export default{
        mixins: [isAccount],
        components: {
            balanceTable,
            invoiceTable
        },
        data: () => ({
            subAccounts: [
                {
                    name: 'Computer software',
                    amount: {
                        name: '',
                        value: 0
                    },
                    balances: [
                        {
                            year_of_purchase: '2014',
                            cost_bf: 1000,
                            wdv_bf: 1000,
                            additions: 1000,
                            disposals: null,
                            depn_bf: 500,
                            depn_for_the_year: 500,
                        },
                        {
                            year_of_purchase: '2014',
                            cost_bf: 1000,
                            wdv_bf: 1000,
                            additions: 1000,
                            disposals: null,
                            depn_bf: 500,
                            depn_for_the_year: 500,
                        },
                        {
                            year_of_purchase: '2014',
                            cost_bf: 1000,
                            wdv_bf: 1000,
                            additions: 1000,
                            disposals: null,
                            depn_bf: 500,
                            depn_for_the_year: 500,
                        }
                    ]
                },
                {
                    name: 'Computer software Dep’n',
                    amount: {
                        name: '',
                        value: 0
                    },
                    parent: 'Computer software'
                },
                {
                    name: 'Office furniture',
                    amount: {
                        name: '',
                        value: 0
                    },
                    balances: [
                        {
                            year_of_purchase: '2014',
                            cost_bf: 1000,
                            wdv_bf: 1000,
                            additions: 1000,
                            disposals: null,
                            depn_bf: 500,
                            depn_for_the_year: 500,
                        },
                        {
                            year_of_purchase: '2014',
                            cost_bf: 1000,
                            wdv_bf: 1000,
                            additions: 1000,
                            disposals: null,
                            depn_bf: 500,
                            depn_for_the_year: 500,
                        },
                        {
                            year_of_purchase: '2014',
                            cost_bf: 1000,
                            wdv_bf: 1000,
                            additions: 1000,
                            disposals: null,
                            depn_bf: 500,
                            depn_for_the_year: 500,
                        }
                    ]
                },
                {
                    name: 'Office furniture Dep’n',
                    amount: {
                        name: '',
                        value: 0
                    },
                    parent: 'Office furniture'
                },
                {
                    name: 'Computer equipment',
                    amount: {
                        name: '',
                        value: 0
                    },
                    balances: [
                        {
                            year_of_purchase: '2014',
                            cost_bf: 1000,
                            wdv_bf: 1000,
                            additions: 1000,
                            disposals: null,
                            depn_bf: 500,
                            depn_for_the_year: 500,
                        },
                        {
                            year_of_purchase: '2014',
                            cost_bf: 1000,
                            wdv_bf: 1000,
                            additions: 1000,
                            disposals: null,
                            depn_bf: 500,
                            depn_for_the_year: 500,
                        },
                        {
                            year_of_purchase: '2014',
                            cost_bf: 1000,
                            wdv_bf: 1000,
                            additions: 1000,
                            disposals: null,
                            depn_bf: 500,
                            depn_for_the_year: 500,
                        }
                    ]
                },
                {
                    name: 'Computer equipment Dep’n',
                    amount: {
                        name: '',
                        value: 0
                    },
                    parent: 'Computer equipment'
                },
                {
                    name: 'Air-conditioner',
                    amount: {
                        name: '',
                        value: 0
                    },
                    balances: [
                        {
                            year_of_purchase: '2014',
                            cost_bf: 1000,
                            wdv_bf: 1000,
                            additions: 1000,
                            disposals: null,
                            depn_bf: 500,
                            depn_for_the_year: 500,
                        },
                        {
                            year_of_purchase: '2014',
                            cost_bf: 1000,
                            wdv_bf: 1000,
                            additions: 1000,
                            disposals: null,
                            depn_bf: 500,
                            depn_for_the_year: 500,
                        },
                        {
                            year_of_purchase: '2014',
                            cost_bf: 1000,
                            wdv_bf: 1000,
                            additions: 1000,
                            disposals: null,
                            depn_bf: 500,
                            depn_for_the_year: 500,
                        }
                    ]
                },
                {
                    name: 'Air-conditioner Dep’n',
                    amount: {
                        name: '',
                        value: 0
                    },
                    parent: 'Air-conditioner'
                },
            ],
            invoices: [
                {
                    invoice_no: null,
                    date_of_invoice: '15/07/2017',
                    supplier: 'Liviu',
                    details: 'Consultancy fee',
                    amount: 700,
                    traced_to_ledger: 'Yes'
                },
                {
                    invoice_no: null,
                    date_of_invoice: '15/07/2017',
                    supplier: 'Liviu',
                    details: 'Consultancy fee',
                    amount: 700,
                    traced_to_ledger: 'Yes'
                },
                {
                    invoice_no: null,
                    date_of_invoice: '15/07/2017',
                    supplier: 'Liviu',
                    details: 'Consultancy fee',
                    amount: 700,
                    traced_to_ledger: 'Yes'
                },
                {
                    invoice_no: null,
                    date_of_invoice: '15/07/2017',
                    supplier: 'Liviu',
                    details: 'Consultancy fee',
                    amount: 700,
                    traced_to_ledger: 'Yes'
                },
                {
                    invoice_no: null,
                    date_of_invoice: '15/07/2017',
                    supplier: 'Liviu',
                    details: 'Consultancy fee',
                    amount: 700,
                    traced_to_ledger: 'Yes'
                },
                {
                    invoice_no: null,
                    date_of_invoice: '15/07/2017',
                    supplier: 'Liviu',
                    details: 'Consultancy fee',
                    amount: 700,
                    traced_to_ledger: 'Yes'
                },
                {
                    invoice_no: null,
                    date_of_invoice: '15/07/2017',
                    supplier: 'Liviu',
                    details: 'Consultancy fee',
                    amount: 700,
                    traced_to_ledger: 'Yes'
                },
                {
                    invoice_no: null,
                    date_of_invoice: '15/07/2017',
                    supplier: 'Liviu',
                    details: 'Consultancy fee',
                    amount: 700,
                    traced_to_ledger: 'Yes'
                },
            ]
        }),
        created () {
            let accounts = this.addAccounts()
            this.accounts.push(...accounts)
        },
        methods: {
            addAccounts () {
                return [
                    {
                        sub_account: {
                            name: 'Computer software'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Computer software Dep’n'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Office furniture'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Office furniture Dep’n'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Computer equipment'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Computer equipment Dep’n'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Air-conditioner'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Air-conditioner Dep’n'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    }
                ]
            },
            getInvestmentTotal (subAccount) {
                let table = subAccount.parent ? this.subAccounts.find(s => s.name === subAccount.parent).balances : subAccount.balances
                return table.reduce((total, item) => total += this.totalRow(item), 0)
            },
            totalRow (item) {
                let carryingAmount = parseInt(item.opening_carrying_amount) || 0
                let additions = parseInt(item.additions) || 0
                let disposal = parseInt(item.disposal) || 0
                let fairValueMovement = parseInt(item.fair_value_movement) || 0
                return carryingAmount + additions + disposal + fairValueMovement
            },
        },
        computed: {
            totalSum () {
                let total = 0
                this.accounts.forEach(account => {
                    let subAccount = this.subAccounts.find(subAccount => subAccount.name === account.sub_account.name)
                    if (subAccount) total += this.getInvestmentTotal(subAccount)
                })
                return total
            }
        }
    }
</script>