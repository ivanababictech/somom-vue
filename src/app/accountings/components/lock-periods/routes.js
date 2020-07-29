export const LockPeriods = r => require.ensure([], () => r(require('./main')), 'accountings-lock-periods-bundle')

export default [
    {
        path: 'lock-periods',
        name: 'lock-periods',
        component: LockPeriods
    },
]
