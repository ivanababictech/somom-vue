/**
 * Components are lazy-loaded - See "Grouping Components in the Same Chunk"
 * http://router.vuejs.org/en/advanced/lazy-loading.html
 */
/* eslint-disable global-require */
const LetterTemplates = r => require.ensure([], () => r(require('./main')), 'letter-templates-bundle')
const LetterTemplatesCreate = r => require.ensure([], () => r(require('./components/create')), 'letter-templates-bundle')
const LetterTemplatesEdit = r => require.ensure([], () => r(require('./components/edit')), 'letter-templates-bundle')
const meta = {
    requiresAuth: true,
};

const parent = 'global';

export default [
    {
        path: parent + '/letter-templates',
        name: parent + '.letter-templates',
        component: LetterTemplates,
        meta,
    },
    {
        path: parent + '/letter-templates/create',
        name: parent + '.letter-templates.create',
        component: LetterTemplatesCreate,
        meta,
    },
    {
        path: parent + '/letter-templates/:letterTemplateId/edit',
        name: parent + '.letter-templates.edit',
        component: LetterTemplatesEdit,
        meta,
    },
]
