<template>
    <div id="reports">
        <v-layout>
            <v-navigation-drawer stateless permanent floating dark class="accent" width="250">
                <v-list dense>
                    <v-list-tile v-for="item in items" :key="item.title" :to="{ name: item.routeName }">
                        <v-list-tile-content>
                            <v-list-tile-title>
                                <span class="black--text medium">{{ item.title }}</span>
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>

            <router-view class="fill-width"></router-view>
        </v-layout>

    </div>
</template>

<script>
    export default {
        data: () => ({
            items: [
                {title: 'Trial balance', routeName: 'TrialBalanceReport'},
                {title: 'Income statement', routeName: 'IncomeStatementReport'},
                {title: 'Balance sheet', routeName: 'BalanceSheetReport'},
                {title: 'Items', routeName: 'ItemsReport'},
                {title: 'VAT', routeName: 'VatReport'},
                {title: 'Sales', routeName: 'SalesReport'},
                {title: 'Purchases', routeName: 'PurchasesReport'},
                {title: 'Bank', routeName: 'BankReport'},
                {title: 'Creditors', routeName: 'CreditorsReport'},
                {title: 'Debtors', routeName: 'DebtorsReport'},
                {title: 'Fixed assets', routeName: 'FixedAssetsReport'},
                {title: 'Administrative expense', routeName: 'AdministrativeExpenseReport'},
                {title: 'Cheque', routeName: 'ChequeReport'},
                {title: 'Cash', routeName: 'CashReport'},
                {title: 'Direct entry', routeName: 'DirectEntryReport'},
                {title: 'Journal entry', routeName: 'JournalEntryReport'},
                {title: 'Accruals', routeName: 'AccrualsReport'},
                {title: 'Prepayments', routeName: 'PrepaymentsReport'},
                {title: 'Donations', routeName: 'DonationsReport'},
            ]
        })
    }
</script>

<style>
    .medium{
        font-size: 15px !important;
        font-weight: 500 !important;
    }
</style>