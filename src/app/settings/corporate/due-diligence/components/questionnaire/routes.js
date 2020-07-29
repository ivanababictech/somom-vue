const DueDiligenceQuestions = r => require.ensure([], () => r(require('./main')), 'due-diligence-questionnaire-bundle');
const DueDiligenceQuestionsCreate = r => require.ensure([], () => r(require('./components/create')), 'due-diligence-questionnaire-bundle');
const DueDiligenceQuestionsEdit = r => require.ensure([], () => r(require('./components/edit')), 'due-diligence-questionnaire-bundle');

let parent = 'corporate/due-diligence';

export default [
    {
        path: `${parent}/questionnaire`,
        name: `due-diligence.questionnaire`,
        component: DueDiligenceQuestions,
    },
    {
        path: `${parent}/questionnaire/create`,
        name: `due-diligence.questionnaire.create`,
        component: DueDiligenceQuestionsCreate,
    },
    {
        path: `${parent}/questionnaire/:questionId/edit`,
        name: `due-diligence.questionnaire.edit`,
        component: DueDiligenceQuestionsEdit,
    }
]
