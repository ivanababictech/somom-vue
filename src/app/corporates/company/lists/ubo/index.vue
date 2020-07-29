<template>
    <v-layout row wrap>
        <v-flex md3 xs3 mr-5>
            <v-text-field
                    label="Filter by shareholder name"
                    v-model="nameSearch"
            ></v-text-field>
        </v-flex>
        <v-flex md3 xs3 mr-5>
            <v-text-field
                    label="Filter by company name"
                    v-model="companySearch"
            ></v-text-field>
        </v-flex>
        <v-flex md3 xs3>
            <v-autocomplete
                    multiple
                    :items="availableWealths"
                    v-model="sows"
                    label="Filter by source of wealths"
            ></v-autocomplete>
        </v-flex>
        <div class="fill-width">
            <fixed-header :items="filteredIndividuals" :headers="headers"></fixed-header>

            <v-data-table
                    :headers="headers"
                    :items="filteredIndividuals"
                    :hide-actions="true"
                    :search="nameSearch"
                    id="main-table"
            >
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td>
                        <p v-for="company in props.item.companies">{{ company }}</p>
                    </td>
                    <td>&nbsp;</td>
                    <td>
                        <p v-for="country in props.item.countries">{{ country }}</p>
                    </td>
                    <td>
                        <p v-for="sourceOfWealth in props.item.sourceOfWealths"> {{ sourceOfWealth }}</p>
                    </td>
                    <td>
                        <p v-for="bracket in props.item.netWorthBrackets"> {{ bracket }}</p>
                    </td>
                    <td>
                        {{ props.item.id_expiry_date}}
                    </td>
                </template>
            </v-data-table>
        </div>
    </v-layout>
</template>

<script scoped>
    import countryMixin from '../mixins/country';
    import fixedHeaderMixin from '../mixins/fixed-header';

    export default {
        props: [
            'companies',
            'wealthSources'
        ],

        mixins: [
            countryMixin,
            fixedHeaderMixin
        ],

        data() {
            return {
                individuals: {},
                headers: [
                    {text: 'Shareholder Name', value: 'name'},
                    {text: 'Companies involved with', value: 'companies'},
                    {text: '% of ownership', value: 'ownership'},
                    {text: 'Country of residence', value: 'country_of_residence'},
                    {text: 'Source of wealth', value: 'source_of_wealth'},
                    {text: 'Net worth', value: 'net_worth'},
                    {text: 'Identification expiry date', value: 'id_expiry_date'}
                ],
                netWorthBrackets: [
                    '0 - 500,000',
                    '500,000 - 1,000,000',
                    '1,000,000 - 2,000,000',
                    '2,000,000+'
                ],
                nameSearch: null,
                companySearch: null,
                sows: []
            }
        },

        mounted() {
            this.getIndividuals();
        },

        computed: {
            filteredIndividuals() {
                let mainIndividuals;
                const individuals = _.map(this.individuals, (individual, key) => {
                    individual.companies = _.uniq(individual.companies);
                    individual.countries = _.uniq(individual.countries);
                    individual.sourceOfWealths = _.uniq(individual.sourceOfWealths);
                    individual.netWorthBrackets = _.uniq(individual.netWorthBrackets);

                    return individual;
                });

                if (this.companySearch !== null) {
                    let filteredIndividuals = [];

                    _.each(individuals, individual => {
                        _.each(individual.companies, company => {
                            if (company !== null && _.includes(company.toLowerCase(), this.companySearch.toLowerCase()))
                                filteredIndividuals.push(individual);
                        });
                    });

                    mainIndividuals = filteredIndividuals;
                } else
                    mainIndividuals = individuals;

                if (this.sows.length > 0 ) {
                    let sowFilteredIndividuals = [];
                    _.each(mainIndividuals, individual => {
                        if (individual.sourceOfWealths.some(s => _.includes(this.sows, s))) {
                            sowFilteredIndividuals.push(individual);
                        }
                    });

                    return sowFilteredIndividuals;
                }

                return mainIndividuals;
            },

            availableWealths() {
                let sows = [];

                _.each(this.individuals, individual => {
                     sows = sows.concat(individual.sourceOfWealths.map(w => w));
                });

                return _.uniq(sows);
            }
        },

        methods: {
            getIndividuals() {
                this.individuals = {};
                _.each(this.companies, company => {
                    const companyShareholders = _.filter(company.data.involvements.types, type => _.includes(type.involvements, 'Corporate shareholder'));

                    if (companyShareholders.length > 0) {
                        _.each(companyShareholders, corporate => {
                            _.each(corporate.structure.types, type => {
                                if (type.value === 'individual') {
                                    const name = `${type.inputDetails.firstName} ${type.inputDetails.lastName}`;

                                    this.addToIndividuals(type, company, name);
                                }

                                if (type.value === 'company')
                                    _.each(type.shareholders, shareholder => {
                                        const name = `${shareholder.inputDetails.firstName}`;

                                        this.addToIndividuals(shareholder, company, name);
                                    });

                                if (type.value === 'foundation' || type.value === 'trust')
                                    _.each(type.beneficiaries, beneficiary => {
                                        const name = `${beneficiary.inputDetails.firstName}`;

                                        this.addToIndividuals(beneficiary, company, name);
                                    })
                            })
                        });
                    }

                    const nomineeShareholders = _.filter(company.data.involvements.types, type => _.includes(type.involvements, 'Nominee shareholder'));
                    if (nomineeShareholders.length > 0) {
                        _.each(nomineeShareholders, corporate => {
                            _.each(corporate.beneficialOwners, owner => {
                                const name = `${owner.inputDetails.firstName}`;
                                this.addToIndividuals(owner, company, name);
                            })
                        });
                    }

                    const trustShareholders = _.filter(company.data.involvements.types, type => _.includes(type.value, 'trust'));
                    if (trustShareholders.length > 0) {
                        _.each(trustShareholders, corporate => {
                            _.each(corporate.beneficiaries, owner => {
                                const name = `${owner.inputDetails.firstName}`;
                                this.addToIndividuals(owner, company, name);
                            })
                        });
                    }

                    const foundationShareholders = _.filter(company.data.involvements.types, type => _.includes(type.value, 'foundation'));

                    if (foundationShareholders.length > 0) {
                        _.each(foundationShareholders, corporate => {
                            _.each(corporate.beneficiaries, owner => {
                                const name = `${owner.inputDetails.firstName}`;
                                this.addToIndividuals(owner, company, name);
                            })
                        });
                    }

                    const individualShareholders = _.filter(company.data.involvements.types, type => _.includes(type.involvements, 'Individual shareholder'));

                    _.each(individualShareholders, shareholder => {
                        const name = `${shareholder.firstName} ${shareholder.lastName}`;
                         shareholder.inputDetails = {
                             firstName: shareholder.firstName,
                             lastName: shareholder.lastName,
                             identificationNumber: shareholder.identificationNumber,
                             id_expiry_date: shareholder.id_expiry_date,
                             country: shareholder.nationality
                         };

                         this.addToIndividuals(shareholder, company, name)
                    })
                });

                this.setFixedHeader();
            },

            addToIndividuals(person, company, name) {
                let sourceOfWealths = [];
                const netWorthBrackets = [];
                const dueDiligence = _.find(company.data.dueDiligence, dueDiligence => dueDiligence.name === name);
                if (dueDiligence !== undefined) {
                    sourceOfWealths = _.filter(this.wealthSources, wealthSource => _.includes(dueDiligence.sourceWealth.wealths, wealthSource.id))
                        .map(wealthSource => wealthSource.title);

                    if (dueDiligence.netWorthBracket.type !== null)
                        netWorthBrackets.push(this.netWorthBrackets[dueDiligence.netWorthBracket.type - 1])
                }
                if (!this.individuals.hasOwnProperty(person.inputDetails.identificationNumber)) {
                    this.individuals[person.inputDetails.identificationNumber] = {
                        name: `${person.inputDetails.firstName} ${person.inputDetails.lastName}`,
                        companies: [company.data.mlro.approval.mfsa_company_name],
                        countries: [this.getCountryName(person.inputDetails.country)],
                        sourceOfWealths: sourceOfWealths,
                        netWorthBrackets: netWorthBrackets,
                        id_expiry_date: person.inputDetails.id_expiry_date
                    };
                }
                else {
                    this.individuals[person.inputDetails.identificationNumber].companies.push(company.data.mlro.approval.mfsa_company_name);
                    this.individuals[person.inputDetails.identificationNumber].countries.push(this.getCountryName(person.inputDetails.country));
                    this.individuals[person.inputDetails.identificationNumber].sourceOfWealths = this.individuals[person.inputDetails.identificationNumber].sourceOfWealths.concat(sourceOfWealths);
                    this.individuals[person.inputDetails.identificationNumber].netWorthBrackets = this.individuals[person.inputDetails.identificationNumber].netWorthBrackets.concat(netWorthBrackets);
                }
            },


        },

        watch: {
            companies: 'getIndividuals',
            wealthSources: 'getIndividuals'
        }
    }
</script>