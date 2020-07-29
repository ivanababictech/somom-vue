// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import vm from '@/main'

/**
 * Create new donations
 */
export const create = (donations) => {
    const {accounting_id} = vm.$route.params

    return http.post('/accountings/' + accounting_id + '/donations', donations)
        .then(response => {
            vm.$bus.$emit('updated-accounts')

            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            return getData(response)
        })
}


