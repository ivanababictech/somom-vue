import * as service from "../service";

// actions for company details component
export default {
    // load all departments
    loadDepartments: ({ commit }) =>
        service.getDepartments()
            .then( response => {
                commit('SET_DEPARTMENTS', response.data);
            } ),

    // add new department
    createDepartment: ({ commit }, department) =>
        service.createDepartment(department)
            .then( response => {
                commit('ADD_DEPARTMENT' , department)
            } ),

    // update department
    editDepartment: ({ commit }, department) =>
        service.editDepartment(department)
            .then( response => {
                commit('UPDATE_DEPARTMENT', department);
            } ),

    // load all pre tax allowances
    loadPreTaxAllowances: ({ commit }) =>
        service.getPreTaxAllowances()
            .then( response => {
                commit('SET_PRE_TAX_ALLOWANCES' , response.data);
            } ),

    // add pre tax allowances
    createPreTaxAllowance: ({ commit }, allowance) =>
        service.createPreTaxAllowance(allowance)
            .then( response => {
                commit('ADD_PRE_TAX_ALLOWANCE', allowance);
            }),

    // update pre tax allowances
    editPreTaxAllowance: ({ commit }, allowance) =>
        service.editPreTaxAllowance(allowance)
            .then( response => {
                commit('UPDATE_PRE_TAX_ALLOWANCE', allowance);
            }),

    // load all post tax allowances
    loadPostTaxAllowances: ({ commit }) =>
        service.getPostTaxAllowances()
            .then( response => {
                commit('SET_POST_TAX_ALLOWANCES' , response.data);
            } ),

    // add post tax allowances
    createPostTaxAllowance: ({ commit }, allowance) =>
        service.createPostTaxAllowance(allowance)
            .then( response => {
                commit('ADD_POST_TAX_ALLOWANCE', allowance);
            }),

    // update post tax allowances
    editPostTaxAllowance: ({ commit }, allowance) =>
        service.editPostTaxAllowance(allowance)
            .then( response => {
                commit('UPDATE_POST_TAX_ALLOWANCE', allowance);
            }),
};
