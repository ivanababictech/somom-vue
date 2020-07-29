// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'

// get type documents
export const get = () => http.get('/settings/document-types').then(getData)

/**
 * Get the document types
 *
 * @param documentTypeId
 */
export const find = (documentTypeId) => http.get('/settings/document-types/' + documentTypeId).then(getData)

/**
 * Create the document type
 *
 * @param documentType
 * @returns {Promise<T>}
 */
export const create = (documentType) => http.post('/settings/document-types/', documentType).then(getData)

/**
 * Update the document type
 *
 * @param documentType
 * @returns {Promise<void>}
 */
export const update = (documentType) => http.put('/settings/document-types/' + documentType.id, documentType).then(getData)

/**
 * Delete the document type
 *
 * @param documentType
 */
export const remove = (documentType) => http.delete('/settings/document-types/' + documentType.id).then(getData)

/**
 * Delete the document type
 *
 * @param payload
 */
export const uploadImage = (payload) => http.post('/settings/document-types/images', payload).then(getData)

