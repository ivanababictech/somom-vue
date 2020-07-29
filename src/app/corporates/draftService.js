import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import vm from '@/main'

export const TYPE_CHEQUES_ACCOUNTS = 'cheque_accounts';
export const TYPE_INVENTORIES = 'inventories';
export const TYPE_ASSET_REGISTRARS = 'asset_registrars';

/**
 * Save as draft
 *
 * @param data
 * @param type
 * @param id
 * @returns {*}
 */
export const createAsDraft = (data, type, id = null) => {
    const {corporate_id} = vm.$route.params

    return http.post('/corporates/' + corporate_id + '/drafts/' + type, {data: data, id: id})
        .then((response) => {
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            return getData(response)
        });
}

/**
 * Get draft
 *
 * @param type
 * @param id
 * @returns {*}
 */
export const getDraft = (type, id='') => {
    const {corporate_id} = vm.$route.params

    return http.get('/corporates/' + corporate_id + '/drafts/' + type + '/' + id).then(getData);
}