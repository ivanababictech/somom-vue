export default {
    SET_DEPARTMENTS(state, departments) {
        state.departments = departments;
    },

    ADD_DEPARTMENT(state, department) {
        state.departments.push(department);
    },

    UPDATE_DEPARTMENT(state, department) {
        let obj = state.departments.findIndex((obj => obj.id == department.id));
        state.departments[obj].name = department.name;
    },

    SET_PRE_TAX_ALLOWANCES(state, preTaxAllowances) {
        state.preTaxAllowances = preTaxAllowances;
    },

    ADD_PRE_TAX_ALLOWANCE(state, preTaxAllowance) {
        state.preTaxAllowances.push(preTaxAllowance);
    },

    UPDATE_PRE_TAX_ALLOWANCE(state, preTaxAllowance) {
        let obj = state.preTaxAllowances.findIndex((obj => obj.id == preTaxAllowance.id));
        state.preTaxAllowances[obj].name = preTaxAllowance.name;
        state.preTaxAllowances[obj].value = preTaxAllowance.value;
        state.preTaxAllowances[obj].frequency = preTaxAllowance.frequency;
    },

    SET_POST_TAX_ALLOWANCES(state, postTaxAllowances) {
        state.postTaxAllowances = postTaxAllowances;
    },

    ADD_POST_TAX_ALLOWANCE(state, postTaxAllowance) {
        state.postTaxAllowances.push(postTaxAllowance);
    },

    UPDATE_POST_TAX_ALLOWANCE(state, postTaxAllowance) {
        let obj = state.postTaxAllowances.findIndex((obj => obj.id == postTaxAllowance.id));
        state.postTaxAllowances[obj].name = postTaxAllowance.name;
        state.postTaxAllowances[obj].value = postTaxAllowance.value;
        state.postTaxAllowances[obj].frequency = postTaxAllowance.frequency;
    },
}