/**
 * Components are lazy-loaded - See "Grouping Components in the Same Chunk"
 * http://router.vuejs.org/en/advanced/lazy-loading.html
 */
/* eslint-disable global-require */
const Profile = r => require.ensure([], () => r(require('./main')), 'profile-bundle')
const ProfileEdit = r => require.ensure([], () => r(require('./edit')), 'profile-bundle')

const meta = {
    requiresAuth: true,
}

export default [
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta,
    },
    {
        path: '/profile/edit',
        name: 'profile.edit',
        component: ProfileEdit,
        meta,
    },
]
