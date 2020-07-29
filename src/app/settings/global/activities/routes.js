const Activities = r => require.ensure([], () => r(require('./main')), 'activities-bundle')

const meta = {
    requiresAuth: true,
}

const parent = 'global'

export default [
    {
        path: parent + '/activities',
        name: parent +'.activities',
        component: Activities,
        meta,
    }
]
