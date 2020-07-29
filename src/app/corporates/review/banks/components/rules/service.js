// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import qs from 'qs'
import vm from '@/main'

/**
 *
 * Get rules by accounting
 *
 * @param params
 * @param all
 * @returns {*}
 */
export const get = (params, all = false) => {
    const {corporate_id} = vm.$route.params

    return http.get('/corporates/' + corporate_id + '/rules' + (all ? '/all' : ''), {
            params: {...params},
            paramsSerializer(params) {
                return qs.stringify(params)
            }
        })
        .then(getData)
}

/**
 * Create new rules
 *
 * @param entries
 * @returns {*}
 */
export const create = (entries) => {
    const {corporate_id} = vm.$route.params

    return http.post('/corporates/' + corporate_id + '/rules', { entries })
        .then(getData)
}

/**
 * Update new rule
 *
 * @param rule
 * @returns {*}
 */
export const update = (rule) => {
    const {corporate_id} = vm.$route.params

    return http.put('/corporates/' + corporate_id + '/rules/' + rule.id, rule)
        .then(getData)
}

/**
 * Remove new rule
 *
 * @param rule
 * @returns {*}
 */
export const remove = (rule) => {
    const {corporate_id} = vm.$route.params

    return http.delete('/corporates/' + corporate_id + '/rules/' + rule.id)
        .then(getData)
}

/**
 * Update materiality rule
 *
 * @param rule
 * @returns {*}
 */
export const updateMateriality = (rule) => {
    const {corporate_id} = vm.$route.params

    return http.post('/corporates/' + corporate_id + '/materiality-rule', rule)
        .then(response => {
            vm.$store.commit('corporate/updateMaterialityRule', response.data.data)

            return getData(response)
        })
}

