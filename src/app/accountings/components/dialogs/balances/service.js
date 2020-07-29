import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import vm from '@/main'
import {updateAccountingAccounts} from "@/api/accounting";

/**
 * Create balance account
 */
export const create = (balances) => {
    const {accounting_id} = vm.$route.params

    return http.post('/accountings/' + accounting_id + '/accounts', balances)
        .then(response => {
            vm.$store.commit('accounting/toggleDialog', 'balances')
            // remove old accounts
            response.data.data.latestIds.forEach(id => {
                vm.$store.commit('accounting/removeAccount', id)
            })
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            vm.$bus.$emit('updated-accounts')

            updateAccountingAccounts()

            return getData(response)
        })
}

/**
 * Get the submitted records
 *
 * @returns {*}
 */
export const getLatestRecords = () => {
    const {accounting_id} = vm.$route.params

    return http.get('/accountings/' + accounting_id + '/accounts/latest').then(getData);
}


