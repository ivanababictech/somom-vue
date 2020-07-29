// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import vm from '@/main'
import {saveAccount} from '@/api/accounting'

/**
 * Create cash transaction
 */
export const create = (entries) => {
    const {accounting_id} = vm.$route.params

    return http.post('/accountings/' + accounting_id + '/cheque-entries', {entries})
        .then(response => {
            vm.$store.commit('accounting/toggleDialog', 'cheque_entries')
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            vm.$bus.$emit('updated-accounts')

            return getData(response)
        })
}

export const assignBankAccountToCheque = (chequeAccount, bankAccountId) => {
    return saveAccount(chequeAccount, 'accounting')
        .then(response => {
            let bankAccount = vm.$store.getters['accounting/accountById'](bankAccountId)

            vm.$store.dispatch('setMessage', {type: 'success', message: 'You have assigned bank ' + bankAccount.name + ' to ' + chequeAccount.name})
        })
}
