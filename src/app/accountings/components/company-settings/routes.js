const CompanySettings = r => require.ensure([], () => r(require('./main')), 'copmany-settings-bundle')
const CharterOfAccounts = r => require.ensure([], () => r(require('./components/charter-of-accounts')), 'copmany-settings-bundle')
const CompanyDetails = r => require.ensure([], () => r(require('./components/company-details')), 'copmany-settings-bundle')
const BankDetails = r => require.ensure([], () => r(require('./components/bank-details')), 'copmany-settings-bundle')
const Logo = r => require.ensure([], () => r(require('./components/logo')), 'copmany-settings-bundle')
const Users = r => require.ensure([], () => r(require('./components/users')), 'copmany-settings-bundle')

const parent = 'company-settings'

export default [
    {
        path: 'company-settings',
        name: parent,
        component: CompanySettings,
        children: [
            {
                path: 'details',
                name: parent + '.details',
                component: CompanyDetails
            },
            {
                path: 'charter-of-accounts',
                name: parent + '.charter-of-accounts',
                component: CharterOfAccounts
            },
            {
                path: 'bank-details',
                name: parent + '.bank-details',
                component: BankDetails
            },
            {
                path: 'logo',
                name: parent + '.logo',
                component: Logo
            },
            {
                path: 'users',
                name: parent + '.users',
                component: Users
            },
        ]
    },
]
