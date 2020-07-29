const AccountingTax = r => require.ensure([], () => r(require('./main')), 'accounting-vat-bundle')

export default [
    {
        path: 'tax',
        name: 'AccountingTax',
        component: AccountingTax,
    },
]
