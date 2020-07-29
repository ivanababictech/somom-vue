const DueDiligence = r => require.ensure([], () => r(require('./main')), 'corporate-due-diligence-bundle');
import {routes as DueDiligenceQuestionnaire} from './components/questionnaire/';
import {routes as Declerations} from './components/declerations';
import {routes as ReferenceLetters} from './components/reference-letters';

let parent = 'corporate';

export default [
    {
        path: `${parent}/due-diligence`,
        name: `${parent}.due-diligence`,
        component: DueDiligence,
    },
].concat(DueDiligenceQuestionnaire)
.concat(Declerations)
.concat(ReferenceLetters)
