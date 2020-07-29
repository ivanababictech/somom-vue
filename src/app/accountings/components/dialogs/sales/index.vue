<template>
    <div class="fill-height">
        <accounting-toolbar
                title="Sales"
                customer
                item="service"
                @toggleDialog="toggleDialog('sales')"
                @saveAsDraft="saveAsDraft">
        </accounting-toolbar>

        <v-card class="mt-5 fill-height">
            <v-card-text>

                <v-tabs v-model="active">
                    <v-tab href="#sales_invoice">Sale invoice</v-tab>
                    <v-tab href="#payment_request">Request for payment</v-tab>
                    <v-tab href="#quote">Quote</v-tab>
                    <v-tab href="#credit_note">Credit note</v-tab>
                    <account-dialog
                            icon="add"
                            :item="{type:'sale'}"
                            headline="Add a new sales account"
                            :label="false"
                    ></account-dialog>

                    <v-tab-item id="sales_invoice">
                        <sale-invoice
                                type="sale"
                                ref="invoice"
                                v-if="active === 'sales_invoice'">
                        </sale-invoice>
                    </v-tab-item>
                    <v-tab-item id="payment_request">
                        <sale-invoice
                                type="payment_request"
                                ref="invoice"
                                v-if="active === 'payment_request'">
                        </sale-invoice>
                    </v-tab-item>
                    <v-tab-item id="quote">
                        <sale-invoice
                                type="quote"
                                ref="invoice"
                                v-if="active === 'quote'">
                        </sale-invoice>
                    </v-tab-item>
                    <v-tab-item id="credit_note">
                        <sale-invoice
                                type="credit_note"
                                ref="invoice"
                                v-if="active === 'credit_note'">
                        </sale-invoice>
                    </v-tab-item>
                </v-tabs>
            </v-card-text>
        </v-card>

    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import SaleInvoice from '../invoices/invoice'
    import AccountingToolbar from '../components/toolbar.vue'

    export default {
        data() {
            return {
                active: ''
            }
        },

        computed: {
            ...mapGetters({
                defaultBank: 'accounting/defaultBank',
            })
        },

        methods: {
            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog'
            }),
            saveAsDraft() {
                if(this.$refs.invoice) {
                    this.$refs.invoice.saveAsDraftSale()
                }
            },
        },

        components: { SaleInvoice, AccountingToolbar },
    }
</script>