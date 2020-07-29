/**
 * Components are lazy-loaded - See "Grouping Components in the Same Chunk"
 * http://router.vuejs.org/en/advanced/lazy-loading.html
 */
/* eslint-disable global-require */
const Users = r => require.ensure([], () => r(require('./main')), 'users-bundle')
const UsersCreate = r => require.ensure([], () => r(require('./components/create')), 'users-bundle')
const UsersEdit = r => require.ensure([], () => r(require('./components/edit')), 'users-bundle')

const meta = {
    requiresAuth: true,
}

export default [
    {
        path: '/users',
        name: 'users',
        component: Users,
        meta,
    },
    {
        path: '/users/create',
        name: 'users.create',
        component: UsersCreate,
        meta,
    },
    {
        path: '/users/:userId/edit',
        name: 'users.edit',
        component: UsersEdit,
        meta,
    },
]
