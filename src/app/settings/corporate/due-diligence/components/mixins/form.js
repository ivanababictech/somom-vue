export default {
    data() {
        return {
            types: [
                'Individual',
                'Corporate',
                'Trust',
                'Foundation'
            ],
            involvementsIndividual: [
                'Individual director',
                'Individual shareholder',
                'Legal representative',
                'Judicial representative',
                'Company secretary',
                'Bank signatory',
                'Ubo',
                'Trust beneficiaries',
                'Fiduciary beneficiaries',
                'Foundation beneficiaries'
            ],
            involvementsCorporate: [
                'Corporate shareholder',
                'Legal representative',
                'Judicial representative',
                'Nominee shareholder',
                'Corporate director',
                'Ubo - parent company'
            ],
            involvementsTrust: [],
            involvementsFoundation: [],
        }
    }
}