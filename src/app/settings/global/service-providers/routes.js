/**
 * Components are lazy-loaded - See "Grouping Components in the Same Chunk"
 * http://router.vuejs.org/en/advanced/lazy-loading.html
 */
/* eslint-disable global-require */
const ServiceProviders = r => require.ensure([], () => r(require('./main')), 'service-providers-bundle')
const ServiceProvidersCreate = r => require.ensure([], () => r(require('./components/create')), 'service-providers-bundle')
const ServiceProvidersEdit = r => require.ensure([], () => r(require('./components/edit')), 'service-providers-bundle')

const meta = {
    requiresAuth: true,
}

const parent = 'global'

export default [
    {
        path: parent + '/service-providers',
        name: parent + '.service-providers',
        component: ServiceProviders,
        meta,
    },
    {
        path: parent + '/service-providers/create',
        name: parent + '.service-providers.create',
        component: ServiceProvidersCreate,
        meta,
    },
    {
        path: parent + '/service-providers/:serviceProviderId/edit',
        name: parent + '.service-providers.edit',
        component: ServiceProvidersEdit,
        meta,
    }
]
