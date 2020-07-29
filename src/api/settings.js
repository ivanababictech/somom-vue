import { http } from '@/plugins/http/index'
import vm from '@/main'

// assigned accounts
export const fetchAssignedAccounts = () => {
    return new Promise(resolve => {
        http.get('settings/assigned-accounts').then(({data}) => {
            vm.$store.commit('update', {assigned_accounts: data})
        })
    })
}

export const fetchSettings = () => {
    return new Promise(resolve => {
        http.get('settings').then(({data}) => {
            if (data) {
                vm.$store.dispatch('settings/init', data)
            }
        })
    })
}

export const fetchCashEntryTypes = () => {
    return new Promise(resolve => {
        if (sessionStorage.cash_entry_types) {
            resolve(JSON.parse(sessionStorage.cash_entry_types))
        } else {
            http.get('settings/cash-entry-types').then(({data}) => {
                if (data) {
                    sessionStorage.setItem('cash_entry_types', JSON.stringify(data))
                    resolve(data)
                }
            })
        }
    })
}

export const fetchChequeEntryTypes = () => {
    return new Promise(resolve => {
        if (sessionStorage.cheque_entry_types) {
            resolve(JSON.parse(sessionStorage.cheque_entry_types))
        } else {
            http.get('settings/cheque-entry-types').then(({data}) => {
                if (data) {
                    sessionStorage.setItem('cheque_entry_types', JSON.stringify(data))
                    resolve(data)
                }
            })
        }
    })
}

export const fetchVatCodes = () => {
    return new Promise(resolve => {
        if (sessionStorage.vat_codes) {
            resolve(JSON.parse(sessionStorage.vat_codes))
        } else {
            http.get('settings/vat-codes').then(({data}) => {
                if (data) {
                    sessionStorage.setItem('vat_codes', JSON.stringify(data))
                    resolve(data)
                }
            })
        }
    })
}

export const fetchVatRates = () => {
    return new Promise(resolve => {
        if (sessionStorage.vat_rates) {
            resolve(JSON.parse(sessionStorage.vat_rates))
        } else {
            http.get('settings/vat-rates').then(({data}) => {
                if (data) {
                    sessionStorage.setItem('vat_rates', JSON.stringify(data))
                    resolve(data)
                }
            })
        }
    })
}

export const fetchCurrencies = () => {
    return new Promise(resolve => {
        if (sessionStorage.currencies) {
            resolve(JSON.parse(sessionStorage.currencies))
        } else {
            http.get('settings/currencies').then(({data}) => {
                if (data) {
                    sessionStorage.setItem('currencies', JSON.stringify(data))
                    resolve(data)
                }
            })
        }
    })
}

export const fetchBankAllocationTypes = () => {
    return new Promise(resolve => {
        if (sessionStorage.bank_allocation_types) {
            resolve(JSON.parse(sessionStorage.bank_allocation_types))
        } else {
            http.get('settings/bank-allocation-types').then(({data}) => {
                if (data) {
                    sessionStorage.setItem('bank_allocation_types', JSON.stringify(data))
                    resolve(data)
                }
            })
        }
    })
}