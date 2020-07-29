export const LockPeriods = r => require.ensure([], () => r(require('./main')), 'corporate-review-bundle')

export default [
    {
        path: 'lock-periods',
        name: 'corporate-lock-periods',
        component: LockPeriods
    },
]
