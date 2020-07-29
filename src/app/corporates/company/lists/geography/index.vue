<template>
    <v-layout row wrap>
        <v-flex md3 xs3 mr-5>
            <v-text-field
                    label="Filter by company name"
                    v-model="nameSearch"
            ></v-text-field>
        </v-flex>
        <v-flex md3 xs3>
            <v-autocomplete
                    multiple
                    :items="availableCountries"
                    v-model="filterCountries"
                    label="Filter by countries"
            ></v-autocomplete>
        </v-flex>
        <div class="fill-width">
            <fixed-header :items="filteredCompanies" :headers="headers"></fixed-header>

            <v-data-table
                    :headers="headers"
                    :items="filteredCompanies"
                    :hide-actions="true"
                    :search="nameSearch"
                    id="main-table"
            >
                <template slot="items" slot-scope="props">
                    <td>
                        <b v-text="props.item.name"></b>
                    </td>
                    <td v-text="props.item.reg_number"></td>
                    <td>
                        <p v-for="country in props.item.residencies">{{ country }}</p>
                    </td>
                    <td>
                        <p v-for="country in props.item.assets">{{ country }}</p>
                    </td>
                    <td>
                        <p v-for="country in props.item.customers">{{ country }}</p>
                    </td>
                    <td>
                        <p v-for="country in props.item.suppliers">{{ country }}</p>
                    </td>
                    <td>
                        <p v-if="props.item.lenders.length">
                            <span v-for="country in props.item.lenders">{{ country }}</span>
                        </p>
                        <p v-else>N/A</p>
                    </td>
                    <td>
                        <p v-for="country in props.item.borrowers">{{ country }}</p>
                    </td>
                    <td>
                        <p v-for="country in props.item.investments">{{ country }}</p>
                    </td>
                    <td>
                        <p v-for="country in props.item.banks">{{ country }}</p>
                    </td>
                    <td>
                        <p v-for="country in props.item.payrolls">{{ country }}</p>
                    </td>
                </template>
            </v-data-table>
        </div>
    </v-layout>
</template>

<script scope>
    import companyMixin from '../mixins/company';
    import countryMixin from '../mixins/country';
    import fixedHeaderMixin from '../mixins/fixed-header';

    export default {
        props: ['companies'],

        mixins: [
            companyMixin,
            countryMixin,
            fixedHeaderMixin
        ],

        data() {
            return {
                headers: [
                    {text: 'Company Name', value: 'name'},
                    {text: 'Company registration', value: 'registration_number'},
                    {text: 'Shareholder residency', value: 'residency'},
                    {text: 'Location of assets', value: 'location_of_assets'},
                    {text: 'Location of customers', value: 'location_of_customers'},
                    {text: 'Location of suppliers', value: 'location_of_suppliers'},
                    {text: 'Location of lending activities', value: 'location_of_lenders'},
                    {text: 'Location of borrowing activities', value: 'location_of_borrowers'},
                    {text: 'Location of investments', value: 'location_of_investments'},
                    {text: 'Location of banks', value: `location_of_banks`},
                    {text: 'Location of employees', value: `location_of_employees`}
                ],
                nameSearch: null,
                filterCountries: []
            }
        },

        computed: {
            filteredCompanies() {
                const companies = _.map(this.companies, (company, key) => {
                    return {
                        name: this.getCompanyName(company),
                        reg_number: this.getCompanyRegNumber(company),
                        residencies: _.uniq(company.residencies),
                        assets: _.uniq(company.assets),
                        customers: _.uniq(company.customers),
                        suppliers: _.uniq(company.suppliers),
                        lenders: _.uniq(company.lenders),
                        borrowers: _.uniq(company.borrowers),
                        investments: _.uniq(company.investments),
                        banks: _.uniq(company.banks),
                        payrolls: _.uniq(company.payrolls)
                    }
                });

                if (this.filterCountries.length > 0) {
                    let filteredCompanies = [];

                    _.each(companies, company => {
                        let availableCountries = _.map(company.residencies, r => r)
                            .concat(_.map(company.assets, a => a))
                            .concat(_.map(company.customers, c => c))
                            .concat(_.map(company.suppliers, s => s))
                            .concat(_.map(company.lenders, l => l))
                            .concat(_.map(company.borrowers, b => b))
                            .concat(_.map(company.investments, i => i))
                            .concat(_.map(company.banks, b => b))
                            .concat(_.map(company.payrolls, p => p));

                        if (availableCountries.some(country => _.includes(this.filterCountries, country))) {
                            filteredCompanies.push(company);
                        }
                    });

                    return filteredCompanies;
                }

                return companies;
            },

            availableCountries() {
                let countries = [];

                _.each(this.companies, company => {
                    countries = countries
                                .concat(_.map(company.residencies, r => r))
                                .concat(_.map(company.assets, a => a))
                                .concat(_.map(company.customers, c => c))
                                .concat(_.map(company.suppliers, s => s))
                                .concat(_.map(company.lenders, l => l))
                                .concat(_.map(company.borrowers, b => b))
                                .concat(_.map(company.investments, i => i))
                                .concat(_.map(company.banks, b => b))
                                .concat(_.map(company.payrolls, o => o))
                });

                return _.orderBy(_.filter(_.uniq(countries), country => country !== undefined));
            }
        },

        mounted() {
            this.setCompaniesData();
        },

        methods: {
            setCompaniesData() {
                _.each(this.companies, (company, companyIndex) => {
                    this.$set(this.companies[companyIndex], 'residencies', []);
                    this.getResidencies(company, companyIndex);
                    this.$set(this.companies[companyIndex], 'assets', []);
                    this.getLocationOfAssets(company, companyIndex);
                    /*this.$set(this.companies[companyIndex], 'customers', []);
                    this.getLocationOfCustomers(company, companyIndex);
                    this.$set(this.companies[companyIndex], 'suppliers', []);
                    this.getLocationOfSuppliers(company, companyIndex);*/
                    this.$set(this.companies[companyIndex], 'lenders', []);
                    this.getLocationOfLenders(company, companyIndex);
                    this.$set(this.companies[companyIndex], 'borrowers', []);
                    this.getLocationOfBorrowers(company, companyIndex);
                    this.$set(this.companies[companyIndex], 'investments', []);
                    this.getLocationOfInvestments(company, companyIndex);
                    this.$set(this.companies[companyIndex], 'banks', []);
                    this.getLocationOfBanks(company, companyIndex);
                    //this.$set(this.companies[companyIndex], 'payrolls', []);
                    //this.getLocationOfPayrolls(company, companyIndex);
                });

                this.setFixedHeader();
            },

            getResidencies(company, companyIndex) {
                const companyShareholders = _.filter(company.data.involvements.types, type => _.includes(type.involvements, 'Corporate shareholder'));
                if (companyShareholders.length > 0) {
                    _.each(companyShareholders, corporate => {
                        _.each(corporate.structure.types, type => {
                            if (type.value === 'individual') {
                                this.companies[companyIndex].residencies.push(this.getCountryName(type.inputDetails.country))
                            }

                            if (type.value === 'company')
                                _.each(type.shareholders, shareholder => {
                                    this.companies[companyIndex].residencies.push(this.getCountryName(shareholder.inputDetails.country))
                                });

                            if (type.value === 'foundation' || type.value === 'trust')
                                _.each(type.beneficiaries, beneficiary => {
                                    this.companies[companyIndex].residencies.push(this.getCountryName(beneficiary.inputDetails.country))
                                })
                        })
                    });
                }

                const nomineeShareholders = _.filter(company.data.involvements.types, type => _.includes(type.involvements, 'Nominee shareholder'));
                if (nomineeShareholders.length > 0) {
                    _.each(nomineeShareholders, corporate => {
                        _.each(corporate.beneficialOwners, owner => {
                            this.companies[companyIndex].residencies.push(this.getCountryName(owner.inputDetails.country))
                        })
                    });
                }

                const trustShareholders = _.filter(company.data.involvements.types, type => _.includes(type.value, 'trust'));
                if (trustShareholders.length > 0) {
                    _.each(trustShareholders, corporate => {
                        _.each(corporate.beneficiaries, owner => {
                            this.companies[companyIndex].residencies.push(this.getCountryName(owner.inputDetails.country))
                        })
                    });
                }

                const foundationShareholders = _.filter(company.data.involvements.types, type => _.includes(type.value, 'foundation'));
                if (foundationShareholders.length > 0) {
                    _.each(foundationShareholders, corporate => {
                        _.each(corporate.beneficiaries, owner => {
                            this.companies[companyIndex].residencies.push(this.getCountryName(owner.inputDetails.country))
                        })
                    });
                }

                const individualShareholders = _.filter(company.data.involvements.types, type => _.includes(type.involvements, 'Individual shareholder'));
                _.each(individualShareholders, shareholder => {
                    this.companies[companyIndex].residencies.push(this.getCountryName(shareholder.nationality))
                })
            },

            getLocationOfAssets(company, companyIndex) {
                this.companies[companyIndex].assets = _.map(company.data.profile.principalActivity.countries,
                                                            country => this.getCountryName(country));
            },

            getLocationOfCustomers(company, companyIndex) {
                const customerProfile = company.data.profile.trading.customerProfile;
                const businessCustomers = _.map(customerProfile.businessCustomer.countries,
                                                country => this.getCountryName(country));
                const individualCustomers = _.map(customerProfile.individualCustomer.countries,
                                                country => this.getCountryName(country));

                this.companies[companyIndex].customers = businessCustomers.concat(individualCustomers);
            },

            getLocationOfSuppliers(company, companyIndex) {
                this.companies[companyIndex].suppliers = _.map(company.data.profile.trading.forecasts.countries,
                                                    country => this.getCountryName(country));
            },

            getLocationOfLenders(company, companyIndex) {
                const lenders = company.data.profile.lenders;

                if (lenders !== undefined && lenders.requireBorrowings)
                    this.companies[companyIndex].lenders = _.map(
                        _.flatten(_.map(lenders.items, item => item.location)),
                        country => this.getCountryName(country)
                    );
            },

            getLocationOfBorrowers(company, companyIndex) {
                const borrowers = company.data.profile.borrowers;

                if (borrowers !== undefined && borrowers.requireBorrowings)
                    this.companies[companyIndex].borrowers = _.map(
                        _.flatten(_.map(borrowers.items, item => item.location)),
                        country => this.getCountryName(country)
                    );
            },

            getLocationOfInvestments(company, companyIndex) {
                const types = company.data.profile.investments.types;
                let countries = [];
                _.each(types, type => {
                    switch (type.name) {
                        case 'shares':
                            _.each(type.companies, company => {
                                countries.push(this.getCountryName(company.country));
                            });
                            break;
                        default:
                            countries = countries.concat( _.map(
                                _.flatten(_.map(type.investments, investment => investment.location)),
                                country => this.getCountryName(country)
                            ));
                        break;
                    }
                });

                this.companies[companyIndex].investments = countries;

            },

            getLocationOfBanks(company, companyIndex) {
                const banks = company.data.profile.banks;

                if (banks.maltaBank)
                    this.companies[companyIndex].banks.push('Malta');

                if (banks.foreignBank)
                    this.companies[companyIndex].banks = this.companies[companyIndex].banks
                        .concat(banks.foreignBanks.map(foreignBank => foreignBank.country));
            },

            getLocationOfPayrolls(company, companyIndex) {
                const payroll = this.companies[companyIndex].data.profile.payroll;

                if (payroll !== undefined) {
                    this.companies[companyIndex].payrolls =  _.map(
                        _.flatten(_.map(payroll.items, item => item.locations)),
                        country => this.getCountryName(country)
                    );
                }
            }
        },

        watch: {
            companies: 'setCompaniesData'
        }
    }
</script>