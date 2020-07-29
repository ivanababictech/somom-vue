const DocumentTypes = r => require.ensure([], () => r(require('./main')), 'allocation-types-bundle')
const DocumentTypesCreate = r => require.ensure([], () => r(require('./components/create')), 'allocation-types-bundle')
const DocumentTypesEdit = r => require.ensure([], () => r(require('./components/edit')), 'allocation-types-bundle')

let parent = 'corporate'

export default [
    {
        path: parent + '/allocation-types',
        name: parent + '.allocation-types',
        component: DocumentTypes,
    },
    {
        path: parent + '/allocation-types/create',
        name: parent + '.allocation-types.create',
        component: DocumentTypesCreate,
    },
    {
        path: parent + '/allocation-types/:allocationTypeId/edit',
        name: parent + '.allocation-types.edit',
        component: DocumentTypesEdit,
    },
]
