// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import vm from '@/main'

// get companies
export const get = (params = {}) => {
    vm.$store.dispatch('setFetching', { fetching: true })

    return http.get('/companies', params)
        .then(response => {
            vm.$store.dispatch('setFetching', { fetching: false })

            return getData(response)
        })
}

// get bankers
export const getBankers = () => http.get('/settings/bankers').then(getData)

// get Non Accounted Companies
export const getNonAccountedCompanies = () => http.get('/companies?accounted=0').then(getData)

// get Non Audited Companies
export const getNonAuditedCompanies = () => http.get('/companies?audited=0').then(getData)

// get Non Corporated Companies
export const getNonCorporatedCompanies = () => http.get('/companies?corporated=0').then(getData)

/**
 * Get the companies
 *
 * @param companyId
 */
export const find = (companyId) => http.get('/companies/' + companyId).then(getData)

/**
 * Create the company
 *
 * @param company
 * @returns {Promise<T>}
 */
export const create = (company) => http.post('/companies/', company).then(getData)

/**
 * Update the company
 *
 * @param company
 * @returns {Promise<void>}
 */
export const update = (company) => {
    vm.$store.dispatch('setFetching', { fetching: true })

    return http.put('/companies/' + company.id, company).then(response => {
        vm.$store.commit('accounting/updateCompany', response.data.data)

        vm.$store.dispatch('setFetching', { fetching: false })
        vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

        return getData(response)
    })
}

/**
 * Delete the company
 *
 * @param company
 */
export const remove = (company) => {
    vm.$store.dispatch('setFetching', { fetching: true })

    return http.delete('/companies/' + company.id)
        .then(response => {
            vm.$store.dispatch('setFetching', { fetching: false })
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            return getData(response)
        })
}

