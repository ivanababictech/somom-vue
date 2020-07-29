import * as TYPES from "./mutations-types";
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
    commit(TYPES.UPDATE, payload)
};

/**
 * @param state
 * @param commit
 * @param item
 * @param entries
 * @param paymentMethod
 */
export const addOrUpdateSettingsItem = ({state, commit}, {item, entries}) => {
    console.log(item, entries);
    if (state[entries].find(({id}) => id === item.id)) {
        commit('updateSettingsItem', {item, entries})
    } else {
        commit('addSettingsItem', {item, entries})
    }
};