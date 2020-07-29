/**
 * Components are lazy-loaded - See "Grouping Components in the Same Chunk"
 * http://router.vuejs.org/en/advanced/lazy-loading.html
 */
/* eslint-disable global-require */
const Questions = r => require.ensure([], () => r(require('./main')), 'questions-bundle')
const QuestionsCreate = r => require.ensure([], () => r(require('./components/create')), 'questions-bundle')
const QuestionsEdit = r => require.ensure([], () => r(require('./components/edit')), 'questions-bundle')

const meta = {
    requiresAuth: true,
}

let parent = 'corporate'

export default [
    {
        path: parent + '/questions',
        name: parent + '.questions',
        component: Questions,
        meta,
    },
    {
        path: parent + '/questions/create',
        name: parent +'.questions.create',
        component: QuestionsCreate,
        meta,
    },
    {
        path: parent + '/questions/:questionId/edit',
        name: parent + '.questions.edit',
        component: QuestionsEdit,
        meta,
    },
]
