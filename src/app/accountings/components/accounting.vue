<template>
    <section>

        <v-toolbar dense color="accent">
            <v-toolbar-items>
                <v-btn flat :to="{ name: 'AccountingNominalActivity' }">Nominal activity</v-btn>
                <v-btn flat :to="{ name: 'AccountingRecords' }">Accounting records</v-btn>
                <v-btn flat :to="{ name: 'AccountingReports' }">Reporting</v-btn>
                <v-btn flat :to="{ name: 'AccountingItems' }">Items</v-btn>
                <v-btn flat :to="{ name: 'AccountingContacts' }">Contacts</v-btn>
                <v-btn flat :to="{ name: 'AccountingVat' }">VAT</v-btn>
                <v-btn flat :to="{ name: 'AccountingTax' }">TAX</v-btn>
                <v-btn flat :to="{ name: 'AccountingPayroll' }">Payroll</v-btn>
            </v-toolbar-items>

            <v-spacer></v-spacer>

            <v-menu>
                <v-btn icon slot="activator">
                    <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list dense>
                    <v-list-tile :to="{ name: 'company-settings.details' }">
                        <v-list-tile-title>Company Settings</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile :to="{ name: 'AccountingAuditTrail' }">
                        <v-list-tile-title>Audit Trail</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile :to="{ name: 'AccountingBalances' }">
                        <v-list-tile-title>Opening balances</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile :to="{ name: 'lock-periods' }">
                        <v-list-tile-title>Year end</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>

        </v-toolbar>

        <v-toolbar dense flat height="28" class="mb-2 white">
            <v-spacer></v-spacer>
            <template v-if="isPayroll">
                <v-btn
                        flat
                        small
                        color="primary"
                        :to="{ name: 'PayrollCompanyDetails' }">
                    Company details
                </v-btn>
                <v-btn
                        flat
                        small
                        color="primary"
                        :to="{ name: 'PayrollEmployeeList' }">
                    Employee list
                </v-btn>
                <v-btn
                        flat
                        small
                        color="primary"
                        :to="{ name: 'PayrollPayrollRun' }">
                    Payroll run
                </v-btn>
                <v-btn
                        flat
                        small
                        color="primary"
                        :to="{ name: 'PayrollReporting' }">
                    Reporting
                </v-btn>
            </template>
            <template v-else>
                <v-btn v-if="showBalances" flat small color="accent" @click="toggleDialog('balances')">Opening Balances
                </v-btn>
                <v-btn
                        v-for="button in buttons"
                        :key="button.name"
                        flat
                        small
                        color="primary"
                        @click="toggleDialog(button.dialog)">
                    {{ button.name }}
                </v-btn>
            </template>
        </v-toolbar>

        <router-view></router-view>

        <template v-if="isDialogOpen">
            <v-dialog
                    :value="dialogs.direct_entries"
                    lazy
                    fullscreen
                    transition="dialog-bottom-transition"
                    :overlay="false"
                    v-if="dialogs.direct_entries">
                <direct-entries-dialog/>
            </v-dialog>

            <v-dialog
                    :value="dialogs.sales"
                    lazy
                    fullscreen
                    transition="dialog-bottom-transition"
                    :overlay="false"
                    v-if="dialogs.sales">
                <sales-dialog/>
            </v-dialog>

            <v-dialog
                    :value="dialogs.purchases"
                    lazy
                    fullscreen
                    transition="dialog-bottom-transition"
                    :overlay="false"
                    v-if="dialogs.purchases">
                <purchases-dialog/>
            </v-dialog>

            <v-dialog
                    :value="dialogs.donations"
                    lazy
                    fullscreen
                    transition="dialog-bottom-transition"
                    :overlay="false"
                    v-if="dialogs.donations">
                <donations-dialog/>
            </v-dialog>

            <v-dialog
                    :value="dialogs.bank_entries"
                    lazy
                    fullscreen
                    transition="dialog-bottom-transition"
                    :overlay="false"
                    v-if="dialogs.bank_entries">
                <banks-dialog/>
            </v-dialog>

            <v-dialog
                    :value="dialogs.cash_entries"
                    lazy
                    fullscreen
                    transition="dialog-bottom-transition"
                    :overlay="false"
                    v-if="dialogs.cash_entries">
                <cash-dialog/>
            </v-dialog>

            <v-dialog
                    :value="dialogs.cheque_entries"
                    lazy
                    fullscreen
                    transition="dialog-bottom-transition"
                    :overlay="false"
                    v-if="dialogs.cheque_entries">
                <cheques-dialog/>
            </v-dialog>

            <v-dialog
                    :value="dialogs.journal_entries"
                    lazy
                    fullscreen
                    transition="dialog-bottom-transition"
                    :overlay="false"
                    v-if="dialogs.journal_entries">
                <journal-entries-dialog/>
            </v-dialog>

            <v-dialog
                    :value="dialogs.balances"
                    lazy
                    fullscreen
                    transition="dialog-bottom-transition"
                    :overlay="false"
                    v-if="dialogs.balances">
                <balances-dialog/>
            </v-dialog>

            <v-dialog
                    :value="dialogs.queries"
                    lazy
                    fullscreen
                    transition="dialog-bottom-transition"
                    :overlay="false"
                    v-if="dialogs.queries">
                <queries-dialog/>
            </v-dialog>

            <v-dialog
                    :value="dialogs.inventory"
                    lazy
                    fullscreen
                    transition="dialog-bottom-transition"
                    :overlay="false"
                    v-if="dialogs.inventory">
                <inventory-dialog/>
            </v-dialog>

            <v-dialog
                    :value="dialogs.cheque_accounts"
                    lazy
                    fullscreen
                    transition="dialog-bottom-transition"
                    :overlay="false"
                    v-if="dialogs.cheque_accounts">
                <cheque-accounts-dialog/>
            </v-dialog>

            <v-dialog
                    :value="dialogs.customers"
                    lazy
                    fullscreen
                    transition="dialog-bottom-transition"
                    :overlay="false"
                    v-if="dialogs.customers">
                <customers-dialog/>
            </v-dialog>

            <v-dialog
                    :value="dialogs.suppliers"
                    lazy
                    fullscreen
                    transition="dialog-bottom-transition"
                    :overlay="false"
                    v-if="dialogs.suppliers">
                <suppliers-dialog/>
            </v-dialog>

            <v-dialog
                    :value="dialogs.asset_registrar"
                    lazy
                    fullscreen
                    transition="dialog-bottom-transition"
                    :overlay="false"
                    v-if="dialogs.asset_registrar">
                <asset-registrar-dialog/>
            </v-dialog>
        </template>

    </section>
</template>

<script>
    import {mapGetters, mapActions, mapMutations} from 'vuex'
    import {fetchAccounting} from '@/api/accounting'

    import SalesDialog from './dialogs/sales/index'
    import PurchasesDialog from './dialogs/purchases/index'
    import DonationsDialog from './dialogs/donations/index'
    import BanksDialog from './dialogs/banks/index'
    import CashDialog from './dialogs/cash/index'
    import ChequesDialog from './dialogs/cheques/index'
    import DirectEntriesDialog from './dialogs/direct-entries'
    import BalancesDialog from './dialogs/balances/index'
    import JournalEntriesDialog from './dialogs/journal-entries/index'
    import QueriesDialog from './dialogs/queries'
    import InventoryDialog from "./balances/inventory"
    import CustomersDialog from "./balances/customers"
    import SuppliersDialog from "./balances/suppliers"
    import AssetRegistrarDialog from "./balances/asset-registrar/index"
    import ChequeAccountsDialog from "./balances/cheques"

    export default {
        components: {
            InventoryDialog,
            ChequeAccountsDialog,
            AssetRegistrarDialog,
            CustomersDialog,
            SuppliersDialog,
            SalesDialog,
            PurchasesDialog,
            DonationsDialog,
            BanksDialog,
            CashDialog,
            ChequesDialog,
            DirectEntriesDialog,
            BalancesDialog,
            JournalEntriesDialog,
            QueriesDialog,
        },

        data: () => ({
            buttons: [
                {
                    name: 'Pledges',
                    dialog: 'donations'
                },
                {
                    name: 'Sales',
                    dialog: 'sales'
                },
                {
                    name: 'Purchases',
                    dialog: 'purchases'
                },
                {
                    name: 'Banks',
                    dialog: 'bank_entries'
                },
                {
                    name: 'Cash',
                    dialog: 'cash_entries'
                },
                {
                    name: 'Cheque',
                    dialog: 'cheque_entries'
                },
                {
                    name: 'Journal entries',
                    dialog: 'journal_entries'
                },
                {
                    name: 'Direct entries',
                    dialog: 'direct_entries'
                },
                {
                    name: 'Queries',
                    dialog: 'queries'
                },
            ]
        }),

        computed: {
            ...mapGetters({
                showBalances: 'accounting/showBalances',
                dialogs: 'accounting/dialogs'
            }),
            isPayroll () {
                return this.$route.path.toLowerCase().indexOf('payroll') > -1
            },

            isDialogOpen() {
                let dialog = false
                let self = this

                Object.keys(this.dialogs).forEach(function (key) {
                    if (self.dialogs[key]) {
                        return dialog = true
                    }
                });

                return dialog
            }
        },

        methods: {
            ...mapActions({
                unsubscribe: 'accounting/unsubscribe',
                openInvoice: 'accounting/invoice/open'
            }),
            ...mapMutations({
                toggleDialog: 'accounting/toggleDialog'
            }),
        },

        mounted() {
            fetchAccounting()
        },

        destroyed() {
            this.unsubscribe()
        },

    }
</script>