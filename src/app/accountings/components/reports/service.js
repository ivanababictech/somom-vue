// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import qs from 'qs'
import vm from '@/main'

/**
 * Get reports by params
 */
export const getReports = (type, params) => {
    const {accounting_id} = vm.$route.params

    vm.$store.dispatch('setFetching', { fetching: true })

    return http.get('/accountings/' + accounting_id + '/reports/' + type, {
            params: {...params},
            paramsSerializer(params) {
                return qs.stringify(params)
            }
        })
        .then(response => {
            vm.$store.dispatch('setFetching', { fetching: false })

            return getData(response)
        })
}

/**
 *
 * Export Report data
 *
 * @param type
 * @param params
 */
export const exportReport = (type, params) => {
    const {accounting_id} = vm.$route.params

    vm.$store.dispatch('setFetching', { fetching: true })

    return http.get('/accountings/' + accounting_id + '/reports/' + type + '/export', {
        responseType: 'blob',
        params: {...params},
        paramsSerializer(params) {
            return qs.stringify(params)
        }
    })
        .then(response => {
            vm.$store.dispatch('downloadFile', response)
            vm.$store.dispatch('setFetching', { fetching: false })

            return getData(response)
        })
}


