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
                                :value="getInvestmentTotal(subAccount.investments)"></v-text-field>
                    </v-flex>
                </v-flex>
                <v-flex xs3 ml-3>
                    <v-flex xs6>
                        <v-text-field
                                hide-details
                                readonly
                                class="mt-0 pt-0"
                                :value="checkSubaccount(subAccount.name).amount + checkSubaccount(subAccount.name).audit_adjustments - getInvestmentTotal(subAccount.investments)">
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

        <template v-for="subAccount in subAccounts">
            <template v-if="checkSubaccount(subAccount.name)">
                <v-layout mt-4>
                    <span class="subheading grey--text text--darken-3">
                        <strong>{{ subAccount.name }}</strong>
                    </span>
                </v-layout>
                <v-divider class="grey darken-3 my-2"></v-divider>
                <span class="subheading">{{ subAccount.title }}</span>
                <investment-table
                        :investments="subAccount.investments"
                        :headers="subAccount.headers">
                </investment-table>
                <balance-table
                        v-if="subAccount.balanceInvestments"
                        class="mt-3"
                        :investments="subAccount.balanceInvestments">
                </balance-table>
                <contact-table
                        v-if="subAccount.companies"
                        class="mt-3"
                        :companies="subAccount.companies">
                </contact-table>
                <property-table
                        v-if="subAccount.properties"
                        class="mt-3"
                        :properties="subAccount.properties">
                </property-table>
                <estimation-table
                        v-if="subAccount.estimations"
                        class="mt-3"
                        :estimations="subAccount.estimations">
                </estimation-table>
            </template>
        </template>

        <v-layout mt-4 v-if="matchSubAccount">
            <span class="subheading">2. Obtained supporting documentation related to finance cost.</span>
        </v-layout>

        <v-btn class="success">Subsidiary accounts</v-btn>
        <br/>
        <v-btn class="success">Associate accounts</v-btn>
        <br/>
        <v-btn class="success">Financial assets statements</v-btn>
        <br/>
        <v-btn class="success">Investment property</v-btn>
        <br/>
        <v-btn class="success">Other documents</v-btn>

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
    import investmentTable from './tables/investment.vue'
    import balanceTable from './tables/balance.vue'
    import contactTable from './tables/contact.vue'
    import propertyTable from './tables/property.vue'
    import estimationTable from './tables/estimation.vue'

    export default{
        mixins: [isAccount],
        components: {
            investmentTable,
            balanceTable,
            contactTable,
            propertyTable,
            estimationTable,
        },
        data: () => ({
            subAccounts: [
                {
                    name: 'Investment in subsdiary',
                    title: '1. Obtained the details of the subsidiary company, confirmed ownership and tested the investment for impairment.',
                    amount: {
                        name: '',
                        value: 0
                    },
                    investments: [
                        {
                            subsidiary_name: 'Abc Limited',
                            opening_carrying_amount: 1500,
                            additions: 1500,
                            disposal: null,
                            fair_value_movement: null
                        },
                        {
                            subsidiary_name: 'Liviu Limited',
                            opening_carrying_amount: 1500,
                            additions: null,
                            disposal: 1500,
                            fair_value_movement: null,
                        }
                    ],
                    balanceInvestments: [
                        {
                            subsidiary_name: 'Abc Limited',
                            investment_at_cost: 1200,
                            sub_nav: -5000,
                            impairment_charged_required: 0
                        },
                        {
                            subsidiary_name: 'Liviu Limited',
                            investment_at_cost: 1200,
                            sub_nav: -5000,
                            impairment_charged_required: 0
                        }
                    ],
                    companies: [
                        {
                            subsidiary_name: 'Abc Limited',
                            registered_address: '21, Mons A Bonnici Sreet, Msida',
                            country: 'Malta',
                            class_of_shares_held: 'Ordinary shares',
                            percentage_of_shares_held: 99
                        },
                        {
                            subsidiary_name: 'Liviu Limited',
                            registered_address: '21, Mons A Bonnici Sreet, Msida',
                            country: 'Malta',
                            class_of_shares_held: 'Ordinary shares',
                            percentage_of_shares_held: 99
                        }
                    ],
                    headers: [
                        {text: 'Subsidiary name', value: 'subsidiary_name'},
                        {text: 'Opening carrying amount', value: 'opening_carrying_amount'},
                        {text: 'Additions', value: 'additions'},
                        {text: 'Disposal', value: 'disposal'},
                        {text: 'Fair value movement', value: 'fair_value_movement'},
                        {text: 'Closing carrying amount', value: 'closing_carrying_amount'},
                    ]
                },
                {
                    name: 'Investment in associate',
                    title: '1. Obtained the details of the associate company, confirmed ownership and tested the investment for impairment.',
                    amount: {
                        name: '',
                        value: 0
                    },
                    investments: [
                        {
                            subsidiary_name: 'Abc Limited',
                            opening_carrying_amount: 1500,
                            additions: 1500,
                            disposal: null,
                            fair_value_movement: null
                        },
                        {
                            subsidiary_name: 'Liviu Limited',
                            opening_carrying_amount: 1500,
                            additions: null,
                            disposal: 1500,
                            fair_value_movement: null,
                        }
                    ],
                    balanceInvestments: [
                        {
                            subsidiary_name: 'Abc Limited',
                            investment_at_cost: 1200,
                            sub_nav: -5000,
                            impairment_charged_required: 0
                        },
                        {
                            subsidiary_name: 'Liviu Limited',
                            investment_at_cost: 1200,
                            sub_nav: -5000,
                            impairment_charged_required: 0
                        }
                    ],
                    companies: [
                        {
                            subsidiary_name: 'Abc Limited',
                            registered_address: '21, Mons A Bonnici Sreet, Msida',
                            country: 'Malta',
                            class_of_shares_held: 'Ordinary shares',
                            percentage_of_shares_held: 99
                        },
                        {
                            subsidiary_name: 'Liviu Limited',
                            registered_address: '21, Mons A Bonnici Sreet, Msida',
                            country: 'Malta',
                            class_of_shares_held: 'Ordinary shares',
                            percentage_of_shares_held: 99
                        }
                    ],
                    headers: [
                        {text: 'Subsidiary name', value: 'subsidiary_name'},
                        {text: 'Opening carrying amount', value: 'opening_carrying_amount'},
                        {text: 'Additions', value: 'additions'},
                        {text: 'Disposal', value: 'disposal'},
                        {text: 'Fair value movement', value: 'fair_value_movement'},
                        {text: 'Closing carrying amount', value: 'closing_carrying_amount'},
                    ]
                },
                {
                    name: 'Investment in securities',
                    title: '1. Re-calculated the investments held at fair value prices as at year end',
                    amount: {
                        name: '',
                        value: 0
                    },
                    investments: [
                        {
                            subsidiary_name: 'Abc Limited',
                            opening_carrying_amount: 1500,
                            additions: 1500,
                            disposal: null,
                            fair_value_movement: null
                        },
                        {
                            subsidiary_name: 'Liviu Limited',
                            opening_carrying_amount: 1500,
                            additions: null,
                            disposal: 1500,
                            fair_value_movement: null,
                        }
                    ],
                    estimations: [
                        {
                            investment_name: 'Corinthia bonds',
                            no_of_units: 100,
                            price_at_year_end: 1
                        },
                        {
                            investment_name: 'Eden Cinema Ltd',
                            no_of_units: 100,
                            price_at_year_end: 1
                        }
                    ],
                    headers: [
                        {text: 'Investment name', value: 'subsidiary_name'},
                        {text: 'Opening carrying amount', value: 'opening_carrying_amount'},
                        {text: 'Additions', value: 'additions'},
                        {text: 'Disposal', value: 'disposal'},
                        {text: 'Fair value movement', value: 'fair_value_movement'},
                        {text: 'Closing carrying amount', value: 'closing_carrying_amount'},
                    ],
                },
                {
                    name: 'Investment property',
                    title: '1. Obtained the details of the investment property, confirmed ownership and tested the investment for impairment.',
                    amount: {
                        name: '',
                        value: 0
                    },
                    investments: [
                        {
                            subsidiary_name: 'Abc Limited',
                            opening_carrying_amount: 1500,
                            additions: 1500,
                            disposal: null,
                            fair_value_movement: null
                        },
                        {
                            subsidiary_name: 'Liviu Limited',
                            opening_carrying_amount: 1500,
                            additions: null,
                            disposal: 1500,
                            fair_value_movement: null,
                        }
                    ],
                    headers: [
                        {text: 'Investment name', value: 'subsidiary_name'},
                        {text: 'Opening carrying amount', value: 'opening_carrying_amount'},
                        {text: 'Additions', value: 'additions'},
                        {text: 'Disposal', value: 'disposal'},
                        {text: 'Fair value movement', value: 'fair_value_movement'},
                        {text: 'Closing carrying amount', value: 'closing_carrying_amount'},
                    ],
                    properties: [
                        {
                            investment_property_name: 'Swatar site',
                            property_address: '21, Mons A Bonnici Sreet, Msida',
                            country: 'Malta',
                            no_of_units: 1
                        },
                        {
                            investment_property_name: 'Birkirkara plot',
                            property_address: '21, Mons A Bonnici Sreet, Msida',
                            country: 'Malta',
                            no_of_units: 1
                        }
                    ]
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
                            name: 'Investment in subsdiary'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Investment in associate'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Investment in securities'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Investment property'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    }
                ]
            },
            getInvestmentTotal (table) {
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
                    if (subAccount) total += this.getInvestmentTotal(subAccount.investments)
                })
                return total
            }
        }
    }
</script>