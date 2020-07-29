<template>
    <v-card>
        <accounting-toolbar
                title="Purchases"
                supplier
                item="product"
                @toggleDialog="toggleDialog('purchases')"
                @saveAsDraft="saveAsDraft">
        </accounting-toolbar>

        <v-card-text class="mt-5">
            <v-tabs v-model="active">
                <v-tab href="#purchase_invoice">Purchase invoice</v-tab>
                <v-tab href="#purchase_order">Purchase order</v-tab>
                <v-tab href="#purchase_quote">Quote</v-tab>
                <v-tab href="#debit_note">Debit note</v-tab>
                <account-dialog
                        icon="add"
                        :item="{type:'purchase'}"
                        headline="Add a new purchase account"
                        :label="false"
                ></account-dialog>
                <v-tab-item id="purchase_invoice">
                    <purchase-invoice
                            ref="invoice"
                            type="purchase"
                            v-if="active === 'purchase_invoice'"
                    ></purchase-invoice>
                </v-tab-item>
                <v-tab-item id="purchase_order">
                    <purchase-invoice
                            ref="invoice"
                            type="purchase_order"
                            v-if="active === 'purchase_order'"
                    ></purchase-invoice>
                </v-tab-item>
                <v-tab-item id="purchase_quote">
                    <purchase-invoice
                            ref="invoice"
                            type="purchase_quote"
                            v-if="active === 'purchase_quote'"
                    ></purchase-invoice>
                </v-tab-item>
                <v-tab-item id="debit_note">
                    <purchase-invoice
                            ref="invoice"
                            type="debit_note"
                            v-if="active === 'debit_note'"
                    ></purchase-invoice>
                </v-tab-item>
            </v-tabs>
        </v-card-text>

    </v-card>
</template>

<script>
    import {mapMutations} from 'vuex'
    import PurchaseInvoice from '../invoices/invoice'
    import AccountingToolbar from '../components/toolbar.vue'

    export default {
        data() {
            return {
                active: 'purchase_invoice'
            }
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

        components: { PurchaseInvoice, AccountingToolbar},
    }
</script>