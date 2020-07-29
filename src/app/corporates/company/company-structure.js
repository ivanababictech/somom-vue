export default {
    applicants: [],
    data: {
        involvements: {
            companyName: '',
            types:  [],
            natureOfPerson: ''
        },
        identityVerification: {},
        profile: {
            principalActivity: {
                countries: [],
                activities: [],
            },
            investmentActivity: {
                countries: [],
                activities: [],
            },
            lenders: {
                items: [],
                requireBorrowings: null,
                interestType: null,
            },
            borrowers: {
                items: [],
                requireBorrowings: null,
                interestType: null,
            },
            trading: {
                revenue: {
                    b2cProducts: [],
                    b2bProducts: [],
                    customerType: null,
                },
                payroll: {
                    areThereEmployees: null,
                    items: []
                },
                costOfSales: {
                    items: []
                },
                sellingExpenses: {
                    items: []
                },
                administrativeExpenses: {
                    items: []
                },
            },
            investments: {
                types: [],
            },
            banks: {
                maltaBank: false,
                foreignBank: false,
                currencies: [],
                malteseBanks: [],
                foreignBanks: []
            },
            sourceFunds: {},
        },
        dueDiligence: [],
        documents: [],
        onogram: {},
        mlro: {
            questionnaire: {
                settings: {}
            },
            documents: [],
            services: {
                letterDetails: {
                    directors: []
                },
                servicesProvided: {
                    services: []
                },
                letterView: {
                    paragraphs: [],
                    involvements: []
                }
            },
            companyDetails: {
                shareCapital: {},
                shareCapitals: [{
                    number: null,
                    type: null,
                    class: null,
                    value: null
                }],
                issued: {},
                issues: [{
                    number: null,
                    type: null,
                    class: null,
                    value: null
                }]
            },
            approval: {
                questions: [],
                mfsa_company_name: null,
                company_reg_no: null,
                applicable_year: null
            }
        },
        details: {}
    },
}