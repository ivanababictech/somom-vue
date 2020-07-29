import AuditSettings from '@/app/settings/audit/menu'
import Auditors from '@/app/settings/audit/auditors'
import AuditSections from '@/app/settings/audit/sections'
import Questions from '@/app/settings/audit/questions'
import AuditPlanningControlChecklist from './audit-planning-control-checklist/main'
import AuditArea from './audit-area/main'
import IndependenceQuestionnaire from './independence-questionnaire/main'
import GeneralRiskAssessment from './general-risk-assessment/main'
import Acceptance from './acceptance/main'
import PreliminaryAr from './preliminary-ar/main'
import IsReview from './is-review/main'
import ClientIdentification from './client-identification/main'

export default [
    {
        path: 'audit',
        name: 'AuditSettings',
        component: AuditSettings
    },
    {
        path: 'audit/auditors',
        name: 'Auditors',
        component: Auditors
    },
    {
        path: 'audit/sections',
        name: 'AuditSections',
        component: AuditSections
    },
    {
        path: 'audit/questions',
        name: 'Questions',
        component: Questions
    },
    {
        path: 'audit/audit-planning-control-checklist',
        name: 'AuditPlanningControlChecklist',
        component: AuditPlanningControlChecklist
    },
    {
        path: 'audit/audit-area',
        name: 'AuditArea',
        component: AuditArea
    },
    {
        path: 'audit/independence-questionnaire',
        name: 'IndependenceQuestionnaire',
        component: IndependenceQuestionnaire
    },
    {
        path: 'audit/general-risk-assessment',
        name: 'GeneralRiskAssessment',
        component: GeneralRiskAssessment
    },
    {
        path: 'audit/acceptance',
        name: 'Acceptance',
        component: Acceptance
    },
    {
        path: 'audit/preliminary-ar',
        name: 'PreliminaryAr',
        component: PreliminaryAr
    },
    {
        path: 'audit/is-review',
        name: 'IsReview',
        component: IsReview
    },
    {
        path: 'audit/client-identification',
        name: 'ClientIdentification',
        component: ClientIdentification
    },
]
