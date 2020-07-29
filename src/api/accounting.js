import vm from '@/main'
import _ from 'lodash'
import { http } from '@/plugins/http/index'

export const fetchAccounting = () => {
    const {accounting_id} = vm.$route.params
    let url = 'accountings/' + accounting_id

    let $request = http.get(url)

    $request.then(({data}) => {
        if (data) {
            vm.$store.dispatch('accounting/init', data)
        }
    })

    return $request
}

export const updateAccountingAccounts = () => {
    const {accounting_id} = vm.$route.params
    let url = 'accountings/' + accounting_id + '/all-accounts'

    let $request = http.get(url)

    $request.then(({data}) => {
        vm.$store.dispatch('accounting/addOrUpdateAccounts', data)
    })

    return $request
}

// global / system accounts
export const fetchAccounts = () => {
    return new Promise(resolve => {
        if (sessionStorage.accounts) {
            resolve(JSON.parse(sessionStorage.accounts))
        } else {
            http.get('accounts').then(({data}) => {
                if (data) {
                    sessionStorage.setItem('accounts', JSON.stringify(data))
                    resolve(data)
                }
            })
        }
    })
}

export const fetchDirectEntries = () => {
    const {accounting_id} = vm.$route.params
    const url = `accountings/${accounting_id}/direct-entries`
    return http.get(url)
}

export const fetchChequeEntries = (params = {}) => {
    const {accounting_id} = vm.$route.params
    let url = `accountings/${accounting_id}/cheque-entries`
    return new Promise(resolve => {
        http.get(url, {params}).then(({data}) => {
            if (data) {
                resolve(data)
            }
        })
    })
}

export const fetchJournalEntries = () => {
    const {accounting_id} = vm.$route.params
    const url = `accountings/${accounting_id}/journal-entries`
    return http.get(url)
}

export const fetchDonations = () => {
    const {accounting_id} = vm.$route.params
    const url = `accountings/${accounting_id}/donations`
    return http.get(url)
}

// General
export const dispatchNotification = ({success, message}) => {
    vm.$store.dispatch('snackbar/update', {
        visible: true,
        text: message,
        success,
    })
}

// Accounts
export const saveAccount = (account, type) => {
    if (!account) {
        throw 'The account data is mising: ' + account
    }
    const {accounting_id} = vm.$route.params
    let url = type === 'accounting' ? `accountings/${accounting_id}/accounts` : 'audit/accounts'
    const data = _.omit(account, 'type', 'assigned_account', 'sub_account')

    let $request

    if (!account.id) { // create
        $request = http.post(url, data)
    } else { // update
        url += `/${account.id}`
        $request = http.put(url, data)

    }
    $request.then(response => {
        updateAccountingAccounts()
    })

    if (!account.id) {
        vm.$store.dispatch('setMessage', {type: 'success', message: 'Account has been created successfully!'})
    }

    return $request
}

export const deleteAccount = ({id, accounting_id}) => {
    const {year} = vm.$route.params
    const url = `accountings/${accounting_id}/accounts/${id}`

    const $request = http.delete(url)

    $request.then(({data}) => {
        // show notification
        dispatchNotification(data)

        if (data.success) {
            vm.$store.commit('accounting/removeAccount', id)
        }
    })

    return $request
}

export const updateAccountOptions = ({id, accounting_id}, options) => {
    const url = `accountings/${accounting_id}/accounts/${id}/options`
    http.put(url, {options}).then(({data}) => {
        if (data.success) {
            vm.$store.commit('accounting/updateAccount', data.account)
        }
    })
}

// Donors
export const saveDonor = (donor) => {
    const {accounting_id} = vm.$route.params
    let url = `accountings/${accounting_id}/donors`

    let $request

    if (!donor.id) { // add
        $request = http.post(url, donor)
    } else { // update
        url += `/${donor.id}`
        http.put(url, donor)
    }

    $request.then(({data}) => {
        dispatchNotification(data)
        if (data.success) {
            vm.$store.dispatch('accounting/addOrUpdateDonor', data.donor)
        }
    })

    return $request
}

export const deleteDonor = ({id, accounting_id}) => {
    const url = `accountings/${accounting_id}/donors/${id}`
    const $request = http.delete(url)

    $request.then(({data}) => {
        // show success notification
        dispatchNotification(data)
        if (data.success) {
            vm.$store.commit('accounting/removeDonor', id)
        }
    })

    return $request
}

// Customers
export const deleteCustomer = ({accounting_id, id}) => {
    const url = `accountings/${accounting_id}/customers/${id}`
    const $request = http.delete(url)

    $request.then(({data}) => {
        dispatchNotification(data)
        if (data.success) {
            vm.$store.commit('accounting/removeCustomer', id)
        }
    })

    return $request
}

// Suppliers
export const saveSupplier = (supplier) => {
    const {accounting_id} = vm.$route.params
    let url = `accountings/${accounting_id}/suppliers`

    let $request

    if (!supplier.id) { // add
        $request = http.post(url, supplier)
    } else { // update
        url += `/${supplier.id}`
        $request = http.put(url, supplier)
    }

    $request.then(({data}) => {
        dispatchNotification(data)
        if (data.success) {
            vm.$store.dispatch('accounting/addOrUpdateSupplier', data.data)
        }
    })

    return $request
}

export const deleteSupplier = ({accounting_id, id}) => {
    const url = `accountings/${accounting_id}/suppliers/${id}`

    const $request = http.delete(url)

    $request.then(({data}) => {
        dispatchNotification(data)
        if (data.success) {
            vm.$store.commit('accounting/removeSupplier', id)
        }
    })

    return $request
}

// Direct entry suppliers
export const saveDirectEntrySupplier = (supplier) => {
    const {accounting_id} = vm.$route.params
    let url = `accountings/${accounting_id}/direct-entry-suppliers`

    let $request

    if (!supplier.id) { // add
        $request = http.post(url, supplier)
    } else { // update
        url += `/${supplier.id}`
        $request = http.put(url, supplier)
    }

    $request.then(({data}) => {
        dispatchNotification(data)
        vm.$store.dispatch('accounting/addOrUpdateDirectEntrySupplier', data.data)
    })

    return $request
}

export const deleteDirectEntrySupplier = ({id, accounting_id}) => {
    const url = `accountings/${accounting_id}/direct-entry-suppliers/${id}`
    const $request = http.delete(url)
    $request.then(({data}) => {
        // show notification
        dispatchNotification(data)
        if (data.success) {
            vm.$store.commit('accounting/removeDirectEntrySupplier', id)
        }
    })
    return $request
}


// Item
export const itemPlural = ({type}) => {
    switch (type) {
        case 'product':
            return 'products'
        case 'service':
            return 'services'
        case 'inventory':
            return 'inventories'
        default:
            return null
    }
}
export const saveItem = (item) => {
    const {accounting_id} = vm.$route.params
    let url = `accountings/${accounting_id}/${itemPlural(item)}`
    let $request
    if (!item.id) { // add
        $request = http.post(url, item)
    } else { // update
        url += `/${item.id}`
        $request = http.put(url, item)
    }

    $request.then(({data}) => {
        dispatchNotification(data)
        if (data.success) {
            switch (item.type) {
                case 'product':
                    vm.$store.dispatch('accounting/addOrUpdateProduct', data.data)
                    break
                case 'service':
                    vm.$store.dispatch('accounting/addOrUpdateService', data.data)
                    break
                case 'inventory':
                    data.data.map(inventory => {
                        vm.$store.dispatch('accounting/addOrUpdateInventory', inventory)
                    })
                    break
                default:
                    console.warn('Item type is invalid: ', type)
            }
        }
    })

    return $request
}
export const deleteItem = ({id, accounting_id, type}) => {
    const url = `accountings/${accounting_id}/${itemPlural({type})}/${id}`

    const $request = http.delete(url)

    $request.then(({data}) => {
        dispatchNotification(data)

        if (data.success) {
            switch (type) {
                case 'product':
                    vm.$store.commit('accounting/removeProduct', id)
                    break
                case 'service':
                    vm.$store.commit('accounting/removeService', id)
                    break
                case 'inventory':
                    vm.$store.commit('accounting/removeInventory', id)
                    break
                default:
                    console.warn('Item type is invalid: ', type)
            }
        }
    })

    return $request
}

// Direct entries
export const saveDirectEntries = (entries) => {
    const {accounting_id} = vm.$route.params
    const url = `accountings/${accounting_id}/direct-entries`

    const $request = http.post(url, {entries})

    $request.then(({data}) => {
        // show notification
        dispatchNotification(data)
    })

    return $request
}

// Journal entries
export const updateJournalEntry = (journalEntry) => {
    const {accounting_id} = vm.$route.params
    const url = `accountings/${accounting_id}/journal-entries/${journalEntry.id}`

    const $request = http.put(url, journalEntry)

    $request.then(({data}) => {
        // show success notification
        dispatchNotification(data)
    })

    return $request
}

export const deleteJournalEntry = ({id}) => {
    const {accounting_id} = vm.$route.params
    const url = `accountings/${accounting_id}/journal-entries/${id}`

    const $request = http.delete(url)

    $request.then(({data}) => {
        // show success notification
        dispatchNotification(data)
    })

    return $request
}

// Cheque entries
export const saveChequeEntries = (entries) => {
    const {accounting_id} = vm.$route.params
    const url = `accountings/${accounting_id}/cheque-entries`

    const $request = http.post(url, {entries})

    $request.then(({data}) => {
        // show notification
        dispatchNotification(data)
    })

    return $request
}

// Bank entries
export const fetchRelatedBankEntries = (bank_account_id, type) => {
    const {accounting_id} = vm.$route.params
    const url = `accountings/${accounting_id}/bank-entries?related=${bank_account_id}&type=${type}`

    return new Promise(resolve => {
        http.get(url).then(({data}) => {
            if (data) {
                resolve(data)
            }
        })
    })
}
export const fetchLatestBankEntry = (bank_account_id) => {
    const {accounting_id} = vm.$route.params
    const url = `accountings/${accounting_id}/bank-entries?latest=${bank_account_id}`

    return new Promise(resolve => {
        http.get(url).then(({data}) => {
            if (data) {
                resolve(data)
            }
        })
    })
}

export const updateBankEntries = (entries, params = false) => {
    const {accounting_id} = vm.$route.params
    let url = `accountings/${accounting_id}/bank-entries`
    if (params) {
        url += `?${params}`
    }
    const $request = http.put(url, {entries})

    $request.then(({data}) => {
        // show notification
        dispatchNotification(data)
    })

    return $request
}


export const fetchLatestCashEntry = (cash_account_id) => {
    const {accounting_id} = vm.$route.params
    const url = `accountings/${accounting_id}/cash-entries?latest=${cash_account_id}`

    return new Promise(resolve => {
        http.get(url).then(({data}) => {
            if (data) {
                resolve(data)
            }
        })
    })
}