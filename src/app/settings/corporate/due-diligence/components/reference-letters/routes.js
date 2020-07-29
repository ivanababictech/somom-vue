const DueDiligenceQuestions = r => require.ensure([], () => r(require('./main')), 'due-diligence-reference-letters-bundle');

let parent = 'corporate/due-diligence';

export default [
    {
        path: `${parent}/reference-letters`,
        name: `due-diligence.reference-letters`,
        component: DueDiligenceQuestions,
    },
]
