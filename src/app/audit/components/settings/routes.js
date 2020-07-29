/**
 * Components are lazy-loaded - See "Grouping Components in the Same Chunk"
 * http://router.vuejs.org/en/advanced/lazy-loading.html
 */
/* eslint-disable global-require */
const AccountingSettings = r => require.ensure([], () => r(require('./main')), 'accounting-setting-bundle')
import { routes as bankDetails } from './bank-details/index'

export default [
    {
        path: 'settings',
        name: 'AccountingSettings',
        component: AccountingSettings,
        children: [
            ...bankDetails,
        ]
    }
]
