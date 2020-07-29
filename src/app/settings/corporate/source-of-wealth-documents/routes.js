
const SourceOfWealthDocuments = r => require.ensure([], () => r(require('./main')), 'source-of-wealth-documents-bundle')
const SourceOfWealthDocumentsCreate = r => require.ensure([], () => r(require('./components/create')), 'source-of-wealth-documents-bundle')
const SourceOfWealthDocumentsEdit = r => require.ensure([], () => r(require('./components/edit')), 'source-of-wealth-documents-bundle')

const parent = 'corporate';

export default [
    {
        path: `${parent}/source-of-wealth-documents`,
        name: `${parent}.source-of-wealth-documents`,
        component: SourceOfWealthDocuments,
    },
    {
        path: `${parent}/source-of-wealth-documents/create`,
        name: `${parent}.source-of-wealth-documents.create`,
        component: SourceOfWealthDocumentsCreate,
    },
    {
        path: `${parent}/source-of-wealth-documents/:documentId/edit`,
        name: `${parent}.source-of-wealth-documents.edit`,
        component: SourceOfWealthDocumentsEdit,
    },
]
