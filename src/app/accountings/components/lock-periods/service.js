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
    const {accounting_id} = vm.$route.params
    
    vm.$store.dispatch('setFetching', { fetching: true })

    return http.post('/accountings/' + accounting_id + '/lock-periods', lockPeriod)
        .then(response => {
            vm.$store.dispatch('setFetching', { fetching: false })
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            return getData(response)
        })
}

/**
 * Get accounting lock periods
 *
 * @param params
 * @returns {*}
 */
export const getLockPeriods = (params) => {
    const {accounting_id} = vm.$route.params
    
    vm.$store.dispatch('setFetching', { fetching: true })

    return http.get('/accountings/' + accounting_id + '/lock-periods', {params})
        .then(response => {
            vm.$store.dispatch('setFetching', { fetching: false })

            return getData(response)
        })
}

/**
 * Switch to the next year
 *
 * @param type
 * @returns {*}
 */
export const switchNextYear = (type) => {
    const {accounting_id} = vm.$route.params

    vm.$store.dispatch('setFetching', { fetching: true })

    return http.post('/accountings/' + accounting_id + '/lock-periods/switch-next-year', {type})
        .then(response => {
            vm.$store.dispatch('setFetching', { fetching: false })
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            return getData(response)
        })
}

/**
 * Lock the period
 *
 * @param lockPeriod
 * @returns {*}
 */
export const lock = (lockPeriod) => {
    const {accounting_id} = vm.$route.params

    vm.$store.dispatch('setFetching', { fetching: true })

    return http.post('/accountings/' + accounting_id + '/lock-periods/' + lockPeriod.id + '/lock')
        .then(response => {
            vm.$store.commit('accounting/updateFirstLockPeriod', response.data.data)
            vm.$store.dispatch('setFetching', { fetching: false })
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

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
    const {accounting_id} = vm.$route.params

    vm.$store.dispatch('setFetching', { fetching: true })

    return http.post('/accountings/' + accounting_id + '/lock-periods/' + lockPeriod.id + '/unlock')
        .then(response => {
            vm.$store.commit('accounting/updateFirstLockPeriod', response.data.data)
            vm.$store.dispatch('setFetching', { fetching: false })
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

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
    const {accounting_id} = vm.$route.params

    vm.$store.dispatch('setFetching', { fetching: true })

    return http.put('/accountings/' + accounting_id + '/lock-periods/' + lockPeriod.id, lockPeriod)
        .then(response => {
            vm.$store.commit('accounting/updateFirstLockPeriod', response.data.data)
            vm.$store.dispatch('setFetching', { fetching: false })
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

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
    const {accounting_id} = vm.$route.params

    vm.$store.dispatch('setFetching', { fetching: true })

    return http.post('/accountings/' + accounting_id + '/lock-periods/' + lockPeriodId + '/auditor-adjustments', {entries})
        .then(response => {
            vm.$store.dispatch('setFetching', { fetching: false })
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            return getData(response)
        })
}

/**
 * Create auditor adjustments
 *
 * @param lockPeriodId
 * @param params
 * @returns {*}
 */
export const getAuditorAdjustments = (lockPeriodId, params) => {
    const {accounting_id} = vm.$route.params

    vm.$store.dispatch('setFetching', { fetching: true })

    return http.get('/accountings/' + accounting_id + '/lock-periods/' + lockPeriodId + '/auditor-adjustments', {params})
        .then(response => {
            vm.$store.dispatch('setFetching', { fetching: false })

            return getData(response)
        })
}

/**
 *
 * Get total vats
 *
 * @returns {*}
 * @param lockPeriod
 */
export const totals = (lockPeriod) => {
    const {accounting_id} = vm.$route.params

    return http.get('/accountings/' + accounting_id + '/lock-periods/' + lockPeriod.id + '/totals').then(getData)
}

/**
 *
 * Get total vats
 *
 * @returns {*}
 */
export const existsVatPeriod = () => {
    const {accounting_id} = vm.$route.params

    return http.get('/accountings/' + accounting_id + '/lock-periods/existsVatPeriod').then(getData)
}

/**
 *
 * Get the first period
 *
 * @returns {*}
 */
export const firstPeriod = () => http.get('/accountings/' + accounting_id + '/lock-periods/first').then(getData)

/**
 *
 * Get transactions for vat code
 *
 * @param companyId
 * @param lockPeriod
 * @param params
 * @returns {*}
 */
export const getWorkings = (lockPeriod, params = []) => {
    const {accounting_id} = vm.$route.params

    vm.$store.dispatch('setFetching', { fetching: true })

    return http.get('/accountings/' + lockPeriod + '/vats/' + vat.id + '/transactions', {
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

