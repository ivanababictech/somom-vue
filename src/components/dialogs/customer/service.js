// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import vm from '@/main'

/**
 * Create a customer
 */
export const create = (customer) => {
    const {accounting_id} = vm.$route.params

    return http.post('/accountings/' + accounting_id + '/customers', customer)
        .then(response => {
            vm.$store.dispatch('accounting/addOrUpdateCustomer', response.data.data)
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            return getData(response)
        })
}

/**
 * Update the customer
 */
export const update = (customer) => {
    const {accounting_id} = vm.$route.params

    return http.put('/accountings/' + accounting_id + '/customers/' + customer.id, customer)
        .then(response => {
            vm.$store.dispatch('accounting/addOrUpdateCustomer', response.data.data)
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            return getData(response)
        })
}


