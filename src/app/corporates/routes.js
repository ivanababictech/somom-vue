export const Corporates = r => require.ensure([], () => r(require('./components/index')), 'corporate-bundle')
export const Corporate = r => require.ensure([], () => r(require('./company/main')), 'corporate-bundle')
export const CorporateLists = r => require.ensure([], () => r(require('./company/lists')), 'corporate-bundle')
export const CompanyReview = r => require.ensure([], () => r(require('./review/corporate')), 'corporate-review-bundle')
export const CorporateNominalActivity = r => require.ensure([], () => r(require('./review/nominal-activity')), 'corporate-review-bundle')
export const CorporateOpeningBalances = r => require.ensure([], () => r(require('./review/opening-balances')), 'corporate-review-bundle')
export const CorporateNominalActivityCreate = r => require.ensure([], () => r(require('./review/opening-balances/create')), 'corporate-review-bundle')

import {routes as assignments } from './assignments';
import {routes as lockPeriods} from "./review/lock-periods"
import {routes as banks} from "./review/banks"
import {routes as auditTrail} from "./review/audit-trail"

export default [
    {
        path: '/corporates',
        name: 'corporates.index',
        component: Corporates,
    },
    {
        path: '/corporates/lists',
        name: 'corporates.lists.index',
        component: CorporateLists
    },
    {
        path: '/corporates/:corporate_id',
        name: 'corporates.show',
        component: Corporate,
        children: [

        ]
    },
    {
        path: '/corporates/:corporate_id/review',
        component: CompanyReview,
        children: [
            {
                path: 'nominal-activity',
                name: 'corporate-nominal-activity',
                component: CorporateNominalActivity
            },
            {
                path: 'opening-balances',
                name: 'corporate-opening-balances',
                component: CorporateOpeningBalances,
            },
            {
                path: 'opening-balances/create',
                name: 'corporate-opening-balances-create',
                component: CorporateNominalActivityCreate
            },
            ...banks,
            ...lockPeriods,
            ...auditTrail,
        ]
    },
    ...assignments,
]
