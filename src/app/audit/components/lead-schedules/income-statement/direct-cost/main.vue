<template>
    <v-flex xs10 offset-xs1 class="mt-4">
        <v-layout row class="success-text title">
            <v-flex xs3>
                <span>Sub-account name</span>
            </v-flex>
            <v-flex xs3 ml-3>
                <span>Balance as per Trail balance</span>
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
                                class="mt-0"
                                :value="checkSubaccount(subAccount.name).amount + checkSubaccount(subAccount.name).audit_adjustments">
                        </v-text-field>
                    </v-flex>
                </v-flex>
            </v-layout>
        </template>
        <v-layout row mt-2 align-center>
            <v-flex xs3>
                <span class="subheading grey--text text--darken-3">
                    <strong>Total</strong>
                </span>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-flex xs6>
                    <v-text-field hide-details readonly class="mt-0" :value="totalBalancePerTrail"></v-text-field>
                </v-flex>
            </v-flex>
        </v-layout>

        <v-layout mt-4>
            <span class="subheading">1. Obtained an understanding about the company direct costs and suppliers</span>
        </v-layout>
        <v-layout>
            <v-textarea></v-textarea>
        </v-layout>

        <v-layout mt-4>
            <span class="subheading">2. Performed a purchases cut-off test</span>
        </v-layout>
        <v-layout mt-2>
            <span class="subheading">Last invoices of this year</span>
        </v-layout>
        <invoice-of-the-year-table :invoices="lastInvoices"></invoice-of-the-year-table>
        <v-layout mt-2>
            <span class="subheading">First invoices of the following year</span>
        </v-layout>
        <invoice-of-the-year-table :invoices="firstInvoices"></invoice-of-the-year-table>

        <v-layout mt-4>
            <span class="subheading">3.  Selected a sample of purchases invoices and traced to accounting entries</span>
        </v-layout>
        <purchases-invoice-table :invoices="purchasesInvoices"></purchases-invoice-table>

        <v-layout mt-4>
            <span class="subheading">4.  Determined whether there are any related party direct costs.</span>
        </v-layout>
        <v-layout row>
            <v-flex xs3>
                <v-layout row fill-height align-center>
                    <span>Where there any related party purchases?</span>
                </v-layout>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-radio-group v-model="related_party_purchases" row hide-details class="mt-0">
                    <v-radio label="Yes" :value="1"></v-radio>
                    <v-radio label="No" :value="0"></v-radio>
                </v-radio-group>
            </v-flex>
        </v-layout>
        <v-layout row v-if="related_party_purchases">
            <v-flex xs3>
                <v-text-field class="mt-0" hide-details label="Enter related party details"></v-text-field>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-text-field class="mt-0" hide-details label="Enter amount"></v-text-field>
            </v-flex>
        </v-layout>

        <v-layout mt-4>
            <span class="subheading">5.  Determined whether cash purchases, if any, are correctly stated.</span>
        </v-layout>
        <v-layout row>
            <v-flex xs3>
                <v-layout row fill-height align-center>
                    <span>Where there any cash purchases?</span>
                </v-layout>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-radio-group v-model="cash_purchases" row hide-details class="mt-0">
                    <v-radio label="Yes" :value="1"></v-radio>
                    <v-radio label="No" :value="0"></v-radio>
                </v-radio-group>
            </v-flex>
        </v-layout>
        <v-layout row v-if="cash_purchases">
            <v-flex xs3>
                <v-text-field
                        class="mt-0"
                        hide-details
                        label="Enter how the cash purchases where paid">
                </v-text-field>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-text-field
                        class="mt-0"
                        hide-details
                        label="Amount of cash purchases">
                </v-text-field>
            </v-flex>
            <v-flex xs3 ml-3></v-flex>
        </v-layout>

        <v-layout mt-4>
            <span class="subheading">6.  Determined whether debit notes, if any, are correctly stated.</span>
        </v-layout>
        <v-layout row>
            <v-flex xs3>
                <v-layout row fill-height align-center>
                    <span>Where there any debit notes received?</span>
                </v-layout>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-radio-group v-model="debit_notes_received" row hide-details class="mt-0">
                    <v-radio label="Yes" :value="1"></v-radio>
                    <v-radio label="No" :value="0"></v-radio>
                </v-radio-group>
            </v-flex>
        </v-layout>

        <purchases-invoice-table :invoices="salesInvoices" v-if="debit_notes_received"></purchases-invoice-table>

        <v-layout mt-4>
            <span class="subheading">7.  Determined whether journal entries related to direct cost, if any, are correctly stated.</span>
        </v-layout>
        <v-layout row>
            <v-flex xs3>
                <v-layout row fill-height align-center>
                    <span>Where there any journal entries related to direct cost?</span>
                </v-layout>
            </v-flex>
            <v-flex xs3 ml-3>
                <v-radio-group v-model="journal_entries" row hide-details class="mt-0">
                    <v-radio label="Yes" :value="1"></v-radio>
                    <v-radio label="No" :value="0"></v-radio>
                </v-radio-group>
            </v-flex>
        </v-layout>
        <journal-entries-table :journals="journals" v-if="journal_entries"></journal-entries-table>

        <v-layout mt-4>
            <span class="subheading">8.  Verified with suppliers invoices the cost per unit price</span>
        </v-layout>
        <sales-goods-table :goods="goods"></sales-goods-table>

        <v-layout mt-4>
            <span class="subheading">9. Obtained supporting documentation related to revenue</span>
        </v-layout>
        <v-btn class="success">Copy of direct cost invoices</v-btn>
        <v-btn class="success">Additional documents</v-btn>

        <v-layout row mt-4>
            <v-flex xs8>
                <span class="primary-text subheading" style="font-weight: 700">Additional comments</span>
                <v-text-field multiLine label="Enter comments (optional)"></v-text-field>
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
    import invoiceOfTheYearTable from './tables/invoice-of-the-year.vue'
    import purchasesInvoiceTable from './tables/purchases-invoice.vue'
    import journalEntriesTable from './tables/journal-entries.vue'
    import salesGoodsTable from './tables/sales-goods.vue'

    export default {
        mixins: [isAccount],
        components: {
            invoiceOfTheYearTable,
            purchasesInvoiceTable,
            journalEntriesTable,
            salesGoodsTable,
        },
        data: () => ({
            subAccounts: [
                {
                    name: 'Bank loan interest payable',
                    value: 0
                },
                {
                    name: 'Loan interest payable',
                    value: 0
                },
                {
                    name: 'Bank overdraft details',
                    value: 0
                },
                {
                    name: 'Realised difference on exchange',
                    rate_used_by_client: 0,
                    rate_used_by_ecb: 0,
                    value: 0,
                    custom: true
                },
                {
                    name: 'Unrealised difference on exchange',
                    rate_used_by_client: 0,
                    rate_used_by_ecb: 0,
                    value: 0,
                    custom: true
                },
            ],
            firstInvoices: [
                {
                    invoice_no: 1000,
                    date_of_invoice: '15/07/2017',
                    details: 'Consultancy fee',
                    amount: 700,
                    year_related_to: 2016
                },
                {
                    invoice_no: 1001,
                    date_of_invoice: '15/07/2017',
                    details: 'Consultancy fee',
                    amount: 700,
                    year_related_to: 2016
                },
                {
                    invoice_no: 1002,
                    date_of_invoice: '15/07/2017',
                    details: 'Consultancy fee',
                    amount: 700,
                    year_related_to: 2016
                }
            ],
            lastInvoices: [
                {
                    invoice_no: 1000,
                    date_of_invoice: '15/07/2017',
                    details: 'Consultancy fee',
                    amount: 700,
                    year_related_to: 2016
                },
                {
                    invoice_no: 1001,
                    date_of_invoice: '15/07/2017',
                    details: 'Consultancy fee',
                    amount: 700,
                    year_related_to: 2016
                },
                {
                    invoice_no: 1002,
                    date_of_invoice: '15/07/2017',
                    details: 'Consultancy fee',
                    amount: 700,
                    year_related_to: 2016
                }
            ],
            purchasesInvoices: [
                {
                    invoice_no: 1000,
                    date_of_invoice: '15/07/2017',
                    customer: 'Liviu',
                    details: 'Consultancy fee',
                    amount: 700,
                    traced_to_ledger: 'Yes'
                },
                {
                    invoice_no: 1000,
                    date_of_invoice: '15/07/2017',
                    customer: 'Liviu',
                    details: 'Consultancy fee',
                    amount: 700,
                    traced_to_ledger: 'Yes'
                },
                {
                    invoice_no: 1000,
                    date_of_invoice: '15/07/2017',
                    customer: 'Liviu',
                    details: 'Consultancy fee',
                    amount: 700,
                    traced_to_ledger: 'Yes'
                },
                {
                    invoice_no: 1000,
                    date_of_invoice: '15/07/2017',
                    customer: 'Liviu',
                    details: 'Consultancy fee',
                    amount: 700,
                    traced_to_ledger: 'Yes'
                },
                {
                    invoice_no: 1000,
                    date_of_invoice: '15/07/2017',
                    customer: 'Liviu',
                    details: 'Consultancy fee',
                    amount: 700,
                    traced_to_ledger: 'Yes'
                },
            ],
            journals: [
                {
                    journal_no: 1000,
                    date_of_journal: '15/07/2017',
                    customer: 'Liviu',
                    reason_of_journal: 'Consultancy fee',
                    amount: 700
                },
                {
                    journal_no: 1000,
                    date_of_journal: '15/07/2017',
                    customer: 'Liviu',
                    reason_of_journal: 'Consultancy fee',
                    amount: 700
                }
            ],
            goods: [
                {
                    item_code: 1000,
                    product_name: 'Tablespoon',
                    cost_price: '2.00',
                    selling_price: '3.00',
                    profit_margin: '33.33%'
                },
                {
                    item_code: 1000,
                    product_name: 'Tablespoon',
                    cost_price: '2.00',
                    selling_price: '3.00',
                    profit_margin: '33.33%'
                },
            ],
            related_party_purchases: null,
            cash_purchases: null,
            debit_notes_received: null,
            journal_entries: null,
        }),
        methods: {
            addAccounts () {
                return [
                    {
                        sub_account: {
                            name: 'Bank loan interest payable'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Loan interest payable'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Bank overdraft details'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Realised difference on exchange'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                    {
                        sub_account: {
                            name: 'Unrealised difference on exchange'
                        },
                        amount: 35,
                        audit_adjustments: 42
                    },
                ]
            }
        }
    }
</script>