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
                                :value="total(subAccount)"></v-text-field>
                    </v-flex>
                </v-flex>
                <v-flex xs3 ml-3>
                    <v-flex xs6>
                        <v-text-field
                                hide-details
                                readonly
                                class="mt-0 pt-0"
                                :value="checkSubaccount(subAccount.name).amount + checkSubaccount(subAccount.name).audit_adjustments - total(subAccount)">
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
                    <v-text-field hide-details readonly class="mt-0 pt-0" :value="totalStock"></v-text-field>
                </v-flex>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-flex xs6>
                    <v-text-field hide-details readonly class="mt-0 pt-0" :value="totalBalancePerTrail - totalStock"></v-text-field>
                </v-flex>
            </v-flex>
        </v-layout>

        <v-layout mt-4 v-if="matchSubAccount">
            <p class="subheading">
                1. Obtained a copy of the  stock list and agreed the value with the lead schedule. We also verified whether we should adjust for slow moving stock and stock written off.</p>
            <p class="subheading">
                2. Discussed with the management whether we should made a provision for slow moving and/or write off stock.</p>
        </v-layout>

        <v-layout row mt-4 class="subheading" v-if="matchSubAccount">
            <v-flex xs3>
                <span>Sub-account name</span>
            </v-flex>
            <v-flex xs2 ml-3>
                <span>Balance as per Stock list</span>
            </v-flex>
            <v-flex xs2 ml-3>
                <span>Provision for slow moving stock</span>
            </v-flex>
            <v-flex xs2 ml-3>
                <span>Stock written off</span>
            </v-flex>
            <v-flex xs2 ml-3>
                <span>Adjusted stock value</span>
            </v-flex>
        </v-layout>
        <template v-for="(subAccount, i) in subAccounts">
            <template v-if="checkSubaccount(subAccount.name)">
                <v-layout align-center :mt-2="i">
                    <v-flex xs3>
                        <span class="subheading grey--text text--darken-3">
                            <strong>{{ subAccount.name }}</strong>
                        </span>
                    </v-flex>
                    <v-flex xs2 ml-3>
                        <v-text-field
                                class="mt-0 pt-0"
                                hide-details
                                v-model="subAccount.balance"
                                type="number">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2 ml-3>
                        <v-text-field
                                class="mt-0 pt-0"
                                hide-details
                                v-model="subAccount.provision"
                                type="number">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2 ml-3>
                        <v-text-field
                                class="mt-0 pt-0"
                                hide-details
                                v-model="subAccount.stock"
                                type="number">
                        </v-text-field>
                    </v-flex>
                    <v-flex xs2 ml-3>
                        <v-text-field
                                class="mt-0 pt-0"
                                hide-details
                                read-only
                                :value="total(subAccount)"
                                type="number">
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </template>
        </template>
        <v-layout row mt-2 align-center v-if="matchSubAccount">
            <v-flex xs3>
                <span class="subheading grey--text text--darken-3"><strong>Total</strong></span>
            </v-flex>
            <v-flex xs2 ml-3>
                <v-text-field hide-details readonly class="mt-0 pt-0" :value="totalSum('balance')"></v-text-field>
            </v-flex>
            <v-flex xs2 ml-3>
                <v-text-field hide-details readonly class="mt-0 pt-0" :value="totalSum('provision')"></v-text-field>
            </v-flex>
            <v-flex xs2 ml-3>
                <v-text-field hide-details readonly class="mt-0 pt-0" :value="totalSum('stock')"></v-text-field>
            </v-flex>
            <v-flex xs2 ml-3>
                <v-text-field hide-details readonly class="mt-0 pt-0" :value="totalStock"></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout mt-4 align-center>
            <span class="subheading">3.  Selected a sample of items from the stock list and agreed the cost of each item with a recent purchase invoice. </span>
        </v-layout>

        <v-layout row>
            <v-flex xs2>
                <span class="subheading">Item code</span>
            </v-flex>
            <v-flex xs2 ml-3>
                <span class="subheading">Stock name</span>
            </v-flex>
            <v-flex xs2 ml-3>
                <span class="subheading">Cost as per stock list</span>
            </v-flex>
            <v-flex xs2 ml-3>
                <span class="subheading">Supplier</span>
            </v-flex>
            <v-flex xs2 ml-3>
                <span class="subheading">Cost as per purchase invoice</span>
            </v-flex>
            <v-flex xs2 ml-3></v-flex>
        </v-layout>
        <v-layout row v-for="i in rows" :key="i">
            <v-flex xs2>
                <v-text-field hide-details class="mt-0 pt-0" type="number"></v-text-field>
            </v-flex>
            <v-flex xs2 ml-3>
                <v-text-field hide-details class="mt-0 pt-0"></v-text-field>
            </v-flex>
            <v-flex xs2 ml-3>
                <v-text-field hide-details class="mt-0 pt-0" type="number"></v-text-field>
            </v-flex>
            <v-flex xs2 ml-3>
                <v-text-field hide-details class="mt-0 pt-0"></v-text-field>
            </v-flex>
            <v-flex xs2 ml-3>
                <v-text-field hide-details class="mt-0 pt-0" type="number"></v-text-field>
            </v-flex>
            <v-flex xs2 ml-3></v-flex>
        </v-layout>
        <div class="mt-3">
            <span class="title primary-text pointer" @click="rows++">Add more rows</span>
        </div>

        <div class="mt-4">
            <span class="title">Property held for re-sale</span>
        </div>
        <v-divider class="my-3 grey darken-2"></v-divider>

        <v-layout>
            <span class="subheading">1. Obtained the details abour the property held for re-sale and analysed the movement for the year, if any.</span>
        </v-layout>

        <property-table :properties="properties" class="mt-4"></property-table>

        <v-layout mt-4 v-if="matchSubAccount">
            <span class="subheading">4. Obtained a copy of the supporting documentation</span>
        </v-layout>

        <v-btn class="success">Stock list</v-btn>
        <br/>
        <v-btn class="success">Stock take results</v-btn>
        <br/>
        <v-btn class="success">Property held for re-sale</v-btn>
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
    import propertyTable from './tables/property.vue'

    export default{
        mixins: [isAccount],
        components: {
            propertyTable
        },
        data: () => ({
            subAccounts: [
                {
                    name: 'Intellectual property',
                    amount: {
                        name: '',
                        value: 0
                    },
                    balance: null,
                    provision: null,
                    stock: null,
                },
                {
                    name: 'Parents',
                    amount: {
                        name: '',
                        value: 0
                    },
                    balance: null,
                    provision: null,
                    stock: null,
                },
                {
                    name: 'Goodwill',
                    amount: {
                        name: '',
                        value: 0
                    },
                    balance: null,
                    provision: null,
                    stock: null,
                },
                {
                    name: 'Intellectual capital',
                    amount: {
                        name: '',
                        value: 0
                    },
                    balance: null,
                    provision: null,
                    stock: null,
                }
            ],
            rows: 6,
            properties: [
                {
                    property_held: 'Flat 1, Birkirkara',
                    opening_carrying_amount: 1500,
                    additions: 1500,
                    disposal: null
                },
                {
                    property_held: 'Flat 2, San Gwann',
                    opening_carrying_amount: null,
                    additions: 1500,
                    disposal: 1500
                }
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
                            name: 'Intellectual property'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Parents'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Goodwill'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Intellectual capital'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    }
                ]
            },
            totalSum (column) {
                let total = 0
                this.accounts.forEach(account => {
                    let subAccount = this.subAccounts.find(subAccount => subAccount.name === account.sub_account.name)
                    if (subAccount) total += subAccount[column] ? parseInt(subAccount[column]) : 0
                })
                return total
            },
            total (subAccount) {
                let balance = parseInt(subAccount.balance) || 0
                let provision = parseInt(subAccount.provision) || 0
                let stock = parseInt(subAccount.stock) || 0
                return balance + provision + stock
            }
        },
        computed: {
            totalStock () {
                let total = 0
                this.accounts.forEach(account => {
                    let subAccount = this.subAccounts.find(subAccount => subAccount.name === account.sub_account.name)
                    if (subAccount) total += this.total(subAccount)
                })
                return total
            }
        }
    }
</script>