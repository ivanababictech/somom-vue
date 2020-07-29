export default {
    methods: {
        getCompanyName(corporate) {
            const mlro = corporate.data.mlro;
            if (corporate.is_registered && mlro.hasOwnProperty('approval') && mlro.approval.mfsa_company_name !== null) {
                return mlro.approval.mfsa_company_name;
            }

            return corporate.company.name
        },

        getCompanyRegNumber(corporate) {
            const mlro = corporate.data.mlro;
            if (corporate.is_registered && mlro.hasOwnProperty('approval') && mlro.approval.company_reg_no !== null) {
                return corporate.data.mlro.approval.company_reg_no;
            }

            return corporate.company.registration_number
        }
    }
}