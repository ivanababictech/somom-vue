const AccountingVat = r => require.ensure([], () => r(require('./main')), 'vat-bundle')

export default [
    {
        path: 'vat',
        name: 'AccountingVat',
        component: AccountingVat,
    },
]
