<template>
    <v-flex xs10 offset-xs1 mt-4>
        <v-layout row class="success-text title">
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

        <v-layout row mt-2 align-center mt-3>
            <v-flex xs3>
                <span class="subheading grey--text text--darken-3"><strong>Purchase tax control a/c</strong></span>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-flex xs6>
                    <v-text-field
                            hide-details
                            readonly
                            class="mt-0 pt-0"
                            :value="0">
                    </v-text-field>
                </v-flex>
            </v-flex>
            <v-flex xs3 ml-3></v-flex>
            <v-flex xs3 ml-3></v-flex>
        </v-layout>
        <v-layout row mt-2 align-center mt-3>
            <v-flex xs3>
                <span class="subheading grey--text text--darken-3"><strong>Sales tax control a/c</strong></span>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-flex xs6>
                    <v-text-field
                            hide-details
                            readonly
                            class="mt-0 pt-0"
                            :value="0">
                    </v-text-field>
                </v-flex>
            </v-flex>
            <v-flex xs3 ml-3></v-flex>
            <v-flex xs3 ml-3></v-flex>
        </v-layout>
        <v-layout row mt-2 align-center mt-3>
            <v-flex xs3>
                <span class="subheading grey--text text--darken-3"><strong>Vat control a/c</strong></span>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-flex xs6>
                    <v-text-field
                            hide-details
                            readonly
                            class="mt-0 pt-0"
                            :value="0">
                    </v-text-field>
                </v-flex>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-flex xs6>
                    <v-text-field
                            hide-details
                            readonly
                            class="mt-0 pt-0"
                            :value="0">
                    </v-text-field>
                </v-flex>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-flex xs6>
                    <v-text-field
                            hide-details
                            readonly
                            class="mt-0 pt-0"
                            :value="0">
                    </v-text-field>
                </v-flex>
            </v-flex>
        </v-layout>

        <v-layout mt-4>
            <span class="title">1. Obtained a copy of the the vat returns filed and inputted all details</span>
        </v-layout>

        <sales-table
                :sales="sales.items"
                :headers="sales.headers"
                :total="sales.total"
                @total="calculateTotal"
                name="sales"
                class="mt-4">
        </sales-table>

        <sales-table
                :sales="goodsResale.items"
                :headers="goodsResale.headers"
                :total="goodsResale.total"
                @total="calculateTotal"
                name="goodsResale"
                class="mt-4">
        </sales-table>

        <sales-table
                :sales="capitalGoods.items"
                :headers="capitalGoods.headers"
                :total="capitalGoods.total"
                name="capitalGoods"
                @total="calculateTotal"
                class="mt-4">
        </sales-table>

        <sales-table
                :sales="expenses.items"
                :headers="expenses.headers"
                :total="expenses.total"
                name="expenses"
                @total="calculateTotal"
                class="mt-4">
        </sales-table>

        <v-layout mt-4>
            <span class="title">2. Determined whether the vat refundable/(payable is correctly stated</span>
        </v-layout>

        <v-layout column mt-4>
            <v-layout row align-center>
                <v-flex xs3>
                    <strong> VAT refundable/(payable) as per above workings</strong>
                </v-flex>
                <v-flex xs3>
                    <v-text-field hide-details readonly class="mt-0" :value="totalRefundable"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row align-center mt-2>
                <v-flex xs3>
                    Payments made/(refunds received)
                </v-flex>
            </v-layout>
            <v-layout row align-center mt-2 v-for="period in periods" :key="period.name">
                <v-flex xs3>
                    <strong>{{ period.name }}</strong>
                </v-flex>
                <v-flex xs3>
                    <v-text-field hide-details readonly class="mt-0" :value="totalPeriod(period.key)"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row align-center mt-2>
                <v-flex xs3>Total payments made/(refunds received)</v-flex>
                <v-flex xs3>
                    <v-text-field hide-details readonly class="mt-0" :value="totalPeriods"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row align-center mt-2>
                <v-flex xs3>Balancing figure</v-flex>
                <v-flex xs3>
                    <v-text-field hide-details readonly class="mt-0"
                                  :value="totalRefundable - totalPeriods"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row align-center mt-2>
                <v-flex xs3>Amounts as per Lead Schedule</v-flex>
                <v-flex xs3>
                    <v-text-field hide-details readonly class="mt-0" :value="0"></v-text-field>
                </v-flex>
            </v-layout>
        </v-layout>

        <v-layout mt-4>
            <span class="title">
                3. Determined whether sales & costs of sales,if any, as per accounts agrees with the values declared in the VAT returns.
            </span>
        </v-layout>

        <v-layout column mt-4>
            <v-layout row align-center>
                <v-flex xs3>
                    <strong>Sales as declared in VAT returns</strong>
                </v-flex>
                <v-flex xs3>
                    <v-text-field hide-details readonly class="mt-0" :value="sales.total.period"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row align-center mt-2>
                <v-flex xs3>
                    <strong>Sales as declared in accounts</strong>
                </v-flex>
                <v-flex xs3>
                    <v-text-field hide-details readonly class="mt-0" v-model="declared"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row align-center mt-2>
                <v-flex xs3>
                    ADD: Opening accrued income
                </v-flex>
                <v-flex xs3>
                    <v-text-field hide-details class="mt-0" v-model="openingAccruedIncome"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row align-center mt-2>
                <v-flex xs3>
                    LESS: Closing accrued income
                </v-flex>
                <v-flex xs3>
                    <v-text-field hide-details class="mt-0" v-model="closingAccruedIncome"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row align-center mt-2>
                <v-flex xs3>
                    Total sales as declared in the accounts
                </v-flex>
                <v-flex xs3>
                    <v-text-field hide-details readonly class="mt-0" :value="totalAccrued"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row align-center mt-2>
                <v-flex xs3></v-flex>
                <v-flex xs3>
                    <v-text-field hide-details readonly class="mt-0" :value="sales.total.period - totalAccrued"></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row align-center mt-4>
                <v-flex xs3>
                    <strong>Purchases as declared in VAT returns</strong>
                </v-flex>
                <v-flex xs3>
                    <v-text-field hide-details readonly class="mt-0" :value="goodsResale.total.period"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row align-center mt-2>
                <v-flex xs3>
                    <strong>Purchases as declared in accounts</strong>
                </v-flex>
                <v-flex xs3>
                    <v-text-field hide-details readonly class="mt-0" v-model="declaredPurchases"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row align-center mt-2>
                <v-flex xs3>
                    ADD: Opening prepaid purchases
                </v-flex>
                <v-flex xs3>
                    <v-text-field hide-details class="mt-0" v-model="openingPrepaidPurchases"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row align-center mt-2>
                <v-flex xs3>
                    LESS: Closing prepaid purchases
                </v-flex>
                <v-flex xs3>
                    <v-text-field hide-details class="mt-0" v-model="closingPrepaidPurchases"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row align-center mt-2>
                <v-flex xs3>
                    Total purchases as declared in the accounts
                </v-flex>
                <v-flex xs3>
                    <v-text-field hide-details readonly class="mt-0" :value="totalPurchases"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row align-center mt-2>
                <v-flex xs3></v-flex>
                <v-flex xs3>
                    <v-text-field hide-details readonly class="mt-0" :value="goodsResale.total.period - totalPurchases"></v-text-field>
                </v-flex>
            </v-layout>
        </v-layout>

        <v-layout mt-4>
            <span class="title">
                4. Obtained supporting documentation related to VAT
            </span>
        </v-layout>

        <v-btn class="success">VAT returns filed</v-btn>
        <v-btn class="success">VAT recaps filed</v-btn>

        <v-layout row mt-4>
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
    import invoiceOfTheYearTable from './tables/invoice-of-the-year.vue'
    import salesTable from './tables/sales.vue'
    import journalEntriesTable from './tables/journal-entries.vue'
    import salesGoodsTable from './tables/sales.vue'

    export default {
        mixins: [isAccount],
        components: {
            invoiceOfTheYearTable,
            salesTable,
            journalEntriesTable,
            salesGoodsTable,
        },
        data: () => ({
            sales: {
                items: [
                    {
                        name: 'Exempt IC supply (box 1)',
                        period_one: 10000,
                        period_two: 10000,
                        period_three: 10000,
                        period_four: 10000,
                        period_five: 10000
                    },
                    {
                        name: 'Supplies of goods & services where place of supply is outside Malta (box 2)',
                        period_one: 10000,
                        period_two: 10000,
                        period_three: 10000,
                        period_four: 10000,
                        period_five: 10000
                    },
                    {
                        name: 'Sales @ 18% (box 18)',
                        period_one: 10000,
                        period_two: 10000,
                        period_three: 10000,
                        period_four: 10000,
                        period_five: 10000,
                        vat: 18
                    },
                    {
                        name: 'Sales @ 7% (box 18A)',
                        period_one: 10000,
                        period_two: 10000,
                        period_three: 10000,
                        period_four: 10000,
                        period_five: 10000,
                        vat: 7
                    },
                    {
                        name: 'Sales @ 5% (box 19)',
                        period_one: 10000,
                        period_two: 10000,
                        period_three: 10000,
                        period_four: 10000,
                        period_five: 10000,
                        vat: 5
                    },
                    {
                        name: 'Exempt with credit/exports (box 20)',
                        period_one: 10000,
                        period_two: 10000,
                        period_three: 10000,
                        period_four: 10000,
                        period_five: 10000
                    },
                    {
                        name: 'Exempt without credit (box 21)',
                        period_one: 10000,
                        period_two: 10000,
                        period_three: 10000,
                        period_four: 10000,
                        period_five: 10000
                    },
                ],
                headers: [
                    {text: 'Sales', value: 'name'},
                    {text: 'Period one', value: 'period_one'},
                    {text: 'Period two', value: 'period_two'},
                    {text: 'Period three', value: 'period_three'},
                    {text: 'Period four', value: 'period_four'},
                    {text: 'Period five', value: 'period_five'},
                    {text: 'Total sales', value: ''},
                    {text: 'Total output VAT', value: ''},
                ],
                total: {
                    period_one: 0,
                    period_two: 0,
                    period_three: 0,
                    period_four: 0,
                    period_five: 0,
                    period: 0,
                    vat: 0
                }
            },
            goodsResale: {
                items: [
                    {
                        name: 'IC acquisitions of goods (box 9)',
                        period_one: 10000,
                        period_two: 10000,
                        period_three: 10000,
                        period_four: 10000,
                        period_five: 10000
                    },
                    {
                        name: 'Purchases @ 18% (box 27)',
                        period_one: 10000,
                        period_two: 10000,
                        period_three: 10000,
                        period_four: 10000,
                        period_five: 10000,
                        vat: 18
                    },
                    {
                        name: 'Purchases @ 5% (box 28)',
                        period_one: 10000,
                        period_two: 10000,
                        period_three: 10000,
                        period_four: 10000,
                        period_five: 10000,
                        vat: 5
                    },
                    {
                        name: 'Exempt purchases (box 29)',
                        period_one: 10000,
                        period_two: 10000,
                        period_three: 10000,
                        period_four: 10000,
                        period_five: 10000
                    }
                ],
                headers: [
                    {text: 'Goods purchased for re-sale', value: 'name'},
                    {text: 'Period one', value: 'period_one'},
                    {text: 'Period two', value: 'period_two'},
                    {text: 'Period three', value: 'period_three'},
                    {text: 'Period four', value: 'period_four'},
                    {text: 'Period five', value: 'period_five'},
                    {text: 'Total goods purchases for re-sale', value: ''},
                    {text: 'Total input VAT', value: ''},
                ],
                total: {
                    period_one: 0,
                    period_two: 0,
                    period_three: 0,
                    period_four: 0,
                    period_five: 0,
                    period: 0,
                    vat: 0
                }
            },
            capitalGoods: {
                items: [
                    {
                        name: 'IC acquisitions of goods (box 10)',
                        period_one: 10000,
                        period_two: 10000,
                        period_three: 10000,
                        period_four: 10000,
                        period_five: 10000
                    },
                    {
                        name: 'Capital Goods @ 18%  (box 30)',
                        period_one: 10000,
                        period_two: 10000,
                        period_three: 10000,
                        period_four: 10000,
                        period_five: 10000,
                        vat: 18
                    }
                ],
                headers: [
                    {text: 'Capital goods', value: 'name'},
                    {text: 'Period one', value: 'period_one'},
                    {text: 'Period two', value: 'period_two'},
                    {text: 'Period three', value: 'period_three'},
                    {text: 'Period four', value: 'period_four'},
                    {text: 'Period five', value: 'period_five'},
                    {text: 'Total Capital goods', value: ''},
                    {text: 'Total input VAT', value: ''},
                ],
                total: {
                    period_one: 0,
                    period_two: 0,
                    period_three: 0,
                    period_four: 0,
                    period_five: 0,
                    period: 0,
                    vat: 0
                }
            },
            expenses: {
                items: [
                    {
                        name: 'Services from EU where purchaser is liable for vat (box 9A)',
                        period_one: 10000,
                        period_two: 10000,
                        period_three: 10000,
                        period_four: 10000,
                        period_five: 10000
                    },
                    {
                        name: 'Goods & services received where place of supply is Malta (box 11)',
                        period_one: 10000,
                        period_two: 10000,
                        period_three: 10000,
                        period_four: 10000,
                        period_five: 10000
                    },
                    {
                        name: 'Expenses @ 18% (box 31)',
                        period_one: 10000,
                        period_two: 10000,
                        period_three: 10000,
                        period_four: 10000,
                        period_five: 10000,
                        vat: 18
                    },
                    {
                        name: 'Expenses @ 7% (box 31A)',
                        period_one: 10000,
                        period_two: 10000,
                        period_three: 10000,
                        period_four: 10000,
                        period_five: 10000,
                        vat: 7
                    },
                    {
                        name: 'Expenses @ 5% (box 32)',
                        period_one: 10000,
                        period_two: 10000,
                        period_three: 10000,
                        period_four: 10000,
                        period_five: 10000,
                        vat: 5
                    }
                ],
                headers: [
                    {text: 'Expenses', value: 'name'},
                    {text: 'Period one', value: 'period_one'},
                    {text: 'Period two', value: 'period_two'},
                    {text: 'Period three', value: 'period_three'},
                    {text: 'Period four', value: 'period_four'},
                    {text: 'Period five', value: 'period_five'},
                    {text: 'Total expenses', value: ''},
                    {text: 'Total input VAT', value: ''},
                ],
                total: {
                    period_one: 0,
                    period_two: 0,
                    period_three: 0,
                    period_four: 0,
                    period_five: 0,
                    period: 0,
                    vat: 0
                }
            },
            periods: [
                {
                    name: 'Period one',
                    key: 'period_one'
                },
                {
                    name: 'Period two',
                    key: 'period_two'
                },
                {
                    name: 'Period three',
                    key: 'period_three'
                },
                {
                    name: 'Period four',
                    key: 'period_four'
                },
                {
                    name: 'Period five',
                    key: 'period_five'
                },
            ],
            openingAccruedIncome: 0,
            closingAccruedIncome: 0,
            openingPrepaidPurchases: 0,
            closingPrepaidPurchases: 0,
            declared: 0,
            declaredPurchases: 0,
        }),
        created() {
            let accounts = this.addAccounts();
            this.accounts.push(...accounts)
        },
        methods: {
            calculateTotal (value) {
                this[value.name].total[value.column] = value.total
            },
            totalPeriod (column) {
                return this.goodsResale.total[column] + this.capitalGoods.total[column] + this.expenses.total[column] - this.sales.total[column]
            },
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
        },
        computed: {
            totalRefundable () {
                return this.goodsResale.total.vat + this.capitalGoods.total.vat + this.expenses.total.vat - this.sales.total.vat
            },
            totalPeriods () {
                return this.periods.reduce((total, period) => total += this.totalPeriod(period.key), 0)
            },
            totalAccrued () {
                return parseInt(this.openingAccruedIncome) + parseInt(this.closingAccruedIncome) + parseInt(this.declared)
            },
            totalPurchases () {
                return parseInt(this.openingPrepaidPurchases) + parseInt(this.closingPrepaidPurchases) + parseInt(this.declaredPurchases)
            }
        }
    }
</script>