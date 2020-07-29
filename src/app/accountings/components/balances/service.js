// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from '@/plugins/http/index'
import { getData } from '@/utils/get'
import vm from '@/main'

/**
 * Create inventory items
 */
export const createInventories = (items) => {
    vm.$store.dispatch('setFetching', { fetching: true })

    const {accounting_id} = vm.$route.params

    return http.post('/accountings/' + accounting_id + '/inventories', items)
        .then(response => {
            response.data.data.map(inventory => {
                vm.$store.dispatch('accounting/addOrUpdateInventory', inventory)
            })

            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})
            vm.$store.dispatch('setFetching', { fetching: false })

            return getData(response)
        })
}

/**
 * Create inventory items
 */
export const createCheques = (account) => {
    vm.$store.dispatch('setFetching', { fetching: true })

    const {accounting_id} = vm.$route.params

    return http.post('/accountings/' + accounting_id + '/cheques', account)
        .then(response => {
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})
            vm.$store.dispatch('setFetching', { fetching: false })

            return getData(response)
        })
}

/**
 * Create customers
 */
export const createCustomers = (items) => {
    vm.$store.dispatch('setFetching', { fetching: true })

    const {accounting_id} = vm.$route.params

    return http.post('/accountings/' + accounting_id + '/customers', items)
        .then(response => {
            response.data.data.map(customer => {
                vm.$store.dispatch('accounting/addOrUpdateCustomer', customer)
            })

            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})
            vm.$store.dispatch('setFetching', { fetching: false })

            return getData(response)
        })
}

/**
 * Create customers
 */
export const createSuppliers = (items) => {
    vm.$store.dispatch('setFetching', { fetching: true })

    const {accounting_id} = vm.$route.params

    return http.post('/accountings/' + accounting_id + '/suppliers', items)
        .then(response => {
            response.data.data.map(supplier => {
                vm.$store.dispatch('accounting/addOrUpdateSupplier', supplier)
            })

            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})
            vm.$store.dispatch('setFetching', { fetching: false })

            return getData(response)
        })
}
/**
 * Create Asset registrar
 */
export const createAssetRegistrars = (items) => {
    vm.$store.dispatch('setFetching', { fetching: true })

    const {accounting_id} = vm.$route.params

    return http.post('/accountings/' + accounting_id + '/asset-registrars', items)
        .then(response => {
            vm.$store.dispatch('setMessage', {type: 'success', message: response.data.message})
            vm.$store.dispatch('setFetching', { fetching: false })

            return getData(response)
        })
}

export const getLatestRecords = (type, id = '') => {
    vm.$store.dispatch('setFetching', { fetching: true })

    const {accounting_id} = vm.$route.params

    return http.get('/accountings/' + accounting_id + '/' + type +'/latest/' + id)
        .then(response => {
            vm.$store.dispatch('setFetching', { fetching: false })

            return getData(response)
        })
}

