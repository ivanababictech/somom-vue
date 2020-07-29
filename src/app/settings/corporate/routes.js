import CorporateMenu from './menu'
import { routes as documentTypes } from './document-types'
import { routes as questions } from './questions'
import { routes as corporateSettings } from './corporate-settings';
import { routes as sourceOfWealthDocuments } from './source-of-wealth-documents';
import { routes as approvalQuestions } from './approval-questions';
import { routes as companyProfile } from './company-profile';
import { routes as dueDiligence } from './due-diligence';
import { routes as reviews } from './reviews';

export default [
    {
        path: 'corporate',
        name: 'settings.corporate',
        component: CorporateMenu,
    },
    ...documentTypes,
    ...questions,
    ...corporateSettings,
    ...sourceOfWealthDocuments,
    ...approvalQuestions,
    ...companyProfile,
    ...reviews,
    ...dueDiligence
]
