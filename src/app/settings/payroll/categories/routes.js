/**
 * Components are lazy-loaded - See "Grouping Components in the Same Chunk"
 * http://router.vuejs.org/en/advanced/lazy-loading.html
 */
const Index = () => import(/* webpackChunkName: "group-settings-payroll" */ '@/app/settings/payroll/categories/index.vue')
const AllCategories = () => import(/* webpackChunkName: "group-settings-payroll" */ '@/app/settings/payroll/categories/components/all-categories')

/* eslint-disable global-require */

const meta = {
    // requiresAuth: true
};

export let one = 1;

let parent = 'payroll';

export default [
    {
        path: parent + '/categories',
        component: Index,
        children: [
            {
                path: '',
                name: parent + '.categories',
                redirect: to => {
                    return 'all';
                }
            },
            {
                path: 'all',
                name: 'AllCategories',
                component: AllCategories
            },
        ],
        meta
    },
]