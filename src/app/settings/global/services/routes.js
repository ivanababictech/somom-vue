const Services = r => require.ensure([], () => r(require('./main')), 'services-bundle')

const meta = {
    requiresAuth: true,
}

const parent = 'global'

export default [
    {
        path: parent + '/services',
        name: parent + '.services',
        component: Services,
        meta,
    }
]
