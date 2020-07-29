// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import vm from "@/main"
import qs from 'qs'

export const TYPE_BANK = 'bank'
export const TYPE_CASH = 'cash'
export const TYPE_CHEQUE = 'cheque'



export const availableType = {
    bank: {
        type: 'bank',
        title: 'internal bank transfers',
        entries: [],
        count: 0
    },
    cash: {
        type: 'cash',
        title: 'Internal cash transfers',
        entries: [],
        count: 0
    },
    cheque_paid: {
        type: 'cheque_paid',
        title: 'Cheques payment',
        entries: [],
        count: 0
    },
    cheque_received: {
        type: 'cheque_received',
        title: 'Cheques received',
        entries: [],
        count: 0
    },
    sale: {
        type: 'sale',
        title: 'Sales',
        entries: [],
        count: 0
    },
    purchase: {
        type: 'purchase',
        title: 'Purchases',
        entries: [],
        count: 0
    },
}


/**
 *
 * Get transactions for reconcile
 *
 * @param accountId
 * @param type
 * @param typeReconciled
 * @param params
 */
export const transactions = (accountId, type, typeReconciled, params) => {
    const {accounting_id} = vm.$route.params

    var params = Object.assign({
        type,
        typeReconciled
    }, params)

    return http.get('/accountings/' + accounting_id + '/accounts/' + accountId + '/reconciles', {
        params: {...params},
        paramsSerializer(params) {
            return qs.stringify(params)
        }
    }).then(getData)
}


/**
 * Reconcile the entries
 *
 * @param type
 * @param items
 */
export const reconcile = (type, items) => {
    const {accounting_id} = vm.$route.params

    return http.post('/accountings/' + accounting_id + '/reconciles/items', {items})
        .then(response => {
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            return getData(response)
        })
}

/**
 * Reconcile the difference
 *
 * @param reconciling
 * @param items
 */
export const reconcileDifference = (reconciling, items) => {
    const {accounting_id} = vm.$route.params
    var params = Object.assign({items}, reconciling)

    return http.post('/accountings/' + accounting_id + '/reconciles/difference', params)
        .then(response => {
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            return getData(response)
        })
}

/**
 * Unmatch Reconcile entries
 *
 * @param item
 */
export const unmatch = (item) => {
    const {accounting_id} = vm.$route.params

    return http.delete('/accountings/' + accounting_id + '/reconciles/' + item.id)
        .then(response => {
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            return getData(response)
        })
}

/**
 * Get count unreconciled items
 *
 * @param accountId
 * @param reconciled
 */
export const counts = (accountId, reconciled = 0) => {
    const {accounting_id} = vm.$route.params

    var params = {
        reconciled
    }

    return http.get('/accountings/' + accounting_id + '/accounts/' + accountId + '/reconciles/count', {params}).then(getData)
}
