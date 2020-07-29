export const AuditTrail = r => require.ensure([], () => r(require('./main')), 'corporate-audit-trail-bundle')

export default [
    {
        path: 'audit-trail',
        name: 'corporate-audit-trail',
        component: AuditTrail
    },
]
