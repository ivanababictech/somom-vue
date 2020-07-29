// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import vm from '@/main'
import qs from 'qs'

/**
 * Get charter of accounts
 *
 * @param params
 * @returns {*}
 */
export const getCharterOfAccounts = (params) => {
    const {accounting_id} = vm.$route.params

    return http.get('/accountings/' + accounting_id + '/charter-of-accounts', {params}).then(getData)
}

/**
 * Archive account
 *
 * @param account
 * @returns {*}
 */
export const archive = (account) => {
    const {accounting_id} = vm.$route.params

    vm.$store.dispatch('setFetching', { fetching: true })

    return http.patch('/accountings/' + accounting_id + '/accounts/' + account.id + '/archive')
        .then(response => {
            vm.$store.dispatch('setFetching', { fetching: false })
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            return getData(response)
        })
}
