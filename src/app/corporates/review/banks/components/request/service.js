// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import qs from 'qs'
import vm from '@/main'

/**
 *
 * Get bank requests
 *
 * @param accountId
 * @param params
 * @returns {*}
 */
export const get = (accountId, params) => {
    const {corporate_id} = vm.$route.params

    return http.get('/corporates/' + corporate_id + '/accounts/' + accountId + '/bank-requests', {
            params: {...params},
            paramsSerializer(params) {
                return qs.stringify(params)
            }
        })
        .then(getData)
};

/**
 * Create the new request
 *
 * @returns {*}
 * @param accountId
 * @param request
 */
export const create = (accountId, request) => {
    const {corporate_id} = vm.$route.params

    return http.post('/corporates/' + corporate_id + '/accounts/' + accountId + '/bank-requests', request)
        .then(getData)
};

/**
 * Reply request
 *
 * @returns {*}
 * @param accountId
 * @param bankRequest
 */
export const reply = (accountId, bankRequest) => {
    const {corporate_id} = vm.$route.params

    return http.post('/corporates/' + corporate_id + '/accounts/' + accountId + '/bank-requests/' + bankRequest.id + '/reply', bankRequest)
        .then(getData)
};

/**
 * Approve bank request
 *
 * @returns {*}
 * @param accountId
 * @param bankRequestId
 * @param status
 */
export const setStatus = (accountId, bankRequestId, status) => {
    const {corporate_id} = vm.$route.params

    return http.put('/corporates/' + corporate_id + '/accounts/' + accountId + '/bank-requests/' + bankRequestId + '/status/' + status)
        .then(getData)
};

/**
 * Resend bank request
 *
 * @returns {*}
 * @param accountId
 * @param bankRequestId
 */
export const resend = (accountId, bankRequestId) => {
    const {corporate_id} = vm.$route.params

    return http.post('/corporates/' + corporate_id + '/accounts/' + accountId + '/bank-requests/' + bankRequestId + '/resend')
        .then(getData)
};


/**
 * Get replies
 *
 * @returns {*}
 * @param accountId
 */
export const getReplies = (accountId) => {
    const {corporate_id} = vm.$route.params

    return http.get('/corporates/' + corporate_id + '/accounts/' + accountId + '/bank-requests/replies')
        .then(getData)
};

/**
 * Save suspense request as draft
 *
 * @returns {*}
 * @param accountId
 * @param bankRequestId
 */
export const getSuspenseRequestDraft = (accountId, bankRequestId) => {
    const {corporate_id} = vm.$route.params

    return http.get('/corporates/' + corporate_id + '/accounts/' + accountId + '/bank-requests/' + bankRequestId + '/draft')
        .then(getData)
};

/**
 * get  suspense request draft
 *
 * @returns {*}
 * @param accountId
 * @param bankRequest
 */
export const saveSuspenseRequestDraft = (accountId, bankRequest) => {
    const {corporate_id} = vm.$route.params

    return http.post('/corporates/' + corporate_id + '/accounts/' + accountId + '/bank-requests/' + bankRequest.id + '/draft', bankRequest)
        .then(getData)
};

/**
 * get  suspense request draft
 *
 * @returns {*}
 * @param accountId
 * @param bankRequestId
 * @param formData
 */
export const uploadFile = (accountId, bankRequestId, formData) => {
    const {corporate_id} = vm.$route.params

    return http.post('/corporates/' + corporate_id + '/accounts/' + accountId + '/bank-requests/' + bankRequestId + '/files', formData)
        .then(getData)
};

