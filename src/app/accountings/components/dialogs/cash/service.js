// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import vm from '@/main'

/**
 * Create cash transaction
 */
export const create = (entries) => {
    const {accounting_id} = vm.$route.params

    return http.post('/accountings/' + accounting_id + '/cash-entries', {entries})
        .then(response => {
            vm.$store.commit('accounting/toggleDialog', 'cash_entries')
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            vm.$bus.$emit('updated-accounts')

            return getData(response)
        })
}




