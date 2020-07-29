/**
 * Components are lazy-loaded - See "Grouping Components in the Same Chunk"
 * http://router.vuejs.org/en/advanced/lazy-loading.html
 */
const Index = () => import(/* webpackChunkName: "group-settings-payroll" */ '@/app/settings/payroll/social_security_contribution_rates/index.vue');
const SocialSecurityContributionRates = () => import(/* webpackChunkName: "group-settings-payroll" */ '@/app/settings/payroll/social_security_contribution_rates/components/social-security-contribution-rates');

/* eslint-disable global-require */

const meta = {
    // requiresAuth: true
};

export let one = 1;

let parent = 'payroll';

export default [
    {
        path: parent + '/socialsecuritycontributionrates',
        component: Index,
        children: [
            {
                path: '',
                name: parent + '.socialsecuritycontributionrates',
                redirect: to => {
                    return 'all';
                }
            },
            {
                path: 'all',
                name: 'SocialSecurityContributionRates',
                component: SocialSecurityContributionRates
            },
        ],
        meta
    },
]