/* eslint-disable no-param-reassign */
import * as TYPES from "./mutations-types";
import Vue from "vue";
import _ from "lodash";
import vm from "@/main";

export default {
    [TYPES.UPDATE] (state, data) {
        Object.assign(state, data)
    },

    /**
     * @param corporate_payment_methods
     */
    resetDefaultPaymentMethods: ({corporate_payment_methods}) => {
        corporate_payment_methods.map(paymentMethod => {
            paymentMethod.is_default = false;
            return paymentMethod
        })
    },

    /**
     * @returns {*}
     * @param state
     * @param item
     * @param entries
     */
    addSettingsItem: (state, {item, entries}) => {
        console.log(item, entries);
        if(entries === 'corporate_payment_methods') {
            //reset default payment method
            if (item.is_default) {
                vm.$store.commit('settings/resetDefaultPaymentMethods')
            }
        }

        return state[entries].push(item)},

    /**
     * @param state
     * @param item
     * @param entries
     */
    updateSettingsItem: (state, {item, entries}) => {
        if(entries === 'corporate_payment_methods') {
            //reset default payment method
            if (item.is_default) {
                vm.$store.commit('settings/resetDefaultPaymentMethods')
            }
        }

        const index = _.findIndex(state[entries], ({id}) => id === item.id);
        item = Object.assign(state[entries][index], item);
        Vue.set(state[entries], index, item)
    },

    /**
     * @param state
     * @param id
     * @param entries
     */
    removeSettingsItem: (state, {id, entries}) => {
        Vue.delete(state[entries], _.findIndex(state[entries], item => item.id === id));
    },
}
