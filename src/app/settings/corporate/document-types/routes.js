const DocumentTypes = r => require.ensure([], () => r(require('./main')), 'document-types-bundle')
const DocumentTypesCreate = r => require.ensure([], () => r(require('./components/create')), 'document-types-bundle')
const DocumentTypesEdit = r => require.ensure([], () => r(require('./components/edit')), 'document-types-bundle')

let parent = 'corporate'

export default [
    {
        path: parent + '/document-types',
        name: parent + '.document-types',
        component: DocumentTypes,
    },
    {
        path: parent + '/document-types/create',
        name: parent + '.document-types.create',
        component: DocumentTypesCreate,
    },
    {
        path: parent + '/document-types/:documentTypeId/edit',
        name: parent + '.document-types.edit',
        component: DocumentTypesEdit,
    },
]
