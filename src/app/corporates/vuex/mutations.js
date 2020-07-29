/* eslint-disable no-param-reassign */
import * as TYPES from "@/app/corporates/vuex/mutations-types";
import Vue from "vue";
import _ from "lodash";

export default {

    /**
     * Update corporate data
     *
     * @param state
     * @param data
     * @returns {any}
     */
    update: (state, data) => Object.assign(state, JSON.parse(JSON.stringify(data))),

    /**
     * @param first_lock_period
     * @param lockPeriod
     */
    updateFirstLockPeriod: ({first_lock_period}, lockPeriod) => {
        Object.assign(first_lock_period, lockPeriod)
    },

    /**
     * @param state
     * @param value
     * @returns {*}
     */
    saveShares: (state, value) => state.shares = value,

    /**
     * @param state
     * @param question
     * @returns {number}
     */
    addCorporateQuestion: ({corporate_questions}, question) => corporate_questions.push(question),

    /**
     * @param corporate_questions
     * @param corporateQuestion
     */
    updateCorporateQuestion: ({corporate_questions}, corporateQuestion) => {
        const index = _.findIndex(corporate_questions, ({id}) => id === corporateQuestion.id)
        // care to update only updated props (eg: if the balance is not sent with the updated account, don't wipe it)
        corporateQuestion = Object.assign(corporate_questions[index], corporateQuestion)
        Vue.set(corporate_questions, index, corporateQuestion)
    },

    /**
     * @param corporate_questions
     * @param id
     */
    removeCorporateQuestion: ({corporate_questions}, id) => Vue.delete(corporate_questions, _.findIndex(corporate_questions, corporateQuestion => corporateQuestion.id === id)),

    setDeclerations: (state, declerations) => state.declerations = declerations,

    /**
     * @param accounts
     * @param account
     * @returns {*}
     */
    addAccount: ({accounts}, account) => accounts.push(account),


    /**
     * @param accounts
     * @param newAccounts
     * @returns {*}
     */
    addAccounts: ({accounts}, newAccounts) => accounts.push(...newAccounts),

    /**
     * @param accounts
     * @param account
     */
    updateAccount: ({accounts}, account) => {
        const index = _.findIndex(accounts, ({id}) => id === account.id)
        // care to update only updated props (eg: if the balance is not sent with the updated account, don't wipe it)
        account = Object.assign(accounts[index], account)
        Vue.set(accounts, index, account)
    },

    /**
     * @param accounts
     * @param id
     */
    removeAccount: ({accounts}, id) => Vue.delete(accounts, _.findIndex(accounts, account => account.id === id)),


    /**
     * @param state
     * @param results
     */
    setResults: (state, results) => {
        results.forEach((result, index) => {
            if (!result.hasOwnProperty('score'))
                results[index].score = 0;
        });

        state.results = results;
    },

    /**
     * @param state
     * @param materialityRule
     */
    updateMaterialityRule: (state, materialityRule) => {
        state.materiality_rule = materialityRule
    },

    /**
     * @param state
     * @param resultId
     * @param score
     */
    updateResultScore: (state, {resultId, score}) => {
        const resultIndex = _.findIndex(state.results, result => result.id == resultId);
        if (state.results[resultIndex] !== undefined)
            state.results[resultIndex].score = score;
    },

    setCounters: (state, payload) => {
        let counters = {};
        _.each(payload, comment => {
            if (!counters[comment.section_person_id]) {
                counters[comment.section_person_id] = {};
                counters[comment.section_person_id]['total'] = 0;
            }
            counters[comment.section_person_id][comment.section] = comment.count;
            counters[comment.section_person_id]['total'] += comment.count;
        });
        state.commentsCounters = counters;
    }
}
