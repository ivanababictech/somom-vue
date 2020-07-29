
// AUDITS
const Audits = () => import('@/app/audit/components/index')
const Audit = () => import('@/app/audit/components/audit')
const AuditTrialBalance = () => import('@/app/audit/components/accounts')
const AuditCompanyDetails = () => import('@/app/audit/components/company-details')
const AuditPlanning = () => import('@/app/audit/components/audit-planning')
const LeadSchedules = () => import('@/app/audit/components/lead-schedules/main')

export default [
    {
        path: '/audits',
        name: 'audits',
        component: Audits,
    },
    {
        path: '/audits/:audit_id',
        component: Audit,
        children: [
            {
                name: 'audit.trial-balances',
                path: 'trial-balances',
                component: AuditTrialBalance
            },
            {
                name: 'audit.planning',
                path: 'audit-planning',
                component: AuditPlanning
            },
            {
                name: 'audit.company-details',
                path: 'company-details',
                component: AuditCompanyDetails
            },
            {
                name: 'audit.lead-schedules',
                path: 'lead-schedules',
                component: LeadSchedules
            },
        ]
    },
]
