import { http } from '@/plugins/http/index';
import { getData } from '@/utils/get';
import vm from "@/main";
const STATE_ENTRIES = 'bank_request_reasons';

/**
 * @returns {*}
 */
export const get = () => http.get('/settings/bank-request-reasons').then(getData);

/**
 * @param bankRequestReason
 * @returns {*}
 */
export const create = (bankRequestReason) => http.post('/settings/bank-request-reasons', bankRequestReason)
    .then((response) => {
        vm.$store.dispatch('settings/addOrUpdateSettingsItem', {item: response.data.data, entries: STATE_ENTRIES});

        return getData(response)
    });

/**
 * @param bankRequestReason
 * @returns {*}
 */
export const update = (bankRequestReason) => http.put(`/settings/bank-request-reasons/${bankRequestReason.id}`, bankRequestReason)
    .then((response) => {
        vm.$store.dispatch('settings/addOrUpdateSettingsItem', {item: response.data.data, entries: STATE_ENTRIES});

        return getData(response)
    });

/**
 * @param bankRequestReason
 * @returns {*}
 */
export const destroy = (bankRequestReason) => http.delete(`/settings/bank-request-reasons/${bankRequestReason.id}`)
    .then((response) => {
        vm.$store.commit('settings/removeSettingsItem', {item: bankRequestReason.id, entries: STATE_ENTRIES});

        return getData(response)
    });