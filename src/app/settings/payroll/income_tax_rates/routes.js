/**
 * Components are lazy-loaded - See "Grouping Components in the Same Chunk"
 * http://router.vuejs.org/en/advanced/lazy-loading.html
 */
const Index = () => import(/* webpackChunkName: "group-settings-payroll" */ '@/app/settings/payroll/income_tax_rates/index.vue')
const IncomeTaxRates = () => import(/* webpackChunkName: "group-settings-payroll" */ '@/app/settings/payroll/income_tax_rates/components/income-tax-rates')

/* eslint-disable global-require */

const meta = {
    // requiresAuth: true
};

export let one = 1;

let parent = 'payroll';

export default [
    {
        path: parent + '/incometaxrates',
        component: Index,
        children: [
            {
                path: '',
                name: parent + '.incometaxrates',
                redirect: to => {
                    return 'all';
                }
            },
            {
                path: 'all',
                name: 'IncomeTaxRates',
                component: IncomeTaxRates
            },
        ],
        meta
    },
]