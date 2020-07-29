/**
 * Components are lazy-loaded - See "Grouping Components in the Same Chunk"
 * http://router.vuejs.org/en/advanced/lazy-loading.html
 */
/* eslint-disable global-require */
const CompaniesCreate = r => require.ensure([], () => r(require('./components/create')), 'companies-bundle')
const CompaniesEdit = r => require.ensure([], () => r(require('./components/edit')), 'companies-bundle')

const meta = {
    requiresAuth: true,
}

export default [
    {
        path: '/companies/create',
        name: 'companies.create',
        component: CompaniesCreate,
        meta
    },
    {
        path: '/companies/:companyId/edit',
        name: 'companies.edit',
        component: CompaniesEdit,
        meta
    },
]
