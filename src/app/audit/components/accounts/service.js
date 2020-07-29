// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import vm from '@/main'

/**
 * Get Audit accounts
 *
 * @returns {*}
 */
export const getAccounts = () => {
    const {audit_id} = vm.$route.params

    return http.get('/audits/' + audit_id + '/accounts' ).then(getData)
}

/**
 * Create new opening balances
 *
 * @param balances
 * @returns {*}
 */
export const create = (balances) => {
    const {audit_id} = vm.$route.params

    return http.post('/audits/' + audit_id + '/accounts', balances)
        .then(({data}) => {
            vm.$store.commit('accounting/toggleDialog', 'balances')
            vm.$store.dispatch('audit/addOrUpdateAccounts', data.data)
            vm.$store.dispatch('setMessage', {type: 'success', message: data.message})

            return getData(data)
        })
}

/**
 * Update the account
 */
export const update = (account) => {
    if (!account) {
        throw 'The account data is mising: ' + account
    }

    const {audit_id} = vm.$route.params

    return http.put('audits/' + audit_id + '/accounts/' + account.id, account).then(response => {
        vm.$store.dispatch('audit/addOrUpdateAccount', response.data.data)

        vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

        return getData(response)
    })
}

/**
 * Update the account
 */
export const remove = (account) => {
    const {audit_id} = vm.$route.params

    return http.delete('audits/' + audit_id + '/accounts/' + account.id).then(response => {
        vm.$store.dispatch('audit/addOrUpdateAccount', response.data.data)

        vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

        return getData(response)
    })
}



