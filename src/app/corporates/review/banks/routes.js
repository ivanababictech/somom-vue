export const Banks = r => require.ensure([], () => r(require('./main')), 'corporate-review-bundle')

export default [
    {
        path: 'banks',
        name: 'corporate-banks',
        component: Banks
    },
]
