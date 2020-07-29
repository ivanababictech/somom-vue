import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import qs from 'qs'

/**
 * Get tax codes
 *
 * @returns {*}
 */
export const get = () => http.get('/settings/tax-codes').then(getData)

/**
 * Find tax code by id
 *
 * @param taxCodeId
 * @returns {*}
 */
export const find = (taxCodeId) => http.get('/settings/tax-codes/' + taxCodeId).then(getData)

/**
 * Create the new tax code
 *
 * @param taxCode
 * @returns {*}
 */
export const create = (taxCode) => http.post('/settings/tax-codes/', taxCode).then(getData)

/**
 * Update the tax code
 *
 * @param taxCode
 * @returns {*}
 */
export const update = (taxCode) => http.put('/settings/tax-codes/' + taxCode.id, taxCode).then(getData)

/**
 * Delete tax code
 *
 * @param taxCode
 * @returns {*}
 */
export const destroy = (taxCode) => http.delete('/settings/tax-codes/' + taxCode.id).then(getData)