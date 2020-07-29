/**
 * Components are lazy-loaded - See "Grouping Components in the Same Chunk"
 * http://router.vuejs.org/en/advanced/lazy-loading.html
 */
/* eslint-disable global-require */
const Assignments = r => require.ensure([], () => r(require('./main')), 'assignments-bundle')
const AssignmentItem = r => require.ensure([], () => r(require('./student/assignment/')), 'assignments-bundle')

const meta = {
    requiresAuth: true,
}

const parent = 'corporate.'

export default [
    {
        path: 'assignments',
        name: parent + 'assignments',
        component: Assignments,
        meta,
    },
    {
        path: 'assignments/:assignmentId',
        name: parent + 'assignment.item',
        component: AssignmentItem,
        meta,
    },
]
