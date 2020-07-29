// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import qs from 'qs'
import vm from '@/main'

/**
 * Get items by type
 */
export const getItems = (typeId, type) => {
    const {accounting_id} = vm.$route.params
    vm.$store.dispatch('setFetching', { fetching: true })

    return http.get('/accountings/' + accounting_id + '/' + type + '/' + typeId + '/items')
        .then(response => {
            vm.$store.dispatch('setFetching', { fetching: false })

            return getData(response)
        })
}


