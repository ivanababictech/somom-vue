/**
 * Components are lazy-loaded - See "Grouping Components in the Same Chunk"
 * http://router.vuejs.org/en/advanced/lazy-loading.html
 */
/* eslint-disable global-require */
const BankDetails = r => require.ensure([], () => r(require('./main')), 'bank-details-bundle')

export default [
    {
        path: 'bank-details',
        name: 'BankDetails',
        component: BankDetails
    },
]
