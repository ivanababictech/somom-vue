import * as service from "../../service";

// actions for company details component
export default {
    // load all departments
    loadIncomeTaxCategories: ({ commit }) =>
        service.read('incometax')
            .then( response => {
                commit('SET_INCOME_TAX', response.data);
            } ),

}