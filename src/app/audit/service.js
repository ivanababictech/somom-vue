// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import qs from 'qs'
import vm from '@/main'


/**
 * Get audits
 *
 * @returns {*}
 */
export const getAudtids = () => {
    vm.$store.dispatch('setFetching', { fetching: true })

    return http.get('/audits')
        .then(response => {
            vm.$store.dispatch('setFetching', { fetching: false })

            return getData(response)
        })
}

/**
 * Get Audit data
 *
 * @returns {*}
 */
export const getAudit = () => {
    const {audit_id} = vm.$route.params

    return http.get('/audits/' + audit_id).then(({data}) => {
        vm.$store.dispatch('audit/init', data.data)

        return getData
    })
}

/**
 * Create new rules
 *
 * @param companyId
 * @param lockPeriod
 * @returns {*}
 */
export const create = (companyId, lockPeriod) => {
    vm.$store.dispatch('setFetching', { fetching: true })

    return http.post('/companies/' + companyId + '/lock-periods', lockPeriod)
        .then(response => {
            vm.$store.dispatch('setFetching', { fetching: false })
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            return getData(response)
        })
}
