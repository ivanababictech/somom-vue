import { http } from '@/plugins/http/index';
import { getData } from '@/utils/get';
import vm from "@/main";
const STATE_ENTRIES = 'corporate_payment_methods';

/**
 * @returns {*}
 */
export const get = () => http.get('/settings/payment-methods').then(getData);

/**
 * @param paymentMethod
 * @returns {*}
 */
export const create = (paymentMethod) => http.post('/settings/payment-methods', paymentMethod)
    .then((response) => {
        vm.$store.dispatch('settings/addOrUpdateSettingsItem', {item: response.data.data, entries: STATE_ENTRIES});

        return getData(response)
    });

/**
 * @param paymentMethod
 * @returns {*}
 */
export const update = (paymentMethod) => http.put(`/settings/payment-methods/${paymentMethod.id}`, paymentMethod)
    .then((response) => {
        vm.$store.dispatch('settings/addOrUpdateSettingsItem', {item: response.data.data, entries: STATE_ENTRIES});

        return getData(response)
    });

/**
 * @param paymentMethod
 * @returns {*}
 */
export const destroy = (paymentMethod) => http.delete(`/settings/payment-methods/${paymentMethod.id}`)
    .then((response) => {
        vm.$store.commit('settings/removeSettingsItem', {id: paymentMethod.id, entries: STATE_ENTRIES});

        return getData(response)
    });