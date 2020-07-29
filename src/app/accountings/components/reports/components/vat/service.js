// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import qs from 'qs'
import vm from '@/main'

/**
 * Get vat reports by type
 *
 * @param type
 * @param params
 */
export const getVatReports = (type, params = []) => {
    const {accounting_id} = vm.$route.params

    vm.$store.dispatch('setFetching', { fetching: true })

    return http.get('/accountings/' + accounting_id + '/reports/vat?type=' + type, {
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

    return http.get('/accountings/' + accounting_id + '/reports/vat/export?type=' + type, {
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

/**
 *
 * Get items by type
 *
 * @param typeId
 * @param type
 * @param params
 */
export const getItems = (typeId, type, params) => {
    const {accounting_id} = vm.$route.params

    let url = '/accountings/' + accounting_id + '/reports/vat/' + type + '/' + typeId + '/'

    switch (type) {
        case 'vat-codes':
        case 'countries':
            url += 'invoice-items';
            break;
        case 'inventories':
        case 'customers':
            url += 'invoices';
            break;
    }


    vm.$store.dispatch('setFetching', { fetching: true })

    return http.get(url, {
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


