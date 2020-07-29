import { http } from '@/plugins/http/index';
import { getData } from '@/utils/get';
import vm from "@/main";
const STATE_ENTRIES = 'corporateTypes';

/**
 * @returns {*}
 */
export const get = () => http.get('/settings/corporate-types').then(getData);

/**
 * @param corporateType
 * @returns {*}
 */
export const create = (corporateType) => http.post('/settings/corporate-types', corporateType)
    .then((response) => {
        vm.$store.dispatch('settings/addOrUpdateSettingsItem', {item: response.data.data, entries: STATE_ENTRIES});

        return getData(response)
    });

/**
 * @param corporateType
 * @returns {*}
 */
export const update = (corporateType) => http.put(`/settings/corporate-types/${corporateType.id}`, corporateType)
    .then((response) => {
        vm.$store.dispatch('settings/addOrUpdateSettingsItem', {item: response.data.data, entries: STATE_ENTRIES});

        return getData(response)
    });

/**
 * @param corporateType
 * @returns {*}
 */
export const destroy = (corporateType) => http.delete(`/settings/corporate-types/${corporateType.id}`)
    .then((response) => {
        vm.$store.commit('settings/removeSettingsItem', {id: corporateType.id, entries: STATE_ENTRIES});

        return getData(response)
    });