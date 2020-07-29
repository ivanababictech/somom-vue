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
            <span class="subheading">1. Obtained a copy of the  stock list and agreed the value with the lead schedule. We also verified whether we should adjust for slow moving stock and stock written off.</span>
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
            <span class="subheading">2.  Made a provision for slow moving stocks. The provision amounts to</span>
            <div class="ml-2">
                <v-text-field class="mt-0 pt-0" hide-details></v-text-field>
            </div>
        </v-layout>

        <v-layout mt-2 align-center>
            <span class="subheading">3.  Made a provision for stock written off. The provision amounts to</span>
            <div class="ml-2">
                <v-text-field class="mt-0 pt-0" hide-details></v-text-field>
            </div>
        </v-layout>

        <v-layout mt-2 align-center>
            <span class="subheading">4.  Selected a sample of items from the stock list and agreed the cost of each item with a recent purchase invoice. </span>
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

        <v-layout mt-4 v-if="matchSubAccount">
            <span class="subheading">3. Obtained a copy of the supporting documentation</span>
        </v-layout>

        <v-btn class="success">Stock list</v-btn>
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

    export default{
        mixins: [isAccount],
        data: () => ({
            subAccounts: [
                {
                    name: 'Finished goods',
                    amount: {
                        name: '',
                        value: 0
                    },
                    balance: null,
                    provision: null,
                    stock: null,
                },
                {
                    name: 'Raw material',
                    amount: {
                        name: '',
                        value: 0
                    },
                    balance: null,
                    provision: null,
                    stock: null,
                },
                {
                    name: 'WIP',
                    amount: {
                        name: '',
                        value: 0
                    },
                    balance: null,
                    provision: null,
                    stock: null,
                },
                {
                    name: 'Property held for re-sale',
                    amount: {
                        name: '',
                        value: 0
                    },
                    balance: null,
                    provision: null,
                    stock: null,
                }
            ],
            rows: 6
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
                            name: 'Finished goods'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Raw material'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'WIP'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Property held for re-sale'
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