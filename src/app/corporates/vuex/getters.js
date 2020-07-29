/**
 * @param accounts
 * @returns {*}
 */
export const accounts = ({ accounts }) => accounts;

/**
 * @param company
 * @returns {*}
 */
export const company = ({ company }) => company;

/**
 *
 * @param data
 * @returns {*}
 */
export const data = ({ data }) => data;

/**
 * @param shares
 * @returns {*}
 */
export const shares = ({ shares }) => shares;

/**
 * @param corporateQuestions
 * @returns {*}
 */
export const corporateQuestions = ({ corporate_questions }) => corporate_questions;

/**
 * @param rules
 * @returns {*}
 */
export const rules = ({ rules }) => rules;

/**
 * @param materiality_rule
 * @returns {*}
 */
export const materialityRule = ({ materiality_rule }) => materiality_rule;

/**
 * @param declerations
 * @returns {*}
 */
export const declerations = ({ declerations }) => declerations;

/**
 * @param first_lock_period
 * @returns {*}
 */
export const firstLockPeriod = ({ first_lock_period }) => first_lock_period;

/**
 * @param accounts
 * @returns {*}
 */
export const bankAccounts = ({accounts}) => accounts.filter(({assigned_account_id}) => assigned_account_id == 21) // Banks assigned account,

/**
 * @param results
 * @returns {*}
 */
export const results = ({results}) => results;

export const getPersonCommentsCounters = ({commentsCounters}) => (id, section = 'total') => {
    if (commentsCounters[id] && commentsCounters[id][section])
        return commentsCounters[id][section];
    return 0;
};

