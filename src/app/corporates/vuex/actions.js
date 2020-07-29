import * as service from '../service'
import _ from "lodash";
import Vue from "vue";

/**
 * Corporate init action
 * fill state by corporate data
 *
 * @param commit
 * @param dispatch
 * @param payload
 */
export const init = ({commit, dispatch}, payload) => {
    commit('update', payload)
};

/**
 * @param commit
 * @param payload
 * @returns {*}
 */
export const fetchShares = ({commit}, payload) =>
    service.getTypeShares(payload)
        .then(({data}) => {
            commit('saveShares', data);
            return data;
        });

/**
 * @param state
 * @param dispatch
 * @param accounts
 */
export const addOrUpdateAccounts = ({state, dispatch}, accounts) => {
    if(_.isArray(accounts)) {
        accounts.forEach(account => dispatch('addOrUpdateAccount', account))
    } else {
        dispatch('addOrUpdateAccount', accounts)
    }
};

/**
 * @param state
 * @param commit
 * @param account
 */
export const addOrUpdateAccount = ({state, commit}, account) => {
    if (state.accounts.find(({id}) => id === account.id)) {
        commit('updateAccount', account)
    } else {
        commit('addAccount', account)
    }
};

/**
 * @param state
 * @param commit
 * @param corporateQuestion
 * @param account
 */
export const addOrUpdateCorporateQuestion = ({state, commit}, corporateQuestion) => {
    if (state.corporate_questions.find(({id}) => id === corporateQuestion.id)) {
        commit('updateCorporateQuestion', corporateQuestion)
    } else {
        commit('addCorporateQuestion', corporateQuestion)
    }
};
