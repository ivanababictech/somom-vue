// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index';
import { getData } from '@/utils/get';
import vm from '@/main';
import qs from 'qs';
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
    const {corporate_id} = vm.$route.params

    return http.post('/corporates/' + corporate_id + '/bank-entries', { entries })
        .then(getData)
};
/**
 * Create new bank entries
 *
 * @param entries
 * @returns {*}
 */
export const updateEntries = (entries) => {
    const {corporate_id} = vm.$route.params

    return http.put('/corporates/' + corporate_id + '/bank-entries', { entries })
        .then(getData)
};

/**
 * Get the latest bank entry
 *
 * @returns {*}
 * @param bankAccountId
 */
export const getLatestEntry = (bankAccountId) => {
    const {corporate_id} = vm.$route.params

    return http.get(`/corporates/${corporate_id}/bank-entries?latest=${bankAccountId}`)
        .then(getData)
};

/**
 * Upload bank statement file
 *
 * @param account
 * @param formData
 * @returns {*}
 */
export const uploadBankStatement = (account, formData) => {
    const {corporate_id} = vm.$route.params

    return http.post('/corporates/' + corporate_id + '/accounts/' + account.id + '/bank-statements', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        .then(getData)
};


/**
 * Get the suspense count transactions
 *
 * @returns {*}
 * @param bankAccountId
 */
export const getCountSuspense = (bankAccountId) => {
    const {corporate_id} = vm.$route.params

    return http.get('/corporates/' + corporate_id + '/accounts/' +  bankAccountId + '/suspense/count')
        .then(getData)
};


/**
 * Get the suspense transactions
 *
 * @returns {*}
 * @param bankAccountId
 * @param params
 */
export const getSuspenseTransactions = (bankAccountId, params) => {
    const {corporate_id} = vm.$route.params

    return http.get('/corporates/' + corporate_id + '/accounts/' +  bankAccountId + '/suspense', {
            params: {...params},
            paramsSerializer(params) {
                return qs.stringify(params)
            }
        })
        .then(getData)
};

