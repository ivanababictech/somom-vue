import { routes as reports } from './components/reports'
import { routes as items } from './components/items'
import { routes as contacts } from './components/contacts'
import { routes as companySettings } from './components/company-settings'
import { routes as vat } from './components/vat'
import { routes as tax } from './components/tax'
import { routes as lockPeriods } from './components/lock-periods'
import { routes as payroll } from './components/payroll'

export const Accountings = r => require.ensure([], () => r(require('./components/index')), 'accountings-bundle')
export const Accounting = r => require.ensure([], () => r(require('./components/accounting')), 'accounting-bundle')
export const AccountingNominalActivity = r => require.ensure([], () => r(require('./components/nominal-activity/index')), 'accounting-bundle')
export const AccountingRecords = r => require.ensure([], () => r(require('./components/records/main')), 'accounting-bundle')
export const AccountingCompanyDetails = r => require.ensure([], () => r(require('./components/index')), 'accounting-bundle')
export const AccountingAuditTrail = r => require.ensure([], () => r(require('./components/audit-trail/main')), 'accounting-audit-trail-bundle')
export const AccountingBalances = r => require.ensure([], () => r(require('./components/balances/index')), 'accounting-balances-bundle')

export default [
    {
        path: '/accountings',
        name: 'Accountings',
        component: Accountings,
        meta: {auth: true, admin: true}
    },
    {
        path: '/accountings/:accounting_id',
        component: Accounting,
        meta: {auth: true, admin: true},
        children: [
            {
                path: 'nominal-activity',
                name: 'AccountingNominalActivity',
                component: AccountingNominalActivity
            },
            {
                path: 'records',
                name: 'AccountingRecords',
                component: AccountingRecords
            },

            {
                path: 'company-details',
                name: 'AccountingCompanyDetails',
                component: AccountingCompanyDetails
            },
            {
                path: 'audit-trail',
                name: 'AccountingAuditTrail',
                component: AccountingAuditTrail
            },
            {
                path: 'balances',
                name: 'AccountingBalances',
                component: AccountingBalances
            },
            ...reports,
            ...items,
            ...contacts,
            ...companySettings,
            ...lockPeriods,
            ...vat,
            ...tax,
            ...payroll
        ]
    },
]
