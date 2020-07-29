// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import qs from 'qs'
import vm from '@/main'

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

    let url = '/accountings/' + accounting_id + '/reports/fixed-assets/' + type + '/' + typeId + '/'

    switch (type) {
        case 'accounts':
            url += 'invoice-items';
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


