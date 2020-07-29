import { http } from '@/plugins/http/index';
import { getData } from '@/utils/get';

/**
 * Get declerations
 */
export const get = () => http.get('settings/declerations')
    .then(getData);

/**
 * Get specific decleration by ID
 */
export const find = (declerationId) => http.get(`settings/declerations/${declerationId}`)
    .then(getData);

/**
 * Create new decleration
 */
export const create = (decleration) => http.post('settings/declerations/', decleration)
    .then(getData);

/**
 * Update decleration by given ID
 */
export const update = (decleration) => http.put(`settings/declerations/${decleration.id}`, decleration)
    .then(getData);

/**
 * Remove specific decleration by ID
 */
export const remove = (declerationId) => http.delete(`/settings/declerations/${declerationId}`)
    .then(getData);