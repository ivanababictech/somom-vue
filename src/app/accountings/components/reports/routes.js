const AccountingReports = r => require.ensure([], () => r(require('./components/index')), 'accounting-reports-bundle')
const TrialBalanceReport = r => require.ensure([], () => r(require('./components/trial-balance')), 'accounting-reports-bundle')
const IncomeStatementReport = r => require.ensure([], () => r(require('./components/income-statement')), 'accounting-reports-bundle')
const BalanceSheetReport = r => require.ensure([], () => r(require('./components/balance-sheet')), 'accounting-reports-bundle')
const ItemsReport = r => require.ensure([], () => r(require('./components/items/index')), 'accounting-reports-bundle')
const VatReport = r => require.ensure([], () => r(require('./components/vat/index')), 'accounting-reports-bundle')
const SalesReport = r => require.ensure([], () => r(require('./components/invoices/sales')), 'accounting-reports-bundle')
const PurchasesReport = r => require.ensure([], () => r(require('./components/invoices/purchases')), 'accounting-reports-bundle')
const BankReport = r => require.ensure([], () => r(require('./components/bank/index')), 'accounting-reports-bundle')
const CreditorsReport = r => require.ensure([], () => r(require('./components/creditors/index')), 'accounting-reports-bundle')
const DebtorsReport = r => require.ensure([], () => r(require('./components/debtors/index')), 'accounting-reports-bundle')
const FixedAssetsReport = r => require.ensure([], () => r(require('./components/fixed-assets/index')), 'accounting-reports-bundle')
const AdministrativeExpenseReport = r => require.ensure([], () => r(require('./components/administrative-expenses/index')), 'accounting-reports-bundle')
const ChequeReport = r => require.ensure([], () => r(require('./components/cheque')), 'accounting-reports-bundle')
const CashReport = r => require.ensure([], () => r(require('./components/cash/index')), 'accounting-reports-bundle')
const DirectEntryReport = r => require.ensure([], () => r(require('./components/direct-entry')), 'accounting-reports-bundle')
const JournalEntryReport = r => require.ensure([], () => r(require('./components/journal-entry')), 'accounting-reports-bundle')
const AccrualsReport = r => require.ensure([], () => r(require('./components/accruals')), 'accounting-reports-bundle')
const PrepaymentsReport = r => require.ensure([], () => r(require('./components/prepayments')), 'accounting-reports-bundle')
const DonationsReport = r => require.ensure([], () => r(require('./components/donations')), 'accounting-reports-bundle')


export default [
    {
        path: 'reports',
        component: AccountingReports,
        children: [
            {
                path: '',
                name: 'AccountingReports',
                component: TrialBalanceReport
            },
            {
                path: 'trial-balance',
                name: 'TrialBalanceReport',
                component: TrialBalanceReport
            },
            {
                path: 'income-statement',
                name: 'IncomeStatementReport',
                component: IncomeStatementReport
            },
            {
                path: 'balance-sheet',
                name: 'BalanceSheetReport',
                component: BalanceSheetReport
            },
            {
                path: 'items',
                name: 'ItemsReport',
                component: ItemsReport
            },
            {
                path: 'vat',
                name: 'VatReport',
                component: VatReport
            },
            {
                path: 'sales',
                name: 'SalesReport',
                component: SalesReport
            },
            {
                path: 'purchases',
                name: 'PurchasesReport',
                component: PurchasesReport
            },
            {
                path: 'bank',
                name: 'BankReport',
                component: BankReport
            },
            {
                path: 'creditors',
                name: 'CreditorsReport',
                component: CreditorsReport
            },
            {
                path: 'debtors',
                name: 'DebtorsReport',
                component: DebtorsReport
            },
            {
                path: 'fixed-assets',
                name: 'FixedAssetsReport',
                component: FixedAssetsReport
            },
            {
                path: 'administrative-expense',
                name: 'AdministrativeExpenseReport',
                component: AdministrativeExpenseReport
            },
            {
                path: 'cheque',
                name: 'ChequeReport',
                component: ChequeReport
            },
            {
                path: 'cash',
                name: 'CashReport',
                component: CashReport
            },
            {
                path: 'direct-entry',
                name: 'DirectEntryReport',
                component: DirectEntryReport
            },
            {
                path: 'journal-entry',
                name: 'JournalEntryReport',
                component: JournalEntryReport
            },
            {
                path: 'accruals',
                name: 'AccrualsReport',
                component: AccrualsReport
            },
            {
                path: 'prepayments',
                name: 'PrepaymentsReport',
                component: PrepaymentsReport
            },
            {
                path: 'donations',
                name: 'DonationsReport',
                component: DonationsReport
            },
        ]
    },
]
