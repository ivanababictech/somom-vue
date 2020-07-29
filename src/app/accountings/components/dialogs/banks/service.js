// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import vm from '@/main'
import {apiUrl} from "@/config";

export const ALLOCATION_TYPE_CUSTOMERS_PAYMENT = 'Customers payment';
export const ALLOCATION_TYPE_SUPPLIERS_PAYMENT = 'Suppliers payment';
export const ALLOCATION_TYPE_CHEQUES_PAYMENT = 'Cheques payment';
export const ALLOCATION_TYPE_CHEQUES_RECEIVED = 'Cheques received';
export const ALLOCATION_TYPE_DIRECT_ENTRIES = 'Direct entries';
export const ALLOCATION_TYPE_INTERNAL_BANK_TRANSFERS = 'Internal bank transfers';
export const ALLOCATION_TYPE_INTERNAL_CASH_TRANSFERS = 'Internal cash transfers';
export const ALLOCATION_TYPE_ACCOUNT_NAMES = 'Account names';
export const ALLOCATION_TYPE_DONATIONS_RECEIVED = 'Donations recieved';
export const ALLOCATION_TYPE_PLEDGES_REVEIVED = 'Pledges received';
export const ALLOCATION_TYPE_WAGES = 'Wages';
export const ALLOCATION_TYPE_RELATED_PARTIES = 'Related parties';

/**
 * Create new bank entries
 *
 * @param entries
 * @returns {*}
 */
export const create = (entries) => {
    const {accounting_id} = vm.$route.params

    return http.post('/accountings/' + accounting_id + '/bank-entries', { entries })
        .then(response => {
            vm.$bus.$emit('updated-accounts')

            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})
            vm.$store.commit('accounting/toggleDialog', 'bank_entries')

            return getData(response)
        })
}

/**
 * Get bank statement file
 *
 * @param path
 * @returns {*}
 */
export const getBankStatement = (path) => {
    const {accounting_id} = vm.$route.params

    vm.$store.dispatch('setFetching', {fetching: true })

    return PDFJS.getDocument(apiUrl + '/accountings/' + accounting_id + '/bank-entries/bank-statements?path=' + path)
        .then(response => {
            vm.$store.dispatch('setFetching', {fetching: false })

            return response
        })
}

/**
 * Upload bank statement file
 *
 * @param account
 * @param formData
 * @returns {*}
 */
export const uploadBankStatement = (account, formData) => {
    const {accounting_id} = vm.$route.params

    vm.$store.dispatch('setFetching', {fetching: true })

    return http.post('/accountings/' + accounting_id + '/accounts/' + account.id + '/bank-statements', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        .then(getData)
}

