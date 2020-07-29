// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import vm from "@/main";

/**
 * Get banks
 */
export const get = () => {
    const {accounting_id} = vm.$route.params
    
    return http.get('/accountings/' + accounting_id + '/banks').then(getData)
}

/**
 * Get bank
 *
 * @param bankId
 */
export const find = (bankId) => {
    const {accounting_id} = vm.$route.params

    http.get('/accountings/' + accounting_id + '/banks/' + bankId).then(getData)
}

/**
 * Create the new bank
 *
 * @param bank
 */
export const create = (bank) => {
    const {accounting_id} = vm.$route.params

    return http.post('/accountings/' + accounting_id + '/banks/' , bank).then(response => {
        vm.$store.dispatch('accounting/addOrUpdateBank', response.data.data)
        vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

        return getData(response)
    })
}

/**
 * Update the bank
 *
 * @param bank
 */
export const update = (bank) => {
    const {accounting_id} = vm.$route.params

    return http.put('/accountings/' + accounting_id + '/banks/'  + bank.id, bank).then(getData)
}

/**
 * Delete the bank
 *
 * @param bank
 */
export const remove = (bank) => {
    const {accounting_id} = vm.$route.params

    return http.delete('/accountings/' + accounting_id + '/banks/'  + bank.id).then(getData)
}


