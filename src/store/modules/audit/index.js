import Vue from 'vue'
import _ from 'lodash'
import { http } from '@/plugins/http/index'

import company from './company'
import trialBalance from './trial-balance'

const namespaced = true

const state = {
    step: '1',
    audit_id: null,
    prev_year: null,
    year: null,
    fee: null,
    com_start_date: null,
    com_end_date: null,
    start_date: null,
    com_trading_activity: null,
    currency: null,
    auditor_id: null,
    auditor: null,
    employees: [],
    accounts: [],
    assigned_accounts: [],
    questions: [],
    adjustments: []
}

const getters = {
    state(state) {
        return state
    },
    step({step}) {
        return step
    },
    id({audit_id}) {
        return audit_id
    },
    company({company}) {
        return company
    },
    prevYear({prev_year}) {
        return prev_year
    },
    year({year}) {
        return year
    },
    auditor({auditor}) {
        return auditor
    },
    fee({fee}) {
        return fee
    },
    comStartDate({com_start_date}) {
        return com_start_date
    },
    comEndDate({com_end_date}) {
        return com_end_date
    },
    startDate({start_date}) {
        return start_date
    },
    comTradingActivity({com_trading_activity}) {
        return com_trading_activity
    },
    currency({currency}) {
        return currency
    },
    employees({employees}) {
        return employees
    },
    accounts({accounts}) {
        return accounts
    },
    assignedAccounts({assigned_accounts}) {
        return assigned_accounts
    },
    sections({assigned_accounts}) {
        let sections = []
        _.each(assigned_accounts, ({audit_sections}) => {
            sections = _.concat(sections, audit_sections)
        })
        return _.uniqBy(sections, 'section_id')
    },
    trialBalance({trialBalance}) {
        return trialBalance
    },
    questions({questions}) {
        return questions
    },
    adjustments({adjustments}) {
        return adjustments
    }

}

const mutations = {
    init(state, data) {
        Object.assign(state, data)
    },

    update(state, audit) {
        Object.assign(state, audit)
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

    changeStep(state, step) {
        state.step = step
    },

    company(state, company) {
        state.company = company
        state.company_id = company.company_id
    },
    prevYear(state, prev_year) {
        state.prev_year = prev_year
    },
    year(state, year) {
        state.year = year
    },
    auditor(state, auditor) {
        state.auditor = auditor
        state.auditor_id = auditor.auditor_id
    },
    fee(state, fee) {
        state.fee = fee
    },
    comStartDate(state, date) {
        state.com_start_date = date
    },
    comEndDate(state, date) {
        state.com_end_date = date
    },
    startDate(state, date) {
        state.start_date = date
    },
    comTradingActivity(state, activity) {
        state.com_trading_activity = activity
    },
    currency(state, currency) {
        state.currency = currency
    },
    employees(state, employees) {
        state.employees = employees
    },
    addEmployee(state) {
        state.employees.push({
            employee_name: null,
            fee_type: null,
            employee_fee: null
        })
    },
    updateEmployee({employees}, {key, field, value}) {
        employees[key][field] = value
    },

    setAssignedAccounts(state, assigned_accounts) {
        state.assigned_accounts = assigned_accounts
    },

    setQuestions(state, questions) {
        state.questions = questions
    }
}

const actions = {

    fetch({commit, dispatch}, audit_id) {
        http.get(`audit/${audit_id}`).then(({data}) => {
            if (data.success) {
                dispatch('init', data.audit)
                commit('setAssignedAccounts', data.assigned_accounts)
            }
        })
    },

    init({commit, dispatch}, data) {
        commit('init', data)

        /*if (!data.employees.length) {
            commit('addEmployee')
        }

        // TODO - move the company part into a init action
        if (!data.company.directors.length) {
            commit('company/addDirectors')
        }

        if (!data.company.shareholders.length) {
            commit('company/addShareholders')
        } else {
            _.each(data.company.shareholders, shareholder => {
                if (!shareholder.issued_share_capitals.length) {
                    commit('company/addIssuedShareCapital', shareholder.shareholder_id)
                }
            })
        }

        dispatch('trialBalance/init', data.trial_balance)*/
    },

    // Accounts
    addOrUpdateAccounts({state, dispatch}, accounts) {
        accounts.forEach(account => dispatch('addOrUpdateAccount', account))
    },
    addOrUpdateAccount({state, commit}, account) {
        if (state.accounts.find(({id}) => id == account.id)) {
            commit('updateAccount', account)
        } else {
            commit('addAccount', account)
        }
    },

    update({commit}, audit) {
        commit('update', audit)
    },

    setQuestions({commit}, questions) {
        commit('setQuestions', questions)
    },

    save({commit, dispatch, state, getters}) {
        if (!state.audit_id) {
            commit('snackbar/update',
                {
                    visible: true,
                    success: false,
                    text: 'The audit was not created yet'
                },
                {root: true}
            )

            return
        }
        if (!state.company_id) {
            commit('snackbar/update',
                {
                    visible: true,
                    success: false,
                    text: 'The company is missing'
                },
                {root: true}
            )

            return
        }

        const data = _.pick(state, ['auditor', 'auditor_id', 'start_date', 'com_end_date', 'com_start_date', 'com_trading_activity', 'company', 'company_id', 'currency', 'employees', 'fee', 'prev_year', 'year', 'trialBalance.adjustment_reason'])
        data.trialBalance.items = getters['trialBalance/activeItems']

        const request = http.put('audit/' + state.audit_id, data)

        request.then(({data}) => {
            // show notification
            commit('snackbar/update',
                {
                    visible: true,
                    success: data.success,
                    text: data.message
                },
                {root: true}
            )
            if (data.success) {
                dispatch('init', data.audit)
            }
        })

        return request
    }
}

const modules = {
    company,
    trialBalance
}

export default {
    namespaced,
    state,
    getters,
    modules,
    mutations,
    actions
}
