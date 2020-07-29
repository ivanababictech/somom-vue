import { http } from '@/plugins/http/index';
import { getData } from '@/utils/get';
import vm from "@/main";

const STATE_ENTRIES = 'filtered_keywords';
/**
 * @returns {*}
 */
export const get = () => http.get('/settings/filtered-keywords').then(getData);

/**
 * @param filteredKeyword
 * @returns {*}
 */
export const create = (filteredKeyword) => http.post('/settings/filtered-keywords', filteredKeyword)
    .then((response) => {
        vm.$store.dispatch('settings/addOrUpdateSettingsItem', {item: response.data.data, entries: STATE_ENTRIES});

        return getData(response)
    });

/**
 * @param filteredKeyword
 * @returns {*}
 */
export const update = (filteredKeyword) => http.put(`/settings/filtered-keywords/${filteredKeyword.id}`, filteredKeyword)
    .then((response) => {
        vm.$store.dispatch('settings/addOrUpdateSettingsItem', {item: response.data.data, entries: STATE_ENTRIES});

        return getData(response)
    });

/**
 * @param filteredKeyword
 * @returns {*}
 */
export const destroy = (filteredKeyword) => http.delete(`/settings/filtered-keywords/${filteredKeyword.id}`)
    .then((response) => {
        vm.$store.commit('settings/removeSettingsItem', {item: filteredKeyword.id, entries: STATE_ENTRIES});

        return getData(response)
    });