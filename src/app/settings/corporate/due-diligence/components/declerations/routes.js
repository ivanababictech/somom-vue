const decleration = r => require.ensure([], () => r(require('./main')), 'due-diligence-declerations-bundle');
const declerationCreate = r => require.ensure([], () => r(require('./components/create')), 'due-diligence-declerations-bundle');
const declerationEdit = r => require.ensure([], () => r(require('./components/edit')), 'due-diligence-declerations-bundle');

let parent = 'corporate/due-diligence';

export default [
    {
        path: `${parent}/declerations`,
        name: `due-diligence.declerations`,
        component: decleration,
    },
    {
        path: `${parent}/declerations/create`,
        name: `due-diligence.declerations.create`,
        component: declerationCreate,
    },
    {
        path: `${parent}/declerations/:declerationId/edit`,
        name: `due-diligence.declerations.edit`,
        component: declerationEdit,
    }
]
