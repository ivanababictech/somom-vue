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
 * @param accountId
 * @param params
 * @returns {*}
 */
export const get = (accountId, params) => {
    const {accounting_id} = vm.$route.params
    vm.$store.dispatch('setFetching', {fetching: true })

    return http.get('/accountings/' + accounting_id + '/accounts/' + accountId + '/bank-requests', {
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
 * @returns {*}
 * @param accountId
 * @param request
 */
export const create = (accountId, request) => {
    const {accounting_id} = vm.$route.params

    return http.post('/accountings/' + accounting_id + '/accounts/' + accountId + '/bank-requests', request)
        .then(response => {
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            return getData(response)
        })
}

/**
 * Create new rules
 *
 * @returns {*}
 * @param accountId
 * @param reply
 */
export const reply = (accountId, reply) => {
    const {accounting_id} = vm.$route.params

    return http.post('/accountings/' + accounting_id + '/accounts/' + accountId + '/bank-requests/reply', reply)
        .then(response => {
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            return getData(response)
        })
}

/**
 * Update new rule
 *
 * @returns {*}
 * @param accountId
 * @param bankRequestId
 */
export const close = (accountId, bankRequestId) => {
    const {accounting_id} = vm.$route.params

    return http.put('/accountings/' + accounting_id + '/accounts/' + accountId + '/bank-requests/' + bankRequestId + '/close')
        .then(getData)
}

/**
 * Update new rule
 *
 * @returns {*}
 * @param accountId
 * @param bankRequestId
 */
export const open = (accountId, bankRequestId) => {
    const {accounting_id} = vm.$route.params

    return http.put('/accountings/' + accounting_id + '/accounts/' + accountId + '/bank-requests/' + bankRequestId + '/open')
        .then(getData)
}

/**
 * Create new rules
 *
 * @returns {*}
 * @param accountId
 * @param bankRequestId
 */
export const resend = (accountId, bankRequestId) => {
    const {accounting_id} = vm.$route.params

    return http.post('/accountings/' + accounting_id + '/accounts/' + accountId + '/bank-requests/' + bankRequestId + '/resend')
        .then(response => {
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            return getData(response)
        })
}



/**
 * Create new rules
 *
 * @returns {*}
 * @param accountId
 */
export const getReplies = (accountId) => {
    const {accounting_id} = vm.$route.params

    return http.get('/accountings/' + accounting_id + '/accounts/' + accountId + '/bank-requests/replies')
        .then(response => {
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            return getData(response)
        })
}

