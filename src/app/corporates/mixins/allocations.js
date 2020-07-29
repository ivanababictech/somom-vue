import {mapGetters} from 'vuex'
import * as corporateService from '@/app/corporates/service'

export default {
    computed: {
        ...mapGetters({
            corporate: 'corporate/data',
            corporateSections: 'settings/corporateSections'
        }),

        /**
         * Get available corporate allocation types
         * @returns {T[]}
         */
        availableBankCorporateSections() {
            let corporateSections = this.corporateSections

            corporateSections = corporateSections.filter(corporateSection => {
                return [
                    corporateService.SECTION_PRINCIPAL_ACTIVITY_DETAILS,
                    corporateService.SECTION_BANK,
                    corporateService.SECTION_SOURCE_OF_FUNDS
                ].indexOf(corporateSection) === -1
            })
            corporateSections.push(corporateService.SECTION_SUSPENSE)

            return corporateSections
        }
    },

    methods: {
        isBorrowingActivities(type) {
            return type === corporateService.SECTION_BORROWING_ACTIVITIES
        },

        isLendingActivities(type) {
            return type === corporateService.SECTION_LENDING_ACTIVITIES
        },

        isPayroll(type) {
            return type === corporateService.SECTION_PAYROLL
        },

        isCostOfSales(type) {
            return type === corporateService.SECTION_COST_OF_SALES
        },

        isSellingExpenses(type) {
            return type === corporateService.SECTION_SELLING_DISTRIBUTION
        },

        isAdministrativeExpenses(type) {
            return type === corporateService.SECTION_ADMINISTRATIVE_EXPENSES
        },

        isSuspense(type) {
            return type === corporateService.SECTION_SUSPENSE
        },

        /**
         * corporateObject is from suspense bank request like draft
         * it will be updated with company profile after approving this request
         *
         * @param allocation_type
         * @param corporateObject
         * @returns {Array}
         */
        allocationsByType(allocation_type, corporateObject) {
            let allocations = [];
            const corporate = corporateObject || this.corporate;

            const corporateSection = this.corporateSections.find(corporateSection => corporateSection === allocation_type)

            switch (corporateSection) {
                case corporateService.SECTION_COST_OF_SALES:
                    allocations = corporate.profile.trading.costOfSales.items.map(({id, name}) => {
                        return {value: id, text: name}
                    });
                    break;

                case corporateService.SECTION_ADMINISTRATIVE_EXPENSES:
                    allocations = corporate.profile.trading.administrativeExpenses.items.map(({id, name}) => {
                        return {value: id, text: name}
                    });
                    break;

                case corporateService.SECTION_SELLING_DISTRIBUTION:
                    allocations = corporate.profile.trading.sellingExpenses.items.map(({id, name}) => {
                        return {value: id, text: name}
                    });
                    break;

                case corporateService.SECTION_SHARES_IN_COMPANIES:
                    let companies = corporate.profile.investments.types.find(type => type.sectionType === corporateSection);

                    if(companies) {
                        allocations = companies.items.map(({name, registration_number}) => {
                            return {value: registration_number, text: name}
                        });
                    }
                    break;

                case corporateService.SECTION_FINANCIAL_ASSETS:
                    let assets = corporate.profile.investments.types.find(type => type.sectionType === corporateSection);

                    if(assets) {
                        allocations = assets.items.map(({brokerName}) => {
                            return {value: brokerName, text: brokerName}
                        });
                    }
                    break;

                case corporateService.SECTION_INVESTMENT_PROPERTY:
                case corporateService.SECTION_INTELLECTUAL_PROPERTY:
                case corporateService.SECTION_TANGIBLE_ASSETS:
                    let investments = corporate.profile.investments.types.find(type => type.sectionType === corporateSection);

                    if(investments) {
                        investments.items.map(({name, customers, buyers}) => {
                            customers.map(({id, name}) => {
                                allocations.push({value: id, text: name})
                            })
                            buyers.map(({id, name}) => {
                                allocations.push({value: id, text: name})
                            })
                            allocations.push({value: id, text: name})
                        });
                    }
                    break;

                case corporateService.SECTION_BORROWING_ACTIVITIES:
                    allocations = corporate.profile.borrowers.items.filter(item => item.name).map(({id, name}) => {
                        return {value: id, text: name}
                    });
                    break;

                case corporateService.SECTION_LENDING_ACTIVITIES:
                    allocations = corporate.profile.lenders.items.filter(item => item.name).map(({id, name}) => {
                        return {value: id, text: name}
                    });
                    break;

                case corporateService.SECTION_PAYROLL:
                    allocations = corporate.profile.trading.payroll.items.filter(item => item.number).map(({id, number}) => {
                        return {value: id, text: number}
                    });
                    break;

                case corporateService.SECTION_CRYPTOCURRENCY:
                    let cryptocurrency = corporate.profile.investments.types.find(type => type.sectionType === corporateService.SECTION_CRYPTOCURRENCY);

                    if(cryptocurrency) {
                        allocations = cryptocurrency.cryptocurrencies.map(({exchange, fiatAmount, currency}) => {
                            return {value: exchange.id, text: exchange.name + ' - ' + currency + ' ' + fiatAmount}
                        });
                    }
                    break;
            }

            return allocations
        },
        /**
         * get the label for the each section
         *
         * @param allocation_type
         * @param corporateObject
         * @returns {Array}
         */
        allocationDataLabelByType(allocation_type, corporateObject) {
            let label = '';
            const corporate = corporateObject || this.corporate;

            const corporateSection = this.corporateSections.find(corporateSection => corporateSection === allocation_type)

            switch (corporateSection) {
                case corporateService.SECTION_COST_OF_SALES:
                case corporateService.SECTION_ADMINISTRATIVE_EXPENSES:
                case corporateService.SECTION_SELLING_DISTRIBUTION:
                    label = 'supplier';
                    break;

                case corporateService.SECTION_SHARES_IN_COMPANIES:
                    let companies = corporate.profile.investments.types.find(type => type.sectionType === corporateSection);

                    if(companies) {
                        allocations = companies.items.map(({name, registration_number}) => {
                            return {value: registration_number, text: name}
                        });
                    }
                    break;

                case corporateService.SECTION_FINANCIAL_ASSETS:
                    label = 'broker';
                    break;

                case corporateService.SECTION_INVESTMENT_PROPERTY:
                case corporateService.SECTION_INTELLECTUAL_PROPERTY:
                case corporateService.SECTION_TANGIBLE_ASSETS:
                    label = 'seller/supplier';
                    break;

                case corporateService.SECTION_BORROWING_ACTIVITIES:
                    label = 'lender';
                    break;

                case corporateService.SECTION_LENDING_ACTIVITIES:
                    label = 'borrower';
                    break;

                case corporateService.SECTION_PAYROLL:
                    label = 'employee';
                    break;

                case corporateService.SECTION_CRYPTOCURRENCY:
                    label = 'cryptocurrency';
                    break;
            }

            return label;
        },

        allocationTypeChanged(item) {
            item.allocation_id = null
        },

        allocationDataChanged(item) {
            const allocation = this.allocationsByType(item.allocation_type).find(allocation => allocation.value === item.allocation_id);

            this.$set(item, 'allocation', allocation ? allocation.text : null)
        },

        showAllocationsData(item) {
            this.$set(item, 'showAllocationsData', true)
        },
    }
}