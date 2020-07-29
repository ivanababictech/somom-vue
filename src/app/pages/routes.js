/**
 * Components are lazy-loaded - See "Grouping Components in the Same Chunk"
 * http://router.vuejs.org/en/advanced/lazy-loading.html
 */
/* eslint-disable global-require */
const Page404 = r => require.ensure([], () => r(require('./404')), 'pages-bundle')
const Page403 = r => require.ensure([], () => r(require('./403')), 'pages-bundle')

export default [
    {
        path: '/403',
        name: 'unauthorized',
        component: Page403,
    },
    {
        path: '/*',
        name: 'not-found',
        component: Page404,
    },
]
