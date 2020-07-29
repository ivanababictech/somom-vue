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
    const {accounting_id} = vm.$route.params

    return http.get('/accountings/' + accounting_id + '/rules' + (all ? '/all' : ''), {
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
    const {accounting_id} = vm.$route.params

    return http.post('/accountings/' + accounting_id + '/rules', { entries })
        .then(getData)
}

/**
 * Update new rule
 *
 * @param rule
 * @returns {*}
 */
export const update = (rule) => {
    const {accounting_id} = vm.$route.params

    return http.put('/accountings/' + accounting_id + '/rules/' + rule.id, rule)
        .then(getData)
}

/**
 * Remove new rule
 *
 * @param rule
 * @returns {*}
 */
export const remove = (rule) => {
    const {accounting_id} = vm.$route.params

    return http.delete('/accountings/' + accounting_id + '/rules/' + rule.id)
        .then(getData)
}

