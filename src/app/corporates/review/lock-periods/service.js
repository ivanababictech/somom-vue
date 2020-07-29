// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import qs from 'qs'
import vm from '@/main'


/**
 * Create new rules
 *
 * @param lockPeriod
 * @returns {*}
 */
export const create = (lockPeriod) => {
    const {corporate_id} = vm.$route.params

    return http.post('/corporates/' + corporate_id + '/lock-periods', lockPeriod).then(getData)
}

/**
 * Get corporates lock periods
 *
 * @param params
 * @returns {*}
 */
export const getLockPeriods = (params) => {
    const {corporate_id} = vm.$route.params

    return http.get('/corporates/' + corporate_id + '/lock-periods', {params}).then(getData)
}

/**
 * Switch to the next year
 *
 * @param type
 * @returns {*}
 */
export const switchNextYear = (type) => {
    const {corporate_id} = vm.$route.params

    return http.post('/corporates/' + corporate_id + '/lock-periods/switch-next-year', {type}).then(getData)
}

/**
 * Lock the period
 *
 * @param lockPeriod
 * @returns {*}
 */
export const lock = (lockPeriod) => {
    const {corporate_id} = vm.$route.params

    return http.post('/corporates/' + corporate_id + '/lock-periods/' + lockPeriod.id + '/lock')
        .then(response => {
            vm.$store.commit('corporate/updateFirstLockPeriod', response.data.data)

            return getData(response)
        })
}

/**
 * Unock the period
 *
 * @param lockPeriod
 * @returns {*}
 */
export const unlock = (lockPeriod) => {
    const {corporate_id} = vm.$route.params

    return http.post('/corporates/' + corporate_id + '/lock-periods/' + lockPeriod.id + '/unlock')
        .then(response => {
            vm.$store.commit('corporate/updateFirstLockPeriod', response.data.data)

            return getData(response)
        })
}

/**
 * Update the lock period
 *
 * @param lockPeriod
 * @returns {*}
 */
export const update = (lockPeriod) => {
    const {corporate_id} = vm.$route.params

    return http.put('/corporates/' + corporate_id + '/lock-periods/' + lockPeriod.id, lockPeriod)
        .then(response => {
            vm.$store.commit('corporate/updateFirstLockPeriod', response.data.data)

            return getData(response)
        })
}

/**
 * Create auditor adjustments
 *
 * @param lockPeriodId
 * @param entries
 * @returns {*}
 */
export const storeAuditorAdjustments = (lockPeriodId, entries) => {
    const {corporate_id} = vm.$route.params

    return http.post('/corporates/' + corporate_id + '/lock-periods/' + lockPeriodId + '/auditor-adjustments', {entries})
        .then(getData)
}

/**
 * Create auditor adjustments
 *
 * @param lockPeriodId
 * @param params
 * @returns {*}
 */
export const getAuditorAdjustments = (lockPeriodId, params) => {
    const {corporate_id} = vm.$route.params

    return http.get('/corporates/' + corporate_id + '/lock-periods/' + lockPeriodId + '/auditor-adjustments', {params})
        .then(getData)
}

/**
 *
 * Get total vats
 *
 * @returns {*}
 * @param lockPeriod
 */
export const totals = (lockPeriod) => {
    const {corporate_id} = vm.$route.params

    return http.get('/corporates/' + corporate_id + '/lock-periods/' + lockPeriod.id + '/totals').then(getData)
}

/**
 *
 * Get total vats
 *
 * @returns {*}
 */
export const existsVatPeriod = () => {
    const {corporate_id} = vm.$route.params

    return http.get('/corporates/' + corporate_id + '/lock-periods/existsVatPeriod').then(getData)
}

/**
 *
 * Get the first period
 *
 * @returns {*}
 */
export const firstPeriod = () => http.get('/corporates/' + corporate_id + '/lock-periods/first').then(getData)

/**
 *
 * Get transactions for vat code
 *
 * @param lockPeriod
 * @param params
 * @returns {*}
 */
export const getWorkings = (lockPeriod, params = []) => {
    const {corporate_id} = vm.$route.params

    return http.get('/corporates/' + lockPeriod + '/vats/' + vat.id + '/transactions', {
            params: {...params},
            paramsSerializer(params) {
                return qs.stringify(params)
            }
        })
        .then(getData)
}

