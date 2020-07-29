<template>
    <v-layout row wrap>
        <v-flex md3 xs3 mr-5>
            <v-text-field
                    label="Filter by type"
                    v-model="filters.type"
            ></v-text-field>
        </v-flex>
        <v-flex md3 xs3 mr-5>
            <v-text-field
                    label="Filter by company name"
                    v-model="filters.company_name"
            ></v-text-field>
        </v-flex>
        <v-flex md3 xs3>
            <v-autocomplete
                    :items="expiredIdentities"
                    label="Expired identity date individuals"
            ></v-autocomplete>
        </v-flex>
        <v-spacer></v-spacer>
        <export-button
                @export="format => exportList('checklist', 'individual', format)"></export-button>
        <div class="fill-width">
            <fixed-header :items="filteredIndividuals" :headers="headers"></fixed-header>

            <v-data-table
                    ref="table"
                    :headers="headers"
                    :items="filteredIndividuals"
                    :hide-actions="true"
                    :search="filters.type"
                    :custom-filter="filterIndividuals"
                    id="main-table">
                <template slot="items" slot-scope="props" style="display: none;">
                    <td v-text="props.item.name"></td>
                    <td>
                        <p v-for="company in props.item.companies">{{ company }}</p>
                    </td>
                    <td>
                        <p v-for="type in props.item.types">{{ type }}</p>
                    </td>
                    <td v-text="props.item.id_expiry_date"></td>
                    <td>
                        <p v-for="mobile in props.item.mobile_no">{{ mobile }}</p>
                    </td>
                    <td>
                        <p v-for="email in props.item.email">{{ email }}</p>
                    </td>
                    <td v-for="document in props.item.documents" v-text="document"></td>
                </template>
            </v-data-table>
        </div>
    </v-layout>
</template>

<script>
    import fixedHeaderMixin from '../mixins/fixed-header';
    import exportMixin from '../mixins/export';
    import {findSubstringInArray} from '@/util'

    export default {
        mixins: [fixedHeaderMixin, exportMixin],

        props: [
            'companies',
            'documents',
            'sowDocuments'
        ],

        data()
        {
            return {
                defaultHeaders: [
                    {text: 'Name', value: 'name'},
                    {text: 'Companies involved with', value: 'company'},
                    {text: 'Type', value: 'type'},
                    {text: 'Identity expiry', value: 'expiry'},
                    {text: 'Mobile no.', value: 'mobile'},
                    {text: 'Email address', value: 'email'}
                ],
                headers: [],
                individuals: {},
                // Export mixin will use it as params
                filters: {
                    type: null,
                    company_name: null,
                },
            }
        },

        computed: {
            filteredIndividuals()
            {
                const individuals = _.map(this.individuals, (individual, key) => {
                    individual.companies = _.uniq(individual.companies);
                    individual.types = _.uniq(individual.types);

                    return individual;
                });

                if (this.filters.company_name !== null) {
                    let filteredIndividuals = [];

                    _.each(individuals, individual => {
                        if (findSubstringInArray(individual, 'companies', this.filters.company_name))
                            filteredIndividuals.push(individual);
                    });

                    return filteredIndividuals;
                }

                return individuals;
            },

            expiredIdentities()
            {
                let identities = [];
                _.each(this.individuals, individual => {
                    if (!_.isEmpty(individual.id_expiry_date)) {
                        const expiredDate = new Date(individual.id_expiry_date);
                        const now = new Date();

                        if (expiredDate < now) {
                            identities.push(individual.name);
                        }
                    }
                });

                return identities;
            }
        },

        mounted()
        {
            this.setDocumentHeaders();
            this.setCompaniesData();
        },

        methods: {
            setDocumentHeaders()
            {
                this.headers = [];
                let headers = [];
                _.each(this.documents, document => {
                    _.each(document.document_names.split(','), name => {
                        headers.push({text: name, value: name})
                    })
                });

                _.each(this.sowDocuments, document => {
                    _.each(document.documents, doc => {
                        headers.push({text: doc.title, value: doc.title});
                    })
                });

                this.headers = this.defaultHeaders.concat(headers);

                this.setFixedHeader();
            },

            setCompaniesData()
            {
                this.individuals = {};
                _.each(this.companies, company => {
                    const individuals = _.filter(company.data.involvements.types, type => type.value === 'individual');

                    if (individuals.length > 0)
                        _.each(individuals, individual => {
                            const name = `${individual.firstName} ${individual.lastName}`;
                            const person = {
                                name,
                                types: individual.involvements,
                                id_expiry_date: individual.id_expiry_date,
                                identificationNumber: individual.identificationNumber,
                                mobile_no: individual.mobile,
                                email: individual.email
                            };

                            this.addToIndividual(person, company, name);
                        });

                    const companyShareholders = _.filter(company.data.involvements.types,
                        type => _.includes(type.involvements, 'Corporate shareholder'));

                    if (companyShareholders.length > 0) {
                        _.each(companyShareholders, corporate => {
                            _.each(corporate.structure.types, type => {
                                if (type.value === 'individual') {
                                    const name = `${type.inputDetails.firstName} ${type.inputDetails.lastName}`
                                    type.inputDetails.types = ['ubo'];
                                    type.inputDetails.name = name;
                                    this.addToIndividual(type.inputDetails, company, name);
                                }

                                if (type.value === 'company')
                                    _.each(type.shareholders, shareholder => {
                                        shareholder.inputDetails.types = ['ubo'];
                                        shareholder.inputDetails.name =
                                            `${shareholder.inputDetails.firstName} ${shareholder.inputDetails.lastName}`;
                                        this.addToIndividual(shareholder.inputDetails, company,
                                            `${shareholder.inputDetails.firstName}`);
                                    });

                                if (type.value === 'foundation' || type.value === 'trust')
                                    _.each(type.beneficiaries, beneficiary => {
                                        beneficiary.inputDetails.types = ['ubo'];
                                        beneficiary.inputDetails.name =
                                            `${beneficiary.inputDetails.firstName} ${beneficiary.inputDetails.lastName}`;

                                        this.addToIndividual(beneficiary.inputDetails, company,
                                            `${beneficiary.inputDetails.firstName}`);
                                    })
                            })
                        });
                    }

                    const trusts = _.filter(company.data.involvements.types, type => type.value === 'trust');

                    if (trusts.length > 0)
                        _.each(trusts, trust => {
                            _.each(trust.beneficiaries, beneficiary => {
                                beneficiary.inputDetails.types = ['trust beneficiaries'];
                                beneficiary.inputDetails.name =
                                    `${beneficiary.inputDetails.firstName} ${beneficiary.inputDetails.lastName}`;
                                beneficiary.inputDetails.email = trust.trusteeEmail;
                                beneficiary.inputDetails.mobile_no = trust.mobile;
                                this.addToIndividual(beneficiary.inputDetails, company,
                                    `${beneficiary.inputDetails.firstName}`);
                            })
                        });

                    const foundations = _.filter(company.data.involvements.types, type => type.value === 'foundation');

                    if (foundations.length > 0)
                        _.each(foundations, foundation => {
                            _.each(foundation.beneficiaries, beneficiary => {
                                beneficiary.inputDetails.types = ['foundation beneficiaries'];
                                beneficiary.inputDetails.email = foundation.administratorEmail;
                                beneficiary.inputDetails.mobile_no = foundation.mobile;

                                beneficiary.inputDetails.name =
                                    `${beneficiary.inputDetails.firstName} ${beneficiary.inputDetails.lastName}`;
                                this.addToIndividual(beneficiary.inputDetails, company,
                                    `${beneficiary.inputDetails.firstName}`);
                            })
                        });

                    const nomineeShareholders = _.filter(company.data.involvements.types,
                        type => _.includes(type.involvements, 'Nominee shareholder'));

                    if (nomineeShareholders.length > 0)
                        _.each(nomineeShareholders, nominee => {
                            _.each(nominee.beneficialOwners, beneficiary => {
                                beneficiary.inputDetails.types = ['Fiduciary beneficiaries'];
                                beneficiary.inputDetails.email = nominee.administratorEmail;
                                beneficiary.inputDetails.mobile_no = nominee.mobile;

                                beneficiary.inputDetails.name =
                                    `${beneficiary.inputDetails.firstName} ${beneficiary.inputDetails.lastName}`;
                                this.addToIndividual(beneficiary.inputDetails, company, beneficiary.inputDetails.name);
                            })
                        })
                })
            },

            addToIndividual(person, company, name = null)
            {
                if (!this.individuals.hasOwnProperty(person.identificationNumber)) {
                    this.individuals[person.identificationNumber] = {
                        name: person.name,
                        companies: [company.data.mlro.approval.mfsa_company_name],
                        id_expiry_date: person.id_expiry_date,
                        types: person.types,
                        mobile_no: [person.mobile_no],
                        email: [person.email]
                    };
                }
                else {
                    this.individuals[person.identificationNumber].companies.push(
                        company.data.mlro.approval.mfsa_company_name);
                    this.individuals[person.identificationNumber].mobile_no.push(person.mobile_no);
                    this.individuals[person.identificationNumber].email.push(person.email);
                    this.individuals[person.identificationNumber].types =
                        this.individuals[person.identificationNumber].types.concat(person.types);
                }

                const documents = _.find(company.data.documents, document => document.person.name === name);

                this.individuals[person.identificationNumber].documents = [];
                if (documents !== undefined) {
                    _.each(this.documents, document => {
                        const availableDocuments = document.document_names.split(',');
                        this.addDocument(person, availableDocuments, documents);
                    });

                    _.each(this.sowDocuments, document => {
                        const availableDocuments = _.map(document.documents, document => document.title);
                        this.addDocument(person, availableDocuments, documents);
                    })
                }
            },

            addDocument(person, availableDocuments, documents)
            {
                _.each(availableDocuments, availableDocument => {
                    const findDocument = _.find(documents.documents,
                        document => document.title === availableDocument.trim());
                    if (findDocument !== undefined && findDocument.files && findDocument.files.length > 0)
                        this.individuals[person.identificationNumber].documents.push(findDocument.document_date);
                    else
                        this.individuals[person.identificationNumber].documents.push('No docs.');
                })
            },

            filterIndividuals(items, search, filter, header)
            {
                let filteredIndividuals = [];
                _.each(items, individual => {
                    if (findSubstringInArray(individual, 'types', search))
                        filteredIndividuals.push(individual);
                });

                return filteredIndividuals;
            },
        },

        watch: {
            documents()
            {
                this.setDocumentHeaders();
                this.setCompaniesData();
            },

            sowDocuments()
            {
                this.setDocumentHeaders();
                this.setCompaniesData();
            },

            companies()
            {
                this.setCompaniesData();
            }
        }
    }
</script>