import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import * as getters from './getters'
import plugins from './plugins'

import state from './state'
import snackbar from './modules/snackbar'
import accounting from './modules/accounting/index'
import audit from './modules/audit/index'
import sourceOfWealth from './modules/corporates/source-of-wealth';
import declerations from './modules/corporates/due-diligence/declerations';
import questionnaire from './modules/corporates/due-diligence/questionnaire';
import references from './modules/corporates/due-diligence/reference-letters';
import dueDiligence from './modules/corporates/due-diligence';
import {vuex as app} from '../app'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    modules: {
        snackbar,
        audit,
        accounting,
        sourceOfWealth,
        declerations,
        questionnaire,
        references,
        dueDiligence,
        ...app.modules
    },
    plugins,
    strict: debug,
})
