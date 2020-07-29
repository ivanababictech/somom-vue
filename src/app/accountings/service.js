// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import qs from 'qs'
import vm from '@/main'


/**
 * Get accountings
 *
 * @returns {*}
 */
export const getAccountings = () => {
    vm.$store.dispatch('setFetching', { fetching: true })

    return http.get('/accountings')
        .then(response => {
            vm.$store.dispatch('setFetching', { fetching: false })

            return getData(response)
        })
}

/**
 * Create new accounting
 *
 * @param companyId
 * @param lockPeriod
 * @returns {*}
 */
export const create = (companyId, lockPeriod) => {
    vm.$store.dispatch('setFetching', { fetching: true })

    return http.post('/accountings/' + companyId + '/lock-periods', lockPeriod)
        .then(response => {
            vm.$store.dispatch('setFetching', { fetching: false })
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            return getData(response)
        })
}
