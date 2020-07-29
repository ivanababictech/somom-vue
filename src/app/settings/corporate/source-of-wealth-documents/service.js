import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'

export const getSourceOfWealths = () => http.get('settings/wealth-sources')
    .then(getData);

export const getSourceOfWealthDocuments = () => http.get('/settings/source-of-wealth-documents')
    .then(getData);

export const create = (sourceOfWealth) => http.post('/settings/source-of-wealth-documents', sourceOfWealth)
    .then(getData);

export const update = (sourceOfWealth) => http.put(`/settings/source-of-wealth-documents/${sourceOfWealth.id}`, sourceOfWealth)
    .then(getData);

export const remove = (documentId) => http.delete(`/settings/source-of-wealth-documents/${documentId}`)
    .then(getData);

export const uploadFile = (formData) => http.post('files', formData)
    .then(getData);