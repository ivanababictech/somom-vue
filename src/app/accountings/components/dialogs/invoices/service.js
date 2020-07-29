// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import vm from '@/main'
import qs from 'qs'

const {accounting_id} = vm.$route.params

/**
 *
 * Get invoice Customers
 *
 * @param params
 */
export const getInvoiceCustomers = (params) => {
    const {accounting_id} = vm.$route.params

    vm.$store.dispatch('setFetching', {fetching: true })

    return http.get('/accountings/' + accounting_id + '/customers', {
            params: {...params},
            paramsSerializer(params) {
                return qs.stringify(params)
            }
        }).then(response => {
            vm.$store.dispatch('setFetching', {fetching: false })

            return getData(response)
        })
}

/**
 *
 * Get invoice Suppliers
 *
 * @param params
 */
export const getInvoiceSupplliers = (params) => {
    const {accounting_id} = vm.$route.params

    vm.$store.dispatch('setFetching', {fetching: true })

    return http.get('/accountings/' + accounting_id + '/suppliers', {
            params: {...params},
            paramsSerializer(params) {
                return qs.stringify(params)
            }
        }).then(response => {
            vm.$store.dispatch('setFetching', {fetching: false })

            return getData(response)
        })
}
/**
 *
 * Get invoice by customer or supplier
 *
 * @param type
 * @param contactId
 * @param params
 */
export const getTransactions = (type, contactId, params) => {
    const {accounting_id} = vm.$route.params

    vm.$store.dispatch('setFetching', {fetching: true })

    return http.get('/accountings/' + accounting_id + '/' + type + '/' + contactId + '/transactions', {
        params: {...params},
        paramsSerializer(params) {
            return qs.stringify(params)
        }
    }).then(response => {
        vm.$store.dispatch('setFetching', {fetching: false })

        return getData(response)
    })
}


/**
 * Get customer invoices
 *
 * @returns {*}
 * @param customerId
 * @param params
 */
export const getInvoicesByCustomer = (customerId, params) => {
    const {accounting_id} = vm.$route.params
    vm.$store.dispatch('setFetching', {fetching: true })

    return http.get('/accountings/' + accounting_id + '/customers/' + customerId + '/invoices', {params})
        .then(response => {
            vm.$store.dispatch('setFetching', {fetching: false })

            return getData(response)
        })
}

/**
 * Get supplier invoicrs
 *
 * @returns {*}
 * @param supplierId
 * @param params
 */
export const getInvoicesBySupplier = (supplierId, params) => {
    const {accounting_id} = vm.$route.params
    vm.$store.dispatch('setFetching', {fetching: true })

    return http.get('/accountings/' + accounting_id + '/suppliers/' + supplierId + '/invoices', {params})
        .then(response => {
            vm.$store.dispatch('setFetching', {fetching: false })

            return getData(response)
        })
}

/**
 *
 * Get count invoices
 *
 * @param params
 */
export const count = (params) => {
    const {accounting_id} = vm.$route.params

    return http.get('/accountings/' + accounting_id + '/reconciles/invoices/count', {params}).then(response => {

        return getData(response)
    })
}

/**
 * Create the new invoice
 *
 * @param invoice
 */
export const create = (invoice) => {
    const {accounting_id} = vm.$route.params

    return http.post('/accountings/' + accounting_id + '/invoices', invoice)
        .then(response => {
            vm.$bus.$emit('updated-accounts')

            updateItems(response.data.data)

            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            return getData(response)
        })
}

/**
 * @param invoice
 * @returns {Promise<any>}
 */
export const updateInvoice = (invoice) => {
    const {accounting_id} = vm.$route.params

    return http.patch('/accountings/' + accounting_id + '/invoices/' + invoice.id, invoice)
        .then(response => {
            vm.$bus.$emit('updated-accounts')

            updateItems(response.data.data)

            vm.$store.dispatch('setMessage', {type: 'success', message: 'Invoice updated'})

            return getData(response)
        })
}

/**
 *
 * @param invoiceId
 * @returns {*}
 */
export const deleteInvoice = (invoiceId) => {
    const {accounting_id} = vm.$route.params

    return http.delete('/accountings/' + accounting_id + '/invoices/' + invoiceId)
        .then(response => {
            vm.$store.dispatch('setMessage', {type: 'success', message: 'Invoice was deleted'})

            updateItems(response.data.data)

            return getData(response)
        })
}

/**
 * Get customer or supplier payment requests
 *
 * @param type
 * @param contactId
 * @returns {*}
 */
export const getPaymentRequests = (type, contactId) => {
    const {accounting_id} = vm.$route.params

    let url = 'customers'

    if(type == 'purchase') {
        url = 'suppliers'
    }

    return http.get('/accountings/' + accounting_id + '/' + url + '/' + contactId + '/payment-requests')
        .then(response => {
            return getData(response)
        });
}

/**
 * Get customer or supplier payment requests
 *
 * @param type
 * @param contactId
 * @returns {*}
 */
export const getQuotes = (type, contactId) => {
    const {accounting_id} = vm.$route.params

    let url = 'customers'

    if(type == 'purchase') {
        url = 'suppliers'
    }

    return http.get('/accountings/' + accounting_id + '/' + url + '/' + contactId + '/quotes')
        .then(response => {
            return getData(response)
        });
}

/**
 * Check valid vat number
 *
 * @param customerId
 */
export const checkVatNumber = (customerId) => {
    const {accounting_id} = vm.$route.params

    return http.get('/accountings/' + accounting_id + '/customers/' + customerId + '/validate-vat-number')
        .then(response => {
            return getData(response)
        })
}

/**
 *
 * Get invoice payments
 *
 * @param invoiceId
 */
export const getPayments = (invoiceId) => {
    const {accounting_id} = vm.$route.params

    return http.get('/accountings/' + accounting_id + '/invoices/' + invoiceId + '/payments').then(getData)
}

/**
 *
 * Cancel Payment
 *
 * @param invoiceId
 * @param paymentId
 */
export const cancelPayment = (invoiceId, paymentId) => {
    const {accounting_id} = vm.$route.params

    vm.$store.dispatch('setFetching', {fetching: true })

    return http.delete('/accountings/' + accounting_id + '/invoices/' + invoiceId + '/payments/' + paymentId).then(response => {
        vm.$store.dispatch('setFetching', {fetching: false })

        vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

        return getData(response)
    })
}

/**
 * Get the next invoice number
 *
 * @param type
 */
export const getNextInvoiceNumber = (type) => {
    const {accounting_id} = vm.$route.params
    let params = {
        type
    }

    return http.get('/accountings/' + accounting_id + '/invoices/next-number', {params}).then(getData)
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

    return http.post('/accountings/' + accounting_id + '/reconciles/invoice-difference', params)
        .then(response => {
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            return getData(response)
        })
}

/**
 * Reconcile Invoices
 *
 * @param items
 * @param type
 */
export const reconcile = (items, type) => {
    const {accounting_id} = vm.$route.params

    return http.post('/accountings/' + accounting_id + '/reconciles/invoices', {items, type})
        .then(response => {
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})

            return getData(response)
        })
}

/**
 * Get invoice items
 *
 * @param invoiceId
 * @param params
 * @returns {*}
 */
export const getItems = (invoiceId, params) => {
    const {accounting_id} = vm.$route.params

    return http.get('/accountings/' + accounting_id + '/invoices/' + invoiceId + '/items', {
            params: {...params},
            paramsSerializer(params) {
                return qs.stringify(params)
            }
        })
        .then(response => {
            return getData(response)
        })
}

/**
 *
 * @param data
 *
 * @returns {*}
 */
export const downloadInvoice = (data) => {
    const {accounting_id} = vm.$route.params;
    http.post(`accountings/${accounting_id}/invoices/download`, data, {responseType: 'arraybuffer'})
        .then(response => {
            let blob = new Blob([response.data], { type: 'application/pdf' } );

            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = "invoice.pdf";
            link.click();
        });
};

/**
 *
 * @param data
 *
 * @returns {*}
 */
export const sendInvoiceEmail = (data) => {
    const {accounting_id} = vm.$route.params;

    http.post(`accountings/${accounting_id}/invoices/email`, data)
        .then(response => {
            vm.$store.dispatch('setMessage', {type: 'success', message: 'Invoice email sent!'});

            return getData(response)
        });
};


/**
 *
 * @param data
 */
export const updateItems = (data) => {
    // update all items
    data.inventories.map(inventory => {
        vm.$store.dispatch('accounting/addOrUpdateInventory', inventory)
    })
    data.products.map(product => {
        vm.$store.dispatch('accounting/addOrUpdateProduct', product)
    })
    data.services.map(service => {
        vm.$store.dispatch('accounting/addOrUpdateService', service)
    })
}