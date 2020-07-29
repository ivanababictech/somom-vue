// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import qs from 'qs'
import vm from '@/main'

/**
 * Cet accounts for nominal activity
 *
 * @param params
 */
export const getAccounts = (params) => {
    const {corporate_id} = vm.$route.params

    return http.get('/corporates/' + corporate_id + '/accounts/', {
            params: {...params},
            paramsSerializer(params) {
                return qs.stringify(params)
            }
        })
        .then(getData)
}

/**
 * Cet transactions by account id
 *
 * @param accountId
 * @param params
 */
export const getTransactions = (accountId, params) => {
    const {corporate_id} = vm.$route.params

    return http.get('/corporates/' + corporate_id + '/accounts/' + accountId + '/transactions', {
            params: {...params},
            paramsSerializer(params) {
                return qs.stringify(params)
            }
        })
        .then(getData)
}

/**
 *
 * Export Report data
 *
 * @param params
 */
export const exportReport = (params) => {
    const {corporate_id} = vm.$route.params

    return http.get('/corporates/' + corporate_id + '/accounts/export', {
            responseType: 'blob',
            params: {...params},
            paramsSerializer(params) {
                return qs.stringify(params)
            }
        })
        .then(response => {
            vm.$store.dispatch('downloadFile', response)

            return getData(response)
        })
}
