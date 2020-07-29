const AccountingContacts = r => require.ensure([], () => r(require('./main')), 'items-bundle')
const AccountingCustomers = r => require.ensure([], () => r(require('./components/customers')), 'items-bundle')
const AccountingSuppliers = r => require.ensure([], () => r(require('./components/suppliers')), 'items-bundle')
const AccountingDirectEntrySuppliers = r => require.ensure([], () => r(require('./components/direct-entry-suppliers')), 'items-bundle')
const AccountingDonors = r => require.ensure([], () => r(require('./components/donors')), 'items-bundle')

export default [
    {
        path: 'contacts',
        name: 'AccountingContacts',
        component: AccountingContacts,
        children: [
            {
                path: 'customers',
                name: 'AccountingCustomers',
                component: AccountingCustomers
            },
            {
                path: 'suppliers',
                name: 'AccountingSuppliers',
                component: AccountingSuppliers
            },
            {
                path: 'direct-entry-suppliers',
                name: 'AccountingDirectEntrySuppliers',
                component: AccountingDirectEntrySuppliers
            },
            {
                path: 'donors',
                name: 'AccountingDonors',
                component: AccountingDonors
            },
        ]
    },
]
