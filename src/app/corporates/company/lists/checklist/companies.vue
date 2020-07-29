<template>
    <v-layout row wrap>
        <v-flex md3 xs3 mr-5>
            <v-text-field
                    label="Filter by type"
                    v-model="filters.type"
            ></v-text-field>
        </v-flex>
        <v-flex md3 xs3>
            <v-text-field
                    label="Filter by company name"
                    v-model="filters.company_name"
            ></v-text-field>
        </v-flex>
        <v-spacer></v-spacer>
        <export-button
                @export="format => exportList('checklist', 'company', format)"></export-button>
        <div class="fill-width">
            <fixed-header :items="filteredCompanies" :headers="headers"></fixed-header>
            <v-data-table
                    ref="table"
                    :headers="headers"
                    :items="filteredCompanies"
                    :hide-actions="true"
                    :search="filters.type"
                    :custom-filter="filterCompanies"
                    id="main-table"
            >
                <template slot="items" slot-scope="props">
                    <td v-text="props.item.name"></td>
                    <td>
                        <p v-for="company in props.item.companies">{{ company }}</p>
                    </td>
                    <td>
                        <p v-for="type in props.item.types">{{ type }}</p>
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
            'documents'
        ],

        data() {
            return {
                defaultHeaders: [
                    {text: 'Name', value: 'name'},
                    {text: 'Companies involved with', value: 'company'},
                    {text: 'Type', value: 'type'}
                ],
                headers: [],
                corporates: {},
                // Export mixin will use it as params
                filters: {
                    type: null,
                    company_name: null,
                },
            }
        },

        computed: {
            filteredCompanies() {
                const corporates = _.map(this.corporates, (corporate, key) => {
                    return {
                        name: corporate.name,
                        companies: _.uniq(corporate.companies),
                        types: _.uniq(corporate.types),
                        documents: corporate.documents
                    }
                });

                if (this.filters.company_name !== null) {
                    let filteredCorporates = [];
                    _.each(corporates, corporate => {
                        if (findSubstringInArray(corporate, 'companies', this.filters.company_name))
                            filteredCorporates.push(corporate);
                    });

                    return filteredCorporates;
                }

                return corporates;
            }
        },

        mounted() {
            this.setHeaders();
            this.setCompaniesData();
        },

        methods: {
            setHeaders() {
                this.headers = [];
                let headers = [];
                _.each(this.documents, document => {
                    _.each(document.document_names.split(','), name => {
                        headers.push({text: name, value: name})
                    })
                });

                this.headers = this.defaultHeaders.concat(headers);

                this.setFixedHeader();
            },

            setCompaniesData() {
                this.corporates = {};
                _.each(this.companies, company => {
                    const companies = _.filter(company.data.involvements.types, type => type.value === 'company');

                    if (companies.length > 0)
                        _.each(companies, corporate => {
                            this.addCompany(corporate, corporate.name, company)
                        });

                    const companyShareholders = _.filter(company.data.involvements.types, type => _.includes(type.involvements, 'Corporate shareholder'));

                    if (companyShareholders.length > 0) {
                        _.each(companyShareholders, corporate => {
                            _.each(corporate.structure.types, type => {
                                if (type.value === 'company') {
                                    type.involvements = ['Ubo - parent company'];
                                    this.addCompany(type, type.companyName, company)
                                }
                            });
                        });
                    }
                })
            },

            addCompany(corporate, companyName, company) {
                if (! this.corporates.hasOwnProperty(corporate.registrationNumber)) {
                    this.corporates[corporate.registrationNumber] = {
                        name: companyName,
                        companies: [company.data.mlro.approval.mfsa_company_name],
                        types: corporate.involvements
                    }
                }
                else {
                    this.corporates[corporate.registrationNumber].companies.push(company.data.mlro.approval.mfsa_company_name);
                    this.corporates[corporate.registrationNumber].types = this.corporates[corporate.registrationNumber].types.concat(corporate.involvements)
                }

                const documents = _.find(company.data.documents, document => document.person.name === companyName);

                this.corporates[corporate.registrationNumber].documents = [];
                if (documents !== undefined) {
                    _.each(this.documents, document => {
                        const availableDocuments = document.document_names.split(',');
                        _.each(availableDocuments, availableDocument => {
                            const findDocument = _.find(documents.documents, document => document.title === availableDocument.trim());
                            if (findDocument !== undefined && findDocument.files && findDocument.files.length > 0)
                                this.corporates[corporate.registrationNumber].documents.push(findDocument.document_date);
                            else
                                this.corporates[corporate.registrationNumber].documents.push('No docs.');
                        })
                    });
                }
            },

            filterCompanies(items, search, filter, header) {
                let filteredCompanies = [];
                _.each(items, company => {
                    if (findSubstringInArray(company, 'types', search))
                        filteredCompanies.push(company);
                });

                return filteredCompanies;
            }
        },

        watch: {
            documents() {
                this.setHeaders();
                this.setCompaniesData();
            },

            companies: 'setCompaniesData'
        }
    }
</script>