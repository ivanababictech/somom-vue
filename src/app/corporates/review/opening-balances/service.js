// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import vm from '@/main'

export const getOpeningBalances = (type, id = '') => {
    const {corporate_id} = vm.$route.params

    return http.get('/corporates/' + corporate_id + '/opening-balances').then(getData)
}

/**
 * Create balance account
 */
export const create = (balances) => {
    const {corporate_id} = vm.$route.params

    return http.post('/corporates/' + corporate_id + '/accounts', balances)
        .then(response => {
            vm.$store.commit('accounting/toggleDialog', 'balances')
            // remove old accounts
            response.data.data.latestIds.forEach(id => {
                vm.$store.commit('corporate/removeAccount', id)
            })
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            vm.$store.dispatch('corporate/addOrUpdateAccounts', response.data.data.accounts)

            return getData(response)
        })
}

/**
 * Update balance account
 */
export const update = (account) => {
    const {corporate_id} = vm.$route.params

    return http.post(`/corporates/'${corporate_id}/accounts/${account.id}`, account)
        .then(response => {
            vm.$store.commit('accounting/toggleDialog', 'balances')
            // remove old accounts
            response.data.data.latestIds.forEach(id => {
                vm.$store.commit('accounting/removeAccount', id)
            })
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            vm.$bus.$emit('updated-accounts')

            return getData(response)
        })
}

/**
 * Get the submitted records
 *
 * @returns {*}
 */
export const getLatestRecords = () => {
    const {corporate_id} = vm.$route.params

    return http.get('/corporates/' + corporate_id + '/accounts/latest').then(getData);
}

/**
 * Get the submitted records
 *
 * @returns {*}
 */
export const getDraft = () => {
    const {corporate_id} = vm.$route.params

    return http.get('/corporates/' + corporate_id + '/accounts/drafts').then(getData);
}
