import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'

/**
 *
 * @param title
 * @returns {*}
 */
export const createSettings = (title) => http.post('/settings/corporate-settings', {title})
    .then(getData)

/**
 *
 * @returns {*}
 */
export const getSettings = () => http.get('/settings/corporate-settings')
    .then(getData)

/**
 *
 * @param corporateSettingId
 * @returns {*}
 */
export const removeCorporateSettings = (corporateSettingId) => http.delete('/settings/corporate-settings/' + corporateSettingId)
    .then(getData)

/**
 *
 * @param corporateSettingId
 * @returns {*}
 */
export const getCorporateSettingsById = (corporateSettingId) => http.get('/settings/corporate-settings/' + corporateSettingId + '/get')
    .then(getData)

/**
 *
 * @param corporateSetting
 * @returns {*}
 */
export const updateSettings = (corporateSetting) => http.put('/settings/corporate-settings/' + corporateSetting.id + '/update', corporateSetting)
    .then(getData)

/**
 *
 * @param corporateSettingId
 * @param item
 * @returns {*}
 */
export const createSettingsItem = (corporateSettingId, item) => http.post('/settings/corporate-settings-items/' + corporateSettingId, item)
    .then(getData)

/**
 *
 * @param corporateSettingId
 * @returns {*}
 */
export const getSettingItems = (corporateSettingId) => http.get('/settings/corporate-settings-items/' + corporateSettingId)
    .then(getData)

/**
 *
 * @param corporateSettingItemId
 * @returns {*}
 */
export const getSettingItemById = (corporateSettingItemId) => http.get('/settings/corporate-settings-items/' + corporateSettingItemId + '/get')
    .then(getData)

/**
 *
 * @param corporateSettingItemId
 * @param item
 * @returns {*}
 */
export const updateSettingsItem = (corporateSettingItemId, item) => http.put('/settings/corporate-settings-items/' + corporateSettingItemId, item)
    .then(getData)

/**
 *
 * @param corporateSettingItemId
 * @returns {*}
 */
export const removeSettingsItem = (corporateSettingItemId) => http.delete('/settings/corporate-settings-items/' + corporateSettingItemId)
    .then(getData);


export const updateIncludeInCol = (setting) => http.put(`settings/corporate-settings-items/${setting.id}/include-in-col`)
    .then(getData);