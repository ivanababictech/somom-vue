import Vue from 'vue'
import _ from 'lodash'
import {$echo} from '@/api'

const namespaced = true;

const state = {
    id: null,
    company_id: null,
    company: {},

    accounts: [],
    banks: [],
    directors: [],
    shareholders: [],
    customers: [],
    suppliers: [],
    direct_entry_suppliers: [],
    donors: [],
    firstLockPeriod: {},
    // items
    products: [],
    services: [],
    inventories: [],

    // dialogs
    dialogs: {
        sales: false,
        purchases: false,
        invoices: false,
        donations: false,
        balances: false,
        journal_entries: false,
        auditor_adjustments: false,
        queries: false,
        bank_entries: false,
        cash_entries: false,
        direct_entries: false,
        cheque_entries: false,
        inventory: false,
        cheque_accounts: false,
        customers: false,
        suppliers: false,
        asset_registrar: false,
        identity_checks: false
    },
    loaded: false
}

const getters = {
    id({id}) {
        return id
    },
    companyId({company_id}) {
        return company_id
    },
    company({company}) {
        return company
    },
    firstLockPeriod({firstLockPeriod}) {
        return firstLockPeriod
    },
    currency({company}) {
        return company.currency
    },

    invoice({invoice}) {
        return invoice
    },

    // Banks
    banks({banks}) {
        return banks
    },
    defaultBank({banks}) {
        return banks.find(({is_default}) => is_default)
    },

    // Accounts
    accounts({accounts}) {
        return accounts
    },
    trialBalanceAccounts({accounts}) {
        return accounts.filter(account => account.balance && Boolean(account.balance.credit || account.balance.debit))
    },
    obAccounts({accounts}) {
        return accounts.filter(account => Boolean(account.balance && (account.balance.credit || account.balance.debit)))
    },
    obSuggestedAccounts({accounts}) {
        return accounts.filter(account => Boolean(account.balance && !account.balance.credit && !account.balance.debit))
    },
    itemAccounts: (state) => (item, to = null) => {
        let accounts = Array.from(state.accounts)

        switch (item.type) {
            case 'product':
                accounts = accounts.filter(({assigned_account_id}) => [14, 15, 16].indexOf(assigned_account_id) >= 0)
                break
            case 'service':
                switch (to) {
                    case 'sale':
                        accounts = accounts.filter(({sub_account_id}) => sub_account_id == 55)
                        break
                    case 'purchase':
                        accounts = accounts.filter(({assigned_account_id}) => [14, 15].indexOf(assigned_account_id) >= 0)
                        break
                    default:
                        accounts = accounts.filter(({assigned_account_id}) => [12, 14, 15].indexOf(assigned_account_id) >= 0)
                }
                break
            case 'inventory':
                switch (to) {
                    case 'sale':
                        accounts = accounts.filter(({sub_account_id}) => sub_account_id == 15)
                        break
                    case 'purchase':
                        accounts = accounts.filter(({sub_account_id}) => sub_account_id == 16)
                        break
                    default:
                        accounts = accounts.filter(({assigned_account_id}) => [12, 13].indexOf(assigned_account_id) >= 0)
                }
                break
            default:
                console.warn('Item type is not recognised: ', item)
        }

        return accounts
    },
    accountById: ({accounts}) => (id) => {
        return accounts.find(account => account.id == id)
    },
    accountNameById: (state, getters) => (id) => {
        if (!id) {
            return null
        }
        let account = getters.accountById(id)

        if(account) {
            return account.name
        }

        return 'Unknown account';
    },
    showBalances(state, getters) {
        return !Boolean(getters.trialBalanceAccounts.length)
    },

    totalLastYearAmounts({accounts}) {
        let total = 0
        return total
        accounts.forEach(({balance}) => total += balance.prev_year_amount)
        return total
    },

    customers({customers}) {
        return customers
    },
    customerById: ({customers}) => (id) => {
        return customers.find(customer => customer.id == id)
    },
    customerNameById: (state, {customerById}) => (id) => {
        if (!id) {
            return null
        }
        return customerById(id).name
    },

    suppliers({suppliers}) {
        return suppliers
    },
    supplierById: ({suppliers}) => (id) => {
        return suppliers.find(supplier => supplier.id == id)
    },
    supplierNameById: ({}, {supplierById}) => (id) => {
        if (!id) {
            return null
        }
        return supplierById(id).name
    },

    directEntrySuppliers({direct_entry_suppliers}) {
        return direct_entry_suppliers
    },
    directEntrySupplierById: ({direct_entry_suppliers}) => (id) => {
        return direct_entry_suppliers.find(direct_entry_supplier => direct_entry_supplier.id == id)
    },
    directEntrySupplierNameById: ({}, {directEntrySupplierById}) => (id) => {
        if (!id) {
            return null
        }
        return directEntrySupplierById(id).name
    },

    // Donors
    donors({donors}) {
        return donors
    },

    // Items
    products({products}) {
        return products
    },
    services({services}) {
        return services
    },
    inventories({inventories}) {
        return inventories
    },
    inventoryById: ({inventories}) => (id) => {
        return inventories.find(inventory => inventory.id == id)
    },
    items({inventories, products, services}) {
        return Array(...inventories, ...products, ...services)
    },
    /*
     * Sales items consist of:
     * - all inventory items where qty > 0
     * - all services linked to sales assigned account
     */
    saleItems({inventories, services}, {accountById}) {
        return Array(
            ...inventories.filter(({qty}) => qty > 0),
            ...services.filter(({account_id}) => {
                const account = accountById(account_id)

                return account && account.assigned_account_id == 12 // sales
            })
        )
    },
    /*
     * Purchase items consist of:
     * - all inventory items
     * - all products
     * - all services linked to purchase assigned accounts
     */
    purchaseItems({inventories, products, services}, {accountById}) {
        return Array(
            ...inventories,
            ...products,
            ...services.filter(({account_id}) => {
                const account = accountById(account_id)
                return account && [13, 14, 15, 16].indexOf(account.assigned_account_id) >= 0 // purchases
            })
        )
    },

    banks({banks}) {
        return banks
    },
    defaultBank({banks}) {
        return banks.find(bank => bank.is_default)
    },

    // control accounts
    inventoryAccount({accounts}, getters) {
        return getters.obAccounts.find(({assigned_account_id}) => assigned_account_id === 1)
    },
    chequeAccount({accounts}, getters) {
        return getters.obAccounts.find(({assigned_account_id}) => assigned_account_id === 1)
    },
    salesVatControlAccount({accounts}) {
        return accounts.find(({assigned_account_id}) => assigned_account_id == 2)
    },
    purchasesVatControlAccount({accounts}) {
        return accounts.find(({assigned_account_id}) => assigned_account_id == 3)
    },
    tradeReceivablesAccount({accounts}, getters) {
        return getters.obAccounts.find(({assigned_account_id}) => assigned_account_id == 4) // (debtors control)
    },
    debtorAccount({accounts}, getters) {
        return getters.obAccounts.find(({assigned_account_id}) => assigned_account_id == 4) // (debtors control)
    },
    tradePayablesAccount({accounts}, getters) {
        return getters.obAccounts.find(({assigned_account_id}) => assigned_account_id == 5) // (creditors control)
    },
    donationsControlAccount({accounts}) {
        return accounts.find(({assigned_account_id}) => assigned_account_id == 6)
    },
    propertyPlantAccount({accounts}, getters) {
        return getters.obAccounts.find(({assigned_account_id}) => assigned_account_id == 16)
    },

    // Property Plants
    propertyPlantAccounts({accounts}, getters) {
        return getters.obAccounts.filter(({assigned_account_id}) => assigned_account_id == 16)
    },


    // inventory accounts
    inventoryAccounts({accounts}, getters) {
        return getters.obAccounts.filter(({assigned_account_id}) => assigned_account_id === 1)
    },

    // Loan
    loanAccounts({accounts}) {
        return accounts.filter(({assigned_account_id}) => assigned_account_id == 17) // Loans assigned account
    },
    // Cash
    cashAccounts({accounts}) {
        return accounts.filter(({assigned_account_id}) => assigned_account_id == 19) // Cash control a/c assigned account
    },
    // Cheques
    chequeAccounts({accounts}) {
        return accounts.filter(({assigned_account_id}) => assigned_account_id == 20) // Cheques paid control a/c
    },
    // Cheques
    chequeReceivedAccount({accounts}) {
        return accounts.find(({assigned_account_id}) => assigned_account_id == 34) // Cheques received control a/c
    },
    // Cheques
    chequeAllAccounts({accounts}) {
        return accounts.filter(({assigned_account_id}) => (assigned_account_id == 20 || assigned_account_id == 34)) // Cheques paid control a/c
    },
    // Banks
    bankAccounts({accounts}) {
        return accounts.filter(({assigned_account_id}) => assigned_account_id == 21) // Banks assigned account
    },
    // Donations
    donationAccounts({accounts}) {
        return accounts.filter(({assigned_account_id}) => assigned_account_id == 29) // donations assigned account
    },

    dialogs({dialogs}) {
        return dialogs
    },
    loaded({loaded}) {
        return loaded
    }
}

const mutations = {
    update(state, data) {
        console.debug(data);
        data.customers.forEach(customer => {
            if (customer.data.contactDetails.length === 0)
                customer.data.contactDetails = {
                    person: null,
                    email: null,
                    position: null,
                    number: null
                }
            if (customer.data.clientAddress.length === 0)
                customer.data.clientAddress = {
                    doorName: null,
                    streetName: null,
                    city: null,
                    zip: null
                }
        });
        Object.assign(state, data)
    },

    // Account
    addAccount({accounts}, account) {
        accounts.push(account)
    },
    addAccounts({accounts}, newAccounts) {
        accounts.push(...newAccounts)
    },
    updateAccount({accounts}, account) {
        const index = _.findIndex(accounts, ({id}) => id == account.id)
        // care to update only updated props (eg: if the balance is not sent with the updated account, don't wipe it)
        account = Object.assign(accounts[index], account)
        Vue.set(accounts, index, account)
    },
    removeAccount({accounts}, id) {
        Vue.delete(accounts, _.findIndex(accounts, account => account.id == id))
    },

    // Bank
    updateBank({banks}, bank) {
        const index = _.findIndex(banks, ({id}) => id == bank.id)
        Vue.set(banks, index, bank)
    },
    removeBankAccount({banks}, id) {
        Vue.delete(banks, _.findIndex(banks, bank => bank.id == id))
    },

    // Balance
    updateBalance({period, accounts}, balance) {
        if (period.id != balance.accounting_period_id) {
            throw 'The balance period and accounting period are not the same.'
        }
        const account = accounts.find(({id}) => id == balance.account_id)
        Vue.set(account, 'balance', balance)
    },

    // Directors
    addDirectors(state) {
        state.directors.push(
            {
                director_id: 1,
                com_name: null,
                reg_no: null,
                name: null,
                sex: null,
                id_type: null,
                id_number: null,
                address: null,
                domicile: null,
                type: 'Corporate'
            },
            {
                director_id: 2,
                name: null,
                sex: null,
                id_type: null,
                id_number: null,
                address: null,
                domicile: null,
                type: 'Individual'
            }
        )
    },
    addDirector(state, type) {
        const lastDirector = _.last(state.directors)
        const director_id = parseInt(lastDirector.director_id) + 1

        const director = {
            director_id,
            name: null,
            sex: null,
            id_type: null,
            id_number: null,
            address: null,
            domicile: null,
            type
        }
        if (type == 'Corporate') {
            director.com_name = null
            director.reg_no = null
        }
        state.directors.push(director)
    },
    updateDirector({directors}, {field, id, value}) {
        const director = directors.find(director => director.director_id == id)
        director[field] = value
    },

    // Shareholders
    addShareholders(state) {
        state.shareholders.push(
            {
                shareholder_id: 1,
                com_name: null,
                reg_no: null,
                address: null,
                domicile: null,
                type: 'Corporate',
                issued_share_capitals: [
                    {
                        count: null,
                        type: null,
                        class: null,
                        value: null,
                        paid: null
                    }
                ]
            },
            {
                shareholder_id: 2,
                name: null,
                id_number: null,
                address: null,
                nationality: null,
                type: 'Individual',
                issued_share_capitals: [
                    {
                        count: null,
                        type: null,
                        class: null,
                        value: null,
                        paid: null
                    }
                ]
            }
        )
    },
    addShareholder(state, type) {
        const lastShareholder = _.last(state.shareholders)
        const shareholder_id = parseInt(lastShareholder.shareholder_id) + 1

        const shareholder = {
            shareholder_id,
            name: null,
            id_number: null,
            address: null,
            nationality: null,
            type,
            issued_share_capitals: [
                {
                    count: null,
                    type: null,
                    class: null,
                    value: null,
                    paid: null
                }
            ]
        }
        if (type == 'Corporate') {
            delete shareholder.name
            delete shareholder.id_number
            delete shareholder.nationality
            shareholder.com_name = null
            shareholder.reg_no = null
            shareholder.domicile = null
        }
        state.shareholders.push(shareholder)
    },
    updateShareholder({shareholders}, {field, id, value}) {
        const shareholder = shareholders.find(shareholder => shareholder.shareholder_id == id)
        shareholder[field] = value
    },

    // Issued share capital
    addIssuedShareCapital({shareholders}, id) {
        const shareholder = shareholders.find(shareholder => shareholder.shareholder_id == id)
        shareholder.issued_share_capitals.push({
            count: null,
            type: null,
            class: null,
            value: null,
            paid: null
        })
    },
    updateIssuedShareCapital({shareholders}, {field, id, key, value}) {
        const shareholder = shareholders.find(shareholder => shareholder.shareholder_id == id)
        shareholder.issued_share_capitals[key][field] = value
    },

    updateCompany({company}, companyData) {
        Object.assign(company, companyData)
    },

    // Customer
    addCustomer({customers}, customer) {
        customers.push(customer)
    },

    updateLogo({company}, logo) {
        company.logo = logo;
    },

    updateCustomer({customers}, customer) {
        const index = _.findIndex(customers, ({id}) => id == customer.id)
        Vue.set(customers, index, customer)
    },

    updateCustomerDetails({customers}, {field, value, key,customerId}) {
        const index = _.findIndex(customers, customer => customer.id === customerId);

        customers[index].data[key][field] = value;
    },

    removeCustomer({customers}, id) {
        Vue.delete(customers, _.findIndex(customers, customer => customer.id == id))
    },

    // Supplier
    addSupplier({suppliers}, supplier) {
        suppliers.push(supplier)
    },
    updateSupplier({suppliers}, supplier) {
        const index = _.findIndex(suppliers, ({id}) => id == supplier.id)
        Vue.set(suppliers, index, supplier)
    },
    removeSupplier({suppliers}, id) {
        Vue.delete(suppliers, _.findIndex(suppliers, supplier => supplier.id == id))
    },

    // Direct entry supplier
    addDirectEntrySupplier({direct_entry_suppliers}, direct_entry_supplier) {
        direct_entry_suppliers.push(direct_entry_supplier)
    },
    updateDirectEntrySupplier({direct_entry_suppliers}, direct_entry_supplier) {
        const index = _.findIndex(direct_entry_suppliers, ({id}) => id == direct_entry_supplier.id)
        Vue.set(direct_entry_suppliers, index, direct_entry_supplier)
    },
    removeDirectEntrySupplier({direct_entry_suppliers}, id) {
        Vue.delete(direct_entry_suppliers, _.findIndex(direct_entry_suppliers, direct_entry_supplier => direct_entry_supplier.id == id))
    },

    // Donor
    addDonor({donors}, donor) {
        donors.push(donor)
    },
    updateDonor({donors}, donor) {
        const index = _.findIndex(donors, ({id}) => id == donor.id)
        Vue.set(donors, index, donor)
    },
    removeDonor({donors}, id) {
        Vue.delete(donors, _.findIndex(donors, donor => donor.id == id))
    },

    // Bank
    addBank({banks}, bank) {
        if (bank.is_default) {
            _.each(banks, b => {
                if (b.is_default) {
                    Vue.set(b, 'is_default', 0)
                }
            })
        }
        banks.push(bank)
    },
    updateBank({banks}, bank) {
        if (bank.is_default) {
            _.each(banks, b => {
                if (b.is_default && b.bank_id != bank.bank_id) {
                    Vue.set(b, 'is_default', 0)
                }
            })
        }
        const index = _.findIndex(banks, ({bank_id}) => bank_id == bank.bank_id)
        Vue.set(banks, index, bank)
    },

    // Product
    addProduct({products}, product) {
        products.push(product)
    },
    updateProduct({products}, product) {
        const index = _.findIndex(products, ({id}) => id == product.id)
        Vue.set(products, index, product)
    },
    removeProduct({products}, id) {
        Vue.delete(products, _.findIndex(products, p => p.id == id))
    },

    // Service
    addService({services}, service) {
        services.push(service)
    },
    updateService({services}, service) {
        const index = _.findIndex(services, ({id}) => id == service.id)
        Vue.set(services, index, service)
    },
    removeService({services}, id) {
        Vue.delete(services, _.findIndex(services, s => s.id == id))
    },

    // Inventory
    addInventory({inventories}, inventory) {
        inventories.push(inventory)
    },
    updateInventory({inventories}, inventory) {
        const index = _.findIndex(inventories, ({id}) => id == inventory.id)
        Vue.set(inventories, index, inventory)
    },
    removeInventory({inventories}, id) {
        Vue.delete(inventories, _.findIndex(inventories, i => i.id == id))
    },

    openDialog({dialogs}, dialog) {
        if (dialogs[dialog] !== undefined) {
            dialogs[dialog] = true
        }
    },
    closeDialog({dialogs}, dialog) {
        if (dialogs[dialog] !== undefined) {
            dialogs[dialog] = false
        }
    },
    toggleDialog({dialogs}, dialog) {
        if (dialogs[dialog] !== undefined) {
            dialogs[dialog] = !dialogs[dialog]
        }
    },

    updateFirstLockPeriod({firstLockPeriod}, lockPeriod) {
        Object.assign(firstLockPeriod, lockPeriod)
    }
}

const actions = {
    init({commit, dispatch}, data) {
        data.loaded = true
        commit('update', data)
        dispatch('subscribe')
    },

    // subscribe to server events
    subscribe({commit, dispatch, state}) {

        if (!state.id) {
            throw 'The accounting id is not set.'
        }
        $echo().then(response => {
            response.private(`accounting.${state.id}`)
            // general updates - accounting id based
                .listen('.updated', ({type, payload}) => {

                    // for debug purpose
                    console.log(`accounting.${state.id}.updated event triggered: `, type, payload)

                    if (!type) {
                        throw 'Event type is not set.'
                    }

                    // some logic to define if the type is an action, mutation or does not exist, in that order
                    const rootType = 'accounting/' + type
                    if (typeof this._actions[rootType] != 'undefined') {
                        dispatch(type, payload)
                    } else if (typeof this._mutations[rootType] != 'undefined') {
                        commit(type, payload)
                    } else {
                        throw 'The event type does not exist: ' + rootType
                    }
                })
                // period updates - accounting period based
                .listen(`.updated`, ({type, payload}) => {

                    if (!type) {
                        throw 'Event type is not set.'
                    }

                    // some logic to define if the type is an action, mutation or does not exist, in that order
                    const rootType = 'accounting/' + type
                    if (typeof this._actions[rootType] != 'undefined') {
                        dispatch(type, payload)
                    } else if (typeof this._mutations[rootType] != 'undefined') {
                        commit(type, payload)
                    } else {
                        throw 'The event type does not exist: ' + rootType
                    }
                })
        })
    },

    unsubscribe({state}) {
        //$echo.leave(`accounting.${state.id}`)
    },

    // Accounts
    addOrUpdateAccounts({state, dispatch}, accounts) {
        if(_.isArray(accounts)) {
            accounts.forEach(account => dispatch('addOrUpdateAccount', account))
        } else {
            dispatch('addOrUpdateAccount', accounts)
        }
    },
    addOrUpdateAccount({state, commit}, account) {
        if (state.accounts.find(({id}) => id == account.id)) {
            commit('updateAccount', account)
        } else {
            commit('addAccount', account)
        }
    },

    // Bank
    addOrUpdateBank({state, commit}, bank) {
        if (state.banks.find(({id}) => id == bank.id)) {
            commit('updateBank', bank)
        } else {
            commit('addBank', bank)
        }
    },

    // Donor
    addOrUpdateDonor({state, commit}, donor) {
        if (state.donors.find(({id}) => id == donor.id)) {
            commit('updateDonor', donor)
        } else {
            commit('addDonor', donor)
        }
    },

    // Customer
    addOrUpdateCustomer({state, commit}, customer) {
        if (state.customers.find(({id}) => id == customer.id)) {
            commit('updateCustomer', customer)
        } else {
            commit('addCustomer', customer)
        }
    },

    // Supplier
    addOrUpdateSupplier({state, commit}, supplier) {
        if (state.suppliers.find(({id}) => id == supplier.id)) {
            commit('updateSupplier', supplier)
        } else {
            commit('addSupplier', supplier)
        }
    },

    // Direct entry supplier
    addOrUpdateDirectEntrySupplier({state, commit}, supplier) {
        if (state.direct_entry_suppliers.find(({id}) => id == supplier.id)) {
            commit('updateDirectEntrySupplier', supplier)
        } else {
            commit('addDirectEntrySupplier', supplier)
        }
    },

    // Product
    addOrUpdateProduct({state, commit}, product) {
        if (state.products.find(({id}) => id == product.id)) {
            commit('updateProduct', product)
        } else {
            commit('addProduct', product)
        }
    },

    // Service
    addOrUpdateService({state, commit}, service) {
        if (state.services.find(({id}) => id == service.id)) {
            commit('updateService', service)
        } else {
            commit('addService', service)
        }
    },

    // Inventory
    addOrUpdateInventory({state, commit}, inventory) {
        if (state.inventories.find(({id}) => id == inventory.id)) {
            commit('updateInventory', inventory)
        } else {
            commit('addInventory', inventory)
        }
    },
}

const modules = {
    //account,
}

export default {
    namespaced,
    modules,
    state,
    getters,
    mutations,
    actions
}
